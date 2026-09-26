"use client";

import React, { useState } from "react";
import Link from "next/link";
import navData from "@/data/navigation.json";
import { MessageCircle, ArrowRight, Menu, X } from "lucide-react";
import { useBookingModal } from "@/context/BookingContext";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openModal } = useBookingModal();

  return (
    <header className="sticky top-0 z-40 w-full h-20 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-[1440px] mx-auto h-full px-6 sm:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex flex-col items-start group">
          <span className="text-[13px] font-extrabold text-[#071E3B] uppercase tracking-[2.64px] font-manrope">
            {navData.brand.name}
          </span>
          <span className="text-[10px] text-[#C6A45A] tracking-wider uppercase font-semibold">
            Premium Transport
          </span>
        </Link>

        {/* Center Desktop Links */}
        <nav className="hidden lg:flex items-center gap-10">
          {navData.navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-semibold uppercase text-[#071E3B] hover:text-[#C6A45A] tracking-normal transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right CTAs */}
        <div className="hidden sm:flex items-center gap-5">
          {/* WhatsApp Booking */}
          <a
            href={navData.whatsappButton.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-emerald-50 border border-emerald-200/60 hover:bg-emerald-100/70 transition-all text-[#16803C] text-sm font-semibold"
          >
            <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#1FAF38] to-[#60D669] flex items-center justify-center text-white shadow-xs">
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
            </div>
            <span>{navData.whatsappButton.label}</span>
          </a>

          {/* Book Now button triggering modal */}
          <button
            type="button"
            onClick={() => openModal({ initialStep: 0 })}
            className="flex items-center gap-3 px-7 py-2.5 rounded-lg bg-[#071E3B] hover:bg-[#0B2A4A] text-white text-base font-semibold transition-all shadow-sm hover:shadow cursor-pointer"
          >
            <span>{navData.bookButton.label}</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex lg:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#071E3B] hover:text-[#C6A45A]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-5 space-y-4 shadow-xl">
          {navData.navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold uppercase text-[#071E3B] hover:text-[#C6A45A]"
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-3">
            <a
              href={navData.whatsappButton.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-emerald-50 text-[#16803C] text-sm font-semibold"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>{navData.whatsappButton.label}</span>
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openModal({ initialStep: 0 });
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-[#071E3B] text-white text-base font-semibold cursor-pointer"
            >
              <span>{navData.bookButton.label}</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
