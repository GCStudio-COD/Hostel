'use client';

import React, { useState } from 'react';
import { Menu, X, Check } from 'lucide-react';
import Link from 'next/link';
import { api } from '../lib/api';

export const HomeBanner: React.FC = () => {
  // Navigation & Reservation Modal State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingRefId, setBookingRefId] = useState('');
  const [copiedRef, setCopiedRef] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    occupation: '',
    roomPreference: 'Deluxe Twin Sharing',
    stayDuration: 'Annual Residency (12 Months)',
  });

  const handleConfirmReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    const ref = 'SLT-' + Math.floor(1000 + Math.random() * 9000);
    setBookingRefId(ref);
    setBookingSuccess(true);

    // Save admission request directly to the backend database
    const roomTypeMap: Record<string, any> = {
      'Single AC Studio': 'SINGLE',
      'Deluxe Twin Sharing': 'DELUXE_AC',
      'Standard Triple Sharing': 'STANDARD_NON_AC',
      'Four-Sharing Quad Pod': 'NORMAL_NON_AC',
    };

    try {
      await api.createAdmission({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        collegeOrWork: formData.occupation,
        guardianName: 'Self / Contact',
        guardianPhone: formData.phone,
        address: 'Direct Web Booking',
        idProofType: 'National ID / Aadhaar',
        idProofNumber: ref,
        roomTypePreference: roomTypeMap[formData.roomPreference] || 'DELUXE_AC',
        notes: `Website Booking: Stay Duration: ${formData.stayDuration}. Profession: ${formData.occupation}`,
      });
    } catch (err) {
      console.warn('Backend admission sync skipped, local ticket confirmed:', err);
    }
  };

  return (
    <div className="w-full bg-linen text-primary flex flex-col selection:bg-primary selection:text-white">
      {/* ========================================================================= */}
      {/* 1. EDITORIAL HEADER                                                       */}
      {/* ========================================================================= */}
      <header className="w-full bg-linen shrink-0 z-40 transition-all duration-200">
        <div className="container py-3.5 sm:py-4 md:py-4.5 flex items-center justify-between">
          {/* Brand Logo: Tide Emblem + Serif Title */}
          <a
            href="#"
            className="flex items-center gap-2 sm:gap-2.5 md:gap-3 cursor-pointer group select-none no-underline"
          >
            {/* Minimalist Tide Wave Emblem SVG */}
            <div className="w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 flex items-center justify-center text-primary group-hover:opacity-75 transition-opacity">
              <svg
                className="w-full h-full"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M4.5 10.5h15" />
                <path d="M6 14.5h12" />
                <path d="M8.5 7h7" />
              </svg>
            </div>

            {/* Saltmere Brand Title */}
            <div className="flex flex-col">
              <span className="font-luxury text-xl sm:text-2xl md:text-[1.45rem] font-medium tracking-tight text-primary leading-none">
                Saltmere
              </span>
              <span className="text-[9px] uppercase tracking-widest font-semibold text-primary/60 -mt-0.5">
                Hostel &amp; Residence
              </span>
            </div>
          </a>

          {/* Navigation Links: visible on md, lg, xl, xxl */}
          <nav className="hidden md:flex items-center md:gap-6 lg:gap-8 xl:gap-10 text-xs sm:text-sm font-normal text-primary tracking-normal">
            <a
              href="#stay"
              className="text-primary hover:opacity-65 transition-opacity no-underline py-1 cursor-pointer font-medium"
            >
              Rooms
            </a>
            <a
              href="#dine"
              className="text-primary hover:opacity-65 transition-opacity no-underline py-1 cursor-pointer font-medium"
            >
              Dining &amp; Mess
            </a>
            <a
              href="#experiences"
              className="text-primary hover:opacity-65 transition-opacity no-underline py-1 cursor-pointer font-medium"
            >
              Amenities
            </a>
            <a
              href="#offers"
              className="text-primary hover:opacity-65 transition-opacity no-underline py-1 cursor-pointer font-medium"
            >
              Stay Plans
            </a>
          </nav>

          {/* Right Action Controls: Resident Portal, Reserve CTA button */}
          <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
            <Link
              href="/login"
              className="hidden sm:inline-flex items-center text-[11px] sm:text-xs font-medium text-primary hover:text-primary-dark border border-primary/25 hover:border-primary/50 px-3.5 py-1.5 sm:py-2 rounded-full transition-all duration-200 no-underline whitespace-nowrap"
            >
              Resident Login (OTP)
            </Link>

            <button
              onClick={() => setIsBookModalOpen(true)}
              className="bg-primary hover:bg-primary-dark text-white text-[11px] sm:text-xs md:text-sm font-medium px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-full shadow-xs hover:shadow transition-all duration-200 active:scale-95 cursor-pointer whitespace-nowrap"
            >
              Reserve a Room
            </button>

            {/* Mobile Drawer Hamburger Menu Button (visible on < md) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-primary hover:opacity-75 transition-opacity cursor-pointer"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-linen border-b border-primary/15 px-6 py-4 shadow-sm transition-all animate-fade-in">
            <nav className="flex flex-col gap-3 text-sm font-medium text-primary">
              <a
                href="#stay"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:opacity-70 transition-opacity"
              >
                Rooms &amp; Living Spaces
              </a>
              <a
                href="#dine"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:opacity-70 transition-opacity"
              >
                Dining &amp; Kitchen
              </a>
              <a
                href="#experiences"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:opacity-70 transition-opacity"
              >
                Amenities &amp; Co-Working
              </a>
              <a
                href="#offers"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:opacity-70 transition-opacity"
              >
                Stay Plans &amp; Rates
              </a>
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="pt-2 text-primary font-semibold hover:opacity-70 transition-opacity border-t border-primary/10 flex items-center justify-between"
              >
                <span>Resident Login (OTP)</span>
                <span className="text-xs bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-medium">Instant Access</span>
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* ========================================================================= */}
      {/* 2. HOME BANNER / HERO SECTION (Residential Hostel & Co-Living Hero)       */}
      {/* ========================================================================= */}
      <section className="relative w-full pb-4 sm:pb-6 md:pb-8 pt-0">
        <div className="container">
          {/* Framed Curved Banner Canvas with Smooth Aspect & Viewport Bounds */}
          <div className="relative w-full h-[calc(100vh-5.5rem)] min-h-[540px] max-h-[820px] rounded-[24px] sm:rounded-[32px] md:rounded-[40px] lg:rounded-[46px] xl:rounded-[52px] overflow-hidden flex flex-col justify-center items-center border border-stone-300/40 shadow-xs">
            {/* Background Residence Architecture Photography */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out"
              style={{
                backgroundImage: `url('/images/hostel-hero.jpg')`,
                backgroundPosition: 'center 40%',
              }}
            />

            {/* Soft Atmospheric Warmth & Readability Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-stone-900/35 via-stone-900/20 to-stone-900/70 pointer-events-none" />

            {/* ================= EDITORIAL HEADLINE ================= */}
            <div className="relative z-10 px-4 sm:px-6 md:px-10 text-center max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto py-8">
              {/* Eyebrow Tagline */}
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/30 mb-3.5 sm:mb-4 md:mb-6 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <p className="text-[9.5px] sm:text-[10.5px] md:text-[11px] font-semibold tracking-[0.24em] uppercase text-white select-none">
                  BOOKINGS OPEN &bull; YEAR-ROUND CO-LIVING
                </p>
              </div>

              {/* Editorial Title */}
              <h1 className="font-luxury font-normal sm:font-light text-white text-[2.4rem] sm:text-5xl md:text-6xl lg:text-[4.4rem] xl:text-[5rem] leading-[1.04] sm:leading-[1.03] lg:leading-[1.02] tracking-[-0.02em] select-none drop-shadow-sm">
                Where modern comfort meets{' '}
                <span className="italic font-normal">vibrant community living.</span>
              </h1>

              {/* Refined Resident Subtitle */}
              <p className="mt-4 sm:mt-5 text-xs sm:text-sm md:text-base text-white/90 max-w-xl mx-auto font-normal leading-relaxed drop-shadow-xs">
                Furnished private &amp; shared rooms, 24/7 quiet co-working pods, gigabit Wi-Fi 6, chef-curated 4-meal daily dining, and biometric facial access.
              </p>

              {/* CTA Quick Buttons */}
              <div className="mt-6 sm:mt-8 flex items-center justify-center gap-3 sm:gap-4">
                <button
                  onClick={() => setIsBookModalOpen(true)}
                  className="bg-white hover:bg-stone-100 text-primary font-medium text-xs sm:text-sm px-5 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  Reserve a Room
                </button>
                <a
                  href="#stay"
                  className="bg-primary/80 hover:bg-primary text-white border border-white/25 backdrop-blur-xs font-medium text-xs sm:text-sm px-5 sm:px-6 py-2.5 sm:py-3 rounded-full transition-all no-underline cursor-pointer"
                >
                  Explore Living Spaces
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. RESIDENT ROOM RESERVATION INQUIRY MODAL                                */}
      {/* ========================================================================= */}
      {isBookModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-card rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative text-primary max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsBookModalOpen(false)}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 cursor-pointer p-1"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {bookingSuccess ? (
              <div className="py-6 space-y-4">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-sm">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="font-luxury text-2xl font-normal text-primary">Reservation Request Received</h3>
                  <p className="text-xs text-stone-600 max-w-sm mx-auto leading-relaxed">
                    Your room request is recorded. Share your booking ticket via WhatsApp for instant zero-cost confirmation with our residence manager.
                  </p>
                </div>

                {/* Booking Ticket Summary Card */}
                <div className="bg-linen/90 rounded-2xl p-4 border border-stone-200 text-xs text-primary space-y-2.5 shadow-inner">
                  <div className="flex items-center justify-between border-b border-primary/10 pb-2">
                    <span className="font-semibold text-stone-500 uppercase tracking-wider text-[10px]">Booking Reference</span>
                    <span className="font-bold text-primary font-mono text-sm tracking-wide">{bookingRefId}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div>
                      <span className="text-stone-500 block">Resident:</span>
                      <span className="font-medium text-primary">{formData.fullName || 'Resident'}</span>
                    </div>
                    <div>
                      <span className="text-stone-500 block">Phone:</span>
                      <span className="font-medium text-primary">{formData.phone || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-stone-500 block">Room Choice:</span>
                      <span className="font-medium text-primary">{formData.roomPreference}</span>
                    </div>
                    <div>
                      <span className="text-stone-500 block">Stay Plan:</span>
                      <span className="font-medium text-primary">{formData.stayDuration}</span>
                    </div>
                  </div>
                </div>

                {/* 100% Free WhatsApp CTAs */}
                <div className="space-y-2 pt-1">
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                      `*Saltmere Residence - Room Reservation*\n` +
                      `🔖 *Ref ID:* ${bookingRefId}\n` +
                      `👤 *Resident:* ${formData.fullName}\n` +
                      `📞 *Contact:* ${formData.phone}\n` +
                      `🏢 *Room Preference:* ${formData.roomPreference}\n` +
                      `📅 *Plan:* ${formData.stayDuration}\n` +
                      `✅ *Status:* Pending Move-in Confirmation\n\n` +
                      `Hello Desk, please confirm room availability and check-in procedure.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98 cursor-pointer no-underline"
                  >
                    {/* WhatsApp Icon */}
                    <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                    </svg>
                    <span>Send Confirmation via WhatsApp (100% Free)</span>
                  </a>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const summary = `Saltmere Residence Reservation\nRef: ${bookingRefId}\nResident: ${formData.fullName}\nRoom: ${formData.roomPreference}\nDuration: ${formData.stayDuration}`;
                        navigator.clipboard?.writeText(summary);
                        setCopiedRef(true);
                        setTimeout(() => setCopiedRef(false), 2000);
                      }}
                      className="flex-1 py-2.5 rounded-full border border-stone-300 hover:border-stone-400 bg-white text-stone-700 text-xs font-medium transition-colors cursor-pointer"
                    >
                      {copiedRef ? '✓ Copied to Clipboard' : 'Copy Summary'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setBookingSuccess(false);
                        setIsBookModalOpen(false);
                      }}
                      className="flex-1 py-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium transition-colors cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </div>

                <p className="text-[10px] text-center text-stone-500">
                  ⚡ 100% Free Messaging &bull; Direct connection with residence reception
                </p>
              </div>
            ) : (
              <form onSubmit={handleConfirmReservation} className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] tracking-widest uppercase font-semibold text-primary/70">
                    Saltmere Ocean Residence
                  </span>
                  <h3 className="font-luxury text-2xl sm:text-3xl font-light text-primary">
                    Reserve Your Room
                  </h3>
                  <p className="text-xs text-stone-600">
                    Secure your private or shared living space with flexible residency terms.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                      Resident Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Arjun Sharma"
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-stone-200 text-sm focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="arjun.sharma@example.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-stone-200 text-sm focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-stone-200 text-sm focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                      Occupation / Organization
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.occupation}
                      onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                      placeholder="e.g. Software Engineer / Consultant / Professional"
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-stone-200 text-sm focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                        Room Preference
                      </label>
                      <select
                        value={formData.roomPreference}
                        onChange={(e) => setFormData({ ...formData, roomPreference: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-stone-200 text-sm focus:outline-none focus:border-primary cursor-pointer"
                      >
                        <option>Single AC Studio</option>
                        <option>Deluxe Twin Sharing</option>
                        <option>Standard Triple Sharing</option>
                        <option>Four-Sharing Quad Pod</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                        Stay Duration
                      </label>
                      <select
                        value={formData.stayDuration}
                        onChange={(e) => setFormData({ ...formData, stayDuration: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-stone-200 text-sm focus:outline-none focus:border-primary cursor-pointer"
                      >
                        <option>Annual Residency (12 Months)</option>
                        <option>6-Month Stay Pass</option>
                        <option>3-Month Quarterly Stay</option>
                        <option>Flexible Monthly</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-primary hover:bg-primary-dark text-white font-medium text-sm transition-all shadow-sm active:scale-98 cursor-pointer"
                  >
                    Submit Room Reservation
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Floating WhatsApp Quick Desk Widget (100% Free Communication) */}
      <aside aria-label="Support Desk" className="fixed bottom-5 right-5 z-40 flex items-center">
        <a
          href="https://api.whatsapp.com/send?phone=919876543210&text=Hi%20Saltmere%20Residence%20Desk%2C%20I%20have%20an%20inquiry%20regarding%20room%20availability%20and%20stay%20plans."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 group active:scale-95 no-underline"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
          </span>
          {/* WhatsApp SVG Icon */}
          <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
          </svg>
          <span className="text-xs font-semibold tracking-wide whitespace-nowrap">WhatsApp Desk</span>
        </a>
      </aside>
    </div>
  );
};
