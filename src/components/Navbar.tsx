import React, { useState, useEffect } from 'react';
import { FptLogo } from './FptLogo.tsx';
import { Menu, X, ArrowUpRight, Flame } from 'lucide-react';

interface NavbarProps {
  onOpenRegister: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRegister }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Trang chủ', href: '#hero' },
    { label: 'Hình ảnh', href: '#media' },
    { label: 'Hành trình', href: '#timeline' },
    { label: 'Bảng đấu', href: '#boards' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#05070D]/95 backdrop-blur-md border-b border-white/10 shadow-2xl py-3'
          : 'bg-gradient-to-b from-[#05070D]/90 to-transparent border-b border-white/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Brand with FPT Schools logo badge */}
        <a
          href="#hero"
          onClick={(e) => handleLinkClick(e, '#hero')}
          className="flex items-center gap-3 group focus:outline-none focus:ring-1 focus:ring-[#22E4FF]"
          aria-label="FAnRoC 2026-2027 Trang chủ"
        >
          <FptLogo size="md" />
          <div className="hidden sm:flex flex-col border-l border-white/20 pl-3">
            <span className="font-heading font-extrabold text-xl tracking-wider text-white group-hover:text-[#22E4FF] transition-colors leading-none">
              FAnRoC
            </span>
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#22E4FF]/90 mt-0.5">
              2026–2027
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Menu chính">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-sm font-medium tracking-wide text-neutral-300 hover:text-white relative py-1 transition-colors hover:text-[#22E4FF] focus:outline-none focus:text-[#22E4FF]"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#22E4FF] transition-all duration-200 hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right Action: Register CTA Button */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenRegister}
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 bg-[#F37021] hover:bg-[#ff7e33] text-white font-mono text-xs font-bold uppercase tracking-widest transition-all duration-200 shadow-[0_0_20px_rgba(243,112,33,0.35)] hover:shadow-[0_0_25px_rgba(243,112,33,0.6)] active:scale-[0.98] border border-orange-400/40 rounded-none cursor-pointer"
            aria-label="Mở biểu mẫu đăng ký đội thi"
          >
            <Flame className="w-4 h-4 text-white animate-pulse" />
            <span>ĐĂNG KÝ</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-300 hover:text-white border border-white/10 bg-[#05070D]/80 hover:border-[#22E4FF]/40 rounded-none transition-colors"
            aria-label={mobileMenuOpen ? 'Đóng menu điều hướng' : 'Mở menu điều hướng'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#22E4FF]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#05070D]/98 border-b border-white/15 px-4 pt-4 pb-6 mt-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-3" aria-label="Menu mobile">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="px-3 py-2 text-base font-semibold text-neutral-200 hover:text-[#22E4FF] hover:bg-white/5 border-l-2 border-transparent hover:border-[#22E4FF] transition-all"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 mt-2 border-t border-white/10 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRegister();
                }}
                className="w-full py-3 bg-[#F37021] text-white font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg"
              >
                <Flame className="w-4 h-4" />
                ĐĂNG KÝ THAM GIA NGAY
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
