"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/hooks/useToast";
import Toast from "./Toast";

export default function ResultCard({ result, onReset }) {
  const [timeLeft, setTimeLeft] = useState("");
  const [codeCopied, setCodeCopied] = useState(false);
  const { toasts, showToast, removeToast } = useToast();
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || `http://${typeof window !== 'undefined' ? window.location.hostname : 'localhost'}:8000`;

  useEffect(() => {
    const updateCountdown = () => {
      const expiresAt = result.expires_at * 1000; // Convert to milliseconds
      const now = Date.now();
      const diff = expiresAt - now;

      if (diff <= 0) {
        setTimeLeft("Expired");
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [result]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(result.code);
    setCodeCopied(true);
    showToast("Code copied!", "success", 2000);
    setTimeout(() => setCodeCopied(false), 600);
  };

  return (
    <div className="glass-card p-6 sm:p-10 md:p-12 flex flex-col items-center bg-[#050505]/60 relative overflow-hidden">
      {/* Success Icon */}
      <div className="w-16 h-16 rounded-full bg-[#d946ef]/10 border border-[#d946ef]/30 flex items-center justify-center mb-6 sm:mb-8 shadow-[0_0_30px_rgba(217,70,239,0.2)]">
        <svg className="w-8 h-8 text-[#d946ef]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      
      <h2 className="heading-2 mb-2 text-center text-3xl sm:text-4xl">Transfer Ready</h2>
      <p className="text-[#a1a1aa] mb-8 sm:mb-10 text-center text-sm sm:text-base">Your file is encrypted and secured on the network.</p>
      
      {/* Expiry Countdown */}
      <div className="mb-8 text-center">
        <p className="text-xs sm:text-sm uppercase tracking-widest font-bold text-[#a1a1aa] mb-2">Expires in</p>
        <p className={`text-lg sm:text-xl font-mono font-bold ${timeLeft === "Expired" ? "text-red-500" : "text-[#d946ef]"}`}>
          {timeLeft}
        </p>
      </div>
      
      {/* Code Display */}
      <div onClick={handleCopyCode} className="w-full bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-2xl p-4 sm:p-8 mb-8 sm:mb-10 flex flex-col items-center relative group overflow-hidden cursor-pointer transition-all hover:border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.04)]">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(217,70,239,0.05)] to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
        <div className="text-[#a1a1aa] text-xs sm:text-sm uppercase tracking-widest sm:tracking-[0.2em] font-bold mb-2 sm:mb-4">Access Code</div>
        <div className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-mono tracking-widest sm:tracking-[0.15em] font-bold drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] break-all text-center transition-all duration-300 ${
          codeCopied ? "text-[#d946ef] scale-110" : "text-white"
        }`}>
          {result.code}
        </div>
      </div>

      {/* Action Area */}
      <div className="flex flex-col sm:flex-row items-center w-full gap-6">
        {/* QR Block */}
        <div className="w-40 h-40 bg-white rounded-xl p-3 shrink-0 shadow-[0_0_25px_rgba(255,255,255,0.1)]">
          <img 
            src={`${API_BASE}/qr/${result.code}`} 
            alt="QR Code" 
            className="w-full h-full rounded-lg"
          />
        </div>

        {/* Links */}
        <div className="flex flex-col w-full gap-4">
          <button 
            onClick={() => { navigator.clipboard.writeText(result.url); showToast("Link copied!"); }}
            className="btn-primary w-full py-4"
          >
            Copy Link
          </button>
          <a 
            href={result.url} 
            target="_blank" 
            rel="noreferrer"
            className="btn-secondary w-full py-4 text-center block"
          >
            Open in Browser
          </a>
        </div>
      </div>

      <button onClick={onReset} className="mt-10 text-[#a1a1aa] font-medium hover:text-white transition-colors border-b border-transparent hover:border-white pb-1">
        Send another file
      </button>

      {/* Toast Notifications */}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}
