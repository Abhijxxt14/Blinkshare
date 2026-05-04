"use client";

import { useEffect, useState } from "react";

export default function Toast({ message, type = "success", duration = 3000, onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for fade-out animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  const bgColor = type === "error" ? "bg-red-500" : type === "warning" ? "bg-yellow-500" : "bg-green-500";
  const icon = type === "error" ? "✕" : type === "warning" ? "⚠" : "✓";

  return (
    <div className={`fixed bottom-6 right-6 flex items-center gap-3 px-4 py-3 rounded-lg ${bgColor} text-white font-medium text-sm shadow-lg animate-[slideIn_0.3s_ease-out] z-50`}>
      <span className="text-lg">{icon}</span>
      <span>{message}</span>
    </div>
  );
}
