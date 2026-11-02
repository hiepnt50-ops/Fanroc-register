import React from 'react';
import { FlameCanvas } from './FlameCanvas.tsx';
import { MapPin, Calendar, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onOpenRegister: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenRegister }) => {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between pt-24 pb-12 overflow-hidden bg-[#05070D] border-b border-white/10"
    >
      {/* Background Hero Image with Grayscale & FPT Blue Gradient overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://cdn-images.vtv.vn/66349b6076cb4dee98746cf1/2026/03/10/package-media-54876070491420346279073.png"
          alt="FAnRoC AI & Robotics Challenge"
          referrerPolicy="no-referrer"
          loading="eager"
          className="w-full h-full object-cover grayscale contrast-125 brightness-45 scale-105 transform motion-safe:transition-transform motion-safe:duration-1000"
        />
        {/* Subtle tech circuit grid pattern */}
        <div className="absolute inset-0 tech-grid-pattern opacity-40 mix-blend-screen pointer-events-none" />

        {/* FPT Blue Gradient: from dark blue #0066B3 solid at bottom fading to transparent at top */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0066B3]/95 via-[#004882]/65 to-transparent pointer-events-none" />

        {/* Dark Vignette around edges */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#05070D]/50 to-[#05070D] pointer-events-none" />
      </div>

      {/* Floating Cyan Flame Particles */}
      <FlameCanvas />

      {/* Main Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center my-auto">
        
        {/* Top Badges / Theme Meta */}
        <div className="flex flex-wrap items-center gap-3 mb-4 sm:mb-6">

          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-neutral-200 font-sans text-xs tracking-wide">
            <span className="w-2 h-2 rounded-full bg-[#00A651] animate-ping" />
            <span className="italic font-medium">"Khơi nguồn sáng tạo, hồi sinh đại ngàn"</span>
          </div>
        </div>

        {/* Giant Staggered Heading (Congra Layout Style) */}
        <div className="select-none tracking-tight my-2">
          {/* Line 1 - Left Aligned: CYAN FLAMES – THANH HỎA */}
          <div className="text-left py-2">
            <h1 className="font-heading font-black text-[9.5vw] sm:text-[8vw] md:text-[6.5vw] lg:text-[5.5rem] xl:text-[6.6rem] leading-[1.12] sm:leading-[1.15] text-white uppercase tracking-tight drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] pb-1">
              CYAN FLAMES – THANH HỎA
            </h1>
          </div>

          {/* Subline between/underneath */}
          <div className="py-3 sm:py-4 flex items-center justify-between border-y border-white/20 my-4 sm:my-6">
            <p className="font-mono text-xs sm:text-sm md:text-base font-bold text-[#22E4FF] tracking-[0.2em] sm:tracking-[0.3em] uppercase">
              FPT SCHOOLS AI & ROBOTICS CHALLENGE
            </p>
            <span className="hidden sm:inline-block font-mono text-xs text-neutral-400 tracking-widest">
              ĐẤU TRƯỜNG CÔNG NGHỆ TOÀN QUỐC
            </span>
          </div>

          {/* Line 2 - Right Aligned */}
          <div className="text-right py-2">
            <div className="font-heading font-black text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[7.5rem] leading-[1.12] sm:leading-[1.15] text-transparent bg-clip-text bg-gradient-to-l from-white via-neutral-100 to-[#22E4FF]/90 uppercase tracking-tight drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] pt-1">
              2026–2027
            </div>
          </div>
        </div>

        {/* Theme Story / Description */}
        <div className="mt-4 sm:mt-6 max-w-3xl">
          <p className="text-base sm:text-lg md:text-xl text-neutral-200 leading-relaxed font-sans font-light drop-shadow-md">
            Ngọn lửa của sáng tạo, trí tuệ nhân tạo, robot và drone trong tay những kỹ sư trẻ:
            phát hiện sớm đốm lửa đầu tiên, tiếp cận nơi con người khó đặt chân, cứu hộ giữa khói lửa và gieo lại mầm xanh.
          </p>
        </div>
      </div>

      {/* Hero Bottom Bar: Left Callout + Right Info Chips */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-8 sm:mt-12 pt-6 border-t border-white/15">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          
          {/* Bottom Left: Ready CTA Box */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-[#05070D]/85 backdrop-blur-md p-4 sm:p-5 border border-white/15 w-full md:w-auto shadow-xl">
            <div>
              <span className="font-mono text-[10px] text-[#22E4FF] uppercase tracking-widest block font-bold">
                BẮT ĐẦU HÀNH TRÌNH
              </span>
              <h2 className="font-heading font-extrabold text-xl sm:text-2xl uppercase tracking-wide text-white leading-tight">
                SẴN SÀNG THAM GIA CHƯA?
              </h2>
              <p className="text-xs text-neutral-300 font-sans mt-0.5 max-w-xs">
                Đăng ký ngay hôm nay để khẳng định bản lĩnh tại giải đấu công nghệ lớn nhất FPT Schools!
              </p>
            </div>

            <button
              type="button"
              onClick={onOpenRegister}
              className="mt-2 sm:mt-0 px-6 py-3 bg-[#F37021] hover:bg-[#ff7e33] text-white font-mono text-xs font-bold uppercase tracking-widest inline-flex items-center justify-center gap-2 transition-all duration-200 shadow-[0_0_25px_rgba(243,112,33,0.45)] hover:shadow-[0_0_35px_rgba(243,112,33,0.7)] cursor-pointer border border-orange-400/40 rounded-none shrink-0"
              aria-label="Đăng ký tham gia ngay"
            >
              <span>ĐĂNG KÝ NGAY</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Bottom Right: 2 Key Event Chips */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto md:justify-end">
            {/* Chip 1: Location */}
            <div className="flex items-center gap-3 px-4 py-3 bg-[#05070D]/80 backdrop-blur-md border border-[#22E4FF]/40 text-neutral-100 shadow-lg">
              <div className="p-2 bg-[#0066B3]/40 border border-[#22E4FF]/30 text-[#22E4FF]">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-400 block">
                  ĐỊA ĐIỂM TỔ CHỨC
                </span>
                <span className="font-heading font-extrabold text-sm sm:text-base tracking-wider text-white uppercase">
                  CHUNG KẾT: FSC BẮC GIANG
                </span>
              </div>
            </div>

            {/* Chip 2: Date */}
            <div className="flex items-center gap-3 px-4 py-3 bg-[#05070D]/80 backdrop-blur-md border border-[#22E4FF]/40 text-neutral-100 shadow-lg">
              <div className="p-2 bg-[#F37021]/30 border border-orange-400/30 text-[#F37021]">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-400 block">
                  THỜI GIAN TRANH TÀI
                </span>
                <span className="font-heading font-extrabold text-sm sm:text-base tracking-wider text-white uppercase">
                  26–27/03/2027 (DỰ KIẾN)
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
