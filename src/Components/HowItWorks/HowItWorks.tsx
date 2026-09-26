import React from "react";
import stepsData from "@/data/steps.json";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-12 sm:py-16 px-6 sm:px-12 lg:px-16 bg-white">
      <div className="max-w-[1312px] mx-auto flex flex-col items-center gap-14">
        {/* Section Header */}
        <div className="text-center flex flex-col items-center gap-3">
          <span className="text-xs font-bold text-[#C6A45A] uppercase tracking-wide font-manrope">
            {stepsData.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#071E3B] leading-tight font-manrope">
            {stepsData.title}
          </h2>
        </div>

        {/* 3 Steps Cards with Vertical Dashed Connectors */}
        <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-6">
          {stepsData.steps.map((item, index) => (
            <React.Fragment key={item.step}>
              <div className="w-full lg:w-[384px] p-7 bg-[#FBF7EC] rounded-3xl shadow-[0px_8px_24px_0px_rgba(7,30,59,0.04)] border border-[#C6A45A] flex flex-col items-start gap-5 hover:shadow-md transition-shadow">
                {/* Number Badge */}
                <div className="w-16 h-16 bg-[#F4EAD1] rounded-[36px] flex items-center justify-center">
                  <span className="text-3xl font-bold text-[#C6A45A] font-manrope leading-none">
                    {item.step}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-[#071E3B] font-manrope">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-sm font-normal text-[#5F6B7A] leading-relaxed font-manrope">
                  {item.description}
                </p>
              </div>

              {/* In-between Vertical Dashed Line */}
              {index < stepsData.steps.length - 1 && (
                <div className="flex items-center justify-center shrink-0 w-6 h-8 lg:h-32 my-1 lg:my-0">
                  <div className="h-full w-0 border-l-2 border-dashed border-[#C6A45A]" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}


