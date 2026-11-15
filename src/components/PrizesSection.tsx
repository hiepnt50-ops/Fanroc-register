import React, { useState } from 'react';
import { BoardSlug } from '../types.ts';
import { PrizeTable, SubAwardsList } from './PrizeTables.tsx';
import { Trophy } from 'lucide-react';

export const PrizesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<BoardSlug>('robotics');

  return (
    <section
      id="giai-thuong"
      className="py-20 md:py-28 bg-[#05070D] border-b border-white/10 relative overflow-hidden"
    >
      <div className="absolute inset-0 tech-grid-subtle opacity-20 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0066B3]/20 border border-[#22E4FF]/40 text-[#22E4FF] font-mono text-xs uppercase tracking-widest font-bold mb-4">
            <Trophy className="w-3.5 h-3.5 text-[#FACC15]" />
            <span>Cơ cấu giải thưởng</span>
          </div>

          <h2 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl text-white uppercase tracking-tight leading-[1.08]">
            VINH DANH TÀI NĂNG &amp; <span className="text-[#22E4FF]">HỌC BỔNG</span>
          </h2>

          <p className="text-sm sm:text-base text-neutral-300 font-sans mt-4">
            Tổng giá trị giải thưởng tiền mặt và học bổng FPT Schools dành cho các đội thi xuất sắc tại Chung kết toàn quốc.
          </p>
        </div>

        {/* Tabs: "Robotics · THCS" / "Drone Soccer · Lớp 3–12" */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-full bg-[#0A193C] border border-white/15 shadow-lg gap-1.5">
            <button
              type="button"
              onClick={() => setActiveTab('robotics')}
              className={`px-5 sm:px-7 py-2.5 rounded-full font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'robotics'
                  ? 'bg-gradient-to-r from-[#14C8D8] to-[#0B5FA5] text-white shadow-[0_0_20px_rgba(20,200,216,0.4)]'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              Robotics · THCS
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('drone')}
              className={`px-5 sm:px-7 py-2.5 rounded-full font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'drone'
                  ? 'bg-gradient-to-r from-[#F37021] to-[#F59E0B] text-white shadow-[0_0_20px_rgba(243,112,33,0.4)]'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              Drone Soccer · Lớp 3–12
            </button>
          </div>
        </div>

        {/* Shared Prize Table & Sub-awards
        <div key={activeTab} className="space-y-10 animate-roadmap-stage">
          <PrizeTable boardSlug={activeTab} />
          <SubAwardsList boardSlug={activeTab} />
        </div> */}
      </div>
    </section>
  );
};
