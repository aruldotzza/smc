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
    service: "Airport Transfer",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const countryCodes = [
    { code: "+65", country: "SG" },
    { code: "+60", country: "MY" },
    { code: "+91", country: "IN" },
    { code: "+1", country: "US" },
    { code: "+44", country: "UK" },
    { code: "+61", country: "AU" },
    { code: "+81", country: "JP" },
    { code: "+86", country: "CN" },
    { code: "+62", country: "ID" },
  ];

  const services = [
    "Airport Transfer (Changi / Seletar)",
    "Hourly Charter & Disposal",
    "Point-to-Point City Transfer",
    "Corporate Transport Account",
    "Wedding & Special Occasion",
    "Wheelchair Accessible Maxi Cab",
    "Island Tour & Sightseeing",
    "Other Custom Request",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text =
      `*New Contact Message - Singapore Maxicabs*%0A` +
      `--------------------------------%0A` +
      `*Name:* ${formData.name}%0A` +
      `*Email:* ${formData.email}%0A` +
      `*Phone:* ${formData.countryCode} ${formData.phone}%0A` +
      `*Service Interested:* ${formData.service}%0A` +
      `*Message:* ${formData.message}%0A` +
      `--------------------------------%0A` +
      `Please assist with this inquiry.`;

    window.open(`https://wa.me/6588006006?text=${text}`, "_blank");
    setSubmitted(true);
  };

  const getContactIcon = (iconName: string) => {
    switch (iconName) {
      case "whatsapp":
        return <MessageCircle className="w-5 h-5 text-[#16803C] fill-current" />;
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
      <section className="w-full bg-[#071E3B] text-white py-12 sm:py-20 px-4 sm:px-12 lg:px-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#071E3B] via-[#0B2A4A] to-[#071E3B] pointer-events-none opacity-90" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C6A45A]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1360px] mx-auto relative z-10 flex flex-col items-start gap-3 sm:gap-4">
          <span className="text-xs sm:text-sm font-bold text-[#C6A45A] uppercase tracking-[0.5px] font-manrope">
            {contactData.badge}
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.15] font-manrope">
            {contactData.title}
          </h1>
          <p className="text-sm sm:text-lg text-white/90 leading-relaxed max-w-2xl font-normal font-manrope">
            {contactData.subtitle}
          </p>
        </div>
      </section>

      {/* 3. Main Contact Content */}
      <section className="py-12 sm:py-20 px-4 sm:px-12 lg:px-24 max-w-[1360px] mx-auto w-full flex flex-col gap-12 sm:gap-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left Column: Direct Contact & Hours */}
          <div className="flex flex-col gap-8 sm:gap-10">
            {/* Direct Contacts */}
            <div className="flex flex-col gap-4 sm:gap-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#071E3B] font-manrope">
                Reach Us Directly
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                {contactData.directContacts.map((c, idx) => (
                  <a
                    key={idx}
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="p-4 sm:p-5 bg-[#F8F7F4] hover:bg-[#FBF7EC] border border-[#E9ECEF] hover:border-[#C6A45A] rounded-xl flex items-start gap-3.5 transition-all shadow-2xs group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-white shadow-xs flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      {getContactIcon(c.icon)}
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs text-[#667085] font-medium font-inter">
                        {c.label}
                      </span>
                      <span className="text-sm sm:text-base font-bold text-[#071E3B] font-manrope group-hover:text-[#C6A45A] transition-colors break-words">
                        {c.value}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Operating Hours */}
            <div className="flex flex-col gap-4 sm:gap-5">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#071E3B] font-manrope">
                Operating Hours
              </h2>

              <div className="rounded-xl border border-[#E9ECEF] overflow-hidden shadow-xs divide-y divide-slate-100">
                {contactData.operatingHours.map((h, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between px-5 py-3.5 text-xs sm:text-sm ${
                      idx % 2 === 0 ? "bg-white" : "bg-[#F7F5EF]"
                    }`}
                  >
                    <span className="font-semibold text-[#5F6B7A] font-inter">{h.label}</span>
                    <span className="font-bold text-[#071E3B] font-manrope">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Send Us a Message Form */}
          <div className="p-6 sm:p-8 bg-[#F8F7F4] rounded-2xl sm:rounded-3xl border border-[#E9ECEF] flex flex-col gap-5 sm:gap-6 shadow-sm">
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#071E3B] font-manrope">
                Send Us a Message
              </h2>
              <p className="text-xs sm:text-sm text-[#667085] font-manrope">
                Fill out the details below and we&apos;ll get back to you promptly.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 sm:p-8 rounded-xl bg-[#ECFDF3] border border-emerald-200 text-center flex flex-col items-center gap-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600" />
                <h3 className="text-lg font-bold text-[#071E3B] font-manrope">
                  Message Dispatched!
                </h3>
                <p className="text-xs sm:text-sm text-[#5F6B7A] font-manrope max-w-sm">
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
                      service: "Airport Transfer",
                      message: "",
                    });
                  }}
                  className="mt-2 px-6 py-2.5 bg-[#071E3B] text-white rounded-lg text-xs font-bold font-manrope cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Full Name */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs sm:text-sm font-medium text-[#071E3B] font-inter">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jennifer Smith"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white rounded-xl border border-[#7A8593] text-sm font-manrope text-[#071E3B] placeholder:text-[#667085] outline-none focus:border-[#C6A45A] focus:ring-1 focus:ring-[#C6A45A]"
                  />
                </div>

                {/* Email Address */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs sm:text-sm font-medium text-[#071E3B] font-inter">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="jennifer@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white rounded-xl border border-[#7A8593] text-sm font-manrope text-[#071E3B] placeholder:text-[#667085] outline-none focus:border-[#C6A45A] focus:ring-1 focus:ring-[#C6A45A]"
                  />
                </div>

                {/* Phone Number / WhatsApp */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs sm:text-sm font-medium text-[#071E3B] font-inter">
                    Phone Number / WhatsApp
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="relative shrink-0">
                      <select
                        value={formData.countryCode}
                        onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                        className="appearance-none px-3 py-3 bg-white rounded-xl border border-[#7A8593] text-sm font-bold font-manrope text-[#071E3B] pr-7 outline-none focus:border-[#C6A45A] cursor-pointer"
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
                      placeholder="8800 6006"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-white rounded-xl border border-[#7A8593] text-sm font-manrope text-[#071E3B] placeholder:text-[#667085] outline-none focus:border-[#C6A45A] focus:ring-1 focus:ring-[#C6A45A]"
                    />
                  </div>
                </div>

                {/* Service of Interest */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs sm:text-sm font-medium text-[#071E3B] font-inter">
                    Service Interested
                  </label>
                  <div className="relative">
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full appearance-none px-4 py-3 bg-white rounded-xl border border-[#7A8593] text-sm font-semibold font-manrope text-[#071E3B] pr-8 outline-none focus:border-[#C6A45A] cursor-pointer"
                    >
                      {services.map((s, idx) => (
                        <option key={idx} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#667085] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs sm:text-sm font-medium text-[#071E3B] font-inter">
                    Your Message / Inquiry
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us your itinerary dates, flight number, passenger count, or any special requests..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-white rounded-xl border border-[#7A8593] text-sm font-manrope text-[#071E3B] placeholder:text-[#667085] outline-none focus:border-[#C6A45A] focus:ring-1 focus:ring-[#C6A45A] resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full mt-2 py-3.5 bg-[#071E3B] hover:bg-[#0B2A4A] active:scale-[0.98] text-white rounded-xl flex items-center justify-center gap-2.5 text-sm sm:text-base font-bold font-manrope transition-all shadow-md cursor-pointer hover:shadow-lg"
                >
                  <span>Send Message via WhatsApp</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 4. Footer */}
      <Footer />
    </main>
  );
}
