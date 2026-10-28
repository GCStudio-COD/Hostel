'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle2, LogOut } from 'lucide-react';
import { useStudent } from './StudentContext';
import { StudentNotificationCenter } from './StudentNotificationCenter';

export function StudentHeader() {
  const { actionSuccessMessage } = useStudent();

  return (
    <>
      <header className="sticky top-0 z-40 bg-linen/95 backdrop-blur-md border-b border-primary/10 transition-colors">
        <div className="container py-2.5 sm:py-3.5 flex items-center justify-between">
          {/* Left Brand & Portal Tag */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 group select-none no-underline text-primary"
            >
              <div className="w-6 h-6 flex items-center justify-center text-primary group-hover:opacity-75 transition-opacity">
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
              <span className="font-luxury text-lg sm:text-2xl font-medium tracking-tight leading-none">
                Saltmere
              </span>
            </Link>

            <span className="hidden sm:inline-block text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] bg-primary text-linen px-2.5 py-0.5 rounded-full select-none">
              Resident Portal
            </span>
          </div>

          {/* Right Controls: Notifications, User Profile & Sign Out */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Resident Notification Center */}
            <StudentNotificationCenter />

            {/* User Mini Card (Visible on both mobile & desktop) */}
            <div className="flex items-center gap-2 pl-2 border-l border-primary/15">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-primary text-sand font-luxury font-medium flex items-center justify-center text-xs sm:text-sm shadow-xs">
                  MV
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-linen" />
              </div>
              <div className="text-left leading-tight">
                <p className="text-xs font-semibold text-primary truncate max-w-[85px] sm:max-w-none">Marcus</p>
                <p className="text-[10px] text-primary/65">Room 204</p>
              </div>
            </div>

            {/* Logout / Switch Resident link to /login */}
            <Link
              href="/login"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  localStorage.removeItem('saltmere_auth_token');
                }
              }}
              title="Sign out of Resident Portal"
              className="p-1.5 sm:p-2 rounded-full hover:bg-stone-200/70 text-primary/70 hover:text-rose-700 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Global Action Success Toast */}
      {actionSuccessMessage && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 bg-primary text-linen px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-sand/30 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-sand shrink-0" />
          <span className="text-xs sm:text-sm font-medium">{actionSuccessMessage}</span>
        </div>
      )}
    </>
  );
}
