'use client';

import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import { useStudent } from '../StudentContext';
import { api, Payment } from '../../../lib/api';

const DEFAULT_SAMPLE_PAYMENTS = [
  { inv: 'INV-2026-1004', desc: 'Room Rent (October 2026)', tx: 'TXN-98421034', date: '05 Oct 2026', method: 'UPI (Google Pay)', amount: '₹8,500', status: 'SUCCESS' },
  { inv: 'INV-2026-0904', desc: 'Room Rent (September 2026)', tx: 'TXN-87429182', date: '04 Sep 2026', method: 'NetBanking HDFC', amount: '₹8,500', status: 'SUCCESS' },
  { inv: 'INV-2026-0804', desc: 'Room Rent (August 2026)', tx: 'TXN-76391024', date: '05 Aug 2026', method: 'UPI (PhonePe)', amount: '₹8,500', status: 'SUCCESS' },
  { inv: 'INV-2026-0701', desc: 'Security Caution Deposit', tx: 'TXN-65198201', date: '28 Jul 2026', method: 'Debit Card', amount: '₹15,000', status: 'SUCCESS' },
  { inv: 'INV-2026-0700', desc: 'One-Time Registration & Resident ID Fee', tx: 'TXN-65198200', date: '28 Jul 2026', method: 'Debit Card', amount: '₹2,500', status: 'SUCCESS' },
];

export function FeesTab() {
  const { setIsPayModalOpen, triggerSuccess } = useStudent();
  const [livePayments, setLivePayments] = useState<Payment[]>([]);

  useEffect(() => {
    api.getPayments()
      .then((data) => {
        if (data && data.length > 0) {
          setLivePayments(data);
        }
      })
      .catch((err) => {
        console.warn('Could not fetch live payments:', err);
      });
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-[28px] border border-card-border p-6 sm:p-8 md:p-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-primary/10">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-primary/60 block">
              Financial Account Ledger
            </span>
            <h2 className="font-luxury text-3xl text-primary font-normal">
              Fee Dues &amp; Payment Receipts
            </h2>
            <p className="text-xs text-primary/70 mt-1">
              Hostel Room Rent, Mess Advance &amp; Security Deposit history
            </p>
          </div>
          <button
            onClick={() => setIsPayModalOpen(true)}
            className="px-6 py-2.5 rounded-full bg-primary hover:bg-primary-dark text-linen text-xs font-medium tracking-wide transition-all shadow-sm active:scale-95 cursor-pointer self-start sm:self-auto"
          >
            Make An Advance Payment
          </button>
        </div>

        {/* Ledger Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-white border border-card-border">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-primary/60">
              Current Dues
            </span>
            <p className="font-luxury text-3xl text-emerald-800 font-normal mt-1">
              <span className="font-sans font-medium mr-0.5">₹</span>0.00
            </p>
            <p className="text-[11px] text-primary/70 mt-1">No overdue charges</p>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-card-border">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-primary/60">
              Next Scheduled Rent
            </span>
            <p className="font-luxury text-3xl text-primary font-normal mt-1">
              <span className="font-sans font-medium mr-0.5">₹</span>8,500.00
            </p>
            <p className="text-[11px] text-primary/70 mt-1">Due Date: 05 November 2026</p>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-card-border">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-primary/60">
              Refundable Caution Deposit
            </span>
            <p className="font-luxury text-3xl text-primary font-normal mt-1">
              <span className="font-sans font-medium mr-0.5">₹</span>15,000.00
            </p>
            <p className="text-[11px] text-emerald-800 font-medium mt-1">Held securely with accounts</p>
          </div>
        </div>

        {/* Payment History Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-primary/15 text-[10px] font-semibold uppercase tracking-wider text-primary/60">
                <th className="py-3 px-3">Invoice No</th>
                <th className="py-3 px-3">Description</th>
                <th className="py-3 px-3">Transaction ID</th>
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3">Method</th>
                <th className="py-3 px-3">Amount</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/10">
              {livePayments.length > 0
                ? livePayments.map((p) => (
                    <tr key={p.id} className="hover:bg-white/60 transition-colors">
                      <td className="py-3 px-3 font-mono font-medium text-primary">{p.invoiceNumber}</td>
                      <td className="py-3 px-3 text-primary font-medium">{p.paymentType.replace(/_/g, ' ')}</td>
                      <td className="py-3 px-3 font-mono text-[11px] text-primary/65">{p.transactionId}</td>
                      <td className="py-3 px-3 text-primary/75">{new Date(p.paidAt).toLocaleDateString()}</td>
                      <td className="py-3 px-3 text-primary/75">{p.paymentMethod}</td>
                      <td className="py-3 px-3 font-semibold text-primary">₹{p.amount.toLocaleString('en-IN')}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase bg-emerald-100 text-emerald-800">
                          {p.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => triggerSuccess(`Downloaded ${p.invoiceNumber}.pdf receipt.`)}
                          className="inline-flex items-center gap-1 text-[11px] font-medium text-primary hover:underline cursor-pointer"
                        >
                          <Download className="w-3 h-3" />
                          PDF
                        </button>
                      </td>
                    </tr>
                  ))
                : DEFAULT_SAMPLE_PAYMENTS.map((row, idx) => (
                    <tr key={idx} className="hover:bg-white/60 transition-colors">
                      <td className="py-3 px-3 font-mono font-medium text-primary">{row.inv}</td>
                      <td className="py-3 px-3 text-primary font-medium">{row.desc}</td>
                      <td className="py-3 px-3 font-mono text-[11px] text-primary/65">{row.tx}</td>
                      <td className="py-3 px-3 text-primary/75">{row.date}</td>
                      <td className="py-3 px-3 text-primary/75">{row.method}</td>
                      <td className="py-3 px-3 font-semibold text-primary">{row.amount}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase bg-emerald-100 text-emerald-800">
                          {row.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => triggerSuccess(`Downloaded ${row.inv}.pdf receipt.`)}
                          className="inline-flex items-center gap-1 text-[11px] font-medium text-primary hover:underline cursor-pointer"
                        >
                          <Download className="w-3 h-3" />
                          PDF
                        </button>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
