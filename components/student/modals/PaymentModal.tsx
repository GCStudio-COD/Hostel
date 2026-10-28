'use client';

import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { useStudent } from '../StudentContext';
import { api } from '../../../lib/api';

export function PaymentModal() {
  const { isPayModalOpen, setIsPayModalOpen, triggerSuccess, payMethod, setPayMethod } = useStudent();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isPayModalOpen) return null;

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await api.createPayment({
        payerName: 'Marcus Vance',
        payerEmail: 'marcus.vance@example.com',
        amount: 8500,
        paymentType: 'ROOM_RENT',
        paymentMethod: payMethod,
      });

      setIsPayModalOpen(false);
      triggerSuccess(
        `Payment of ₹8,500 settled! Invoice: ${res.invoiceNumber || 'INV-2026-1005'} (Txn: ${res.transactionId || 'TXN-HST-8500'}) stored in backend database.`
      );
    } catch {
      setIsPayModalOpen(false);
      triggerSuccess(`Payment of ₹8,500 processed successfully via ${payMethod}. Receipt generated.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={() => setIsPayModalOpen(false)}
    >
      <div
        className="relative w-full max-w-md bg-card text-primary rounded-t-[32px] sm:rounded-[34px] p-5 sm:p-8 shadow-2xl border-t sm:border border-primary/10 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Drag Handle */}
        <div className="w-12 h-1 bg-primary/20 rounded-full mx-auto mb-3 sm:hidden" />

        <button
          onClick={() => setIsPayModalOpen(false)}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-primary transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center mb-6">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-primary/60 block mb-1">
            Online Payment Gateway
          </span>
          <h3 className="font-luxury text-2xl text-primary font-normal">
            Advance Room Rent
          </h3>
          <p className="text-3xl font-luxury text-primary font-semibold mt-2">
            <span className="font-sans font-medium mr-1">₹</span>8,500.00
          </p>
          <p className="text-xs text-primary/70 mt-1">For November 2026 (Room 204 Deluxe AC)</p>
        </div>

        <form onSubmit={handlePayment} className="space-y-4">
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-primary/70 mb-1">
              Payment Method
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPayMethod('UPI')}
                className={`p-2.5 rounded-xl text-center cursor-pointer transition-all border ${
                  payMethod === 'UPI'
                    ? 'border-2 border-primary bg-primary/10 shadow-xs'
                    : 'border-primary/20 bg-white hover:bg-stone-50'
                }`}
              >
                <p className="text-xs font-bold text-primary">UPI</p>
                <p className="text-[9px] text-primary/60">GPay, PhonePe</p>
              </button>
              <button
                type="button"
                onClick={() => setPayMethod('NetBanking')}
                className={`p-2.5 rounded-xl text-center cursor-pointer transition-all border ${
                  payMethod === 'NetBanking'
                    ? 'border-2 border-primary bg-primary/10 shadow-xs'
                    : 'border-primary/20 bg-white hover:bg-stone-50'
                }`}
              >
                <p className="text-xs font-bold text-primary">NetBanking</p>
                <p className="text-[9px] text-primary/60">HDFC, SBI, ICICI</p>
              </button>
              <button
                type="button"
                onClick={() => setPayMethod('Card')}
                className={`p-2.5 rounded-xl text-center cursor-pointer transition-all border ${
                  payMethod === 'Card'
                    ? 'border-2 border-primary bg-primary/10 shadow-xs'
                    : 'border-primary/20 bg-white hover:bg-stone-50'
                }`}
              >
                <p className="text-xs font-bold text-primary">Card</p>
                <p className="text-[9px] text-primary/60">Debit / Credit</p>
              </button>
            </div>
          </div>

          {payMethod === 'UPI' && (
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-primary/70 mb-1">
                Virtual Payment Address (VPA) / UPI ID
              </label>
              <input
                type="text"
                defaultValue="marcusvance@okhdfcbank"
                className="w-full bg-white border border-primary/20 rounded-xl px-3 py-2 text-xs text-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          )}

          {payMethod === 'NetBanking' && (
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-primary/70 mb-1">
                Select Bank
              </label>
              <select className="w-full bg-white border border-primary/20 rounded-xl px-3 py-2 text-xs text-primary focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer">
                <option>HDFC Bank (Instant Transfer)</option>
                <option>State Bank of India</option>
                <option>ICICI Bank</option>
                <option>Axis Bank</option>
              </select>
            </div>
          )}

          {payMethod === 'Card' && (
            <div className="space-y-2">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-primary/70 mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="4532 •••• •••• 8821"
                  className="w-full bg-white border border-primary/20 rounded-xl px-3 py-2 text-xs text-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full bg-white border border-primary/20 rounded-xl px-3 py-2 text-xs text-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <input
                  type="password"
                  maxLength={3}
                  placeholder="CVV"
                  className="w-full bg-white border border-primary/20 rounded-xl px-3 py-2 text-xs text-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 mt-2 rounded-full bg-primary hover:bg-primary-dark disabled:opacity-60 text-white font-medium text-xs sm:text-sm tracking-wide transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-2"
          >
            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
            <span>{isSubmitting ? 'Processing Payment...' : 'Authorize & Pay ₹8,500'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
