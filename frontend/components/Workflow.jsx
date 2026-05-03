export default function Workflow() {
  const steps = [
    { 
      id: 1, 
      title: "1. Secure Upload", 
      desc: "Drag and drop your asset. Your file is verified locally and prepared for transfer without any destructive compression.", 
      icon: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" 
    },
    { 
      id: 2, 
      title: "2. Zero-Knowledge Encryption", 
      desc: "Before leaving your device, the file is wrapped in an unbreakable encryption layer. We never have the keys to your data.", 
      icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
    },
    { 
      id: 3, 
      title: "3. Decentralized Storage", 
      desc: "The encrypted packet is distributed across our high-availability server nodes, ensuring it remains safe and accessible globally.", 
      icon: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" 
    },
    { 
      id: 4, 
      title: "4. Frictionless Retrieval", 
      desc: "Share your unique 6-digit code or QR link. The recipient connects, downloads, and decrypts the exact bit-for-bit original file.", 
      icon: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" 
    },
  ];

  return (
    <section id="workflow-section" className="w-full max-w-[1280px] mx-auto px-6 py-32 mt-16 border-t border-[rgba(255,255,255,0.05)]">
      <div className="text-center mb-20 max-w-3xl mx-auto">
        <h2 className="heading-2 mb-6 text-white">Engineered for Absolute Privacy</h2>
        <p className="text-[#a1a1aa] text-lg leading-relaxed">
          Blinq isn't just another file host. It is a purpose-built pipeline designed to protect intellectual property, large media assets, and sensitive documents from end to end. Here is exactly what happens when you hit upload.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
        {/* Connecting Line */}
        <div className="hidden md:block absolute top-[48px] left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-[rgba(255,255,255,0.05)] via-[rgba(217,70,239,0.4)] to-[rgba(255,255,255,0.05)] z-0"></div>

        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center relative z-10 w-full px-2">
            <div className="w-24 h-24 rounded-2xl glass-card flex items-center justify-center mb-8 bg-[#050505] shadow-[0_0_30px_rgba(0,0,0,0.6)] group hover:-translate-y-2 transition-all duration-300 border border-[rgba(255,255,255,0.1)] hover:border-[#d946ef]/50">
              <svg className="w-10 h-10 text-[#a1a1aa] group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={step.icon} />
              </svg>
            </div>
            <h3 className="font-bold text-xl mb-3 text-white text-center">{step.title}</h3>
            <p className="text-[#a1a1aa] text-sm text-center leading-relaxed">{step.desc}</p>
            
            {/* Mobile Arrow */}
            {index !== steps.length - 1 && (
              <svg className="w-6 h-6 text-[rgba(255,255,255,0.1)] md:hidden my-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
