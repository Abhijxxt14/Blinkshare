"use client";

import { useState, useRef } from "react";
import ReceiveInput from "./ReceiveInput";
import ResultCard from "./ResultCard";
import { useToast } from "@/hooks/useToast";
import Toast from "./Toast";

const styles = `
  @keyframes fadeInScale {
    from {
      opacity: 0;
      transform: scaleY(0.8);
    }
    to {
      opacity: 1;
      transform: scaleY(1);
    }
  }

  @keyframes fadeOutScale {
    from {
      opacity: 1;
      transform: scale(1);
    }
    to {
      opacity: 0.6;
      transform: scale(0.98);
    }
  }

  @keyframes slideInProgress {
    from {
      opacity: 0;
      width: 0;
    }
    to {
      opacity: 1;
    }
  }

  .animate-fade-in-scale {
    animation: fadeInScale 0.5s ease-out forwards;
  }

  .animate-fade-out-scale {
    animation: fadeOutScale 0.3s ease-in forwards;
  }

  .progress-bar-container {
    animation: slideInProgress 0.6s ease-out forwards;
  }
`;

const StyleInjector = () => {
  const [injected, setInjected] = useState(false);
  
  if (!injected && typeof document !== 'undefined') {
    if (!document.getElementById('upload-section-styles')) {
      const styleEl = document.createElement('style');
      styleEl.id = 'upload-section-styles';
      styleEl.textContent = styles;
      document.head.appendChild(styleEl);
      setInjected(true);
    }
  }
  
  return null;
};

export default function UploadSection() {
  const [result, setResult] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);
  const { toasts, showToast, removeToast } = useToast();

  const processFile = async (file) => {
    setIsUploading(true);
    setProgress(0);

    const API_BASE = process.env.NEXT_PUBLIC_API_URL || `http://${typeof window !== 'undefined' ? window.location.hostname : 'localhost'}:8000`;
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        // Track upload progress
        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable) {
            const percentComplete = Math.round((event.loaded / event.total) * 100);
            setProgress(percentComplete);
          }
        });

        xhr.addEventListener('load', () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(xhr);
          } else {
            reject(new Error(`HTTP ${xhr.status}`));
          }
        });

        xhr.addEventListener('error', () => reject(new Error('Upload failed')));

        xhr.open('POST', `${API_BASE}/upload`);
        xhr.send(formData);
      });

      const data = JSON.parse(response.responseText);
      setProgress(100);
      
      setTimeout(() => {
        setResult(data);
        setIsUploading(false);
        setProgress(0);
      }, 500);
      
    } catch (error) {
      setIsUploading(false);
      setProgress(0);
      console.error(error);
      showToast("Error uploading file. Check connection.", "error");
    }
  };

  return (
    <div id="upload-section" className="w-full max-w-[500px] relative">
      <StyleInjector />
      <div className="absolute -inset-1 bg-gradient-to-r from-[#d946ef]/15 to-[#22d3ee]/15 rounded-[32px] blur-xl z-0 pointer-events-none"></div>
      
      <div className="relative z-10 w-full transition-all duration-500">
        {result ? (
          <ResultCard result={result} onReset={() => setResult(null)} />
        ) : (
          <div className="glass-card p-8 sm:p-10 flex flex-col w-full bg-[#050505]/60 relative overflow-hidden">
            {/* Upload Section */}
            <div className="flex flex-col gap-6">
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={(e) => { e.preventDefault(); setIsDragOver(false); if(e.dataTransfer.files.length) processFile(e.dataTransfer.files[0]); }}
                onClick={() => !isUploading && fileInputRef.current?.click()}
                className={`border border-dashed rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
                  isUploading ? "animate-fade-out-scale border-[rgba(255,255,255,0.1)] pointer-events-none" : isDragOver ? "border-[#d946ef] bg-[#d946ef]/5" : "border-[rgba(255,255,255,0.15)] hover:border-[rgba(255,255,255,0.3)] bg-[rgba(255,255,255,0.01)] hover:bg-[rgba(255,255,255,0.03)]"
                }`}
              >
                <div className="w-14 h-14 rounded-full bg-[rgba(255,255,255,0.05)] flex items-center justify-center mb-4 text-[#a1a1aa] transition-colors">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <span className="text-white font-medium mb-1 text-center">Click to upload or drag & drop</span>
                <span className="text-[#a1a1aa] text-xs">Maximum file size: 5GB</span>
                <input type="file" ref={fileInputRef} className="hidden" onChange={(e) => { if(e.target.files.length) processFile(e.target.files[0]); }} disabled={isUploading} />
              </div>

              {/* Progress Bar with Smooth Transition */}
              {isUploading && (
                <div className="w-full flex flex-col gap-3">
                  <div className="progress-bar-container w-full h-1.5 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#d946ef] via-[#a855f7] to-[#22d3ee] transition-all duration-500 ease-out shadow-[0_0_20px_rgba(217,70,239,0.5)]"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#a1a1aa] font-medium">Uploading...</span>
                    <span className="text-xs text-[#a1a1aa] font-medium">{progress}%</span>
                  </div>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className={`flex items-center transition-all duration-300 ${isUploading ? "opacity-30 pointer-events-none" : "opacity-100"}`} style={{margin: isUploading ? "0 0 0 0" : "2rem 0"}}>
              <div className="flex-1 h-[1px] bg-[rgba(255,255,255,0.05)]"></div>
              <span className="px-4 text-[#a1a1aa] text-[10px] font-bold tracking-[0.2em] uppercase">Or</span>
              <div className="flex-1 h-[1px] bg-[rgba(255,255,255,0.05)]"></div>
            </div>

            {/* Receive Section */}
            <div className={`transition-all duration-300 ${isUploading ? "opacity-30 pointer-events-none" : "opacity-100"}`}>
              <ReceiveInput disabled={isUploading} />
            </div>
          </div>
        )}
      </div>

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
