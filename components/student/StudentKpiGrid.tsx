'use client';

import React from 'react';
import { Home, CreditCard, Calendar, Wrench } from 'lucide-react';
import { useStudent } from './StudentContext';

export function StudentKpiGrid() {
  const { setActiveTab } = useStudent();

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-5">
      {/* Card 1: My Room */}
      <div
        onClick={() => setActiveTab('room')}
        className="bg-card hover:bg-white rounded-[20px] sm:rounded-[24px] border border-card-border p-3.5 sm:p-6 transition-all duration-200 active:scale-97 hover:-translate-y-0.5 hover:shadow-xs cursor-pointer group"
      >
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-primary/60 truncate">
            My Space
          </span>
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-200 shrink-0">
            <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary group-hover:text-white transition-colors" />
          </div>
        </div>
        <h3 className="font-luxury text-xl sm:text-2xl text-primary font-normal leading-tight">
          Room 204
        </h3>
        <p className="text-[11px] sm:text-xs text-primary/70 mt-0.5 sm:mt-1 truncate">Bed B · Deluxe AC</p>
        <div className="mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-primary/10 flex items-center justify-between text-[10px] sm:text-[11px] font-medium text-primary">
          <span className="truncate">Julian B.</span>
          <span className="text-primary/70 group-hover:translate-x-0.5 transition-transform shrink-0">View →</span>
        </div>
      </div>

      {/* Card 2: Fee Status */}
      <div
        onClick={() => setActiveTab('fees')}
        className="bg-card hover:bg-white rounded-[20px] sm:rounded-[24px] border border-card-border p-3.5 sm:p-6 transition-all duration-200 active:scale-97 hover:-translate-y-0.5 hover:shadow-xs cursor-pointer group"
      >
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-primary/60 truncate">
            Dues &amp; Rent
          </span>
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-800 group-hover:bg-emerald-700 group-hover:text-white transition-all duration-200 shrink-0">
            <CreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-800 group-hover:text-white transition-colors" />
          </div>
        </div>
        <h3 className="font-luxury text-xl sm:text-2xl text-emerald-800 font-normal leading-tight">
          <span className="font-sans font-medium mr-0.5">₹</span>0 Pending
        </h3>
        <p className="text-[11px] sm:text-xs text-primary/70 mt-0.5 sm:mt-1 truncate">
          Due Nov 05: <span className="font-sans font-medium">₹8,500</span>
        </p>
        <div className="mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-primary/10 flex items-center justify-between text-[10px] sm:text-[11px] font-medium text-primary">
          <span className="truncate text-emerald-700 font-semibold">Settled</span>
          <span className="text-primary/70 group-hover:translate-x-0.5 transition-transform shrink-0">Pay →</span>
        </div>
      </div>

      {/* Card 3: Biometric Attendance */}
      <div
        onClick={() => setActiveTab('attendance')}
        className="bg-card hover:bg-white rounded-[20px] sm:rounded-[24px] border border-card-border p-3.5 sm:p-6 transition-all duration-200 active:scale-97 hover:-translate-y-0.5 hover:shadow-xs cursor-pointer group"
      >
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-primary/60 truncate">
            Attendance
          </span>
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-200 shrink-0">
            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary group-hover:text-white transition-colors" />
          </div>
        </div>
        <h3 className="font-luxury text-xl sm:text-2xl text-primary font-normal leading-tight">
          94.6%
        </h3>
        <p className="text-[11px] sm:text-xs text-primary/70 mt-0.5 sm:mt-1 truncate">26/28 Days Present</p>
        <div className="mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-primary/10 flex items-center justify-between text-[10px] sm:text-[11px] font-medium text-primary">
          <span className="truncate">2 Leaves Taken</span>
          <span className="text-primary/70 group-hover:translate-x-0.5 transition-transform shrink-0">Log →</span>
        </div>
      </div>

      {/* Card 4: Maintenance Tickets */}
      <div
        onClick={() => setActiveTab('maintenance')}
        className="bg-card hover:bg-white rounded-[20px] sm:rounded-[24px] border border-card-border p-3.5 sm:p-6 transition-all duration-200 active:scale-97 hover:-translate-y-0.5 hover:shadow-xs cursor-pointer group"
      >
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-primary/60 truncate">
            Tickets
          </span>
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-200 shrink-0">
            <Wrench className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary group-hover:text-white transition-colors" />
          </div>
        </div>
        <h3 className="font-luxury text-xl sm:text-2xl text-primary font-normal leading-tight">
          0 Active
        </h3>
        <p className="text-[11px] sm:text-xs text-primary/70 mt-0.5 sm:mt-1 truncate">AC Filter Resolved</p>
        <div className="mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-primary/10 flex items-center justify-between text-[10px] sm:text-[11px] font-medium text-primary">
          <span className="truncate">All Clear</span>
          <span className="text-primary/70 group-hover:translate-x-0.5 transition-transform shrink-0">List →</span>
        </div>
      </div>
    </div>
  );
}
