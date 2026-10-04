"use client";

import React, { useState } from "react";
import Navbar from "@/Components/Header/Navbar";
import Footer from "@/Components/Footer/Footer";
import contactData from "@/data/contact.json";
import { MessageCircle, Phone, Mail, MapPin, Send, CheckCircle2, ChevronDown } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+65",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const countryCodes = [
    { code: "+65", country: "SG" },
    { code: "+91", country: "IN" },
    { code: "+60", country: "MY" },
    { code: "+1", country: "US" },
    { code: "+44", country: "UK" },
    { code: "+61", country: "AU" },
    { code: "+81", country: "JP" },
    { code: "+86", country: "CN" },
    { code: "+62", country: "ID" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text =
      `*New Contact Message - Singapore Maxicabs*%0A` +
      `--------------------------------%0A` +
      `*Name:* ${formData.name}%0A` +
      `*Email:* ${formData.email}%0A` +
      `*Phone:* ${formData.countryCode} ${formData.phone}%0A` +
      `*Message:* ${formData.message}%0A` +
      `--------------------------------%0A` +
      `Please assist with this inquiry.`;

    window.open(`https://wa.me/6588006006?text=${text}`, "_blank");
    setSubmitted(true);
  };

  const getContactIcon = (iconName: string) => {
    switch (iconName) {
      case "whatsapp":
        return <MessageCircle className="w-5 h-5 text-[#C6A45A] fill-current" />;
      case "phone":
        return <Phone className="w-5 h-5 text-[#C6A45A]" />;
      case "mail":
        return <Mail className="w-5 h-5 text-[#C6A45A]" />;
      case "map-pin":
        return <MapPin className="w-5 h-5 text-[#C6A45A]" />;
      default:
        return <Mail className="w-5 h-5 text-[#C6A45A]" />;
    }
  };

  return (
    <main className="min-h-screen flex flex-col w-full bg-white selection:bg-[#C6A45A] selection:text-[#071E3B]">
      {/* 1. Navbar */}
      <Navbar />

      {/* 2. Hero Header */}
      <section className="w-full bg-[#071E3B] text-white py-12 sm:py-16 px-6 sm:px-12 lg:px-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#071E3B] via-[#0B2A4A] to-[#071E3B] pointer-events-none opacity-90" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C6A45A]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1360px] mx-auto relative z-10 flex flex-col items-start gap-2 sm:gap-3">
          <span className="text-base sm:text-lg font-bold text-[#C6A45A] tracking-wide font-manrope">
            {contactData.badge}
          </span>
          <h1 className="text-4xl sm:text-6xl font-bold text-white tracking-tight leading-[1.15] font-manrope">
            {contactData.title}
          </h1>
          <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-[600px] font-medium font-manrope pt-2">
            {contactData.subtitle}
          </p>
        </div>
      </section>

      {/* 3. Main Contact Content */}
      <section className="py-12 sm:py-16 px-4 sm:px-12 lg:px-28 max-w-[1440px] mx-auto w-full flex flex-col gap-12 sm:gap-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left Column: Direct Contact & Hours */}
          <div className="flex flex-col gap-10 sm:gap-12">
            {/* Direct Contacts */}
            <div className="flex flex-col gap-6">
              <h2 className="text-3xl font-bold text-[#071E3B] font-manrope leading-10">
                Reach Us Directly
              </h2>

              <div className="flex flex-col gap-4">
                {contactData.directContacts.map((c, idx) => (
                  <a
                    key={idx}
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="p-4 bg-[#F7F5EF] hover:bg-[#FBF7EC] border border-[#E9ECEF] hover:border-[#C6A45A] rounded-xl flex items-center gap-4 transition-all group cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      {getContactIcon(c.icon)}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-[#667085] font-inter">
                        {c.label}
                      </span>
                      <span className="text-lg font-medium text-[#071E3B] font-manrope group-hover:text-[#C6A45A] transition-colors break-words">
                        {c.value}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Operating Hours */}
            <div className="flex flex-col gap-6">
              <h2 className="text-3xl font-bold text-[#071E3B] font-manrope leading-10">
                Operating Hours
              </h2>

              <div className="rounded-xl border border-[#E9ECEF] overflow-hidden">
                {contactData.operatingHours.map((h, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between px-5 py-3.5 text-sm sm:text-base ${
                      idx % 2 === 0 ? "bg-white" : "bg-[#F7F5EF]"
                    }`}
                  >
                    <span className="text-sm font-medium text-[#5F6B7A] font-inter">{h.label}</span>
                    <span className="text-base sm:text-lg font-medium text-[#071E3B] font-manrope">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Send Us a Message Form & WhatsApp Fastest Card */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              <h2 className="text-3xl font-bold text-[#071E3B] font-manrope leading-10">
                Send Us a Message
              </h2>

              {submitted ? (
                <div className="p-8 rounded-xl bg-[#ECFDF3] border border-emerald-200 text-center flex flex-col items-center gap-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600" />
                  <h3 className="text-xl font-bold text-[#071E3B] font-manrope">
                    Message Dispatched!
                  </h3>
                  <p className="text-sm text-[#5F6B7A] font-manrope max-w-sm">
                    Thank you, {formData.name}! Your inquiry has been forwarded to our team via WhatsApp. We will reply within minutes.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        countryCode: "+65",
                        phone: "",
                        message: "",
                      });
                    }}
                    className="mt-2 px-6 py-2.5 bg-[#071E3B] hover:bg-[#0B2A4A] text-white rounded-lg text-sm font-semibold font-manrope cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  {/* Full Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-[#071E3B] font-inter">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jennifer"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-4 bg-white rounded-lg border border-[#E9ECEF] focus:border-[#C6A45A] focus:ring-1 focus:ring-[#C6A45A] text-sm text-[#071E3B] placeholder:text-[#667085] placeholder:text-xs font-manrope outline-none transition-all"
                    />
                  </div>

                  {/* Email Address */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-[#071E3B] font-inter">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Jennifer@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-4 bg-white rounded-lg border border-[#E9ECEF] focus:border-[#C6A45A] focus:ring-1 focus:ring-[#C6A45A] text-sm text-[#071E3B] placeholder:text-[#667085] placeholder:text-xs font-manrope outline-none transition-all"
                    />
                  </div>

                  {/* Phone Number / WhatsApp */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-[#071E3B] font-inter">
                      Phone Number / WhatsApp
                    </label>
                    <div className="flex items-center gap-1.5">
                      <div className="relative shrink-0">
                        <select
                          value={formData.countryCode}
                          onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                          className="appearance-none px-3 py-4 bg-white rounded-lg border border-[#E9ECEF] text-xs font-normal font-manrope text-[#667085] pr-7 outline-none focus:border-[#C6A45A] cursor-pointer"
                        >
                          {countryCodes.map((c) => (
                            <option key={c.code} value={c.code}>
                              {c.code}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-3.5 h-3.5 text-[#667085] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                      <input
                        type="tel"
                        required
                        placeholder="9876543210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="flex-1 p-4 bg-white rounded-lg border border-[#E9ECEF] focus:border-[#C6A45A] focus:ring-1 focus:ring-[#C6A45A] text-sm text-[#071E3B] placeholder:text-[#667085] placeholder:text-xs font-manrope outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-[#071E3B] font-inter">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Tell us about your booking needs, dates, passenger count, or any questions..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-4 bg-white rounded-lg border border-[#E9ECEF] focus:border-[#C6A45A] focus:ring-1 focus:ring-[#C6A45A] text-sm text-[#071E3B] placeholder:text-[#667085] placeholder:text-xs font-manrope outline-none transition-all resize-none min-h-[120px]"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#071E3B] hover:bg-[#0B2A4A] active:scale-[0.99] text-white rounded-lg font-semibold text-base font-manrope transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

            {/* WhatsApp is Fastest Card */}
            <div className="p-6 bg-[#ECFDF3] rounded-xl border border-[#16803C]/30 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0">
                  <MessageCircle className="w-6 h-6 text-[#16803C] fill-current" />
                </div>
                <h3 className="text-xl font-semibold text-[#071E3B] font-manrope">
                  WhatsApp is Fastest
                </h3>
              </div>
              <p className="text-xs font-normal text-[#5F6B7A] font-manrope leading-5 max-w-[470px]">
                For immediate booking confirmations or last-minute changes, WhatsApp us directly. We typically respond within 5 minutes.
              </p>
              <a
                href="https://wa.me/6588006006"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 px-5 py-2.5 bg-[#16803C] hover:bg-[#126931] rounded-lg inline-flex items-center justify-center gap-2 text-white text-sm font-semibold font-manrope transition-all w-fit cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Open WhatsApp Chat</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Footer */}
      <Footer />
    </main>
  );
}

