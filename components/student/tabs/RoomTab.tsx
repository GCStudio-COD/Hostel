'use client';

import React from 'react';
import { Phone, Check } from 'lucide-react';
import { useStudent } from '../StudentContext';

export function RoomTab() {
  const { setIsServiceModalOpen } = useStudent();

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-[28px] border border-card-border p-6 sm:p-8 md:p-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-primary/10">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-primary/60 block">
              Room Specification
            </span>
            <h2 className="font-luxury text-3xl text-primary font-normal">
              Room 204 — Deluxe 2-Sharing AC
            </h2>
            <p className="text-xs text-primary/70 mt-1">
              North Coast Shoreline View · Private Balcony · Ensuite Washroom
            </p>
          </div>
          <button
            onClick={() => setIsServiceModalOpen(true)}
            className="px-5 py-2.5 rounded-full bg-primary text-linen text-xs font-medium hover:bg-primary-dark transition-all self-start sm:self-auto cursor-pointer"
          >
            Request Room Cleaning
          </button>
        </div>

        {/* Co-Residents / Roommates */}
        <div className="mb-8">
          <h3 className="font-luxury text-xl text-primary font-normal mb-4">
            Assigned Co-Residents
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Self */}
            <div className="p-5 rounded-2xl bg-white border-2 border-primary/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary text-sand font-luxury font-medium flex items-center justify-center text-sm">
                  MV
                </div>
                <div>
                  <p className="text-xs font-bold text-primary">Marcus Vance (You)</p>
                  <p className="text-[11px] text-primary/65">Bed B · Window Terrace Side</p>
                  <p className="text-[10px] text-emerald-800 font-medium">Checked In · In Room</p>
                </div>
              </div>
            </div>

            {/* Roommate */}
            <div className="p-5 rounded-2xl bg-white border border-card-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-stone-200 text-stone-700 font-luxury font-medium flex items-center justify-center text-sm">
                  JB
                </div>
                <div>
                  <p className="text-xs font-bold text-primary">Julian Bell</p>
                  <p className="text-[11px] text-primary/65">Bed A · Study Desk Side</p>
                  <p className="text-[10px] text-primary/60">B.Tech AI &amp; Data Science (3rd Yr)</p>
                </div>
              </div>
              <a
                href="tel:+447700900123"
                className="p-2 rounded-full bg-primary/5 hover:bg-primary hover:text-white transition-colors text-primary"
              >
                <Phone className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Room Inventory & Amenities Checklist */}
        <div>
          <h3 className="font-luxury text-xl text-primary font-normal mb-4">
            Room Equipment &amp; Inventory Status
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { item: 'Split AC 1.5 Ton', status: 'Working · Serviced Oct 19' },
              { item: 'Ergonomic Study Table & Chair', status: 'Good Condition' },
              { item: 'Dedicated RFID Wardrobe', status: 'Keycard Paired' },
              { item: 'Ensuite Geyser / Hot Water', status: '24/7 Available' },
              { item: 'Ceiling Fan & LED Panel', status: 'Operational' },
              { item: 'Wi-Fi 6 Router AP', status: '340 Mbps Online' },
              { item: 'Fire Smoke Detector', status: 'Inspected Sep 2026' },
              { item: 'Laundry Basket & Hamper', status: 'Bi-weekly pickup' },
            ].map((inv, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-white border border-card-border">
                <p className="text-xs font-medium text-primary">{inv.item}</p>
                <p className="text-[10px] text-emerald-700 font-medium mt-1 flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <span>{inv.status}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
