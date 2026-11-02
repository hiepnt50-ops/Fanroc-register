import React from 'react';
import { BOARDS } from '../constants.ts';
import { BoardType } from '../types.ts';
import { Check, Flame, Bot, Send, AlertCircle, ArrowRight } from 'lucide-react';

interface BoardCardsProps {
  onSelectBoard: (board: BoardType) => void;
}

export const BoardCards: React.FC<BoardCardsProps> = ({ onSelectBoard }) => {
  return (
    <section id="boards" className="py-20 md:py-28 bg-[#05070D] border-b border-white/10 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 tech-grid-pattern opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Centered Section Header (Congra style 4) */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#0066B3]/20 border border-[#22E4FF]/40 text-[#22E4FF] font-mono text-xs uppercase tracking-widest font-bold mb-3">
            <Flame className="w-3.5 h-3.5 text-[#F37021]" />
            HẠNG MỤC THI ĐẤU CHÍNH THỨC
          </div>

          <h2 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl text-white uppercase tracking-tight leading-[0.9]">
            CHỌN BẢNG ĐẤU CỦA BẠN
          </h2>

          <p className="text-base sm:text-lg text-neutral-300 font-sans mt-4">
            Chọn bảng thi phù hợp với đội của bạn và bắt đầu hành trình chinh phục đấu trường công nghệ FAnRoC 2026–2027.
          </p>
        </div>

        {/* 2 Equal Board Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-stretch max-w-5xl mx-auto">
          {BOARDS.map((board) => {
            const isRobotics = board.id === 'Robotics';

            return (
              <div
                key={board.id}
                onClick={() => onSelectBoard(board.id)}
                className="relative flex flex-col justify-between p-8 sm:p-10 border border-white/20 hover:border-[#22E4FF] bg-[#05070D]/90 hover:bg-neutral-900/70 transition-all duration-300 cursor-pointer group rounded-none shadow-xl"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectBoard(board.id);
                  }
                }}
                aria-label={`Chọn bảng ${board.title} - ${board.targetLevel}`}
              >
                {/* Top Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2.5">
                    {isRobotics ? (
                      <Bot className="w-6 h-6 text-[#22E4FF]" />
                    ) : (
                      <Send className="w-6 h-6 text-[#22E4FF]" />
                    )}
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#22E4FF]">
                      {board.subtitle}
                    </span>
                  </div>

                  <span className="px-2.5 py-1 bg-white/10 text-neutral-300 font-mono text-[10px] uppercase font-bold tracking-widest border border-white/10">
                    BẢNG ĐẤU CHÍNH THỨC
                  </span>
                </div>

                {/* Board Title */}
                <div>
                  <h3 className="font-heading font-black text-4xl sm:text-5xl text-white uppercase tracking-tight leading-none group-hover:text-[#22E4FF] transition-colors">
                    {board.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 font-sans mt-2">
                    {board.description}
                  </p>
                </div>

                {/* Price Replacement: Big Prominent School Level */}
                <div className="my-8 py-4 px-5 border bg-neutral-900/80 border-white/15 group-hover:border-[#22E4FF]/40 transition-colors">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 block font-bold">
                    ĐỐI TƯỢNG DỰ THI
                  </span>
                  <div className="font-heading font-black text-3xl sm:text-4xl uppercase tracking-wider mt-0.5 text-[#22E4FF]">
                    {board.targetLevel}
                  </div>
                </div>

                {/* Checklist Features */}
                <ul className="space-y-3.5 mb-10 flex-1">
                  {board.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-none flex items-center justify-center shrink-0 mt-0.5 bg-[#0066B3] text-white">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span className="text-sm leading-relaxed text-neutral-300 font-sans">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectBoard(board.id);
                  }}
                  className="w-full py-4 font-mono text-xs font-bold uppercase tracking-widest inline-flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer rounded-none border bg-[#F37021] hover:bg-[#ff7e33] text-white border-orange-400 shadow-[0_0_20px_rgba(243,112,33,0.35)] hover:shadow-[0_0_25px_rgba(243,112,33,0.55)]"
                  aria-label={`Đăng ký đội thi bảng ${board.title}`}
                >
                  <span>ĐĂNG KÝ ĐỘI THI</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Corner Tech Accents */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#22E4FF]/60 group-hover:border-[#22E4FF]" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#22E4FF]/60 group-hover:border-[#22E4FF]" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#22E4FF]/60 group-hover:border-[#22E4FF]" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#22E4FF]/60 group-hover:border-[#22E4FF]" />
              </div>
            );
          })}
        </div>

        {/* General Guidelines Callout Row */}
        <div className="mt-12 max-w-5xl mx-auto p-6 bg-neutral-900/90 border border-white/20 relative shadow-lg">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="p-3 bg-[#F37021]/20 border border-orange-400/40 text-[#F37021] shrink-0">
              <AlertCircle className="w-6 h-6" />
            </div>

            <div className="flex-1">
              <span className="font-mono text-xs text-[#22E4FF] uppercase tracking-widest block font-bold mb-1">
                LƯU Ý CHUNG CHO TOÀN BỘ CÁC BẢNG ĐẤU
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs sm:text-sm text-neutral-300 font-sans mt-2">
                <div className="flex items-start gap-2">
                  <span className="text-[#22E4FF] font-mono font-bold">•</span>
                  <span>Đội gồm học sinh cùng một trường, cùng cấp học, không thi vượt cấp.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#22E4FF] font-mono font-bold">•</span>
                  <span>Mỗi học sinh chỉ đăng ký một đội, một bảng thi duy nhất.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#22E4FF] font-mono font-bold">•</span>
                  <span>Mỗi đội tối đa 1 mentor (giáo viên/phụ huynh), mentor không trực tiếp điều khiển thiết bị.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
