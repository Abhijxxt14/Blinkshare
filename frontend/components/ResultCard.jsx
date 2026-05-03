"use client";

export default function ResultCard({ result, onReset }) {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || `http://${typeof window !== 'undefined' ? window.location.hostname : 'localhost'}:8000`;

  return (
    <div className="glass-card p-12 flex flex-col items-center bg-[#050505]/60 relative overflow-hidden">
      {/* Success Icon */}
      <div className="w-16 h-16 rounded-full bg-[#d946ef]/10 border border-[#d946ef]/30 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(217,70,239,0.2)]">
        <svg className="w-8 h-8 text-[#d946ef]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      
      <h2 className="heading-2 mb-2 text-center">Transfer Ready</h2>
      <p className="text-[#a1a1aa] mb-10 text-center">Your file is encrypted and secured on the network.</p>
      
      {/* Code Display */}
      <div className="w-full bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-2xl p-8 mb-10 flex flex-col items-center relative group overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(217,70,239,0.05)] to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
        <div className="text-[#a1a1aa] text-sm uppercase tracking-[0.2em] font-bold mb-4">Access Code</div>
        <div className="text-6xl md:text-7xl font-mono tracking-[0.15em] font-bold text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
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
            onClick={() => { navigator.clipboard.writeText(result.url); alert("Link copied!"); }}
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
    </div>
  );
}
