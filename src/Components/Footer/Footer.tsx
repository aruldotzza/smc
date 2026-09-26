import React from "react";
import footerData from "@/data/footer.json";
import Link from "next/link";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white text-[#5F6B7A] border-t border-slate-200">
      <div className="max-w-[1360px] mx-auto px-6 sm:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link href="/" className="flex flex-col items-start">
              <span className="text-[13px] font-bold text-[#071E3B] uppercase tracking-[2.64px]">
                {footerData.company.name}
              </span>
              <span className="text-[10px] text-[#C6A45A] tracking-wider uppercase font-semibold">
                Premium Transport
              </span>
            </Link>

            <p className="text-sm text-[#667085] leading-relaxed max-w-sm">
              {footerData.company.description}
            </p>

            <div className="flex flex-col gap-2.5 pt-2 text-sm text-[#071E3B]">
              <a
                href={`tel:${footerData.company.phone.replace(/[^0-9+]/g, "")}`}
                className="flex items-center gap-2.5 hover:text-[#C6A45A] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#C6A45A]" />
                <span>{footerData.company.phone}</span>
              </a>
              <a
                href={`mailto:${footerData.company.email}`}
                className="flex items-center gap-2.5 hover:text-[#C6A45A] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#C6A45A]" />
                <span>{footerData.company.email}</span>
              </a>
              <div className="flex items-start gap-2.5 text-[#667085]">
                <MapPin className="w-4 h-4 text-[#C6A45A] shrink-0 mt-0.5" />
                <span>{footerData.company.address}</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          {footerData.columns.map((col, idx) => (
            <div key={idx} className="flex flex-col gap-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#071E3B]">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-2.5 text-sm">
                {col.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link
                      href={link.href}
                      className="text-[#667085] hover:text-[#071E3B] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-[#667085] gap-4">
          <p>{footerData.copyright}</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-[#071E3B] font-medium">
              <Globe className="w-3.5 h-3.5 text-[#C6A45A]" />
              {footerData.language}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
