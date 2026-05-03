export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#050505]/50 backdrop-blur-md border-b border-[rgba(255,255,255,0.05)]">
      <div className="max-w-[1280px] mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.jpeg" alt="Blinq Logo" className="w-8 h-8 rounded-full object-cover" />
          <span className="font-bold text-xl tracking-tight">Blinq</span>
        </div>
        <button className="btn-secondary py-2 px-6 text-sm">Open App</button>
      </div>
    </nav>
  );
}
