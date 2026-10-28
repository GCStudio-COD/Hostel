'use client';

import React from 'react';
import { CheckCircle2, Wifi, Check, Copy, Phone } from 'lucide-react';
import { useStudent } from '../StudentContext';

export function OverviewTab() {
  const { setActiveTab, copiedWifi, handleCopyWifi } = useStudent();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-start">
      {/* Left Column (8 cols): Mess Today & Recent Activity */}
      <div className="lg:col-span-8 space-y-4 sm:space-y-6">
        {/* Today's Mess Snapshot */}
        <div className="bg-card rounded-[22px] sm:rounded-[28px] border border-card-border p-4 sm:p-7 md:p-8">
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-primary/60 block">
                Today&apos;s Nutrition
              </span>
              <h3 className="font-luxury text-xl sm:text-2xl text-primary font-normal">
                Hostel Mess Timetable
              </h3>
            </div>
            <button
              onClick={() => setActiveTab('mess')}
              className="text-xs text-primary font-medium hover:underline cursor-pointer"
            >
              Full Schedule →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-card-border">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-primary/50 block mb-1">
                Breakfast · 07:30 – 10:00
              </span>
              <p className="text-xs font-semibold text-primary">Steamed Idli &amp; Medu Vada</p>
              <p className="text-[11px] text-primary/70 mt-1">Coconut chutney, sambar, filter coffee &amp; fruit bowl.</p>
            </div>

            <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-card-border border-l-4 border-l-sand">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-sand block mb-1 font-bold">
                Lunch · 12:30 – 14:30 (Current)
              </span>
              <p className="text-xs font-semibold text-primary">Basmati Rice &amp; Paneer Butter</p>
              <p className="text-[11px] text-primary/70 mt-1">Dal tadka, phulkas, fresh spiced curd, garden salad.</p>
            </div>

            <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-card-border">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-primary/50 block mb-1">
                Dinner · 19:30 – 21:30
              </span>
              <p className="text-xs font-semibold text-primary">Kadai Vegetable &amp; Rotis</p>
              <p className="text-[11px] text-primary/70 mt-1">Jeera rice, coastal chicken curry (non-veg), kheer.</p>
            </div>
          </div>
        </div>

        {/* Recent Activity Log */}
        <div className="bg-card rounded-[22px] sm:rounded-[28px] border border-card-border p-4 sm:p-7 md:p-8">
          <h3 className="font-luxury text-xl sm:text-2xl text-primary font-normal mb-3 sm:mb-4">
            Recent Resident Activity
          </h3>
          <div className="space-y-3.5">
            {[
              { title: 'Biometric Attendance Clocked (Morning)', time: 'Today at 08:14 AM', type: 'attendance', status: 'Recorded' },
              { title: 'Monthly Room Rent Paid (₹8,500 via UPI)', time: '05 Oct 2026', type: 'payment', status: 'Success' },
              { title: 'Maintenance Ticket Resolved: AC Remote battery', time: '19 Oct 2026', type: 'service', status: 'Completed' },
              { title: 'Weekend Out-Pass Approved (Visit Home)', time: '11 Oct 2026', type: 'gatepass', status: 'Approved' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3.5 rounded-2xl bg-white border border-card-border">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-primary">{item.title}</p>
                    <p className="text-[10px] text-primary/60">{item.time}</p>
                  </div>
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-stone-100 text-primary/80">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column (4 cols): Wi-Fi Credentials & Hostel Contacts */}
      <div className="lg:col-span-4 space-y-6">
        {/* Wi-Fi & Quick Access Card */}
        <div className="bg-primary text-linen rounded-[28px] p-6 sm:p-7 shadow-md relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-sand">
              Hostel High-Speed Fiber
            </span>
            <Wifi className="w-4 h-4 text-sand" />
          </div>
          <h4 className="font-luxury text-xl text-linen font-normal">
            Room 204 Dedicated AP
          </h4>
          <p className="text-xs text-linen/70 mt-1">Speed test: 340 Mbps symmetrical.</p>

          <div className="mt-4 p-3 rounded-xl bg-primary-dark/80 border border-white/10 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-linen/50 uppercase">Network Password</p>
              <p className="text-xs font-mono font-bold tracking-wider text-sand">Saltmere#Secure5G</p>
            </div>
            <button
              onClick={handleCopyWifi}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-linen cursor-pointer"
              title="Copy password"
            >
              {copiedWifi ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Important Hostel Contacts */}
        <div className="bg-card rounded-[28px] border border-card-border p-6 sm:p-7">
          <h4 className="font-luxury text-xl text-primary font-normal mb-3.5">
            Emergency &amp; Warden Desk
          </h4>
          <ul className="space-y-3 text-xs">
            <li className="flex items-center justify-between p-2 rounded-xl hover:bg-white transition-colors">
              <div>
                <p className="font-medium text-primary">Chief Warden Office</p>
                <p className="text-[10px] text-primary/60">Dr. Alistair Finch · Ground Floor</p>
              </div>
              <a href="tel:+441234567890" className="p-1.5 rounded-full bg-primary/5 text-primary hover:bg-primary hover:text-white transition-colors">
                <Phone className="w-3.5 h-3.5" />
              </a>
            </li>
            <li className="flex items-center justify-between p-2 rounded-xl hover:bg-white transition-colors">
              <div>
                <p className="font-medium text-primary">Security Main Gate</p>
                <p className="text-[10px] text-primary/60">24/7 Gatepost Desk</p>
              </div>
              <a href="tel:+441234567891" className="p-1.5 rounded-full bg-primary/5 text-primary hover:bg-primary hover:text-white transition-colors">
                <Phone className="w-3.5 h-3.5" />
              </a>
            </li>
            <li className="flex items-center justify-between p-2 rounded-xl hover:bg-white transition-colors">
              <div>
                <p className="font-medium text-primary">Hostel Infirmary &amp; Nurse</p>
                <p className="text-[10px] text-primary/60">Block A · First Aid 24/7</p>
              </div>
              <a href="tel:+441234567892" className="p-1.5 rounded-full bg-primary/5 text-primary hover:bg-primary hover:text-white transition-colors">
                <Phone className="w-3.5 h-3.5" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
