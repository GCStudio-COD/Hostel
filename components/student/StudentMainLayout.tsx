'use client';

import React from 'react';
import { ArrowLeft, Home, BedDouble, Calendar, Wrench, CreditCard, Utensils, Bell } from 'lucide-react';
import { useStudent, TabType } from './StudentContext';
import { StudentHero } from './StudentHero';
import { StudentKpiGrid } from './StudentKpiGrid';
import { StudentTabsSection } from './StudentTabsSection';

const tabMeta: Record<TabType, { label: string; icon: React.ComponentType<{ className?: string }> }> = {
  overview: { label: 'Home Overview', icon: Home },
  room: { label: 'My Space & Room', icon: BedDouble },
  attendance: { label: 'Gate Pass & Attendance', icon: Calendar },
  maintenance: { label: 'Maintenance Tickets', icon: Wrench },
  fees: { label: 'Bills & Fee Ledger', icon: CreditCard },
  mess: { label: 'Mess & Dining Menu', icon: Utensils },
  notices: { label: 'Circulars & Bulletins', icon: Bell },
};

export function StudentMainLayout() {
  const { activeTab, setActiveTab } = useStudent();
  const currentTab = tabMeta[activeTab] || tabMeta.overview;
  const TabIcon = currentTab.icon;

  return (
    <main className="flex-1 py-3.5 sm:py-8 pb-28 sm:pb-12">
      <div className="container px-3 sm:px-6 space-y-3.5 sm:space-y-7">
        {/* On mobile: Hide Hero Banner & KPI Grid when viewing a separate tab */}
        <div className={activeTab === 'overview' ? 'block' : 'hidden sm:block'}>
          <StudentHero />
        </div>

        <div className={activeTab === 'overview' ? 'block' : 'hidden sm:block'}>
          <StudentKpiGrid />
        </div>

        {/* Mobile Dedicated Tab Header: Appears on mobile for separate tabs */}
        {activeTab !== 'overview' && (
          <div className="sm:hidden flex items-center justify-between bg-card rounded-2xl px-3.5 py-2.5 border border-card-border shadow-xs animate-fade-in">
            <button
              onClick={() => {
                setActiveTab('overview');
                if (typeof window !== 'undefined') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/70 transition-colors py-1 px-2.5 -ml-1 rounded-xl bg-linen hover:bg-black/5 border border-primary/10 active:scale-95 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 stroke-[2.2]" />
              <span>Back to Home</span>
            </button>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-primary bg-primary/5 px-2.5 py-1 rounded-full border border-primary/10">
              <TabIcon className="w-3.5 h-3.5 text-primary" />
              <span>{currentTab.label}</span>
            </div>
          </div>
        )}

        {/* Section C: Tab Navigation & Tab Panels */}
        <StudentTabsSection />
      </div>
    </main>
  );
}
