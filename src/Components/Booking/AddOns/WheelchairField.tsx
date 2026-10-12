"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";

interface WheelchairFieldProps {
  onRemove: () => void;
  onChange?: (data: { count: number; requirement: string }) => void;
}

export default function WheelchairField({ onRemove, onChange }: WheelchairFieldProps) {
  const [count, setCount] = useState(1);
  const [requirement, setRequirement] = useState("");

  const handleCountChange = (delta: number) => {
    const newVal = Math.max(1, count + delta);
    setCount(newVal);
    onChange?.({ count: newVal, requirement });
  };

  const handleReqChange = (val: string) => {
    setRequirement(val);
    onChange?.({ count, requirement: val });
  };

  return (
    <div className="w-full p-4 sm:p-5 bg-white rounded-xl border border-slate-200/90 shadow-sm flex flex-col gap-3.5 transition-all">
      {/* Top Header with Checkbox */}
      <div className="flex items-start gap-3 pb-3 border-b border-slate-100">
        <button
          type="button"
          onClick={onRemove}
          title="Uncheck to remove add-on"
          className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-[#C6A45A] text-white flex items-center justify-center shrink-0 cursor-pointer shadow-xs hover:bg-[#b59249] transition-all"
        >
          <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3]" />
        </button>

        <div className="flex-1 flex flex-col gap-0.5">
          <div className="flex items-center justify-between">
            <h4 className="text-sm sm:text-base font-semibold text-[#071E3B] font-inter">
              Wheelchair-Accessible Maxi Cab
            </h4>
            <span className="text-xs sm:text-sm font-semibold text-[#C6A45A] font-inter">
              Included
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#667085] font-manrope">
            Accessible travel with a vehicle equipped with hydraulic ramp and 4-point harness.
          </p>
        </div>
      </div>

      {/* Stepper & Input */}
      <div className="flex flex-col gap-3">
        {/* Stepper */}
        <div className="px-3 py-2 bg-[#F8F7F4] rounded-lg border border-slate-200/80 flex items-center justify-between">
          <span className="text-xs font-semibold text-[#5F6B7A] font-manrope">
            Wheelchairs
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleCountChange(-1)}
              className="w-6 h-6 bg-white rounded shadow-xs flex items-center justify-center text-xs font-bold text-[#5F6B7A] hover:bg-slate-100 cursor-pointer active:scale-95"
            >
              -
            </button>
            <span className="w-4 text-center text-xs font-medium text-[#071E3B] font-manrope">
              {count}
            </span>
            <button
              type="button"
              onClick={() => handleCountChange(1)}
              className="w-6 h-6 bg-white rounded shadow-xs flex items-center justify-center text-xs font-bold text-[#5F6B7A] hover:bg-slate-100 cursor-pointer active:scale-95"
            >
              +
            </button>
          </div>
        </div>

        {/* Requirements input */}
        <div className="p-3 bg-[#F8F7F4] rounded-lg border border-slate-200/80 focus-within:border-[#C6A45A] focus-within:bg-white transition-all">
          <input
            type="text"
            placeholder="Add an additional requirement (e.g. motorized wheelchair, ramp assistance)"
            value={requirement}
            onChange={(e) => handleReqChange(e.target.value)}
            className="w-full text-xs text-[#071E3B] placeholder:text-[#667085] bg-transparent outline-none font-manrope"
          />
        </div>

        <p className="text-xs text-[#667085] font-manrope leading-relaxed">
          Comfortable, dignified and accessible travel for wheelchair passengers across Singapore.
        </p>
      </div>
    </div>
  );
}
