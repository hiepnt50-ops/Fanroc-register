import React from 'react';
import {
  ROBOTICS_PRIZES,
  ROBOTICS_SUB_AWARDS,
  DRONE_PRIZES,
  DRONE_SUB_AWARDS,
} from '../constants.ts';
import { BoardSlug, PrizeRow, SubAwardItem } from '../types.ts';
import { Award, Sparkles, GraduationCap } from 'lucide-react';

interface PrizeTableProps {
  boardSlug: BoardSlug;
}

export const PrizeTable: React.FC<PrizeTableProps> = ({ boardSlug }) => {
  const isRobotics = boardSlug === 'robotics';
  const rows: PrizeRow[] = isRobotics ? ROBOTICS_PRIZES : DRONE_PRIZES;

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-2xl border border-white/15 bg-[#081538]/90 shadow-xl">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr
              className={`border-b border-white/15 font-mono text-xs uppercase tracking-wider ${
                isRobotics ? 'bg-[#0B5FA5]/40 text-[#22E4FF]' : 'bg-[#F37021]/20 text-orange-300'
              }`}
            >
              <th className="py-4 px-5 font-bold">Giải</th>
              <th className="py-4 px-4 font-bold text-center whitespace-nowrap">Số giải</th>
              <th className="py-4 px-5 font-bold">Tiền thưởng/giải</th>
              <th className="py-4 px-5 font-bold">Học bổng</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10 text-sm font-sans">
            {rows.map((row, idx) => (
              <tr
                key={idx}
                className={`transition-colors ${
                  row.isSpecial
                    ? 'bg-gradient-to-r from-[#22E4FF]/15 via-[#0B5FA5]/20 to-transparent'
                    : 'hover:bg-white/5'
                }`}
              >
                <td className="py-4 px-5">
                  <div className="flex items-start gap-2.5">
                    {row.isSpecial && (
                      <Sparkles className="w-4 h-4 text-[#FACC15] shrink-0 mt-0.5" />
                    )}
                    <div>
                      <span
                        className={`font-bold ${
                          row.isSpecial
                            ? 'text-[#FACC15]'
                            : isRobotics
                            ? 'text-white'
                            : 'text-white'
                        }`}
                      >
                        {row.rank}
                      </span>
                      <span className="text-slate-300"> – {row.awardName}</span>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-center font-mono font-bold text-white">
                  {row.count}
                </td>
                <td
                  className={`py-4 px-5 font-semibold ${
                    isRobotics ? 'text-[#22E4FF]' : 'text-orange-300'
                  }`}
                >
                  {row.cashPrize}
                </td>
                <td className="py-4 px-5">
                  {row.scholarship !== '–' ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/35 text-emerald-300 text-xs font-medium">
                      <GraduationCap className="w-3.5 h-3.5 shrink-0" />
                      {row.scholarship}
                    </span>
                  ) : (
                    <span className="text-slate-500 font-mono">–</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Exact Footnotes */}
      <div className="space-y-1.5 text-xs sm:text-sm text-slate-300 font-sans px-1">
        {!isRobotics && (
          <p className="flex items-start gap-2">
            <span className="text-[#F37021] font-bold">•</span>
            <span>Mỗi cấp THCS và THPT có 01 giải Nhất, Nhì, Ba, Khuyến khích.</span>
          </p>
        )}
        <p className="flex items-start gap-2">
          <span className={isRobotics ? 'text-[#22E4FF] font-bold' : 'text-[#F37021] font-bold'}>•</span>
          <span>
            Học bổng tính theo % học phí FPT Schools, áp dụng cho mọi thành viên trong đội, không quy đổi thành tiền mặt.
          </span>
        </p>
      </div>
    </div>
  );
};

interface SubAwardsListProps {
  boardSlug: BoardSlug;
}

export const SubAwardsList: React.FC<SubAwardsListProps> = ({ boardSlug }) => {
  const isRobotics = boardSlug === 'robotics';
  const items: SubAwardItem[] = isRobotics ? ROBOTICS_SUB_AWARDS : DRONE_SUB_AWARDS;

  return (
    <div className="space-y-4">
      <div
        className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider border ${
          isRobotics
            ? 'bg-cyan-500/15 border-cyan-400/35 text-[#22E4FF]'
            : 'bg-orange-500/15 border-orange-400/35 text-orange-300'
        }`}
      >
        <Award className="w-3.5 h-3.5" />
        <span>
          {isRobotics
            ? 'Giải phụ Robotics · Mỗi hạng mục 2 giải · 3.000.000đ/giải'
            : 'Giải phụ Drone Soccer · Mỗi hạng mục 2 giải · 3.000.000đ/giải'}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item, idx) => (
          <div
            key={idx}
            className={`p-5 rounded-2xl border bg-[#081538]/90 transition-colors ${
              isRobotics
                ? 'border-cyan-400/25 hover:border-cyan-400/50'
                : 'border-orange-400/25 hover:border-orange-400/50'
            }`}
          >
            <div className="flex items-start gap-3">
              <span
                className={`w-7 h-7 rounded-lg font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 border ${
                  isRobotics
                    ? 'bg-cyan-400/15 border-cyan-400/35 text-[#22E4FF]'
                    : 'bg-orange-400/15 border-orange-400/35 text-orange-300'
                }`}
              >
                {idx + 1}
              </span>
              <div>
                <h4 className="font-sans font-bold text-base text-white">{item.title}</h4>
                <div
                  className={`font-mono text-[11px] uppercase tracking-wider mt-0.5 ${
                    isRobotics ? 'text-[#22E4FF]/85' : 'text-orange-300/85'
                  }`}
                >
                  {item.englishTitle}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 font-sans mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
