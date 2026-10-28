'use client';

import React from 'react';
import { X } from 'lucide-react';
import { useStudent } from '../StudentContext';

export function OutPassModal() {
  const { isGatePassModalOpen, setIsGatePassModalOpen, triggerSuccess } = useStudent();

  if (!isGatePassModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={() => setIsGatePassModalOpen(false)}
    >
      <div
        className="relative w-full max-w-lg bg-card text-primary rounded-t-[32px] sm:rounded-[34px] p-5 sm:p-8 md:p-9 shadow-2xl border-t sm:border border-primary/10 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Drag Handle */}
        <div className="w-12 h-1 bg-primary/20 rounded-full mx-auto mb-3 sm:hidden" />

        <button
          onClick={() => setIsGatePassModalOpen(false)}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-primary transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="mb-5 pb-4 border-b border-primary/15">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-primary/60 block mb-1">
            Security Gate Verification
          </span>
          <h3 className="font-luxury text-2xl text-primary font-normal">
            Apply for Hostel Out-Pass
          </h3>
          <p className="text-xs text-primary/70 mt-1">
            Out-station visits and extended curfew passes require warden authorization.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setIsGatePassModalOpen(false);
            triggerSuccess('Out-pass application submitted to Warden Desk for approval.');
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-primary/70 mb-1">
              Purpose of Leave
            </label>
            <select className="w-full bg-white border border-primary/20 rounded-xl px-3 py-2 text-xs text-primary focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer">
              <option>Home Visit (Weekend)</option>
              <option>Work / Client Project</option>
              <option>Medical Consultation</option>
              <option>Emergency Family Visit</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-primary/70 mb-1">
              Destination Address
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 14 Kensington High St, London"
              className="w-full bg-white border border-primary/20 rounded-xl px-3 py-2 text-xs text-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-primary/70 mb-1">
                Departure Date &amp; Time
              </label>
              <input
                type="datetime-local"
                required
                className="w-full bg-white border border-primary/20 rounded-xl px-3 py-2 text-xs text-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-primary/70 mb-1">
                Expected Return
              </label>
              <input
                type="datetime-local"
                required
                className="w-full bg-white border border-primary/20 rounded-xl px-3 py-2 text-xs text-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="consent"
              required
              className="rounded border-primary/30 text-primary cursor-pointer"
            />
            <label htmlFor="consent" className="text-xs text-primary/80 cursor-pointer">
              I confirm parental acknowledgement for this out-station leave.
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-2 rounded-full bg-primary hover:bg-primary-dark text-white font-medium text-xs sm:text-sm tracking-wide transition-all shadow-md active:scale-98 cursor-pointer"
          >
            Submit Out-Pass Request
          </button>
        </form>
      </div>
    </div>
  );
}
