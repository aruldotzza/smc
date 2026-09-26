import React from "react";
import statsData from "@/data/stats.json";
import { Star } from "lucide-react";

export default function StatsSection() {
  return (
    <section className="w-full py-8 sm:py-10 px-6 sm:px-12 bg-white border-y border-slate-100">
      <div className="max-w-[1376px] mx-auto grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
        {statsData.map((stat, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center p-4 rounded-xl gap-1"
          >
            <div className="flex items-center justify-center gap-1.5">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#071E3B] tracking-[1.5px]">
                {stat.value}
              </span>
              {stat.hasStar && (
                <Star className="w-6 h-6 fill-[#F59E0B] text-[#F59E0B]" />
              )}
            </div>
            <span className="text-xs sm:text-sm font-bold text-[#5F6B7A] uppercase tracking-wide">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
