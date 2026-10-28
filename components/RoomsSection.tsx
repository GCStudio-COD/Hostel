'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';

interface Room {
  id: string;
  name: string;
  specs: string;
  price: string;
  image: string;
}

const ROOMS_DATA: Room[] = [
  {
    id: 'room-1',
    name: 'Single AC Studio',
    specs: 'Private en-suite · Ergonomic work desk · Balcony & AC',
    price: '₹16,500 / mo',
    image: '/images/room-dune.jpg',
  },
  {
    id: 'room-2',
    name: 'Deluxe Twin Sharing',
    specs: 'Twin beds · Dual wardrobes · Attached bath · High-speed Wi-Fi',
    price: '₹11,000 / mo',
    image: '/images/room-harbour.jpg',
  },
  {
    id: 'room-3',
    name: 'Triple Sharing Room',
    specs: 'Spacious layout · 3 private work nooks · Daily housekeeping',
    price: '₹8,500 / mo',
    image: '/images/room-lookout.jpg',
  },
  {
    id: 'room-4',
    name: 'Four-Sharing Quad Pod',
    specs: 'Modern pod setup · Individual charging docks · Biometric lockers',
    price: '₹6,800 / mo',
    image: '/images/room-tide.jpg',
  },
];

export const RoomsSection: React.FC = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section id="stay" className="w-full bg-linen text-primary py-14 sm:py-18 md:py-22 lg:py-24 xl:py-28 transition-colors duration-200">
      <div className="container">
        {/* ================= SECTION HEADER ================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10 md:mb-14">
          {/* Left: Eyebrow & Luxury Title */}
          <div>
            <p className="text-[10px] sm:text-[11px] md:text-xs font-semibold tracking-[0.24em] sm:tracking-[0.28em] uppercase text-primary/70 mb-2 sm:mb-3 select-none">
              Accommodations
            </p>
            <h2 className="font-luxury font-normal text-primary text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[3.8rem] leading-none tracking-[-0.015em]">
              Private &amp; <span className="italic font-normal">Shared Living Spaces</span>
            </h2>
          </div>

          {/* Right: Subtitle & Swiper Arrow Controls */}
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="hidden sm:inline-block text-xs sm:text-[13px] md:text-sm text-primary/70 font-normal">
              Ergonomic workstations, high-speed Wi-Fi &amp; daily housekeeping.
            </span>

            {/* Custom Swiper Arrow Controls */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="w-9 h-9 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-200 cursor-pointer"
                aria-label="Previous room"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => swiperRef.current?.slideNext()}
                className="w-9 h-9 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-200 cursor-pointer"
                aria-label="Next room"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ================= REDESIGNED ROOM CARDS & SWIPER ================= */}
        <div className="relative">
          {!isMounted ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
              {ROOMS_DATA.map((room) => (
                <div key={room.id} className="group flex flex-col h-full cursor-pointer select-none">
                  {/* Clean rounded image without borders */}
                  <div className="relative aspect-[3/4] rounded-[28px] sm:rounded-[32px] overflow-hidden bg-stone-200/50 mb-4 sm:mb-5">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="font-luxury font-normal text-2xl sm:text-[1.65rem] text-primary tracking-tight leading-snug mb-1 sm:mb-1.5">
                    {room.name}
                  </h3>

                  {/* Specs */}
                  <p className="text-[12px] sm:text-[13px] text-muted font-normal mb-4 sm:mb-5">
                    {room.specs}
                  </p>

                  {/* Full-width Divider & Bottom Price/Details */}
                  <div className="w-full pt-3 sm:pt-3.5 border-t border-primary/15 flex items-center justify-between text-xs sm:text-[13px] font-medium text-primary mt-auto">
                    <span>{room.price}</span>
                    <span className="font-normal text-primary flex items-center gap-1.5">
                      Details <span>&rarr;</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Swiper
              modules={[Navigation, A11y]}
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
              }}
              spaceBetween={18}
              slidesPerView={1.15}
              grabCursor={true}
              breakpoints={{
                480: {
                  slidesPerView: 1.35,
                  spaceBetween: 20,
                },
                640: {
                  slidesPerView: 2.15,
                  spaceBetween: 22,
                },
                960: {
                  slidesPerView: 3.1,
                  spaceBetween: 24,
                },
                1280: {
                  slidesPerView: 4,
                  spaceBetween: 26,
                },
              }}
              className="w-full !overflow-visible"
            >
              {ROOMS_DATA.map((room) => (
                <SwiperSlide key={room.id} className="h-auto">
                  <div className="group flex flex-col h-full cursor-pointer select-none">
                    {/* Clean curved image container */}
                    <div className="relative aspect-[3/4] rounded-[28px] sm:rounded-[32px] overflow-hidden bg-stone-200/50 mb-4 sm:mb-5 shadow-xs">
                      <img
                        src={room.image}
                        alt={room.name}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                      />
                    </div>

                    {/* Room Title */}
                    <h3 className="font-luxury font-normal text-2xl sm:text-[1.65rem] text-primary tracking-tight leading-snug mb-1 sm:mb-1.5 group-hover:opacity-85 transition-opacity">
                      {room.name}
                    </h3>

                    {/* Room Specs */}
                    <p className="text-[12px] sm:text-[13px] text-muted font-normal mb-4 sm:mb-5">
                      {room.specs}
                    </p>

                    {/* Full-width Divider & Bottom Price/Details */}
                    <div className="w-full pt-3 sm:pt-3.5 border-t border-primary/15 flex items-center justify-between text-xs sm:text-[13px] font-medium text-primary mt-auto">
                      <span>{room.price}</span>
                      <span className="font-normal text-primary flex items-center gap-1.5 group-hover:opacity-70 transition-opacity">
                        Details <span>&rarr;</span>
                      </span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>

        {/* ================= BOTTOM "ALL ROOMS" ACTION ================= */}
        <div className="mt-12 sm:mt-14 md:mt-16 flex justify-center">
          <a
            href="#stay"
            className="px-6 py-2.5 sm:px-7 sm:py-3 rounded-full border border-primary/60 text-xs sm:text-sm font-medium text-primary hover:bg-primary hover:text-white transition-all duration-200 no-underline whitespace-nowrap cursor-pointer active:scale-95 shadow-xs"
          >
            Explore All Room Options
          </a>
        </div>
      </div>
    </section>
  );
};
