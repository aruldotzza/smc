import { NextRequest, NextResponse } from "next/server";
import { API_CONFIG } from "@/config/api";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  return proxyRequest(request, await context.params);
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  return proxyRequest(request, await context.params);
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  return proxyRequest(request, await context.params);
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  return proxyRequest(request, await context.params);
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  return proxyRequest(request, await context.params);
}

async function proxyRequest(request: NextRequest, params: { path: string[] }) {
  const backendBaseUrl = (process.env.API_BASE_URL || API_CONFIG.BASE_URL).replace(/\/$/, "");
  const path = params.path ? params.path.join("/") : "";
  const searchParams = request.nextUrl.search;
  const targetUrl = `${backendBaseUrl}/${path}${searchParams}`;

  const forwardHeaders: HeadersInit = {};
  const allowedForwardHeaders = [
    "content-type",
    "authorization",
    "idempotency-key",
    "stripe-signature",
    "accept",
  ];

  request.headers.forEach((value, key) => {
    if (allowedForwardHeaders.includes(key.toLowerCase())) {
      forwardHeaders[key] = value;
    }
  });

  try {
    const isBodyAllowed = ["POST", "PUT", "PATCH"].includes(request.method);
    let bodyData: BodyInit | null = null;
    if (isBodyAllowed) {
      bodyData = await request.text();
    }

    const backendResponse = await fetch(targetUrl, {
      method: request.method,
      headers: forwardHeaders,
      body: bodyData,
      cache: "no-store",
    });

    const responseText = await backendResponse.text();
    const responseHeaders = new Headers();

    const forwardBackHeaders = ["content-type", "x-request-id", "idempotency-key", "cache-control"];
    backendResponse.headers.forEach((val, k) => {
      if (forwardBackHeaders.includes(k.toLowerCase())) {
        responseHeaders.set(k, val);
      }
    });

    return new NextResponse(responseText, {
      status: backendResponse.status,
      statusText: backendResponse.statusText,
      headers: responseHeaders,
    });
  } catch (err: unknown) {
    return NextResponse.json(
      {
        error: {
          code: "PROXY_BACKEND_UNREACHABLE",
          message:
            (err as Error).message ||
            "Unable to connect to backend server. Make sure the backend is running at " + backendBaseUrl,
        },
      },
      { status: 503 }
    );
  }
}
