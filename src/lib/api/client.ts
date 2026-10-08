/**
 * Maxicab API HTTP Client
 * Implements standard headers, error handling, idempotency, and Next.js proxy routing
 */

import { API_CONFIG } from "@/config/api";
import { ApiErrorResponse } from "@/types/api";

export class ApiError extends Error {
  public readonly code: string;
  public readonly details?: string[];
  public readonly requestId?: string;
  public readonly status: number;

  constructor(status: number, errorData: ApiErrorResponse["error"], requestId?: string) {
    super(errorData?.message || `API request failed with status ${status}`);
    this.name = "ApiError";
    this.status = status;
    this.code = errorData?.code || "UNKNOWN_ERROR";
    this.details = errorData?.details;
    this.requestId = requestId;
  }
}

export interface RequestOptions extends RequestInit {
  useProxy?: boolean; // Default true on client-side to prevent CORS / preflight blocks
  adminApiKey?: string;
  idempotencyKey?: string;
  timeoutMs?: number;
}

/**
 * Generate a standard UUID v4 for Idempotency-Key
 */
export function generateIdempotencyKey(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return "idemp_" + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
}

/**
 * Core type-safe API Fetch wrapper
 */
export async function apiFetch<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const {
    useProxy = typeof window !== "undefined",
    adminApiKey,
    idempotencyKey,
    timeoutMs = API_CONFIG.TIMEOUT_MS,
    headers: customHeaders,
    ...fetchOptions
  } = options;

  // Build target URL
  let targetUrl: string;
  if (useProxy && typeof window !== "undefined") {
    // Client-side: use Next.js proxy endpoint to bypass CORS and preflight limits
    const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    targetUrl = `${API_CONFIG.PROXY_PREFIX}${cleanEndpoint}`;
  } else {
    // Server-side or direct mode
    const baseUrl = API_CONFIG.BASE_URL.replace(/\/$/, "");
    const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    targetUrl = `${baseUrl}${cleanEndpoint}`;
  }

  const headers = new Headers(customHeaders);

  // Set default JSON Content-Type if body is present
  if (fetchOptions.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  // Admin Auth Header
  if (adminApiKey) {
    headers.set("Authorization", `Bearer ${adminApiKey}`);
  }

  // Idempotency Key for checkouts
  if (idempotencyKey) {
    headers.set("Idempotency-Key", idempotencyKey);
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(targetUrl, {
      ...fetchOptions,
      headers,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // Handle No-Content
    if (response.status === 204) {
      return {} as T;
    }

    // Try parsing JSON
    let data: unknown;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      const text = await response.text();
      try {
        data = JSON.parse(text);
      } catch {
        data = { message: text };
      }
    }

    if (!response.ok) {
      const errorPayload = (data as ApiErrorResponse) || {};
      const requestId =
        errorPayload.requestId || response.headers.get("x-request-id") || undefined;
      throw new ApiError(
        response.status,
        errorPayload.error || {
          code: `HTTP_${response.status}`,
          message: response.statusText || "Request failed",
        },
        requestId
      );
    }

    return data as T;
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    if (err instanceof ApiError) {
      throw err;
    }
    if ((err as Error).name === "AbortError") {
      throw new ApiError(408, {
        code: "TIMEOUT",
        message: `API request timed out after ${timeoutMs}ms`,
      });
    }
    throw new ApiError(500, {
      code: "NETWORK_ERROR",
      message: (err as Error).message || "Network error occurred connecting to backend",
    });
  }
}
