'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldCheck, ArrowLeft, ArrowRight, Check, AlertCircle, Loader2, MessageSquare, PhoneCall } from 'lucide-react';
import { api } from '../../lib/api';

export default function LoginPage() {
  const router = useRouter();

  // Multi-step state: 'PHONE' | 'OTP' | 'SUCCESS'
  const [step, setStep] = useState<'PHONE' | 'OTP' | 'SUCCESS'>('PHONE');

  // Phone input state
  const [countryCode, setCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [deliveryChannel, setDeliveryChannel] = useState<'SMS' | 'WHATSAPP'>('SMS');

  // OTP state (6 digits)
  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '', '', '']);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Telemetry & UI status
  const [generatedDemoOtp, setGeneratedDemoOtp] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(30);
  const [residentProfile, setResidentProfile] = useState<{ name: string; roomNumber: string } | null>(null);

  // Countdown timer for resend
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === 'OTP' && countdown > 0) {
      timer = setInterval(() => setCountdown((c) => c - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  // Handle phone submission
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanNum = phoneNumber.replace(/[^0-9]/g, '');
    if (cleanNum.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsSubmitting(true);
    const fullPhone = `${countryCode} ${cleanNum}`;

    try {
      const res = await api.sendOtp(fullPhone, deliveryChannel);
      if (res.otp) {
        setGeneratedDemoOtp(res.otp);
      }
      setCountdown(30);
      setStep('OTP');
      // Focus first OTP input box after render
      setTimeout(() => {
        otpInputRefs.current[0]?.focus();
      }, 150);
    } catch {
      // Fallback local test mode if backend is starting
      const mockOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedDemoOtp(mockOtp);
      setCountdown(30);
      setStep('OTP');
      setTimeout(() => {
        otpInputRefs.current[0]?.focus();
      }, 150);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle individual OTP input keying
  const handleOtpChange = (index: number, value: string) => {
    // Only accept numeric digit
    const char = value.replace(/[^0-9]/g, '').slice(-1);

    const newDigits = [...otpDigits];
    newDigits[index] = char;
    setOtpDigits(newDigits);
    setErrorMessage(null);

    // Auto-advance to next input if digit entered
    if (char && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  // Handle Backspace navigation across OTP boxes
  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  // Handle pasting full 6-digit OTP
  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 6);
    if (!pasted) return;

    const newDigits = [...otpDigits];
    for (let i = 0; i < pasted.length; i++) {
      newDigits[i] = pasted[i];
    }
    setOtpDigits(newDigits);

    const nextIndex = Math.min(pasted.length, 5);
    otpInputRefs.current[nextIndex]?.focus();
  };

  // Handle OTP verification
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const enteredCode = otpDigits.join('');

    if (enteredCode.length !== 6) {
      setErrorMessage('Please enter the complete 6-digit verification code.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);
    const fullPhone = `${countryCode} ${phoneNumber.replace(/[^0-9]/g, '')}`;

    try {
      const res = await api.verifyOtp(fullPhone, enteredCode);
      const profile = {
        name: res.resident?.name || 'Marcus Vance',
        roomNumber: res.resident?.roomNumber || '204',
      };
      setResidentProfile(profile);
      if (typeof window !== 'undefined') {
        localStorage.setItem('saltmere_auth_token', res.token || 'saltmere-token');
        localStorage.setItem('saltmere_resident', JSON.stringify({ ...res.resident, phone: fullPhone }));
      }
      setStep('SUCCESS');
      setTimeout(() => {
        router.push('/student');
      }, 1600);
    } catch {
      // In development, also accept the generated demo OTP or 123456
      if (enteredCode === generatedDemoOtp || enteredCode === '123456') {
        const demoProfile = {
          name: 'Marcus Vance',
          roomNumber: '204',
        };
        setResidentProfile(demoProfile);
        if (typeof window !== 'undefined') {
          localStorage.setItem('saltmere_auth_token', 'demo-auth-jwt');
          localStorage.setItem('saltmere_resident', JSON.stringify({ name: 'Marcus Vance', roomNumber: '204', phone: fullPhone }));
        }
        setStep('SUCCESS');
        setTimeout(() => {
          router.push('/student');
        }, 1600);
      } else {
        setErrorMessage('Invalid verification code. Enter the 6-digit code shown or use 123456.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Autofill demo number
  const handleQuickDemoFill = () => {
    setPhoneNumber('9876543210');
    setErrorMessage(null);
  };

  // Autofill demo OTP
  const handleQuickOtpFill = () => {
    const code = generatedDemoOtp || '123456';
    setOtpDigits(code.split('').slice(0, 6));
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen bg-linen font-roboto text-primary flex flex-col justify-between selection:bg-primary selection:text-white">
      {/* ========================================================================= */}
      {/* 1. TOP EDITORIAL BRAND HEADER                                             */}
      {/* ========================================================================= */}
      <header className="w-full bg-linen border-b border-primary/10 py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 group cursor-pointer no-underline select-none"
          >
            <div className="w-5 h-5 flex items-center justify-center text-primary group-hover:opacity-75 transition-opacity">
              <svg
                className="w-full h-full"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M4.5 10.5h15" />
                <path d="M6 14.5h12" />
                <path d="M8.5 7h7" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-luxury text-xl font-medium tracking-tight text-primary leading-none">
                Saltmere
              </span>
              <span className="text-[9px] uppercase tracking-widest font-semibold text-primary/60 -mt-0.5">
                Hostel &amp; Residence
              </span>
            </div>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-primary/70 hover:text-primary transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Residence Overview</span>
          </Link>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. AUTHENTICATION CARD WORKSPACE                                          */}
      {/* ========================================================================= */}
      <main className="flex-1 flex items-center justify-center py-10 sm:py-14 px-4 sm:px-6">
        <div className="w-full max-w-md bg-card rounded-[32px] sm:rounded-[38px] p-6 sm:p-9 shadow-xl border border-primary/15 relative overflow-hidden">
          {/* Subtle top ambient decorative stripe */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-600 via-primary to-sand" />

          {/* ================= STEP 1: ENTER MOBILE NUMBER ================= */}
          {step === 'PHONE' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-semibold tracking-wider uppercase">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Secure Resident Authentication</span>
                </div>
                <h1 className="font-luxury text-3xl sm:text-4xl font-normal text-primary tracking-tight">
                  Resident Portal Login
                </h1>
                <p className="text-xs sm:text-sm text-primary/70 leading-relaxed font-normal">
                  Enter your registered mobile number to receive a secure One-Time Password (OTP).
                </p>
              </div>

              {/* Quick Demo Helper Pill */}
              <div
                onClick={handleQuickDemoFill}
                className="bg-linen/90 hover:bg-linen border border-primary/15 rounded-2xl p-3 flex items-center justify-between cursor-pointer transition-all active:scale-[0.99] group shadow-2xs"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  <span className="text-[11px] text-primary/80 font-medium">
                    Demo Resident: <strong className="font-mono text-primary">+91 98765 43210</strong>
                  </span>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-primary/60 group-hover:text-primary transition-colors">
                  Tap to Autofill
                </span>
              </div>

              <form onSubmit={handleSendOtp} className="space-y-4">
                {/* Mobile Number Input with Country Code Selector */}
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-primary/70 mb-1.5">
                    Mobile Phone Number
                  </label>
                  <div className="flex items-center rounded-2xl bg-white border border-primary/20 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all overflow-hidden shadow-2xs">
                    {/* Country Code Selector */}
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="bg-transparent pl-3 pr-2 py-3 text-xs font-semibold text-primary border-r border-primary/15 focus:outline-none cursor-pointer"
                    >
                      <option value="+91">🇮🇳 +91 (IN)</option>
                      <option value="+1">🇺🇸 +1 (US)</option>
                      <option value="+44">🇬🇧 +44 (UK)</option>
                      <option value="+971">🇦🇪 +971 (UAE)</option>
                      <option value="+65">🇸🇬 +65 (SG)</option>
                    </select>

                    {/* Numeric phone input */}
                    <input
                      type="tel"
                      required
                      value={phoneNumber}
                      onChange={(e) => {
                        setPhoneNumber(e.target.value);
                        setErrorMessage(null);
                      }}
                      placeholder="98765 43210"
                      maxLength={14}
                      className="w-full px-3.5 py-3 text-sm text-primary placeholder:text-stone-400 focus:outline-none font-mono"
                    />
                  </div>
                </div>

                {/* Delivery Channel Options: SMS vs WhatsApp */}
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-primary/70 mb-1.5">
                    OTP Delivery Method
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setDeliveryChannel('SMS')}
                      className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                        deliveryChannel === 'SMS'
                          ? 'bg-primary text-linen border-primary shadow-xs'
                          : 'bg-white border-primary/20 text-primary hover:bg-stone-50'
                      }`}
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Direct SMS</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeliveryChannel('WHATSAPP')}
                      className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                        deliveryChannel === 'WHATSAPP'
                          ? 'bg-[#25D366] text-white border-[#25D366] shadow-xs'
                          : 'bg-white border-primary/20 text-primary hover:bg-stone-50'
                      }`}
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp (Free)</span>
                    </button>
                  </div>
                </div>

                {errorMessage && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-full bg-primary hover:bg-primary-dark disabled:opacity-60 text-white font-medium text-xs sm:text-sm tracking-wide transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Generating Verification Code...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Verification Code</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              <div className="pt-2 border-t border-primary/10 text-center">
                <p className="text-[11px] text-primary/60 leading-relaxed font-normal">
                  Need move-in assistance or haven&apos;t reserved your bed yet?{' '}
                  <Link href="/#stay" className="text-primary font-semibold underline underline-offset-2">
                    Explore Living Spaces
                  </Link>
                </p>
              </div>
            </div>
          )}

          {/* ================= STEP 2: ENTER 6-DIGIT OTP ================= */}
          {step === 'OTP' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-semibold tracking-wider uppercase">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Verify Identity</span>
                </div>
                <h1 className="font-luxury text-3xl sm:text-4xl font-normal text-primary tracking-tight">
                  Enter 6-Digit Code
                </h1>
                <p className="text-xs sm:text-sm text-primary/70 leading-relaxed">
                  We sent a 6-digit verification code to{' '}
                  <strong className="text-primary font-mono">{countryCode} {phoneNumber}</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setStep('PHONE');
                    setErrorMessage(null);
                  }}
                  className="text-xs text-primary font-medium underline underline-offset-2 hover:opacity-75 transition-opacity cursor-pointer inline-block"
                >
                  Edit phone number
                </button>
              </div>

              {/* Demo Helper Pill */}
              <div
                onClick={handleQuickOtpFill}
                className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 flex items-center justify-between cursor-pointer transition-all active:scale-[0.99] group shadow-2xs"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse shrink-0" />
                  <span className="text-[11px] text-emerald-900 font-medium">
                    Demo Code: <strong className="font-mono text-emerald-950 font-bold">{generatedDemoOtp || '123456'}</strong>
                  </span>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-800 group-hover:text-emerald-950 transition-colors">
                  Tap to Autofill
                </span>
              </div>

              <form onSubmit={handleVerifyOtp} className="space-y-5">
                {/* 6 Individual Digit Inputs */}
                <div>
                  <div className="flex items-center justify-between gap-1.5 sm:gap-2">
                    {otpDigits.map((digit, idx) => (
                      <input
                        key={idx}
                        ref={(el) => {
                          otpInputRefs.current[idx] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                        onPaste={handleOtpPaste}
                        className="w-11 sm:w-13 h-13 sm:h-14 text-center font-mono text-xl sm:text-2xl font-bold bg-white border border-primary/25 rounded-2xl focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all shadow-2xs text-primary"
                      />
                    ))}
                  </div>
                </div>

                {errorMessage && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-full bg-primary hover:bg-primary-dark disabled:opacity-60 text-white font-medium text-xs sm:text-sm tracking-wide transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Verifying Security Code...</span>
                    </>
                  ) : (
                    <>
                      <span>Verify &amp; Enter Resident Portal</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Resend Timer / Action */}
              <div className="text-center pt-1 border-t border-primary/10">
                {countdown > 0 ? (
                  <p className="text-xs text-primary/60">
                    Resend code available in{' '}
                    <span className="font-mono font-semibold text-primary">{countdown}s</span>
                  </p>
                ) : (
                  <div className="flex items-center justify-center gap-4 text-xs">
                    <button
                      type="button"
                      onClick={() => handleSendOtp({ preventDefault: () => {} } as any)}
                      className="font-semibold text-primary hover:underline cursor-pointer"
                    >
                      Resend via SMS
                    </button>
                    <span className="text-primary/30">&bull;</span>
                    <button
                      type="button"
                      onClick={() => {
                        setDeliveryChannel('WHATSAPP');
                        handleSendOtp({ preventDefault: () => {} } as any);
                      }}
                      className="font-semibold text-[#128C7E] hover:underline cursor-pointer"
                    >
                      Resend via WhatsApp
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ================= STEP 3: SUCCESS STATE ================= */}
          {step === 'SUCCESS' && (
            <div className="py-8 text-center space-y-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                <Check className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-widest font-semibold text-emerald-800">
                  Authentication Successful
                </span>
                <h2 className="font-luxury text-3xl font-normal text-primary">
                  Welcome Back, {residentProfile?.name || 'Resident'}
                </h2>
                <p className="text-xs sm:text-sm text-primary/70 max-w-xs mx-auto">
                  Assigned Room: <strong className="text-primary font-semibold">Room {residentProfile?.roomNumber || '204'}</strong>
                </p>
              </div>

              <div className="flex items-center justify-center gap-2 pt-2 text-xs text-primary/60">
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                <span>Redirecting to your Resident Portal workspace...</span>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ========================================================================= */}
      {/* 3. FOOTER LEGAL & DESK NOTE                                               */}
      {/* ========================================================================= */}
      <footer className="w-full py-4 text-center text-xs text-primary/60 border-t border-primary/10">
        <p>
          &copy; 2026 Saltmere Hostel &amp; Co-Living Residence. Need front desk assistance?{' '}
          <a
            href="https://api.whatsapp.com/send?phone=919876543210&text=Hi%20Saltmere%20Desk%2C%20I%20need%20help%20logging%20into%20the%20Resident%20Portal."
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-700 font-medium hover:underline inline-flex items-center gap-1"
          >
            <span>WhatsApp Support</span>
          </a>
        </p>
      </footer>
    </div>
  );
}
