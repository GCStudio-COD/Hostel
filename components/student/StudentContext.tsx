'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type TabType = 'overview' | 'room' | 'fees' | 'attendance' | 'maintenance' | 'mess' | 'notices';

interface StudentContextType {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;

  // Modals state
  isGatePassModalOpen: boolean;
  setIsGatePassModalOpen: (open: boolean) => void;
  isServiceModalOpen: boolean;
  setIsServiceModalOpen: (open: boolean) => void;
  isPayModalOpen: boolean;
  setIsPayModalOpen: (open: boolean) => void;

  // Toast notification
  actionSuccessMessage: string | null;
  triggerSuccess: (msg: string) => void;

  // Wi-Fi copy
  copiedWifi: boolean;
  handleCopyWifi: () => void;

  // Maintenance form state
  serviceCategory: string;
  setServiceCategory: (cat: string) => void;
  serviceUrgency: 'Normal' | 'High' | 'Emergency';
  setServiceUrgency: (urg: 'Normal' | 'High' | 'Emergency') => void;
  serviceDesc: string;
  setServiceDesc: (desc: string) => void;

  // Payment form state
  payMethod: 'UPI' | 'NetBanking' | 'Card';
  setPayMethod: (mode: 'UPI' | 'NetBanking' | 'Card') => void;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export function StudentProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  // Modals
  const [isGatePassModalOpen, setIsGatePassModalOpen] = useState(false);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [actionSuccessMessage, setActionSuccessMessage] = useState<string | null>(null);

  // Copy Wi-Fi
  const [copiedWifi, setCopiedWifi] = useState(false);

  // Maintenance form
  const [serviceCategory, setServiceCategory] = useState('Air Conditioning / Heating');
  const [serviceUrgency, setServiceUrgency] = useState<'Normal' | 'High' | 'Emergency'>('Normal');
  const [serviceDesc, setServiceDesc] = useState('');

  // Payment form
  const [payMethod, setPayMethod] = useState<'UPI' | 'NetBanking' | 'Card'>('UPI');

  const triggerSuccess = (msg: string) => {
    setActionSuccessMessage(msg);
    setTimeout(() => setActionSuccessMessage(null), 3500);
  };

  const handleCopyWifi = () => {
    navigator.clipboard?.writeText('Saltmere#Secure5G');
    setCopiedWifi(true);
    setTimeout(() => setCopiedWifi(false), 2000);
  };

  return (
    <StudentContext.Provider
      value={{
        activeTab,
        setActiveTab,
        isGatePassModalOpen,
        setIsGatePassModalOpen,
        isServiceModalOpen,
        setIsServiceModalOpen,
        isPayModalOpen,
        setIsPayModalOpen,
        actionSuccessMessage,
        triggerSuccess,
        copiedWifi,
        handleCopyWifi,
        serviceCategory,
        setServiceCategory,
        serviceUrgency,
        setServiceUrgency,
        serviceDesc,
        setServiceDesc,
        payMethod,
        setPayMethod,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}

export function useStudent() {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudent must be used within a StudentProvider');
  }
  return context;
}
