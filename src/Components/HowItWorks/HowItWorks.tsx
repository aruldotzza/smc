import React from "react";
import stepsData from "@/data/steps.json";
import { ChevronDown } from "lucide-react";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-10 sm:py-16 px-4 sm:px-8 lg:px-16 bg-white">
      <div className="max-w-[1312px] mx-auto flex flex-col items-center gap-8 sm:gap-14">
        {/* Section Header */}
        <div className="text-center flex flex-col items-center gap-2 sm:gap-3">
          <span className="text-xs font-bold text-[#C6A45A] uppercase tracking-wide font-manrope">
            {stepsData.badge}
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#071E3B] leading-tight font-manrope">
            {stepsData.title}
          </h2>
        </div>

        {/* 3 Steps Cards with Responsive Connectors */}
        <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-2 lg:gap-6">
          {stepsData.steps.map((item, index) => (
            <React.Fragment key={item.step}>
              <div className="w-full lg:w-[384px] p-6 sm:p-7 bg-[#FBF7EC] rounded-2xl sm:rounded-3xl shadow-xs border border-[#C6A45A]/80 flex flex-col items-start gap-4 sm:gap-5 hover:shadow-md transition-shadow">
                {/* Number Badge */}
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#F4EAD1] rounded-2xl sm:rounded-[36px] flex items-center justify-center">
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#C6A45A] font-manrope leading-none">
                    {item.step}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-[#071E3B] font-manrope">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm font-normal text-[#5F6B7A] leading-relaxed font-manrope">
                  {item.description}
                </p>
              </div>

              {/* In-between Connector: Vertical on mobile, Horizontal/Vertical line on Desktop */}
              {index < stepsData.steps.length - 1 && (
                <div className="flex items-center justify-center shrink-0 my-1 lg:my-0 text-[#C6A45A]">
                  <div className="lg:hidden flex flex-col items-center gap-0.5 py-1 text-[#C6A45A]">
                    <div className="h-4 w-0 border-l-2 border-dashed border-[#C6A45A]" />
                    <ChevronDown className="w-4 h-4 text-[#C6A45A] -mt-1" />
                  </div>
                  <div className="hidden lg:flex h-32 w-6 items-center justify-center">
                    <div className="h-full w-0 border-l-2 border-dashed border-[#C6A45A]" />
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}



