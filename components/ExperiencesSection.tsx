'use client';

import React from 'react';

export const ExperiencesSection: React.FC = () => {
  return (
    <section id="experiences" className="w-full bg-linen text-primary py-14 sm:py-18 md:py-22 lg:py-24 xl:py-28 transition-colors duration-200">
      <div className="container">
        {/* ================= SECTION HEADER ================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10 md:mb-14">
          {/* Left: Eyebrow & Luxury Title */}
          <div>
            <p className="text-[10px] sm:text-[11px] md:text-xs font-semibold tracking-[0.24em] sm:tracking-[0.28em] uppercase text-primary/70 mb-2 sm:mb-3 select-none">
              Resident Life &amp; Amenities
            </p>
            <h2 className="font-luxury font-normal text-primary text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[3.8rem] leading-[1.08] tracking-[-0.015em]">
              Designed for <span className="italic font-normal">productivity</span>,<br />
              wellness, and community.
            </h2>
          </div>

          {/* Right: Subtitle description */}
          <div className="max-w-sm">
            <p className="text-xs sm:text-[13px] md:text-sm text-primary/75 font-normal leading-relaxed">
              Acoustic focus pods for remote work and deep thinking, recreation arenas for weekend relaxation, and multi-tier biometric security.
            </p>
          </div>
        </div>

        {/* ================= BENTO VISUAL GALLERY ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          {/* Left Column: Featured Work Pods Card (Full Height) */}
          <div className="lg:col-span-7 flex">
            <div className="group relative w-full rounded-[28px] sm:rounded-[34px] md:rounded-[38px] overflow-hidden bg-stone-200 min-h-[420px] sm:min-h-[500px] lg:min-h-[540px] flex flex-col justify-end cursor-pointer select-none shadow-xs">
              {/* Background Image */}
              <img
                src="/images/capsule-study.jpg"
                alt="24/7 Silent Work Pods at Saltmere Residence"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
              />

              {/* Gentle gradient overlay for high contrast text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />

              {/* Card Content Overlay */}
              <div className="relative z-10 p-6 sm:p-8 md:p-10 text-white">
                {/* Translucent Pill Badge */}
                <span className="bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase text-white inline-block mb-2.5 border border-white/30 select-none">
                  Focus &amp; Work
                </span>

                {/* Title */}
                <h3 className="font-luxury font-normal text-2xl sm:text-3xl md:text-4xl text-white tracking-tight mb-2 leading-tight">
                  24/7 Silent Work Pods &amp; Library
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-[13px] md:text-sm text-white/85 max-w-md leading-relaxed font-normal">
                  Acoustically isolated focus pods equipped with gigabit fiber internet, ergonomic Herman Miller seating, and individual charging docks for deep work.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Two Stacked Cards */}
          <div className="lg:col-span-5 flex flex-col gap-5 sm:gap-6">
            {/* Top Card: Residents Lounge & Recreation */}
            <div className="group relative w-full flex-1 rounded-[24px] sm:rounded-[30px] overflow-hidden bg-stone-200 min-h-[220px] sm:min-h-[240px] flex flex-col justify-end cursor-pointer select-none shadow-xs aspect-[16/10] sm:aspect-[16/9.5]">
              {/* Background Image */}
              <img
                src="/images/hostel-lounge.jpg"
                alt="Residents Lounge and Indoor Games"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />

              {/* Content Overlay */}
              <div className="relative z-10 p-5 sm:p-6 md:p-7 text-white">
                <span className="bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase text-white inline-block mb-1.5 border border-white/30 select-none">
                  Community
                </span>
                <h3 className="font-luxury font-normal text-xl sm:text-2xl md:text-[1.65rem] text-white tracking-tight leading-tight">
                  Residents Lounge &amp; Gaming Arena
                </h3>
              </div>
            </div>

            {/* Bottom Card: Biometric Security & Modern Facilities */}
            <div className="group relative w-full flex-1 rounded-[24px] sm:rounded-[30px] overflow-hidden bg-stone-200 min-h-[220px] sm:min-h-[240px] flex flex-col justify-end cursor-pointer select-none shadow-xs aspect-[16/10] sm:aspect-[16/9.5]">
              {/* Background Image */}
              <img
                src="/images/capsule-2.jpg"
                alt="Biometric Security and Modern Residence Living"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />

              {/* Content Overlay */}
              <div className="relative z-10 p-5 sm:p-6 md:p-7 text-white">
                <span className="bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase text-white inline-block mb-1.5 border border-white/30 select-none">
                  Safety &amp; Utility
                </span>
                <h3 className="font-luxury font-normal text-xl sm:text-2xl md:text-[1.65rem] text-white tracking-tight leading-tight">
                  Biometric Access &amp; Power Backup
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
