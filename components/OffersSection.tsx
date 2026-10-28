'use client';

import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { api } from '../lib/api';

interface OfferItem {
  id: string;
  tag: string;
  title: string;
  description: string;
  highlight: string;
  price: string;
  inclusions: string[];
  validity: string;
}

const OFFERS_DATA: OfferItem[] = [
  {
    id: 'annual-plan',
    tag: 'BEST VALUE',
    title: 'Annual Residency (12 Months)',
    description: 'Guaranteed room retention, storage options, and locked-in monthly rates.',
    highlight: 'Save 15% on Annual Stay',
    price: 'From ₹8,500 / month',
    inclusions: [
      '12 months continuous accommodation with priority floor allotment',
      'Complete 4-meal daily nutritious dining plan (Breakfast, Lunch, Snacks, Dinner)',
      'High-speed 1 Gbps Wi-Fi 6 across rooms and co-working areas',
      'Bi-weekly room housekeeping & free laundry credit (40 pieces/month)',
      '24/7 generator power backup, RO water, and biometric security',
    ],
    validity: 'Year-round check-in availability',
  },
  {
    id: 'six-month-pass',
    tag: 'POPULAR',
    title: '6-Month Residency Pass',
    description: 'Ideal for working professionals, corporate consultants, and remote project stays.',
    highlight: 'Flexible Renewal',
    price: 'From ₹9,800 / month',
    inclusions: [
      '6 months fully furnished room accommodation',
      'All utilities included (power quota, water, unlimited Wi-Fi)',
      'Full dining access with vegetarian and non-vegetarian counters',
      'Unlimited access to 24/7 silent work pods & fitness center',
      'Biometric attendance tracking and resident ERP portal access',
    ],
    validity: 'Available for immediate move-in',
  },
  {
    id: 'quarterly-stay',
    tag: 'SHORT-TERM',
    title: '3-Month Quarterly Stay',
    description: 'Convenient 3-month living arrangement with zero long-term lease commitment.',
    highlight: 'Zero Lock-In',
    price: 'From ₹11,200 / month',
    inclusions: [
      '3 months fully furnished private or shared room',
      'Complimentary welcome linen set and work desk lamp',
      'All utilities and dining plan options included',
      'Priority room extension and renewal options',
      'Full access to co-working pods and resident community events',
    ],
    validity: 'Available year-round with rolling start dates',
  },
];

export const OffersSection: React.FC = () => {
  const [selectedOffer, setSelectedOffer] = useState<OfferItem | null>(null);
  const [isBooked, setIsBooked] = useState(false);
  const [bookingRefId, setBookingRefId] = useState('');
  const [copiedRef, setCopiedRef] = useState(false);
  const [residentForm, setResidentForm] = useState({
    name: '',
    email: '',
    phone: '',
    occupation: 'Working Professional',
  });

  const handleBookOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    const ref = 'SLT-P' + Math.floor(1000 + Math.random() * 9000);
    setBookingRefId(ref);
    setIsBooked(true);

    try {
      await api.createAdmission({
        fullName: residentForm.name,
        email: residentForm.email,
        phone: residentForm.phone,
        collegeOrWork: residentForm.occupation,
        guardianName: 'Self / Contact',
        guardianPhone: residentForm.phone,
        address: 'Direct Plan Booking',
        idProofType: 'National ID / Aadhaar',
        idProofNumber: ref,
        roomTypePreference: 'DELUXE_AC',
        notes: `Plan Reservation: ${selectedOffer?.title} (${selectedOffer?.price}). Profile: ${residentForm.occupation}`,
      });
    } catch (err) {
      console.warn('Backend plan reservation sync skipped, local ticket confirmed:', err);
    }
  };

  return (
    <section
      id="offers"
      className="w-full bg-linen text-primary py-16 sm:py-20 md:py-24 lg:py-28 transition-colors duration-200"
    >
      <div className="container">
        {/* ================= SECTION HEADER ================= */}
        <div className="mb-8 sm:mb-10 md:mb-12">
          {/* Eyebrow Label */}
          <p className="text-[10px] sm:text-[11px] md:text-xs font-semibold tracking-[0.24em] sm:tracking-[0.28em] uppercase text-primary/70 mb-2 sm:mb-3 select-none">
            Residency &amp; Stay Plans
          </p>

          {/* Luxury Editorial Serif Title */}
          <h2 className="font-luxury font-normal text-primary text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[3.8rem] leading-[1.08] tracking-[-0.015em]">
            <span className="italic font-normal">Flexible</span> Residency Plans
          </h2>
        </div>

        {/* ================= 3 OFFERS CARDS GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 items-stretch">
          {OFFERS_DATA.map((offer) => (
            <div
              key={offer.id}
              onClick={() => setSelectedOffer(offer)}
              className="group bg-card hover:bg-white rounded-[26px] sm:rounded-[30px] md:rounded-[34px] border border-card-border hover:border-stone-400/50 p-7 sm:p-8 md:p-9 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer select-none"
            >
              {/* Card Top: Tag & Title & Description */}
              <div>
                {/* Category Tag */}
                <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.24em] uppercase text-primary/70 block mb-3">
                  {offer.tag}
                </span>

                {/* Serif Title */}
                <h3 className="font-luxury font-normal text-primary text-2xl sm:text-[1.75rem] md:text-[1.85rem] leading-[1.18] tracking-tight mb-3 group-hover:text-primary-dark transition-colors">
                  {offer.title}
                </h3>

                {/* Description Body */}
                <p className="text-xs sm:text-[13px] md:text-sm text-primary/75 font-normal leading-relaxed">
                  {offer.description}
                </p>
              </div>

              {/* Card Bottom: Divider line & Pricing / Action Row */}
              <div className="pt-6 sm:pt-7 mt-8 border-t border-primary/10 flex items-center justify-between">
                {/* Left Highlight / Price */}
                <span className="text-xs sm:text-[13px] md:text-sm font-semibold text-primary">
                  {offer.highlight}
                </span>

                {/* Right Action: View plan */}
                <span className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-medium text-primary group-hover:translate-x-0.5 transition-transform">
                  View plan details
                  <span className="text-sm font-normal">→</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE PLAN DETAILS MODAL                                            */}
      {/* ========================================================================= */}
      {selectedOffer && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedOffer(null)}
        >
          <div
            className="relative w-full max-w-lg bg-card text-primary rounded-[28px] sm:rounded-[34px] p-6 sm:p-8 md:p-9 shadow-2xl border border-primary/10 max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedOffer(null)}
              className="absolute top-5 right-5 sm:top-6 sm:right-6 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-primary transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>

            {isBooked && selectedOffer ? (
              <div className="py-6 space-y-4">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-emerald-600 text-white rounded-full mx-auto flex items-center justify-center shadow-md">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="font-luxury text-2xl sm:text-3xl font-normal text-primary">
                    Residency Plan Reserved
                  </h3>
                  <p className="text-xs sm:text-sm text-primary/75 max-w-xs mx-auto leading-relaxed">
                    Thank you, {residentForm.name || 'Resident'}! Your {selectedOffer.title} is registered. Send your ticket via WhatsApp for instant zero-cost confirmation.
                  </p>
                </div>

                {/* Ticket Details */}
                <div className="bg-linen rounded-2xl p-4 border border-primary/10 text-xs text-primary space-y-2 shadow-inner">
                  <div className="flex items-center justify-between border-b border-primary/15 pb-2">
                    <span className="font-semibold text-primary/60 uppercase tracking-wider text-[10px]">Pass Ticket ID</span>
                    <span className="font-bold text-primary font-mono text-sm tracking-wide">{bookingRefId}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div>
                      <span className="text-primary/60 block">Plan:</span>
                      <span className="font-medium text-primary">{selectedOffer.title}</span>
                    </div>
                    <div>
                      <span className="text-primary/60 block">Rate / Term:</span>
                      <span className="font-medium text-primary">{selectedOffer.price}</span>
                    </div>
                    <div>
                      <span className="text-primary/60 block">Resident:</span>
                      <span className="font-medium text-primary">{residentForm.name || 'Resident'}</span>
                    </div>
                    <div>
                      <span className="text-primary/60 block">Contact:</span>
                      <span className="font-medium text-primary">{residentForm.phone || 'N/A'}</span>
                    </div>
                  </div>
                </div>

                {/* 100% Free WhatsApp CTAs */}
                <div className="space-y-2 pt-1">
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                      `*Saltmere Residence - Plan Reservation*\n` +
                      `🔖 *Ticket ID:* ${bookingRefId}\n` +
                      `📋 *Plan:* ${selectedOffer.title} (${selectedOffer.price})\n` +
                      `👤 *Resident:* ${residentForm.name}\n` +
                      `📞 *Contact:* ${residentForm.phone}\n` +
                      `💼 *Profile:* ${residentForm.occupation}\n` +
                      `✅ *Status:* Confirmed Request\n\n` +
                      `Hello Desk, please confirm my residency pass booking.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98 cursor-pointer no-underline"
                  >
                    <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                    </svg>
                    <span>Send Confirmation via WhatsApp (100% Free)</span>
                  </a>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const summary = `Saltmere Residence Plan Booking\nTicket ID: ${bookingRefId}\nPlan: ${selectedOffer.title}\nRate: ${selectedOffer.price}\nResident: ${residentForm.name}`;
                        navigator.clipboard?.writeText(summary);
                        setCopiedRef(true);
                        setTimeout(() => setCopiedRef(false), 2000);
                      }}
                      className="flex-1 py-2.5 rounded-full border border-primary/25 hover:border-primary/50 bg-white text-primary text-xs font-medium transition-colors cursor-pointer"
                    >
                      {copiedRef ? '✓ Copied to Clipboard' : 'Copy Summary'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsBooked(false);
                        setSelectedOffer(null);
                      }}
                      className="flex-1 py-2.5 rounded-full bg-primary/10 hover:bg-primary/20 text-primary text-xs font-medium transition-colors cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </div>

                <p className="text-[10px] text-center text-primary/50">
                  ⚡ 100% Free Messaging &bull; Direct connection with residence reception
                </p>
              </div>
            ) : (
              <div>
                {/* Header */}
                <div className="mb-5 pb-4 border-b border-primary/15">
                  <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-primary/60 block mb-1">
                    {selectedOffer.tag} &bull; {selectedOffer.price}
                  </span>
                  <h3 className="font-luxury text-2xl sm:text-3xl font-normal text-primary">
                    {selectedOffer.title}
                  </h3>
                  <p className="text-xs text-primary/70 mt-1">
                    {selectedOffer.description}
                  </p>
                </div>

                {/* Inclusions */}
                <div className="mb-6 space-y-2">
                  <h4 className="text-[11px] font-semibold uppercase tracking-wider text-primary/70 mb-2">
                    Plan Inclusions &amp; Services
                  </h4>
                  <ul className="space-y-2">
                    {selectedOffer.inclusions.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-primary/80 leading-snug">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Validity Note */}
                <div className="bg-linen rounded-2xl p-3.5 mb-6 text-xs text-primary/75">
                  <span className="font-medium block text-primary mb-0.5">Availability &amp; Term:</span>
                  {selectedOffer.validity}
                </div>

                {/* Booking Form */}
                <form onSubmit={handleBookOffer} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Resident Full Name"
                      required
                      value={residentForm.name}
                      onChange={(e) => setResidentForm({ ...residentForm, name: e.target.value })}
                      className="w-full bg-white border border-primary/20 rounded-xl px-3 py-2 text-xs text-primary placeholder:text-primary/40 focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <input
                      type="email"
                      placeholder="Resident Email Address"
                      required
                      value={residentForm.email}
                      onChange={(e) => setResidentForm({ ...residentForm, email: e.target.value })}
                      className="w-full bg-white border border-primary/20 rounded-xl px-3 py-2 text-xs text-primary placeholder:text-primary/40 focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="tel"
                      placeholder="Contact Number"
                      required
                      value={residentForm.phone}
                      onChange={(e) => setResidentForm({ ...residentForm, phone: e.target.value })}
                      className="w-full bg-white border border-primary/20 rounded-xl px-3 py-2 text-xs text-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <select
                      value={residentForm.occupation}
                      onChange={(e) => setResidentForm({ ...residentForm, occupation: e.target.value })}
                      className="w-full bg-white border border-primary/20 rounded-xl px-3 py-2 text-xs text-primary focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                    >
                      <option>Working Professional</option>
                      <option>Remote Worker / Creator</option>
                      <option>Corporate Consultant</option>
                      <option>Individual Resident</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 mt-3 rounded-full bg-primary hover:bg-primary-dark text-linen font-medium text-xs sm:text-sm tracking-wide transition-all shadow-md active:scale-[0.98] cursor-pointer"
                  >
                    Reserve with {selectedOffer.highlight}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
