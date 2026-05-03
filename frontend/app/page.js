"use client";

import Navbar from "@/components/Navbar";
import BackgroundGlow from "@/components/BackgroundGlow";
import Hero from "@/components/Hero";
import UploadSection from "@/components/UploadSection";
import Workflow from "@/components/Workflow";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-x-hidden flex flex-col bg-[#050505] text-white selection:bg-[#d946ef]/30 selection:text-white">
      <BackgroundGlow />
      <Navbar />
      
      <div className="flex-1 flex flex-col items-center w-full relative z-10 pt-24 pb-12">
        {/* Split Layout: Hero Text (Left) + Upload Card (Right) */}
        <div className="w-full max-w-[1280px] mx-auto px-6 flex flex-col lg:flex-row items-center gap-16 lg:gap-12 pt-10 pb-24">
          <div className="w-full lg:w-1/2 flex flex-col">
            <Hero />
          </div>
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <UploadSection />
          </div>
        </div>
        
        <Workflow />
      </div>
      
      <Footer />
    </main>
  );
}
