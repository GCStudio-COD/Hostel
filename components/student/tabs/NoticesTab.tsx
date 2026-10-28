'use client';

import React from 'react';

export function NoticesTab() {
  return (
    <div className="space-y-6">
      <div className="bg-card rounded-[28px] border border-card-border p-6 sm:p-8 md:p-10">
        <div className="mb-6 pb-6 border-b border-primary/10">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-primary/60 block">
            Chief Warden Desk
          </span>
          <h2 className="font-luxury text-3xl text-primary font-normal">
            Official Hostel Circulars &amp; Notices
          </h2>
          <p className="text-xs text-primary/70 mt-1">
            Important notifications regarding curfew, festivals, and campus maintenance
          </p>
        </div>

        <div className="space-y-4">
          {[
            {
              title: 'Annual Coastal Fest 2026: Night Curfew Extended',
              date: '20 Oct 2026 · By Chief Warden Dr. Finch',
              category: 'FESTIVAL',
              body: 'On the occasion of the North Shore Coastal Fest, the hostel entry curfew is extended from 22:00 to 23:45 for all registered residents on 25th, 26th and 27th October. Ensure digital biometric clock-in at the main turnstiles.',
            },
            {
              title: 'Scheduled Fiber Backbone Maintenance (Sunday 02:00 - 04:00 AM)',
              date: '18 Oct 2026 · IT & Systems Desk',
              category: 'MAINTENANCE',
              body: 'The campus fiber optic ring will undergo core switch upgrades. Wi-Fi in North Shore Pavilion Room 101-310 may experience 20-minute latency bursts during the early morning hours.',
            },
            {
              title: 'Residents Fitness Center & Gym Extended Hours',
              date: '15 Oct 2026 · Sports & Wellness Desk',
              category: 'AMENITY',
              body: 'Effective 1st November, the residents fitness center and gym will operate extended hours from 06:00 to 10:00 AM and 16:30 to 21:30 PM. Certified fitness instructors on duty.',
            },
          ].map((notice, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white border border-card-border">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-primary text-linen">
                  {notice.category}
                </span>
                <span className="text-xs text-primary/60 font-medium">{notice.date}</span>
              </div>
              <h3 className="font-luxury text-xl text-primary font-normal mb-2">
                {notice.title}
              </h3>
              <p className="text-xs text-primary/75 leading-relaxed">{notice.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
