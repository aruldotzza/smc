import React from "react";
import Image from "next/image";
import occasionsData from "@/data/occasions.json";

export default function OccasionsSection() {
  return (
    <section id="about" className="relative w-full overflow-hidden py-16 sm:py-20 px-6 sm:px-12 lg:px-16 min-h-[640px] flex flex-col justify-center">
      {/* Background Image from Figma */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/Home/what_we_offer.png"
          alt="What We Offer - Singapore Maxicab"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Soft Vignette Overlay matching design screenshot */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/50 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-[1312px] mx-auto w-full flex flex-col gap-8">
        {/* Header */}
        <div className="max-w-[660px] flex flex-col gap-4 sm:gap-5">
          <span className="text-xs font-bold text-white uppercase tracking-wider font-manrope">
            {occasionsData.badge}
          </span>
          <div className="flex flex-col gap-2.5">
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-white leading-tight font-manrope">
              Premium Rides for Every
              <br />
              Important Occasion
            </h2>
            <p className="text-base sm:text-lg text-white/95 font-medium leading-relaxed font-manrope">
              {occasionsData.subtitle}
            </p>
          </div>
        </div>

        {/* Outer Frosted Glass Box */}
        <div className="w-full p-5 sm:p-7 bg-white/20 rounded-2xl border border-white/30 backdrop-blur-xl flex flex-col gap-5 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {occasionsData.cards.map((card) => (
              <div
                key={card.id}
                className="p-5 sm:p-6 bg-white rounded-xl border border-[#E9ECEF]/60 flex flex-col gap-2 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-[#071E3B] uppercase font-manrope leading-7">
                  {card.title}
                </h3>
                <p className="text-sm font-normal text-[#5F6B7A] leading-6 font-manrope">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

