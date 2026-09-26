import React from "react";
import stepsData from "@/data/steps.json";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 sm:py-20 px-6 sm:px-12 bg-white">
      <div className="max-w-[1320px] mx-auto flex flex-col items-center gap-12 sm:gap-14">
        {/* Section Header */}
        <div className="text-center flex flex-col items-center gap-3">
          <span className="text-xs font-bold text-[#C6A45A] uppercase tracking-[1px]">
            {stepsData.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#071E3B] tracking-tight">
            {stepsData.title}
          </h2>
        </div>

        {/* 3 Steps Cards */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative items-stretch">
          {stepsData.steps.map((item, index) => (
            <div
              key={item.step}
              className="bg-[#FBF7EC] border border-[#C6A45A] rounded-[24px] p-7 shadow-[0px_8px_24px_rgba(7,30,59,0.04)] flex flex-col items-start gap-5 hover:shadow-lg transition-all"
            >
              {/* Number Circle 72x72 */}
              <div className="w-[72px] h-[72px] rounded-full bg-[#F4EAD1] flex items-center justify-center">
                <span className="text-[32px] font-bold text-[#C6A45A] leading-none">
                  {item.step}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-[#071E3B]">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-sm font-normal text-[#5F6B7A] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
