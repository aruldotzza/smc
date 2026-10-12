"use client";

import React from "react";
import { Check } from "lucide-react";

export interface AddOnOption {
  id: string;
  name: string;
  priceNote?: string;
}

interface AddOnDropdownProps {
  onSelect: (id: string) => void;
  activeIds: string[];
}

export const ADDON_OPTIONS: AddOnOption[] = [
  { id: "meet-greet", name: "Meet & Greet service", priceNote: "+$20" },
  { id: "baby-seat", name: "Baby Seat", priceNote: "+$20" },
  { id: "additional-stops", name: "Additional Stops", priceNote: "From +$10" },
  { id: "wheelchair", name: "Wheelchair Accessible", priceNote: "Available" },
];

export default function AddOnDropdown({ onSelect, activeIds }: AddOnDropdownProps) {
  return (
    <div className="w-full bg-white rounded-xl border border-slate-200/90 shadow-xl p-2 flex flex-col gap-1 z-30 animate-in fade-in zoom-in-95 duration-150">
      {ADDON_OPTIONS.map((opt) => {
        const isSelected = activeIds.includes(opt.id);
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onSelect(opt.id)}
            className={`w-full h-11 px-3.5 rounded-lg flex items-center justify-between text-left transition-all cursor-pointer ${
              isSelected
                ? "bg-[#FBF7EC] text-[#071E3B] font-semibold"
                : "hover:bg-[#F8F7F4] text-[#071E3B] font-normal"
            }`}
          >
            <span className="text-xs sm:text-sm font-manrope">
              {opt.name}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#C6A45A] font-manrope">
                {opt.priceNote}
              </span>
              {isSelected && (
                <div className="w-4 h-4 rounded-full bg-[#C6A45A] text-white flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
