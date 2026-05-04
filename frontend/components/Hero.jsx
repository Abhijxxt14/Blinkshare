"use client";

export default function Hero() {
  return (
    <div className="w-full flex flex-col items-start text-left">
      {/* Trust Indicators Pill */}
      <div className="inline-flex items-center gap-3 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-full px-5 py-2 mb-8 backdrop-blur-md flex-wrap">
        <span className="flex items-center gap-2 text-xs font-semibold text-[#a1a1aa] tracking-wider uppercase"><div className="w-1.5 h-1.5 rounded-full bg-[#22d3ee] shadow-[0_0_8px_#22d3ee]"></div>Zero Compression</span>
      </div>

      <h1 className="heading-1 mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-[#888888] pr-4">
        The frictionless way to move massive files globally.
      </h1>
      
      <p className="text-lg text-[#a1a1aa] mb-10 leading-relaxed font-light max-w-xl">
        Blynq eliminates the bottleneck of traditional file sharing. Upload gigabytes of data securely, share the encrypted link instantly, and retrieve the exact, uncompressed file with absolute fidelity.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
        <button 
          onClick={() => document.getElementById('workflow-section').scrollIntoView({ behavior: 'smooth' })}
          className="btn-secondary w-full sm:w-auto px-8 py-3.5 text-base"
        >
          Explore How it Works
        </button>
      </div>
    </div>
  );
}
