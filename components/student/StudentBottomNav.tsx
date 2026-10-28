'use client';

import React from 'react';
import { Home, BedDouble, Wrench, CreditCard, Utensils, QrCode } from 'lucide-react';
import { useStudent, TabType } from './StudentContext';

export function StudentBottomNav() {
  const { activeTab, setActiveTab } = useStudent();

  const navItems: Array<{
    id: TabType;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }> = [
    { id: 'overview', label: 'Home', icon: Home },
    { id: 'room', label: 'My Space', icon: BedDouble },
    { id: 'attendance', label: 'Gate Pass', icon: QrCode },
    { id: 'maintenance', label: 'Tickets', icon: Wrench },
    { id: 'fees', label: 'Bills', icon: CreditCard },
    { id: 'mess', label: 'Dining', icon: Utensils },
  ];

  const handleSelect = (tabId: TabType) => {
    setActiveTab(tabId);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav
      aria-label="Mobile Resident Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-xl border-t border-primary/10 shadow-[0_-8px_30px_rgba(23,58,54,0.08)] px-2 py-1.5 pb-[max(0.6rem,env(safe-area-inset-bottom))]"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleSelect(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all duration-200 active:scale-90 cursor-pointer select-none relative ${
                isActive
                  ? 'text-primary font-semibold'
                  : 'text-primary/60 hover:text-primary font-normal'
              }`}
            >
              <div
                className={`w-9 h-8 rounded-xl flex items-center justify-center transition-all ${
                  isActive
                    ? 'bg-primary text-linen shadow-xs scale-105'
                    : 'bg-transparent text-primary/70'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'stroke-[2.2]' : 'stroke-[1.8]'}`} />
              </div>

              <span className={`text-[10px] tracking-tight mt-0.5 ${isActive ? 'font-bold text-primary' : 'font-medium'}`}>
                {item.label}
              </span>

              {/* Active Dot Indicator */}
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-emerald-600 mt-0.5 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
