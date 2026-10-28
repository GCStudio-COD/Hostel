'use client';

import React, { useState } from 'react';
import { X, Check, Utensils, ShieldCheck, Clock } from 'lucide-react';

export const DiningSection: React.FC = () => {
  // Modal states
  const [isMealInquiryOpen, setIsMealInquiryOpen] = useState(false);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [inquirySuccess, setInquirySuccess] = useState(false);

  // Form states for meal plan subscription
  const [dietaryType, setDietaryType] = useState<'Vegetarian' | 'Non-Veg' | 'Jain'>('Vegetarian');
  const [mealPlan, setMealPlan] = useState<'Full 4-Meal Plan' | 'Lunch & Dinner' | 'Custom Pack'>('Full 4-Meal Plan');

  const handleMealInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySuccess(true);
    setTimeout(() => {
      setInquirySuccess(false);
      setIsMealInquiryOpen(false);
    }, 2200);
  };

  return (
    <section
      id="dine"
      className="w-full bg-primary text-linen py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32 transition-colors duration-200"
    >
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-14 xl:gap-20 items-center">
          {/* ================= LEFT COLUMN: CAMPUS MESS IMAGE ================= */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="group relative w-full max-w-[620px] lg:max-w-none rounded-[28px] sm:rounded-[34px] md:rounded-[40px] overflow-hidden bg-primary-dark shadow-2xl aspect-[4/4.3] sm:aspect-[4/3.8] lg:aspect-[4/4.2] select-none">
              {/* Photo */}
              <img
                src="/images/capsule-mess.jpg"
                alt="Saltmere Residence Dining Hall and Kitchen"
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
              />

              {/* Quality Certification Badge */}
              <div className="absolute bottom-5 left-5 bg-stone-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 flex items-center gap-2 text-white text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>FSSAI Certified Kitchen</span>
              </div>

              {/* Subtle inner highlight rim */}
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[inherit] pointer-events-none" />
            </div>
          </div>

          {/* ================= RIGHT COLUMN: EDITORIAL DETAILS ================= */}
          <div className="lg:col-span-6 flex flex-col justify-center max-w-xl">
            {/* Eyebrow Label */}
            <p className="text-[10px] sm:text-[11px] md:text-xs font-semibold tracking-[0.28em] uppercase text-gold mb-3 sm:mb-4 select-none">
              Dining &amp; Nutrition
            </p>

            {/* Headline matching typography */}
            <h2 className="font-luxury font-normal text-linen text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.65rem] leading-[1.12] tracking-[-0.015em] mb-4 sm:mb-6">
              Nutritious, home-style meals <br className="hidden sm:inline" />
              served fresh <span className="italic font-normal">four times daily.</span>
            </h2>

            {/* Subtitle / Description */}
            <p className="text-xs sm:text-[13px] md:text-sm text-linen/75 font-normal leading-relaxed mb-8 sm:mb-10 max-w-lg">
              Our high-capacity dining hall serves balanced home-style meals with dedicated vegetarian, Jain, and non-vegetarian counters. Weekly menus are calibrated by certified nutritionists to support health and sustained energy.
            </p>

            {/* Service Hours Schedule Table */}
            <div className="border-t border-white/15">
              {/* Row 1: Breakfast */}
              <div className="flex items-center justify-between py-3.5 sm:py-4 border-b border-white/15">
                <div>
                  <span className="text-xs sm:text-sm md:text-[15px] font-normal text-linen block">
                    Breakfast
                  </span>
                  <span className="text-[11px] text-linen/60">
                    Hot South &amp; North Indian spreads, eggs, fresh milk, fruit
                  </span>
                </div>
                <span className="text-xs sm:text-[13px] md:text-sm font-normal text-linen/80 tracking-wide tabular-nums shrink-0 ml-4">
                  07:30 – 09:30
                </span>
              </div>

              {/* Row 2: Lunch */}
              <div className="flex items-center justify-between py-3.5 sm:py-4 border-b border-white/15">
                <div>
                  <span className="text-xs sm:text-sm md:text-[15px] font-normal text-linen block">
                    Lunch
                  </span>
                  <span className="text-[11px] text-linen/60">
                    Dal, seasonal veggies, paneer/chicken, rice, rotis &amp; salad
                  </span>
                </div>
                <span className="text-xs sm:text-[13px] md:text-sm font-normal text-linen/80 tracking-wide tabular-nums shrink-0 ml-4">
                  12:30 – 14:30
                </span>
              </div>

              {/* Row 3: Evening Snacks */}
              <div className="flex items-center justify-between py-3.5 sm:py-4 border-b border-white/15">
                <div>
                  <span className="text-xs sm:text-sm md:text-[15px] font-normal text-linen block">
                    High Tea &amp; Snacks
                  </span>
                  <span className="text-[11px] text-linen/60">
                    Masala chai, filter coffee, baked &amp; roasted snacks
                  </span>
                </div>
                <span className="text-xs sm:text-[13px] md:text-sm font-normal text-linen/80 tracking-wide tabular-nums shrink-0 ml-4">
                  17:00 – 18:30
                </span>
              </div>

              {/* Row 4: Dinner */}
              <div className="flex items-center justify-between py-3.5 sm:py-4 border-b border-white/15">
                <div>
                  <span className="text-xs sm:text-sm md:text-[15px] font-normal text-linen block">
                    Dinner
                  </span>
                  <span className="text-[11px] text-linen/60">
                    Wholesome warm dinner with weekend sweet feasts
                  </span>
                </div>
                <span className="text-xs sm:text-[13px] md:text-sm font-normal text-linen/80 tracking-wide tabular-nums shrink-0 ml-4">
                  20:00 – 22:00
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-3.5 sm:gap-4">
              <button
                type="button"
                onClick={() => setIsMenuModalOpen(true)}
                className="px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-sand hover:bg-sand-hover text-primary font-medium text-xs sm:text-sm tracking-wide transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                View Weekly Dining Menu
              </button>

              <button
                type="button"
                onClick={() => setIsMealInquiryOpen(true)}
                className="px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-transparent hover:bg-white/5 text-linen border border-white/25 hover:border-white/45 font-medium text-xs sm:text-sm tracking-wide transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                Meal Plan Inquiry
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: MEAL PLAN INQUIRY                                                */}
      {/* ========================================================================= */}
      {isMealInquiryOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
          onClick={() => setIsMealInquiryOpen(false)}
        >
          <div
            className="relative w-full max-w-lg bg-card text-primary rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 md:p-9 shadow-2xl border border-primary/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsMealInquiryOpen(false)}
              className="absolute top-5 right-5 sm:top-6 sm:right-6 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-primary transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>

            {inquirySuccess ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-full mx-auto flex items-center justify-center shadow-md">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-luxury text-2xl sm:text-3xl font-normal text-primary">
                  Meal Inquiry Received
                </h3>
                <p className="text-xs sm:text-sm text-primary/75 max-w-xs mx-auto leading-relaxed">
                  Thank you! Our dining manager will confirm your {mealPlan} ({dietaryType}) on your resident profile.
                </p>
                <div className="pt-2">
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                      `*Saltmere Residence - Meal Plan Subscription*\n` +
                      `🍽️ *Plan:* ${mealPlan}\n` +
                      `🥗 *Dietary Counter:* ${dietaryType}\n` +
                      `✅ *Status:* Inquiry Submitted\n\n` +
                      `Hello Dining Manager, please confirm my meal tokens and dietary allocation.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98 cursor-pointer no-underline"
                  >
                    <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                    </svg>
                    <span>Send to Dining Manager via WhatsApp (100% Free)</span>
                  </a>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <span className="text-[10px] uppercase tracking-widest text-primary/60 font-semibold block mb-1">
                    Saltmere Residence Dining
                  </span>
                  <h3 className="font-luxury text-2xl sm:text-3xl font-normal text-primary">
                    Meal Plan &amp; Dietary Preferences
                  </h3>
                  <p className="text-xs text-primary/70 mt-1">
                    Select your nutritional plan or custom guest meal tokens.
                  </p>
                </div>

                <form onSubmit={handleMealInquirySubmit} className="space-y-4">
                  {/* Dietary Preference */}
                  <div>
                    <label className="block text-[11px] font-medium uppercase tracking-wider text-primary/70 mb-1.5">
                      Dietary Counter
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['Vegetarian', 'Non-Veg', 'Jain'] as const).map((d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => setDietaryType(d)}
                          className={`py-2 px-2 text-xs rounded-xl font-medium transition-all cursor-pointer ${
                            dietaryType === d
                              ? 'bg-primary text-linen shadow-xs'
                              : 'bg-white border border-primary/15 text-primary hover:bg-stone-50'
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Meal Plan Type */}
                  <div>
                    <label className="block text-[11px] font-medium uppercase tracking-wider text-primary/70 mb-1">
                      Subscription Plan
                    </label>
                    <select
                      value={mealPlan}
                      onChange={(e) => setMealPlan(e.target.value as any)}
                      className="w-full bg-white border border-primary/20 rounded-xl px-3 py-2 text-xs text-primary focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                    >
                      <option>Full 4-Meal Plan (Breakfast, Lunch, Snacks, Dinner)</option>
                      <option>Lunch &amp; Dinner Plan</option>
                      <option>Custom Monthly Meal Tokens Pack</option>
                    </select>
                  </div>

                  {/* Name & Room */}
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div>
                      <input
                        type="text"
                        placeholder="Resident Name"
                        required
                        className="w-full bg-white border border-primary/20 rounded-xl px-3 py-2 text-xs text-primary placeholder:text-primary/40 focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Room Number"
                        required
                        className="w-full bg-white border border-primary/20 rounded-xl px-3 py-2 text-xs text-primary placeholder:text-primary/40 focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>

                  {/* Contact Email */}
                  <div>
                    <input
                      type="email"
                      placeholder="Resident Email address"
                      required
                      className="w-full bg-white border border-primary/20 rounded-xl px-3 py-2 text-xs text-primary placeholder:text-primary/40 focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3 mt-2 rounded-full bg-primary hover:bg-primary-dark text-linen font-medium text-xs sm:text-sm tracking-wide transition-all shadow-md active:scale-[0.98] cursor-pointer"
                  >
                    Confirm Dining Subscription
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: WEEKLY DINING MENU                                               */}
      {/* ========================================================================= */}
      {isMenuModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
          onClick={() => setIsMenuModalOpen(false)}
        >
          <div
            className="relative w-full max-w-2xl bg-card text-primary rounded-[28px] sm:rounded-[36px] p-6 sm:p-8 md:p-10 shadow-2xl border border-primary/10 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsMenuModalOpen(false)}
              className="absolute top-5 right-5 sm:top-6 sm:right-6 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-primary transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Menu Header */}
            <div className="text-center pb-6 border-b border-primary/15">
              <span className="text-[10px] uppercase tracking-[0.25em] text-primary/60 font-semibold block mb-1">
                Saltmere Residence Dining
              </span>
              <h3 className="font-luxury text-3xl sm:text-4xl font-normal text-primary">
                Weekly Dining Schedule
              </h3>
              <p className="text-xs text-primary/70 mt-1.5 italic font-luxury text-sm">
                FSSAI-certified kitchen &bull; Hygienic steam preparation &bull; Fresh seasonal produce
              </p>
            </div>

            {/* Meal Breakdowns */}
            <div className="py-6 space-y-6">
              {/* Meal 1 */}
              <div className="bg-linen/60 rounded-2xl p-4 sm:p-5 border border-primary/10 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-wider text-primary font-bold">
                    Breakfast (07:30 – 09:30 AM)
                  </span>
                  <span className="text-[11px] text-primary/60 font-medium">Daily</span>
                </div>
                <h4 className="font-luxury text-lg text-primary">
                  Idli-Vada Sambar, Aloo Paratha, Masala Poha, Boiled Eggs &amp; Bananas
                </h4>
                <p className="text-xs text-primary/70">
                  Served with fresh filter coffee, masala tea, and warm milk.
                </p>
              </div>

              {/* Meal 2 */}
              <div className="bg-linen/60 rounded-2xl p-4 sm:p-5 border border-primary/10 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-wider text-primary font-bold">
                    Lunch (12:30 – 02:30 PM)
                  </span>
                  <span className="text-[11px] text-primary/60 font-medium">Daily</span>
                </div>
                <h4 className="font-luxury text-lg text-primary">
                  Paneer Butter Masala / Chicken Curry, Dal Tadka, Jeera Rice, Phulkas &amp; Salad
                </h4>
                <p className="text-xs text-primary/70">
                  Accompanied by curd, roasted papad, and fresh mint chutney.
                </p>
              </div>

              {/* Meal 3 */}
              <div className="bg-linen/60 rounded-2xl p-4 sm:p-5 border border-primary/10 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-wider text-primary font-bold">
                    Evening High Tea (05:00 – 06:30 PM)
                  </span>
                  <span className="text-[11px] text-primary/60 font-medium">Daily</span>
                </div>
                <h4 className="font-luxury text-lg text-primary">
                  Crispy Veg Samosas, Corn Chat, Sandwiches, Biscuits &amp; Masala Chai
                </h4>
                <p className="text-xs text-primary/70">
                  Fresh brew stations open during evening study break hours.
                </p>
              </div>

              {/* Meal 4 */}
              <div className="bg-linen/60 rounded-2xl p-4 sm:p-5 border border-primary/10 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-wider text-primary font-bold">
                    Dinner (08:00 – 10:00 PM)
                  </span>
                  <span className="text-[11px] text-primary/60 font-medium">Daily</span>
                </div>
                <h4 className="font-luxury text-lg text-primary">
                  Homestyle Rajma / Egg Curry, Seasonal Veggies, Steam Rice, Chapatis &amp; Dessert
                </h4>
                <p className="text-xs text-primary/70">
                  Special weekend dinner features Gulab Jamun, Kheer, or Ice Cream.
                </p>
              </div>
            </div>

            {/* Menu Footer */}
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsMenuModalOpen(false);
                  setIsMealInquiryOpen(true);
                }}
                className="px-6 py-2.5 rounded-full bg-primary text-linen text-xs font-medium hover:bg-primary-dark transition-all cursor-pointer"
              >
                Inquire Mess Subscription
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
