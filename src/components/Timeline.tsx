import React from 'react';
import { TIMELINE } from '../constants.ts';
import { ArrowRight, Trophy, Sparkles, Clock } from 'lucide-react';

interface TimelineProps {
  onOpenRegister: () => void;
}

export const Timeline: React.FC<TimelineProps> = ({ onOpenRegister }) => {
  return (
    <section id="timeline" className="py-20 md:py-28 bg-[#05070D] border-b border-white/10 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 tech-grid-subtle opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Sticky Title + Description + CTA (Congra style 3) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0066B3]/20 border border-[#22E4FF]/40 text-[#22E4FF] font-mono text-xs uppercase tracking-widest font-bold mb-4">
              <Clock className="w-3.5 h-3.5" />
              LỘ TRÌNH MÙA GIẢI
            </div>

            <h2 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl text-white uppercase tracking-tight leading-[0.9]">
              HÀNH TRÌNH FANROC
            </h2>

            <p className="text-base text-neutral-300 font-sans mt-6 leading-relaxed">
              Theo dõi từng mốc thời gian quan trọng từ khi công bố điều lệ, mở cổng đăng ký, chuỗi ngày tập huấn làm chủ robot và drone cho đến ngày tranh tài chung kết toàn quốc tại FSC Bắc Giang.
            </p>

            {/* Feature Note Callout */}
            <div className="mt-8 p-5 bg-neutral-900/80 border-l-2 border-[#22E4FF] border-y border-r border-white/10">
              <span className="font-mono text-xs text-[#22E4FF] uppercase tracking-wider block font-bold">
                LƯU Ý QUAN TRỌNG
              </span>
              <p className="text-xs text-neutral-300 font-sans mt-1">
                Các mốc thời gian dự kiến có thể được điều chỉnh linh hoạt theo số lượng đội đăng ký tại các điểm thi cơ sở.
              </p>
            </div>

            {/* CTA Button */}
            <div className="mt-8">
              <button
                type="button"
                onClick={onOpenRegister}
                className="w-full sm:w-auto px-7 py-3.5 bg-[#F37021] hover:bg-[#ff7e33] text-white font-mono text-xs font-bold uppercase tracking-widest inline-flex items-center justify-center gap-3 transition-all duration-200 shadow-[0_0_20px_rgba(243,112,33,0.4)] hover:shadow-[0_0_30px_rgba(243,112,33,0.6)] cursor-pointer border border-orange-400/40 rounded-none"
                aria-label="Đăng ký tham gia ngay"
              >
                <span>ĐĂNG KÝ NGAY</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Vertical Timeline */}
          <div className="lg:col-span-7">
            <div className="relative pl-6 sm:pl-10 border-l-2 border-dashed border-[#22E4FF]/40 space-y-12">
              {TIMELINE.map((item, index) => {
                const isLast = index === TIMELINE.length - 1;

                return (
                  <div
                    key={item.step}
                    className={`relative group transition-opacity duration-300 ${
                      isLast ? 'opacity-90' : 'opacity-100'
                    }`}
                  >
                    {/* Square Number Box on the Dotted Line */}
                    <div className="absolute -left-[35px] sm:-left-[51px] top-0 w-8 h-8 sm:w-10 sm:h-10 bg-[#05070D] border-2 border-[#22E4FF] text-[#22E4FF] font-mono text-xs sm:text-sm font-bold flex items-center justify-center shadow-[0_0_15px_rgba(34,228,255,0.4)] group-hover:bg-[#22E4FF] group-hover:text-black transition-colors">
                      {item.step}
                    </div>

                    {/* Timeline Item Content Card */}
                    <div className="bg-[#05070D] border border-white/15 p-6 sm:p-7 hover:border-[#22E4FF]/60 hover:bg-neutral-900/40 transition-all duration-300 relative">
                      
                      {/* Top Header: Date badge */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <div className="inline-flex items-center gap-2 font-mono text-sm sm:text-base font-bold text-[#F37021] tracking-wider">
                          <span className="w-2 h-2 bg-[#F37021]" />
                          <span>{item.date}</span>
                        </div>

                        {item.isTentative && (
                          <span className="px-2 py-0.5 bg-white/10 text-neutral-300 font-mono text-[10px] uppercase tracking-wider border border-white/10">
                            DỰ KIẾN
                          </span>
                        )}

                        {isLast && (
                          <span className="px-2.5 py-0.5 bg-[#0066B3] text-[#22E4FF] font-mono text-[10px] uppercase font-bold tracking-wider border border-[#22E4FF]/50 flex items-center gap-1">
                            <Trophy className="w-3 h-3 text-[#22E4FF]" />
                            ĐÍCH ĐẾN QUYẾT ĐỊNH
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white uppercase tracking-wide group-hover:text-[#22E4FF] transition-colors">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-neutral-300 font-sans mt-3 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Tech Corner Accent */}
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/20 group-hover:border-[#22E4FF] transition-colors" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
