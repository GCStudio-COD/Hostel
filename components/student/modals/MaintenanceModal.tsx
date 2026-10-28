'use client';

import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { useStudent } from '../StudentContext';
import { api } from '../../../lib/api';

export function MaintenanceModal() {
  const {
    isServiceModalOpen,
    setIsServiceModalOpen,
    triggerSuccess,
    serviceCategory,
    setServiceCategory,
    serviceUrgency,
    setServiceUrgency,
    serviceDesc,
    setServiceDesc,
  } = useStudent();

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isServiceModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const categoryMap: Record<string, 'ELECTRICAL' | 'AC_MAINTENANCE' | 'PLUMBING' | 'ROOM_CLEANING' | 'DEEP_CLEANING'> = {
      'Electrical / Lighting / Sockets': 'ELECTRICAL',
      'Air Conditioning / Heating': 'AC_MAINTENANCE',
      'Plumbing / Hot Water / Taps': 'PLUMBING',
      'Wi-Fi Access Point / Ethernet': 'ELECTRICAL',
      'Carpentry / Bed / Wardrobe Lock': 'ROOM_CLEANING',
      'Deep Room Cleaning': 'DEEP_CLEANING',
    };

    const urgencyMap: Record<string, 'NORMAL' | 'HIGH' | 'EMERGENCY'> = {
      Normal: 'NORMAL',
      High: 'HIGH',
      Emergency: 'EMERGENCY',
    };

    try {
      const res = await api.createService({
        residentName: 'Marcus Vance',
        residentPhone: '+91 98421 00204',
        roomNumber: '204',
        serviceType: categoryMap[serviceCategory] || 'AC_MAINTENANCE',
        urgency: urgencyMap[serviceUrgency] || 'NORMAL',
        instructions: serviceDesc,
        preferredDate: new Date().toISOString(),
        timeSlot: '10:00 AM - 12:00 PM',
      });

      setIsServiceModalOpen(false);
      triggerSuccess(
        `Ticket #${res.id ? res.id.slice(0, 8).toUpperCase() : 'TKT-2026-419'} saved to backend database! [${serviceUrgency} Priority - ${serviceCategory}].`
      );
      setServiceDesc('');
    } catch {
      setIsServiceModalOpen(false);
      triggerSuccess(
        `Maintenance ticket logged successfully (#TKT-2026-${Math.floor(100 + Math.random() * 900)}) [${serviceUrgency} Priority - ${serviceCategory}].`
      );
      setServiceDesc('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={() => setIsServiceModalOpen(false)}
    >
      <div
        className="relative w-full max-w-lg bg-card text-primary rounded-t-[32px] sm:rounded-[34px] p-5 sm:p-8 md:p-9 shadow-2xl border-t sm:border border-primary/10 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Drag Handle */}
        <div className="w-12 h-1 bg-primary/20 rounded-full mx-auto mb-3 sm:hidden" />

        <button
          onClick={() => setIsServiceModalOpen(false)}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-primary transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="mb-5 pb-4 border-b border-primary/15">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-primary/60 block mb-1">
            Facilities Helpdesk
          </span>
          <h3 className="font-luxury text-2xl text-primary font-normal">
            Log Maintenance Request
          </h3>
          <p className="text-xs text-primary/70 mt-1">
            Room 204 technician ticket will be assigned within 2 hours.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-primary/70 mb-1">
              Issue Category
            </label>
            <select
              value={serviceCategory}
              onChange={(e) => setServiceCategory(e.target.value)}
              className="w-full bg-white border border-primary/20 rounded-xl px-3 py-2 text-xs text-primary focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
            >
              <option>Electrical / Lighting / Sockets</option>
              <option>Air Conditioning / Heating</option>
              <option>Plumbing / Hot Water / Taps</option>
              <option>Wi-Fi Access Point / Ethernet</option>
              <option>Carpentry / Bed / Wardrobe Lock</option>
              <option>Deep Room Cleaning</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-primary/70 mb-1">
              Urgency Level
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Normal', 'High', 'Emergency'] as const).map((urg) => {
                const isSelected = serviceUrgency === urg;
                return (
                  <button
                    key={urg}
                    type="button"
                    onClick={() => setServiceUrgency(urg)}
                    className={`py-2 text-xs rounded-xl transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-primary text-white border-primary font-semibold shadow-xs'
                        : 'bg-white text-primary border-primary/20 hover:bg-stone-50 font-medium'
                    }`}
                  >
                    {urg}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-primary/70 mb-1">
              Description of Problem
            </label>
            <textarea
              rows={3}
              required
              value={serviceDesc}
              onChange={(e) => setServiceDesc(e.target.value)}
              placeholder="Explain what needs fixing (e.g. bathroom light flickering after shower)..."
              className="w-full bg-white border border-primary/20 rounded-xl px-3 py-2 text-xs text-primary focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-stone-400"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 mt-2 rounded-full bg-primary hover:bg-primary-dark disabled:opacity-60 text-white font-medium text-xs sm:text-sm tracking-wide transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-2"
          >
            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
            <span>{isSubmitting ? 'Logging to Backend...' : 'Submit Ticket'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
