'use client';

import React, { useState } from 'react';
import { Check } from 'lucide-react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="w-full bg-primary text-linen pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-32 sm:pb-40 md:pb-52 overflow-hidden relative select-none">
      <div className="container relative z-10">
        {/* ========================================================================= */}
        {/* TOP ROW: NEWSLETTER & NAVIGATION LINKS                                    */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-20 pb-12 sm:pb-16 md:pb-20">
          {/* ================= LEFT COLUMN: BULLETIN ================= */}
          <div className="lg:col-span-5 xl:col-span-6 flex flex-col justify-start">
            {/* Serif Title */}
            <h3 className="font-luxury font-normal text-linen text-3xl sm:text-4xl md:text-[2.65rem] leading-[1.15] tracking-[-0.015em] mb-2 sm:mb-3">
              Residence Bulletins &amp; Updates
            </h3>

            {/* Subtitle / Frequency */}
            <p className="text-xs sm:text-[13px] md:text-sm text-linen/70 font-normal leading-relaxed mb-6 sm:mb-8 max-w-md">
              Room allotment updates, facility maintenance notices, and resident community announcements.
            </p>

            {/* Email Capsule Input Form */}
            <form onSubmit={handleSubscribe} className="w-full max-w-md relative">
              {subscribed ? (
                <div className="flex items-center gap-2.5 py-3 px-5 rounded-full bg-primary-deeper border border-white/20 text-sand text-xs sm:text-sm animate-fadeIn">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Thank you. You are subscribed to Saltmere Residence announcements.</span>
                </div>
              ) : (
                <div className="flex items-center bg-primary-deeper/80 hover:bg-primary-deeper border border-white/20 hover:border-white/35 focus-within:border-white/50 focus-within:bg-primary-deeper rounded-full p-1.5 transition-all duration-200 shadow-inner">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Resident email address"
                    required
                    className="w-full bg-transparent px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm text-linen placeholder:text-linen/40 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-5 sm:px-6 py-2 sm:py-2.5 rounded-full bg-linen hover:bg-white text-primary text-xs sm:text-sm font-medium tracking-wide transition-all duration-200 shrink-0 shadow-sm active:scale-95 cursor-pointer"
                  >
                    Subscribe
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* ================= RIGHT COLUMNS: 3 NAVIGATION COLUMNS ================= */}
          <div className="lg:col-span-7 xl:col-span-6 grid grid-cols-3 gap-6 sm:gap-8 md:gap-12">
            {/* Column 1: ACCOMMODATION */}
            <div>
              <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.24em] text-khaki mb-4 sm:mb-5 select-none">
                Accommodation
              </p>
              <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-[13px] md:text-sm font-normal text-linen/75">
                <li>
                  <a href="#stay" className="hover:text-linen transition-colors cursor-pointer">
                    Rooms &amp; Living Spaces
                  </a>
                </li>
                <li>
                  <a href="#dine" className="hover:text-linen transition-colors cursor-pointer">
                    Dining &amp; Kitchen
                  </a>
                </li>
                <li>
                  <a href="#experiences" className="hover:text-linen transition-colors cursor-pointer">
                    Co-Working &amp; Gym
                  </a>
                </li>
                <li>
                  <a href="#offers" className="hover:text-linen transition-colors cursor-pointer">
                    Stay Plans &amp; Rates
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2: RESIDENT ERP */}
            <div>
              <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.24em] text-khaki mb-4 sm:mb-5 select-none">
                Resident ERP
              </p>
              <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-[13px] md:text-sm font-normal text-linen/75">
                <li>
                  <Link href="/student" className="hover:text-linen transition-colors cursor-pointer">
                    Resident Portal
                  </Link>
                </li>
                <li>
                  <Link href="/admin" className="hover:text-linen transition-colors cursor-pointer">
                    Manager ERP Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/student" className="hover:text-linen transition-colors cursor-pointer">
                    Maintenance Tickets
                  </Link>
                </li>
                <li>
                  <Link href="/student" className="hover:text-linen transition-colors cursor-pointer">
                    Biometric Gate Pass
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: RESIDENCE DESK */}
            <div>
              <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.24em] text-khaki mb-4 sm:mb-5 select-none">
                Residence Desk
              </p>
              <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-[13px] md:text-sm font-normal text-linen/75">
                <li className="text-linen/65 leading-snug">
                  14 Bayview Promenade, North Coast Highway, Mumbai
                </li>
                <li>
                  <a href="tel:+919876543210" className="hover:text-linen transition-colors cursor-pointer whitespace-nowrap">
                    +91 98765 43210
                  </a>
                </li>
                <li>
                  <a
                    href="https://api.whatsapp.com/send?phone=919876543210&text=Hi%20Saltmere%20Residence%20Desk%2C%20I%20have%20an%20inquiry%20regarding%20room%20availability%20and%20stay%20plans."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-linen text-emerald-400 font-medium transition-colors cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>WhatsApp Desk (Free)</span>
                  </a>
                </li>
                <li>
                  <a href="mailto:stay@saltmereliving.com" className="hover:text-linen transition-colors cursor-pointer break-all">
                    stay@saltmereliving.com
                  </a>
                </li>
                <li>
                  <span className="text-[11px] text-emerald-400/80 font-medium">
                    Desk: Mon–Sat, 9AM–8PM
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MIDDLE DIVIDER & LEGAL ROW                                                */}
        {/* ========================================================================= */}
        <div className="pt-6 sm:pt-8 pb-4 sm:pb-6 border-t border-white/12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-[13px] text-linen/55">
          {/* Copyright notice */}
          <p className="font-normal">
            &copy; 2026 Saltmere Hostel &amp; Co-Living Residence. All rights reserved.
          </p>

          {/* Privacy & Legal Links */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <a href="#house-rules" className="hover:text-linen transition-colors cursor-pointer">
              Residence House Rules
            </a>
            <span>&middot;</span>
            <a href="#safety-policy" className="hover:text-linen transition-colors cursor-pointer">
              Safety &amp; Security Policy
            </a>
            <span>&middot;</span>
            <a href="#terms" className="hover:text-linen transition-colors cursor-pointer">
              Terms &amp; Conditions
            </a>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BOTTOM GIGANTIC WATERMARK BRAND TITLE                                     */}
      {/* ========================================================================= */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden flex justify-center items-end pointer-events-none select-none z-0">
        <span
          className="font-luxury font-normal text-watermark leading-[0.75] tracking-[-0.03em] whitespace-nowrap text-center block translate-y-[18%]"
          style={{
            fontSize: 'clamp(6rem, 20vw, 22rem)',
          }}
        >
          Saltmere
        </span>
      </div>
    </footer>
  );
};
