'use client';

import React, { useState, useEffect } from 'react';
import { useStudent } from '../StudentContext';
import { api, ServiceRequest } from '../../../lib/api';

const DEFAULT_SAMPLE_TICKETS = [
  { id: 'TKT-2026-382', title: 'AC Filter cleaning & coolant check', category: 'AC Maintenance', date: 'Logged Oct 18 · Resolved Oct 19', status: 'RESOLVED', staff: 'Technician: Dave K.', note: 'Filters washed and reinstalled. Running at 21°C.' },
  { id: 'TKT-2026-291', title: 'Balcony door latch loose', category: 'Carpentry', date: 'Logged Oct 02 · Resolved Oct 03', status: 'RESOLVED', staff: 'Technician: Robert H.', note: 'Screw replaced and hinge lubricated.' },
  { id: 'TKT-2026-118', title: 'Bathroom tap slow flow', category: 'Plumbing', date: 'Logged Sep 14 · Resolved Sep 14', status: 'RESOLVED', staff: 'Technician: Michael S.', note: 'Aerator descaled, normal pressure restored.' },
];

export function MaintenanceTab() {
  const { setIsServiceModalOpen } = useStudent();
  const [liveTickets, setLiveTickets] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.getServices({ roomNumber: '204' })
      .then((data) => {
        if (data && data.length > 0) {
          setLiveTickets(data);
        }
      })
      .catch((err) => {
        console.warn('Could not load live maintenance tickets:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-[28px] border border-card-border p-6 sm:p-8 md:p-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-primary/10">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-primary/60 block">
              Hostel Facilities Desk
            </span>
            <h2 className="font-luxury text-3xl text-primary font-normal">
              Service Requests &amp; Complaints
            </h2>
            <p className="text-xs text-primary/70 mt-1">
              Electrical, plumbing, carpentry, AC, Wi-Fi and deep cleaning
            </p>
          </div>
          <button
            onClick={() => setIsServiceModalOpen(true)}
            className="px-6 py-2.5 rounded-full bg-primary hover:bg-primary-dark text-linen text-xs font-medium tracking-wide transition-all shadow-sm active:scale-95 cursor-pointer self-start sm:self-auto"
          >
            + New Maintenance Ticket
          </button>
        </div>

        <div className="space-y-4">
          {/* Live database tickets if available */}
          {liveTickets.map((srv) => (
            <div key={srv.id} className="p-5 rounded-2xl bg-white border border-card-border shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-primary">TKT-{srv.id.slice(0, 8).toUpperCase()}</span>
                  <span className="text-xs font-medium text-primary">· {srv.serviceType.replace(/_/g, ' ')} in Room {srv.roomNumber}</span>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase ${
                  srv.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                } self-start sm:self-auto`}>
                  {srv.status}
                </span>
              </div>
              <p className="text-xs text-primary/70">{srv.instructions || 'Inspection requested.'}</p>
              <div className="mt-3 pt-3 border-t border-primary/10 flex items-center justify-between text-[10px] text-primary/60">
                <span>Logged {new Date(srv.createdAt).toLocaleDateString()}</span>
                <span>{srv.assignedStaff ? `Staff: ${srv.assignedStaff}` : `Priority: ${srv.urgency}`}</span>
              </div>
            </div>
          ))}

          {/* Sample default tickets */}
          {liveTickets.length === 0 && DEFAULT_SAMPLE_TICKETS.map((ticket) => (
            <div key={ticket.id} className="p-5 rounded-2xl bg-white border border-card-border">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-primary">{ticket.id}</span>
                  <span className="text-xs font-medium text-primary">· {ticket.title}</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase bg-emerald-100 text-emerald-800 self-start sm:self-auto">
                  {ticket.status}
                </span>
              </div>
              <p className="text-xs text-primary/70">{ticket.note}</p>
              <div className="mt-3 pt-3 border-t border-primary/10 flex items-center justify-between text-[10px] text-primary/60">
                <span>{ticket.date}</span>
                <span>{ticket.staff}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
