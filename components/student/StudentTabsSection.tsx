'use client';

import React from 'react';
import { Home, Wifi, CreditCard, Calendar, Wrench, Utensils, Bell } from 'lucide-react';
import { useStudent, TabType } from './StudentContext';
import { OverviewTab } from './tabs/OverviewTab';
import { RoomTab } from './tabs/RoomTab';
import { FeesTab } from './tabs/FeesTab';
import { AttendanceTab } from './tabs/AttendanceTab';
import { MaintenanceTab } from './tabs/MaintenanceTab';
import { MessTab } from './tabs/MessTab';
import { NoticesTab } from './tabs/NoticesTab';

export function StudentTabsSection() {
  const { activeTab, setActiveTab } = useStudent();

  const tabs = [
    { id: 'overview', label: 'Overview Hub', icon: Home },
    { id: 'room', label: 'Room & Amenities', icon: Wifi },
    { id: 'fees', label: 'Fee Invoices', icon: CreditCard },
    { id: 'attendance', label: 'Attendance & Gate Pass', icon: Calendar },
    { id: 'maintenance', label: 'Maintenance Tickets', icon: Wrench },
    { id: 'mess', label: 'Hostel Mess Menu', icon: Utensils },
    { id: 'notices', label: 'Circulars & Notices', icon: Bell },
  ] as const;

  return (
    <div className="space-y-6">
      {/* Horizontal Scrollable Tab Navigation Strip */}
      <div className={`-mx-3 px-3 sm:mx-0 sm:px-0 ${activeTab !== 'overview' ? 'hidden sm:flex' : 'flex'} items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-primary/10 select-none`}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-medium transition-all whitespace-nowrap active:scale-95 cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-primary text-linen shadow-xs'
                  : 'text-primary/75 hover:text-primary hover:bg-black/5 bg-white/60 sm:bg-transparent'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Render Active Tab Panel */}
      <div>
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'room' && <RoomTab />}
        {activeTab === 'fees' && <FeesTab />}
        {activeTab === 'attendance' && <AttendanceTab />}
        {activeTab === 'maintenance' && <MaintenanceTab />}
        {activeTab === 'mess' && <MessTab />}
        {activeTab === 'notices' && <NoticesTab />}
      </div>
    </div>
  );
}
