import React, { useState } from 'react';
import {
  BOARDS,
  LINH_VAT_ROBOTICS_URL as CONST_ROBO_URL,
  LINH_VAT_DRONE_URL as CONST_DRONE_URL,
} from '../constants.ts';
import { BoardSlug } from '../types.ts';
import { ArrowRight, Users, GraduationCap, Sparkles } from 'lucide-react';

export const LINH_VAT_ROBOTICS_URL = CONST_ROBO_URL;
export const LINH_VAT_DRONE_URL = CONST_DRONE_URL;

interface BoardCardsProps {
  onViewBoardDetail: (slug: BoardSlug) => void;
}

export const BoardCards: React.FC<BoardCardsProps> = ({ onViewBoardDetail }) => {
  const [hiddenMascots, setHiddenMascots] = useState<Record<string, boolean>>({});

  const handleMascotError = (slug: string) => {
    setHiddenMascots((prev) => ({ ...prev, [slug]: true }));
  };

  return (
    <section
      id="boards"
      className="py-20 md:py-28 bg-[#05070D] border-b border-white/10 relative overflow-hidden"
    >
      <div className="absolute inset-0 tech-grid-pattern opacity-20 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Centered Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 sm:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0066B3]/25 border border-[#22E4FF]/40 text-[#22E4FF] font-mono text-xs uppercase tracking-widest font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#22E4FF]" />
            <span>Bảng thi</span>
          </div>

          <h2 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl text-white uppercase tracking-tight leading-[1.08]">
            KHƠI NGUỒN <span className="text-[#22E4FF]">SÁNG TẠO</span>, HỒI SINH ĐẠI NGÀN
          </h2>
        </div>

        {/* Two Large Rounded Cards (Stacked on mobile, side-by-side on md+) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-8 lg:gap-10 items-stretch">
          {BOARDS.map((board) => {
            const isRobotics = board.slug === 'robotics';
            const mascotSrc = isRobotics ? LINH_VAT_ROBOTICS_URL : LINH_VAT_DRONE_URL;
            const isMascotHidden = hiddenMascots[board.slug];

            return (
              <div
                key={board.id}
                onClick={() => onViewBoardDetail(board.slug)}
                className={`group relative flex flex-col rounded-3xl shadow-2xl transition-all duration-300 cursor-pointer hover:-translate-y-1.5 ${
                  isRobotics
                    ? 'shadow-[0_20px_50px_rgba(20,200,216,0.16)] border border-cyan-400/35 hover:border-cyan-300/70'
                    : 'shadow-[0_20px_50px_rgba(243,112,33,0.16)] border border-orange-400/35 hover:border-orange-300/70'
                }`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onViewBoardDetail(board.slug);
                  }
                }}
                aria-label={`Xem chi tiết bảng ${board.title}`}
              >
                {/* TOP HALF: Gradient Background + Left Text + Right Protruding Mascot */}
                <div
                  className={`relative rounded-t-3xl px-6 sm:px-8 pt-7 pb-6 min-h-[185px] sm:min-h-[205px] flex items-end justify-between ${
                    isRobotics
                      ? 'bg-gradient-to-br from-[#22D3EE] via-[#0EA5E9] to-[#0B5FA5]'
                      : 'bg-gradient-to-br from-[#FB923C] via-[#F37021] to-[#C2410C]'
                  }`}
                >
                  {/* Inner clipped decorative glow */}
                  <div className="absolute inset-0 rounded-t-3xl overflow-hidden pointer-events-none" aria-hidden="true">
                    <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-white/15 blur-2xl" />
                    <div className="absolute bottom-0 right-0 w-56 h-32 bg-gradient-to-tl from-black/20 to-transparent" />
                  </div>

                  {/* Left: Small Label + Bold White Title */}
                  <div className="relative z-10 max-w-[58%] pb-1">
                    <span className="inline-block font-mono text-[11px] sm:text-xs font-bold uppercase tracking-widest text-white/90 bg-black/20 backdrop-blur-sm px-2.5 py-1 rounded-full mb-3 border border-white/20">
                      {board.label}
                    </span>

                    {isRobotics ? (
                      <h3 className="font-heading font-black text-4xl sm:text-5xl text-white uppercase tracking-tight leading-[0.95] drop-shadow-md">
                        ROBOTICS
                      </h3>
                    ) : (
                      <h3 className="font-heading font-black text-4xl sm:text-5xl text-white uppercase tracking-tight leading-[0.92] drop-shadow-md">
                        <span className="block">DRONE</span>
                        <span className="block">SOCCER</span>
                      </h3>
                    )}
                  </div>

                  {/* Right: Protruding Mascot (head and hands extend above card top edge) */}
                  {!isMascotHidden && (
                    <div className="relative z-20 w-[44%] sm:w-[46%] flex justify-end items-end self-stretch pointer-events-none">
                      <img
                        src={mascotSrc}
                        alt={`Linh vật bảng ${board.title}`}
                        referrerPolicy="no-referrer"
                        onError={() => handleMascotError(board.slug)}
                        className="w-36 h-44 sm:w-44 sm:h-52 -mt-14 sm:-mt-20 object-contain drop-shadow-[0_16px_24px_rgba(0,0,0,0.45)] group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                </div>

                {/* BOTTOM HALF: Dark Navy Content + Chips + Button */}
                <div className="flex-1 rounded-b-3xl bg-[#0A193C] px-6 sm:px-8 py-7 flex flex-col justify-between">
                  <div>
                    <p className="text-sm sm:text-base text-slate-200 font-sans leading-relaxed">
                      {board.description}
                    </p>

                    {/* Info Chips */}
                    <div className="flex flex-wrap items-center gap-2.5 mt-5">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border ${
                          isRobotics
                            ? 'bg-cyan-500/15 border-cyan-400/35 text-[#22E4FF]'
                            : 'bg-orange-500/15 border-orange-400/35 text-orange-300'
                        }`}
                      >
                        <GraduationCap className="w-3.5 h-3.5" />
                        {board.levelChip}
                      </span>

                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-white/10 border border-white/15 text-white">
                        <Users className="w-3.5 h-3.5 text-slate-300" />
                        {board.teamChip}
                      </span>
                    </div>
                  </div>

                  {/* Action Button: "Xem chi tiết →" */}
                  <div className="mt-7 pt-5 border-t border-white/10">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewBoardDetail(board.slug);
                      }}
                      className={`w-full py-3.5 px-6 rounded-full font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-white inline-flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg ${
                        isRobotics
                          ? 'bg-gradient-to-r from-[#14C8D8] to-[#0B5FA5] hover:brightness-110 shadow-[0_0_20px_rgba(20,200,216,0.35)]'
                          : 'bg-gradient-to-r from-[#F37021] to-[#F59E0B] hover:brightness-110 shadow-[0_0_20px_rgba(243,112,33,0.35)]'
                      }`}
                    >
                      <span>Xem chi tiết</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
