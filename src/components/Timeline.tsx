import React, { useMemo, useState } from 'react';
import {
  PenLine,
  Flag,
  Calendar,
  Trophy,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export interface RoadmapStage {
  step: '01' | '02' | '03' | '04';
  shortTitle: string;
  title: string;
  dateRange: string;
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  icon: 'pen' | 'flag' | 'calendar' | 'trophy';
  items: [string, string, string];
}

export const ROADMAP: RoadmapStage[] = [
  {
    step: '01',
    shortTitle: 'Đăng ký & đào tạo',
    title: 'ĐĂNG KÝ & ĐÀO TẠO',
    dateRange: '13/11 – 20/12/2026',
    startDate: '2026-11-13',
    endDate: '2026-12-20',
    icon: 'pen',
    items: [
      'Phát động, mở cổng đăng ký 13/11',
      'Hạn đăng ký 05/12, chốt danh sách 05–10/12',
      'Đào tạo trực tuyến đợt 1 từ 10/12',
    ],
  },
  {
    step: '02',
    shortTitle: 'Vòng thi cơ sở',
    title: 'VÒNG THI CƠ SỞ',
    dateRange: '12/2026 – 28/02/2027',
    startDate: '2026-12-21',
    endDate: '2027-02-28',
    icon: 'flag',
    items: [
      'Thi các vòng loại cơ sở: 12/2026 – 1/2027',
      'Vòng chung kết cơ sở: 1–2/2027',
      'Chung kết cơ sở kết thúc chậm nhất 28/02, chọn vé CKTQ',
    ],
  },
  {
    step: '03',
    shortTitle: 'Chuẩn bị chung kết',
    title: 'CHUẨN BỊ CHUNG KẾT',
    dateRange: '03/03 – 25/03/2027',
    startDate: '2027-03-03',
    endDate: '2027-03-25',
    icon: 'calendar',
    items: [
      'Công bố danh sách và suất wildcard: 03–05/03',
      'Đào tạo trực tuyến đợt 2: 08–20/03',
      'Nộp hồ sơ kỹ thuật bảng Robotics: 20/03',
    ],
  },
  {
    step: '04',
    shortTitle: 'Chung kết toàn quốc',
    title: 'CHUNG KẾT TOÀN QUỐC',
    dateRange: 'Dự kiến 26 – 27/03/2027',
    startDate: '2027-03-26',
    endDate: '2027-03-27',
    icon: 'trophy',
    items: [
      'Kiểm tra kỹ thuật, phỏng vấn giải phụ và thi đấu sơ loại: 26/03',
      'Thi đấu vòng chung kết Robotics & Drone Soccer: 27/03',
      'Trao giải tại FPT School Bắc Giang',
    ],
  },
];

type StageStatus = 'ongoing' | 'upcoming' | 'ended';

interface ComputedStageInfo {
  status: StageStatus;
  daysUntilStart: number;
  progressWithinStage: number; // 0 to 1
}

function parseLocalDate(yyyyMmDd: string): Date {
  const [y, m, d] = yyyyMmDd.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function getTodayLocalMidnight(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function computeStageStatus(stage: RoadmapStage, today: Date): ComputedStageInfo {
  const start = parseLocalDate(stage.startDate);
  const end = parseLocalDate(stage.endDate);
  const msPerDay = 1000 * 60 * 60 * 24;

  if (today.getTime() < start.getTime()) {
    const daysUntilStart = Math.ceil((start.getTime() - today.getTime()) / msPerDay);
    return {
      status: 'upcoming',
      daysUntilStart,
      progressWithinStage: 0,
    };
  }

  if (today.getTime() > end.getTime()) {
    return {
      status: 'ended',
      daysUntilStart: 0,
      progressWithinStage: 1,
    };
  }

  const totalDays = Math.max(1, (end.getTime() - start.getTime()) / msPerDay + 1);
  const elapsedDays = (today.getTime() - start.getTime()) / msPerDay + 1;
  const rawProgress = Math.min(1, Math.max(0.25, elapsedDays / totalDays));

  return {
    status: 'ongoing',
    daysUntilStart: 0,
    progressWithinStage: rawProgress,
  };
}

function renderStageIcon(icon: RoadmapStage['icon'], className = 'w-4 h-4') {
  switch (icon) {
    case 'pen':
      return <PenLine className={className} />;
    case 'flag':
      return <Flag className={className} />;
    case 'calendar':
      return <Calendar className={className} />;
    case 'trophy':
      return <Trophy className={className} />;
  }
}

interface TimelineProps {
  onOpenRegister?: () => void;
}

export const Timeline: React.FC<TimelineProps> = () => {
  const { stageInfos, ongoingIndex, defaultSelectedIndex, progressLinePercent } = useMemo(() => {
    const today = getTodayLocalMidnight();
    const infos = ROADMAP.map((stage) => computeStageStatus(stage, today));

    const activeOngoingIdx = infos.findIndex((info) => info.status === 'ongoing');
    let initialIdx = activeOngoingIdx;

    if (initialIdx === -1) {
      const firstUpcoming = infos.findIndex((info) => info.status === 'upcoming');
      initialIdx = firstUpcoming !== -1 ? firstUpcoming : ROADMAP.length - 1;
    }

    // Calculate yellow progress percentage along the 3-segment track (0% at stage 1 center -> 100% at stage 4 center)
    let progressPct = 0;
    if (activeOngoingIdx !== -1) {
      if (activeOngoingIdx === ROADMAP.length - 1) {
        progressPct = 100;
      } else {
        const withinSegment = Math.min(0.85, Math.max(0.25, infos[activeOngoingIdx].progressWithinStage));
        progressPct = ((activeOngoingIdx + withinSegment) / (ROADMAP.length - 1)) * 100;
      }
    } else {
      const endedCount = infos.filter((info) => info.status === 'ended').length;
      if (endedCount === 0) {
        progressPct = 0;
      } else if (endedCount >= ROADMAP.length) {
        progressPct = 100;
      } else {
        progressPct = ((endedCount - 0.15) / (ROADMAP.length - 1)) * 100;
      }
    }

    return {
      stageInfos: infos,
      ongoingIndex: activeOngoingIdx,
      defaultSelectedIndex: initialIdx,
      progressLinePercent: Math.min(100, Math.max(0, progressPct)),
    };
  }, []);

  const [selectedIndex, setSelectedIndex] = useState<number>(defaultSelectedIndex);

  const currentStage = ROADMAP[selectedIndex];
  const currentInfo = stageInfos[selectedIndex];

  const handlePrev = () => {
    setSelectedIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => Math.min(ROADMAP.length - 1, prev + 1));
  };

  return (
    <section
      id="lo-trinh"
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Anchor alias so existing #timeline nav link scrolls directly here */}
      <div id="timeline" className="absolute top-0 left-0 pointer-events-none" aria-hidden="true" />

      <div className="max-w-6xl mx-auto">
        {/* Large Rounded Navy Gradient Container */}
        <div
          className="relative rounded-[28px] sm:rounded-[36px] bg-gradient-to-br from-[#0A1F5C] via-[#103497] to-[#1B4FD8] border border-cyan-400/35 shadow-[0_0_50px_rgba(34,228,255,0.16),0_25px_60px_rgba(0,0,0,0.55)] p-6 sm:p-10 lg:p-14 overflow-hidden"
        >
          {/* Ambient radial cyan glow inside the container */}
          <div
            className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[560px] h-[260px] rounded-full bg-[#22E4FF]/15 blur-3xl"
            aria-hidden="true"
          />

          {/* Header: Pill + Centered 2-line Heading */}
          <div className="relative z-10 text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-cyan-300/35 text-cyan-200 font-mono text-xs uppercase tracking-widest font-semibold mb-4 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22E4FF]" />
              <span>Lộ trình mùa giải</span>
            </div>

            <h2 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight leading-[1.08] text-white">
              <span className="block">
                4 CHẶNG TỪ <span className="text-[#22E4FF]">ĐĂNG KÝ ĐẾN</span>
              </span>
              <span className="block text-[#22E4FF]">CHUNG KẾT</span>
            </h2>
          </div>

          {/* Horizontal Stepper (scrollable horizontally on narrow phones) */}
          <div className="relative z-10 mb-8 sm:mb-10 overflow-x-auto pb-2 -mx-2 px-2">
            <div className="relative min-w-[600px] sm:min-w-0">
              {/* Connecting Track Line (from center of stage 1 to center of stage 4) */}
              <div
                className="absolute top-[64px] sm:top-[72px] left-[12.5%] right-[12.5%] h-[2px] bg-sky-200/25 pointer-events-none"
                aria-hidden="true"
              >
                {/* Passed Yellow Segment */}
                <div
                  className="h-[3px] -top-[0.5px] relative bg-[#FACC15] shadow-[0_0_12px_rgba(250,204,21,0.7)] transition-all duration-500"
                  style={{ width: `${progressLinePercent}%` }}
                >
                  {/* Yellow Progress Endpoint Dot */}
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 rounded-full bg-[#FACC15] ring-2 ring-[#0A1F5C] shadow-[0_0_10px_#FACC15]" />
                </div>
              </div>

              {/* 4 Equal Step Columns */}
              <div className="grid grid-cols-4 gap-2 sm:gap-4 relative z-10">
                {ROADMAP.map((stage, index) => {
                  const isSelected = index === selectedIndex;
                  const isActuallyOngoing = index === ongoingIndex;
                  const isFinalStage = stage.step === '04';

                  return (
                    <button
                      key={stage.step}
                      type="button"
                      onClick={() => setSelectedIndex(index)}
                      className="group flex flex-col items-center text-center focus:outline-none cursor-pointer"
                      aria-current={isSelected ? 'step' : undefined}
                      aria-label={`Chặng ${stage.step}: ${stage.shortTitle} (${stage.dateRange})`}
                    >
                      {/* Reserved space above button for "ĐANG DIỄN RA" pill */}
                      <div className="h-8 flex items-center justify-center mb-1">
                        {isActuallyOngoing && (
                          <span className="px-2.5 py-0.5 rounded-full bg-[#F37021] text-white font-mono text-[10px] font-bold uppercase tracking-wider shadow-[0_0_12px_rgba(243,112,33,0.65)] whitespace-nowrap">
                            ĐANG DIỄN RA
                          </span>
                        )}
                      </div>

                      {/* Circular Step Button */}
                      <div className="relative flex items-center justify-center h-20 w-20 sm:h-22 sm:w-22">
                        <div
                          className={`relative rounded-full flex items-center justify-center transition-all duration-300 border-2 ${
                            isSelected ? 'w-16 h-16 sm:w-20 sm:h-20 scale-105' : 'w-14 h-14 sm:w-16 sm:h-16 group-hover:scale-105'
                          } ${
                            isFinalStage
                              ? `bg-[#F37021] border-[#FF9E5E] text-white ${
                                  isSelected
                                    ? 'shadow-[0_0_28px_rgba(34,228,255,0.65),0_0_24px_rgba(243,112,33,0.7)] ring-4 ring-[#22E4FF]/35'
                                    : 'shadow-[0_0_18px_rgba(243,112,33,0.45)]'
                                }`
                              : isSelected
                              ? 'bg-[#10389F] border-[#22E4FF] text-white shadow-[0_0_28px_rgba(34,228,255,0.7)] ring-4 ring-[#22E4FF]/30'
                              : 'bg-[#0C2774] border-cyan-300/50 text-white/90 group-hover:border-[#22E4FF]'
                          }`}
                        >
                          <span
                            className={`font-heading font-black italic tracking-tight leading-none ${
                              isSelected ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
                            }`}
                          >
                            {stage.step}
                          </span>

                          {/* Bottom-Right White Icon Badge */}
                          <span
                            className="absolute -bottom-1 -right-1 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white text-[#0A1F5C] shadow-md flex items-center justify-center border border-sky-100"
                            aria-hidden="true"
                          >
                            {renderStageIcon(stage.icon, 'w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]')}
                          </span>
                        </div>
                      </div>

                      {/* Stage Title & Date Below Button */}
                      <div className="mt-2.5 px-1">
                        <div
                          className={`font-sans text-xs sm:text-sm md:text-base font-bold leading-snug transition-colors ${
                            isSelected ? 'text-white' : 'text-white/90 group-hover:text-white'
                          }`}
                        >
                          {stage.shortTitle}
                        </div>
                        <div
                          className={`font-mono text-[10px] sm:text-xs mt-1 transition-colors ${
                            isSelected ? 'text-[#FACC15] font-bold' : 'text-sky-200/75'
                          }`}
                        >
                          {stage.dateRange}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Detail Card */}
          <div className="relative z-10 rounded-2xl sm:rounded-3xl overflow-hidden border border-cyan-300/30 shadow-2xl bg-[#071645]/95">
            <div
              key={currentStage.step}
              className="animate-roadmap-stage flex flex-col md:flex-row min-h-[300px]"
            >
              {/* Left 1/4 Panel: Lighter blue with diagonal sheen, circular icon & giant gradient number */}
              <div className="md:w-1/4 bg-gradient-to-br from-[#2362FA] via-[#174BD6] to-[#0D2F94] p-6 sm:p-8 flex flex-row md:flex-col items-center justify-between md:justify-center gap-4 relative overflow-hidden border-b md:border-b-0 md:border-r border-white/15">
                {/* Diagonal Light Streak */}
                <div
                  className="pointer-events-none absolute -top-1/2 -left-1/4 w-[160%] h-24 bg-gradient-to-r from-transparent via-white/15 to-transparent -rotate-25"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute -bottom-1/3 -right-1/4 w-[140%] h-20 bg-gradient-to-r from-transparent via-cyan-300/15 to-transparent -rotate-25"
                  aria-hidden="true"
                />

                {/* Top Icon inside Thin-Bordered Circle */}
                <div className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm flex items-center justify-center text-white shadow-inner">
                  {renderStageIcon(currentStage.icon, 'w-6 h-6 sm:w-7 sm:h-7 stroke-[2]')}
                </div>

                {/* Giant Gradient Stage Number */}
                <div className="relative z-10 font-heading font-black italic text-6xl sm:text-7xl lg:text-8xl leading-none bg-gradient-to-b from-white via-cyan-100 to-[#22E4FF] bg-clip-text text-transparent select-none md:mt-4 pr-2">
                  {currentStage.step}
                </div>
              </div>

              {/* Right 3/4 Panel: Stage Details + Watermark SVG + Status & Arrows */}
              <div className="md:w-3/4 p-6 sm:p-8 lg:p-10 relative overflow-hidden flex flex-col justify-between">
                {/* Faint Custom FAnRoC Flame / Emblem Watermark SVG on the Right */}
                <svg
                  className="pointer-events-none select-none absolute -right-8 top-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 text-[#22E4FF] opacity-[0.06]"
                  viewBox="0 0 200 200"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  {/* Outer Flame Silhouette */}
                  <path
                    d="M108 14C108 14 148 48 152 92C155 125 135 162 100 176C65 162 45 128 48 94C51 64 74 44 74 44C74 44 70 72 86 84C82 54 108 14 108 14Z"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="currentColor"
                    fillOpacity="0.35"
                  />
                  {/* Inner Cyan Core Flame */}
                  <path
                    d="M104 68C104 68 128 92 126 118C124 140 112 154 100 160C88 154 76 140 75 119C74 100 90 84 90 84C90 84 90 100 99 106C98 88 104 68 104 68Z"
                    fill="currentColor"
                    fillOpacity="0.5"
                  />
                  {/* Tech Circuit Orbit & Nodes */}
                  <circle cx="100" cy="112" r="78" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 6" />
                  <circle cx="100" cy="34" r="4" fill="currentColor" />
                  <circle cx="168" cy="148" r="4" fill="currentColor" />
                  <circle cx="32" cy="148" r="4" fill="currentColor" />
                </svg>

                {/* Top Details */}
                <div className="relative z-10">
                  <div className="font-mono text-xs font-bold uppercase tracking-widest text-[#22E4FF] mb-2">
                    CHẶNG {currentStage.step} / 04
                  </div>

                  <h3 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white uppercase tracking-tight leading-[1.05]">
                    {currentStage.title}
                  </h3>

                  {/* Orange Date Chip */}
                  <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F37021] text-white text-xs sm:text-sm font-semibold shadow-md">
                    <Calendar className="w-4 h-4 shrink-0" />
                    <span>{currentStage.dateRange}</span>
                  </div>

                  {/* Exact 3 Milestones List */}
                  <ul className="mt-6 space-y-3.5">
                    {currentStage.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3.5">
                        <span className="w-7 h-7 rounded-lg bg-[#22E4FF]/15 border border-[#22E4FF]/40 text-[#22E4FF] font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="text-sm sm:text-base text-slate-100 font-sans leading-relaxed pt-0.5">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Row: Auto-calculated Status + Prev/Next Circular Buttons */}
                <div className="relative z-10 mt-8 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  {/* Status Indicator */}
                  <div className="flex items-center gap-2.5">
                    {currentInfo.status === 'ongoing' && (
                      <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/45 text-emerald-300 font-sans text-xs font-semibold">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        Đang diễn ra
                      </span>
                    )}

                    {currentInfo.status === 'upcoming' && (
                      <>
                        <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F37021]/20 border border-[#F37021]/50 text-orange-300 font-sans text-xs font-semibold">
                          <span className="w-2 h-2 rounded-full bg-[#F37021]" />
                          Sắp diễn ra
                        </span>
                        <span className="text-xs font-sans text-slate-300 font-medium">
                          Còn {currentInfo.daysUntilStart} ngày
                        </span>
                      </>
                    )}

                    {currentInfo.status === 'ended' && (
                      <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-500/20 border border-slate-400/35 text-slate-300 font-sans text-xs font-semibold">
                        <span className="w-2 h-2 rounded-full bg-slate-400" />
                        Đã kết thúc
                      </span>
                    )}
                  </div>

                  {/* Prev / Next Circular Navigation Arrows */}
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={handlePrev}
                      disabled={selectedIndex === 0}
                      className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                        selectedIndex === 0
                          ? 'border-white/15 bg-white/5 text-white/30 opacity-40 cursor-not-allowed'
                          : 'border-cyan-300/40 bg-white/10 hover:bg-[#22E4FF] hover:text-[#0A1F5C] hover:border-[#22E4FF] text-white cursor-pointer'
                      }`}
                      aria-label="Chặng trước"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={selectedIndex === ROADMAP.length - 1}
                      className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                        selectedIndex === ROADMAP.length - 1
                          ? 'border-white/15 bg-white/5 text-white/30 opacity-40 cursor-not-allowed'
                          : 'border-cyan-300/40 bg-white/10 hover:bg-[#22E4FF] hover:text-[#0A1F5C] hover:border-[#22E4FF] text-white cursor-pointer'
                      }`}
                      aria-label="Chặng tiếp theo"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
