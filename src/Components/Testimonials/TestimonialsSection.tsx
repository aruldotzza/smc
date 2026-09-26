"use client";

import React, { useState } from "react";
import testimonialsData from "@/data/testimonials.json";
import { Star, CheckCircle, ArrowRight } from "lucide-react";

export default function TestimonialsSection() {
  const [activeCategory, setActiveCategory] = useState("All Reviews (63)");

  const filteredReviews =
    activeCategory === "All Reviews (63)"
      ? testimonialsData.reviews
      : testimonialsData.reviews.filter(
          (r) => r.category.toLowerCase() === activeCategory.toLowerCase()
        );

  return (
    <section id="reviews" className="py-20 px-6 sm:px-12 bg-[#F7FAFF] border-t border-slate-200/80">
      <div className="max-w-[1360px] mx-auto flex flex-col gap-12">
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-[#C6A45A] uppercase tracking-[1px]">
            {testimonialsData.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#071E3B] tracking-tight">
            {testimonialsData.title}
          </h2>
          <p className="text-base sm:text-lg text-[#667085] leading-relaxed">
            {testimonialsData.subtitle}
          </p>
        </div>

        {/* Categories Bar & Google Score */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-4 border-b border-slate-200">
          {/* Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {testimonialsData.categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-[#071E3B] text-white shadow-sm"
                    : "bg-white text-[#5F6B7A] border border-slate-200 hover:border-slate-400"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Rating Badge */}
          <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-xl border border-slate-200/80 shadow-xs">
            <span className="text-base font-bold text-[#071E3B]">
              {testimonialsData.rating}
            </span>
            <div className="flex text-[#F59E0B]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#F59E0B]" />
              ))}
            </div>
            <span className="text-xs text-[#5F6B7A] font-medium border-l border-slate-200 pl-3">
              {testimonialsData.verifiedCount}
            </span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="flex flex-col gap-4">
                {/* Highlight Badge */}
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md bg-[#FBF7EC] border border-[#C6A45A]/40 text-[#C6A45A] text-[11px] font-bold tracking-wide uppercase">
                    {rev.badge}
                  </span>
                  <div className="flex text-[#F59E0B]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#F59E0B]" />
                    ))}
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-sm text-[#071E3B] font-medium leading-relaxed">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-6 mt-4 border-t border-slate-100 flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-[#071E3B]">
                      {rev.author}
                    </h4>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#16803C] bg-emerald-50 px-2 py-0.5 rounded">
                      <CheckCircle className="w-3 h-3" />
                      Verified
                    </span>
                  </div>
                  {rev.perk && (
                    <span className="text-[11px] font-semibold text-[#C6A45A]">
                      {rev.perk}
                    </span>
                  )}
                </div>
                <span className="text-xs text-[#667085]">{rev.role}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Link */}
        <div className="text-center pt-2">
          <a
            href="https://google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#071E3B] hover:text-[#C6A45A] transition-colors"
          >
            <span>{testimonialsData.footerNote}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
