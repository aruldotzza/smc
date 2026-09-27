"use client";

import React, { useState } from "react";
import Link from "next/link";
import navData from "@/data/navigation.json";
import { MessageCircle, ArrowRight, Menu, X, Phone, ShieldCheck } from "lucide-react";
import { useBookingModal } from "@/context/BookingContext";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openModal } = useBookingModal();

  return (
    <header className="sticky top-0 z-40 w-full h-16 sm:h-20 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-[1440px] mx-auto h-full px-4 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex flex-col items-start group">
          <span className="text-xs sm:text-[13px] font-extrabold text-[#071E3B] uppercase tracking-[2px] sm:tracking-[2.64px] font-manrope">
            {navData.brand.name}
          </span>
          <span className="text-[9px] sm:text-[10px] text-[#C6A45A] tracking-wider uppercase font-semibold">
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

        {/* Right CTAs Desktop */}
        <div className="hidden sm:flex items-center gap-4 lg:gap-5">
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
            className="flex items-center gap-3 px-6 lg:px-7 py-2.5 rounded-lg bg-[#071E3B] hover:bg-[#0B2A4A] text-white text-sm lg:text-base font-semibold transition-all shadow-sm hover:shadow cursor-pointer"
          >
            <span>{navData.bookButton.label}</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Mobile Action Buttons (Right) */}
        <div className="flex sm:hidden items-center gap-2">
          {/* Quick WhatsApp Mini Button */}
          <a
            href={navData.whatsappButton.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/70 flex items-center justify-center text-emerald-600 active:scale-95 transition-all"
            aria-label="WhatsApp"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-[#071E3B] active:scale-95 transition-all cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 bg-white/98 backdrop-blur-xl border-b border-slate-200 px-5 py-6 space-y-5 shadow-2xl z-50 animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            {navData.navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-3 px-3 rounded-xl text-base font-bold uppercase text-[#071E3B] hover:bg-[#FBF7EC] hover:text-[#C6A45A] transition-colors"
              >
                <span>{item.label}</span>
                <ArrowRight className="w-4 h-4 opacity-40" />
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
            <a
              href={navData.whatsappButton.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 py-3 rounded-xl bg-emerald-50 border border-emerald-200 text-[#16803C] text-sm font-bold shadow-xs active:scale-98 transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Chat via WhatsApp (+65 8800 6006)</span>
            </a>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openModal({ initialStep: 0 });
              }}
              className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-[#071E3B] hover:bg-[#0B2A4A] text-white text-base font-bold shadow-md cursor-pointer active:scale-98 transition-all"
            >
              <span>{navData.bookButton.label}</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>

            <div className="pt-2 flex items-center justify-center gap-4 text-xs text-[#667085] font-medium">
              <a href="tel:+6588006006" className="inline-flex items-center gap-1.5 hover:text-[#071E3B]">
                <Phone className="w-3.5 h-3.5 text-[#C6A45A]" />
                <span>Call Hotline 24/7</span>
              </a>
              <span>•</span>
              <span className="inline-flex items-center gap-1 text-[#16803C]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Fixed Flat Rates</span>
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

