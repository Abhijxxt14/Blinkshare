export default function Footer() {
  return (
    <footer className="w-full border-t border-[rgba(255,255,255,0.05)] bg-[#050505] relative z-10 pt-16 pb-8">
      <div className="max-w-[1280px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
        <div className="flex items-center gap-3">
          <img src="/logo.jpeg" alt="Blinq Logo" className="w-6 h-6 rounded-full object-cover" />
          <span className="font-bold text-lg tracking-tight">Blinq</span>
        </div>
        
        <div className="flex gap-8 text-sm font-medium text-[#a1a1aa]">
          <a href="#" className="hover:text-white transition-colors">Home</a>
          <a href="#workflow-section" className="hover:text-white transition-colors">About</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#a1a1aa]/60 border-t border-[rgba(255,255,255,0.05)] pt-8">
        <p>© {new Date().getFullYear()} Blinq. All rights reserved.</p>
        <div className="group relative">
          <p className="flex items-center gap-1 text-[#a1a1aa]">
            Built by <span className="text-[#a1a1aa] group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all duration-300 font-semibold cursor-default">Abhijeet Soren & Lanka Sneha</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
