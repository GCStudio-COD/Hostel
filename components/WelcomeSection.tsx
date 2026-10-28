'use client';

import React from 'react';

export const WelcomeSection: React.FC = () => {
  return (
    <section className="w-full bg-linen text-primary py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32 transition-colors duration-200">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 xl:gap-24 items-start">
          {/* ================= LEFT COLUMN: WELCOME HEADLINE ================= */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            {/* Eyebrow Label */}
            <p className="text-[10px] sm:text-[11px] md:text-xs font-semibold tracking-[0.22em] sm:tracking-[0.26em] uppercase text-primary/70 select-none">
              About the Residence
            </p>

            {/* Editorial Serif Headline */}
            <h2 className="font-luxury font-normal text-primary text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.65rem] leading-[1.14] sm:leading-[1.12] tracking-[-0.015em] max-w-2xl">
              Over 350 modern furnished beds, quiet co-working pods, and{' '}
              <span className="italic font-normal">a thriving resident community.</span>
            </h2>
          </div>

          {/* ================= RIGHT COLUMN: BODY & STATS LIST ================= */}
          <div className="lg:col-span-5 space-y-8 sm:space-y-10 lg:pt-8">
            {/* Descriptive Body Paragraph */}
            <p className="text-sm sm:text-[15px] md:text-base text-primary/80 leading-relaxed max-w-lg font-normal">
              Saltmere Residence is purpose-built for working professionals, remote creators, and long-term residents.
              We take care of every essential so you can live, work, and connect effortlessly: ergonomic workstations,
              high-speed mesh Wi-Fi, chef-prepared 4-meal daily dining, 24/7 backup power, and biometric facial access.
            </p>

            {/* Editorial Stats Table / List */}
            <div className="border-t border-primary/15">
              {/* Stat Row 1 */}
              <div className="flex items-center gap-6 sm:gap-8 py-3.5 sm:py-4 border-b border-primary/15 group">
                <span className="font-luxury text-3xl sm:text-4xl font-normal text-primary w-20 sm:w-24 shrink-0 select-none">
                  350+
                </span>
                <span className="text-xs sm:text-sm text-primary/80 font-normal tracking-wide">
                  furnished beds across 3 wings
                </span>
              </div>

              {/* Stat Row 2 */}
              <div className="flex items-center gap-6 sm:gap-8 py-3.5 sm:py-4 border-b border-primary/15 group">
                <span className="font-luxury text-3xl sm:text-4xl font-normal text-primary w-20 sm:w-24 shrink-0 select-none">
                  1 Gbps
                </span>
                <span className="text-xs sm:text-sm text-primary/80 font-normal tracking-wide">
                  Wi-Fi 6 mesh &amp; quiet work pods
                </span>
              </div>

              {/* Stat Row 3 */}
              <div className="flex items-center gap-6 sm:gap-8 py-3.5 sm:py-4 border-b border-primary/15 group">
                <span className="font-luxury text-3xl sm:text-4xl font-normal text-primary w-20 sm:w-24 shrink-0 select-none">
                  4 Meals
                </span>
                <span className="text-xs sm:text-sm text-primary/80 font-normal tracking-wide">
                  daily nutritious dining &amp; mess
                </span>
              </div>

              {/* Stat Row 4 */}
              <div className="flex items-center gap-6 sm:gap-8 py-3.5 sm:py-4 border-b border-primary/15 group">
                <span className="font-luxury text-3xl sm:text-4xl font-normal text-primary w-20 sm:w-24 shrink-0 select-none">
                  24/7
                </span>
                <span className="text-xs sm:text-sm text-primary/80 font-normal tracking-wide">
                  biometric security &amp; power backup
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
