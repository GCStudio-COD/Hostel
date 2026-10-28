import React from 'react';
import type { Metadata } from 'next';
import { StudentProvider } from '../../components/student/StudentContext';
import { StudentHeader } from '../../components/student/StudentHeader';
import { StudentMainLayout } from '../../components/student/StudentMainLayout';
import { StudentModals } from '../../components/student/StudentModals';
import { StudentBottomNav } from '../../components/student/StudentBottomNav';

export const metadata: Metadata = {
  title: 'Resident Portal | Saltmere Hostel ERP',
  description: 'Resident portal dashboard for room amenities, fee ledger, biometric attendance, and facilities maintenance.',
};

export default function StudentPage() {
  return (
    <div className="min-h-screen bg-linen text-primary flex flex-col selection:bg-primary selection:text-white">
      <StudentProvider>
        {/* 1. Portal Header */}
        <StudentHeader />

        {/* 2. Main Workspace Layout (handles mobile separate tab view) */}
        <StudentMainLayout />

        {/* 3. Interactive Dialog Modals */}
        <StudentModals />

        {/* 4. Native Mobile Bottom Navigation Dock */}
        <StudentBottomNav />
      </StudentProvider>
    </div>
  );
}
