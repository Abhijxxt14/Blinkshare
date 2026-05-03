"use client";

import { useState } from "react";

export default function ReceiveInput({ disabled }) {
  const [code, setCode] = useState("");

  const handleAccess = () => {
    if (code.length === 6) {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || `http://${typeof window !== 'undefined' ? window.location.hostname : 'localhost'}:8000`;
      window.open(`${API_BASE}/file/${code}`, '_blank');
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-xl font-bold tracking-tight">Retrieve File</h3>
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="000000"
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, "").slice(0, 6))}
          disabled={disabled}
          className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-2xl w-full sm:w-2/3 px-6 text-center text-2xl tracking-[0.4em] font-mono text-white placeholder-[#a1a1aa]/30 focus:outline-none focus:border-[#d946ef]/50 transition-colors py-4"
        />
        <button
          onClick={handleAccess}
          disabled={disabled || code.length !== 6}
          className="btn-secondary w-full sm:w-1/3 py-4 flex-1"
        >
          Access
        </button>
      </div>
    </div>
  );
}
