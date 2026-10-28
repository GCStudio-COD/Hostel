'use client';

import React from 'react';
import { KeyRound, Wrench, CreditCard, Wifi, Check } from 'lucide-react';
import { useStudent } from './StudentContext';

export function StudentHero() {
  const {
    setIsGatePassModalOpen,
    setIsServiceModalOpen,
    setIsPayModalOpen,
    copiedWifi,
    handleCopyWifi,
  } = useStudent();

  return (
    <div className="bg-card rounded-[24px] sm:rounded-[36px] border border-card-border p-4 sm:p-8 md:p-10 shadow-xs relative overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 relative z-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase text-primary/70">
              Resident ID: HST-2026-0842 · Room 204
            </p>
          </div>
          <h1 className="font-luxury font-normal text-2xl sm:text-4xl md:text-[2.6rem] text-primary tracking-tight leading-tight">
            Welcome home, <span className="italic font-normal">Marcus</span>
          </h1>
          <p className="text-xs sm:text-sm text-primary/75 max-w-xl">
            North Shore Pavilion · 2nd Floor · Deluxe AC (Bed B). All dues settled, next curfew inspection at 22:00.
          </p>
        </div>

        {/* Desktop Quick Action Pill Buttons */}
        <div className="hidden sm:flex flex-wrap items-center gap-2.5 sm:gap-3 shrink-0">
          <button
            onClick={() => setIsGatePassModalOpen(true)}
            className="px-4 sm:px-5 py-2.5 rounded-full bg-primary hover:bg-primary-dark text-linen text-xs font-medium tracking-wide transition-all shadow-xs active:scale-95 cursor-pointer"
          >
            + Request Out-Pass
          </button>
          <button
            onClick={() => setIsServiceModalOpen(true)}
            className="px-4 sm:px-5 py-2.5 rounded-full bg-white hover:bg-stone-50 text-primary border border-primary/20 text-xs font-medium tracking-wide transition-all active:scale-95 cursor-pointer"
          >
            Log Maintenance
          </button>
        </div>
      </div>

      {/* Mobile Native Quick Actions App Bar (Visible on mobile only) */}
      <div className="mt-3.5 pt-3 border-t border-primary/10 sm:hidden">
        <div className="grid grid-cols-4 gap-2 text-center">
          <button
            onClick={() => setIsGatePassModalOpen(true)}
            className="flex flex-col items-center justify-center p-2 rounded-2xl bg-white border border-card-border shadow-2xs active:scale-95 transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-1 group-active:bg-primary group-active:text-white transition-colors">
              <KeyRound className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-semibold text-primary leading-tight">Out-Pass</span>
          </button>

          <button
            onClick={() => setIsServiceModalOpen(true)}
            className="flex flex-col items-center justify-center p-2 rounded-2xl bg-white border border-card-border shadow-2xs active:scale-95 transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-1 group-active:bg-primary group-active:text-white transition-colors">
              <Wrench className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-semibold text-primary leading-tight">Repair</span>
          </button>

          <button
            onClick={() => setIsPayModalOpen(true)}
            className="flex flex-col items-center justify-center p-2 rounded-2xl bg-white border border-card-border shadow-2xs active:scale-95 transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-1 group-active:bg-primary group-active:text-white transition-colors">
              <CreditCard className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-semibold text-primary leading-tight">Pay Dues</span>
          </button>

          <button
            onClick={handleCopyWifi}
            className="flex flex-col items-center justify-center p-2 rounded-2xl bg-white border border-card-border shadow-2xs active:scale-95 transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-1 group-active:bg-primary group-active:text-white transition-colors">
              {copiedWifi ? <Check className="w-4 h-4 text-emerald-600" /> : <Wifi className="w-4 h-4" />}
            </div>
            <span className="text-[10px] font-semibold text-primary leading-tight">
              {copiedWifi ? 'Copied!' : 'Wi-Fi'}
            </span>
          </button>
        </div>
      </div>

      {/* Decorative Subtle Radial Glow */}
      <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-sand/15 blur-3xl pointer-events-none" />
    </div>
  );
}
