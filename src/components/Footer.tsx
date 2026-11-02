import React from 'react';
import { FptLogo } from './FptLogo.tsx';
import { Mail, Globe, ArrowUp, Flame, MapPin, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#030508] border-t border-white/10 text-neutral-400 py-16 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 tech-grid-pattern opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10 items-start">
          
          {/* Col 1: Logo & Mission */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <FptLogo size="md" />
            </div>

            <h3 className="font-heading font-black text-2xl sm:text-3xl text-white uppercase tracking-wider mt-2">
              FPT SCHOOLS AI & ROBOTICS CHALLENGE
            </h3>

            <p className="text-sm text-neutral-400 font-sans leading-relaxed max-w-sm">
            <strong className="text-[#22E4FF]">Cyan Flames – Thanh Hỏa</strong>: Khơi nguồn sáng tạo, hồi sinh đại ngàn.
              Đấu trường trí tuệ nhân tạo, robotics và drone soccer quy mô toàn quốc của Hệ thống Trường Phổ thông FPT.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-[#22E4FF]">
              <Flame className="w-4 h-4 text-[#F37021]" />
              <span>MÙA GIẢI 2026–2027</span>
            </div>
          </div>

          {/* Col 2: Contact Info BTC (Spanning 7 columns, replacing quick navigation) */}
          <div className="md:col-span-7 space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-white font-bold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#F37021]" />
              THÔNG TIN LIÊN HỆ BAN TỔ CHỨC
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-sans">
              {/* Location */}
              <div className="flex items-start gap-3 text-neutral-300 sm:col-span-2 p-3.5 bg-neutral-900/60 border border-white/10">
                <div className="w-8 h-8 bg-[#0066B3]/30 border border-[#22E4FF]/40 flex items-center justify-center text-[#22E4FF] shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 block font-bold">
                    ĐỊA ĐIỂM TỔ CHỨC
                  </span>
                  <span className="text-white font-medium">
                    Trường TH, THCS & THPT FPT Bắc Giang, phường Bắc Giang, Tỉnh Bắc Ninh
                  </span>
                </div>
              </div>

              {/* Phone / Zalo */}
              <div className="flex items-start gap-3 text-neutral-300 p-3.5 bg-neutral-900/60 border border-white/10">
                <div className="w-8 h-8 bg-[#F37021]/30 border border-orange-400/40 flex items-center justify-center text-[#F37021] shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 block font-bold">
                    HOTLINE / ZALO HỖ TRỢ
                  </span>
                  <span className="text-white font-medium block">
                    Thầy Đỗ Minh Tiến - Tổ trưởng STEM
                  </span>
                  <a
                    href="https://zalo.me/0352333190"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#22E4FF] font-mono font-bold text-xs hover:underline mt-0.5 inline-block"
                  >
                    Zalo: 0352.333.190
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3 text-neutral-300 p-3.5 bg-neutral-900/60 border border-white/10">
                <div className="w-8 h-8 bg-[#0066B3]/30 border border-[#22E4FF]/40 flex items-center justify-center text-[#22E4FF] shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 block font-bold">
                    HÒM THƯ ĐIỆN TỬ
                  </span>
                  <a
                    href="mailto:fscbg.cths@fe.edu.vn"
                    className="text-white font-medium hover:text-[#22E4FF] transition-colors break-all block"
                  >
                    fscbg.cths@fe.edu.vn
                  </a>
                </div>
              </div>

              {/* Website */}
              <div className="flex items-start gap-3 text-neutral-300 p-3.5 bg-neutral-900/60 border border-white/10 sm:col-span-2">
                <div className="w-8 h-8 bg-[#0066B3]/30 border border-[#22E4FF]/40 flex items-center justify-center text-[#22E4FF] shrink-0 mt-0.5">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 block font-bold">
                    WEBSITE CHÍNH THỨC
                  </span>
                  <a
                    href="https://fschool.fpt.edu.vn/bac-giang/"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-[#22E4FF] hover:underline font-medium break-all block"
                  >
                    https://fschool.fpt.edu.vn/bac-giang/
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <p className="text-neutral-500">
            © 2026–2027 Hệ thống Trường Phổ thông FPT (FPT Schools). Bản quyền thuộc về BTC FAnRoC.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="p-2.5 bg-neutral-900 border border-white/15 text-neutral-300 hover:text-[#22E4FF] hover:border-[#22E4FF] transition-all flex items-center gap-2 cursor-pointer"
            aria-label="Cuộn lên đầu trang"
          >
            <span>LÊN ĐẦU TRANG</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
