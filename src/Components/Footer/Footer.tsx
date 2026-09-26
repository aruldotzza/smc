import React from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

export default function Footer() {
  const footerData = {
    brand: {
      name: "SINGAPORE MAXICABS",
      description:
        "Airport transfers, corporate transport, and comfortable rides across Singapore.",
      whatsappHref: "https://wa.me/6588006006",
    },
    columns: [
      {
        title: "FLEET",
        links: [
          { label: "6-Seater Maxi Cab", href: "/fleets/6-seater" },
          { label: "7-Seater Maxi Cab", href: "/fleets/7-seater" },
          { label: "9-Seater Maxi Cab", href: "/fleets/9-seater" },
          { label: "13-Seater Minibus", href: "/fleets/13-seater" },
          { label: "Wheelchair Cab", href: "/fleets/wheelchair-cab" },
          { label: "VIP Lounge", href: "/fleets/vip-lounge" },
        ],
      },
      {
        title: "MAXI CAB TYPE",
        links: [
          { label: "6-Seater Maxi Cab", href: "/fleets/6-seater" },
          { label: "7-Seater Maxi Cab", href: "/fleets/7-seater" },
          { label: "9-Seater Maxi Cab", href: "/fleets/9-seater" },
          { label: "13-Seater Minibus", href: "/fleets/13-seater" },
          { label: "Wheelchair Maxi Cab", href: "/fleets/wheelchair-cab" },
          { label: "Executive Minibus", href: "/fleets/13-seater" },
        ],
      },
      {
        title: "SERVICES",
        links: [
          { label: "Airport Transfers", href: "/services/airport-transfers" },
          { label: "Limousine & Chauffeur", href: "/services/corporate-business" },
          { label: "City Tour (Free & Easy)", href: "/services/hourly-booking-standby" },
          { label: "Corporate Transport", href: "/services/corporate-business" },
          { label: "Wedding Car", href: "/services/weddings-special-occasions" },
          { label: "Wheelchair Transport", href: "/services/wheelchair-transport" },
        ],
      },
      {
        title: "COMPANY",
        links: [
          { label: "About Us", href: "/#about" },
          { label: "Contact", href: "/#contact" },
          { label: "Guides & Blog", href: "/#about" },
          { label: "Corporate Accounts", href: "/services/corporate-business" },
          { label: "Singapore Maxi Cabs Login", href: "/#booking" },
        ],
      },
    ],
  };

  return (
    <footer className="w-full bg-white text-[#5F6B7A] border-t border-[#E9ECEF] py-12 px-6 sm:px-12 lg:px-16">
      <div className="max-w-[1312px] mx-auto flex flex-col gap-10">
        {/* Top Section: Brand Info + 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 sm:gap-10">
          {/* Brand Info Column (Span 2) */}
          <div className="lg:col-span-2 flex flex-col items-start gap-4">
            <Link href="/" className="flex flex-col items-start">
              <span className="text-xs font-semibold text-[#071E3B] uppercase tracking-[2.64px] font-manrope">
                {footerData.brand.name}
              </span>
            </Link>

            <p className="text-sm font-normal text-[#667085] font-manrope leading-5 max-w-xs">
              {footerData.brand.description}
            </p>

            {/* WhatsApp Booking Pill */}
            <a
              href={footerData.brand.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 bg-[#ECFDF3] rounded-lg border border-[#16803C] inline-flex items-center gap-2 text-[#16803C] text-sm font-semibold font-manrope hover:bg-emerald-100 transition-colors"
            >
              <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-green-600 to-green-400 flex items-center justify-center text-white">
                <MessageCircle className="w-3 h-3 fill-current" />
              </div>
              <span>WhatsApp Booking</span>
            </a>
          </div>

          {/* 4 Link Columns */}
          {footerData.columns.map((col, idx) => (
            <div key={idx} className="flex flex-col gap-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wide text-[#071E3B] font-inter">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-2">
                {col.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link
                      href={link.href}
                      className="text-sm font-normal text-[#667085] hover:text-[#071E3B] font-manrope leading-5 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section: Copyright + Secondary Navigation */}
        <div className="pt-4 border-t border-[#E9ECEF] flex flex-col sm:flex-row items-center justify-between text-sm text-[#667085] font-normal font-manrope gap-4">
          <p>© 2026 Singapore Maxi Cabs • All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/#about" className="hover:text-[#071E3B] transition-colors">
              About
            </Link>
            <Link href="/#contact" className="hover:text-[#071E3B] transition-colors">
              Contact
            </Link>
            <Link href="/services" className="hover:text-[#071E3B] transition-colors">
              Services
            </Link>
            <Link href="/pricing" className="hover:text-[#071E3B] transition-colors">
              Pricing
            </Link>
            <Link href="/fleets" className="hover:text-[#071E3B] transition-colors">
              Fleet
            </Link>
            <span className="hover:text-[#071E3B] cursor-pointer">English ▾</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

