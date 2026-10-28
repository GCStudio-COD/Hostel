'use client';

import React from 'react';
import { useStudent } from '../StudentContext';

export function AttendanceTab() {
  const { setIsGatePassModalOpen } = useStudent();

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-[28px] border border-card-border p-6 sm:p-8 md:p-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-primary/10">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-primary/60 block">
              Hostel Gate Movement &amp; Biometrics
            </span>
            <h2 className="font-luxury text-3xl text-primary font-normal">
              Attendance &amp; Gate Passes
            </h2>
            <p className="text-xs text-primary/70 mt-1">
              Biometric clock-in records, late curfew logs &amp; out-station leaves
            </p>
          </div>
          <button
            onClick={() => setIsGatePassModalOpen(true)}
            className="px-6 py-2.5 rounded-full bg-primary hover:bg-primary-dark text-linen text-xs font-medium tracking-wide transition-all shadow-sm active:scale-95 cursor-pointer self-start sm:self-auto"
          >
            + Apply For Out-Pass
          </button>
        </div>

        {/* Out-Pass History */}
        <h3 className="font-luxury text-xl text-primary font-normal mb-3">
          Gate Movement &amp; Out-Pass Log
        </h3>
        <div className="space-y-3">
          {[
            { type: 'Home Visit Weekend', from: 'Fri 10 Oct, 18:00', to: 'Sun 12 Oct, 21:00', dest: 'London Suburban Residence', status: 'Approved & Completed', warden: 'Approved by Dr. Finch' },
            { type: 'Late Work Session', from: 'Wed 15 Oct, 20:30', to: 'Wed 15 Oct, 23:00', dest: 'City Co-Working Space', status: 'Approved & Returned', warden: 'Approved by Gate Warden' },
            { type: 'Medical Consultation', from: 'Tue 06 Oct, 14:00', to: 'Tue 06 Oct, 17:30', dest: 'Coastal Health Center', status: 'Approved & Returned', warden: 'Self-certified' },
          ].map((pass, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-white border border-card-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-xs text-primary">{pass.type}</span>
                  <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                    {pass.status}
                  </span>
                </div>
                <p className="text-[11px] text-primary/70">
                  {pass.from} → {pass.to}
                </p>
                <p className="text-[10px] text-primary/50 mt-0.5">Destination: {pass.dest} · {pass.warden}</p>
              </div>
              <span className="text-xs font-mono text-primary/60 self-start sm:self-auto">
                PASS-2026-0{idx + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
