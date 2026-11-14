import React, { useState } from 'react';
import {
  BOARD_TABS,
  LINH_VAT_ROBOTICS_URL,
  LINH_VAT_DRONE_URL,
  RULE_URL_ROBOTICS,
  RULE_URL_DRONE_SIM,
  RULE_URL_DRONE_REAL,
} from '../constants.ts';
import { BoardSlug, BoardTabId, BoardType } from '../types.ts';
import { QrCodeBox } from './QrCodeBox.tsx';
import { PrizeTable, SubAwardsList } from './PrizeTables.tsx';
import {
  ArrowLeft,
  ChevronRight,
  ExternalLink,
  Flame,
  GraduationCap,
  Users,
  ShieldAlert,
  Cpu,
  Gamepad2,
  ShieldCheck,
  Calendar,
  Award,
  CheckCircle2,
} from 'lucide-react';

interface BoardDetailPageProps {
  boardSlug: BoardSlug;
  activeTab: BoardTabId;
  onNavigateHome: () => void;
  onSelectBoardAndTab: (slug: BoardSlug, tab: BoardTabId) => void;
  onOpenRegister: (board: BoardType) => void;
}

export const BoardDetailPage: React.FC<BoardDetailPageProps> = ({
  boardSlug,
  activeTab,
  onNavigateHome,
  onSelectBoardAndTab,
  onOpenRegister,
}) => {
  const [hiddenImages, setHiddenImages] = useState<Record<string, boolean>>({});
  const isRobotics = boardSlug === 'robotics';

  const tabs = BOARD_TABS[boardSlug];
  const resolvedTab = tabs.some((t) => t.id === activeTab)
    ? activeTab
    : tabs[0]?.id || 'gioi-thieu';
  const currentTabItem = tabs.find((t) => t.id === resolvedTab) || tabs[0];

  const boardTitle = isRobotics ? 'ROBOTICS' : 'DRONE SOCCER';
  const boardType: BoardType = isRobotics ? 'Robotics' : 'Drone Soccer';
  const mascotUrl = isRobotics ? LINH_VAT_ROBOTICS_URL : LINH_VAT_DRONE_URL;
  const fanrocUrl = isRobotics ? 'https://fanroc.vn/#robotics' : 'https://fanroc.vn/#drone';

  const hideImage = (key: string) => {
    setHiddenImages((prev) => ({ ...prev, [key]: true }));
  };

  const handleToggleBoard = (nextSlug: BoardSlug) => {
    if (nextSlug === boardSlug) return;
    const targetTabs = BOARD_TABS[nextSlug];
    const nextTab = targetTabs.some((t) => t.id === resolvedTab)
      ? resolvedTab
      : targetTabs[0]?.id || 'gioi-thieu';
    onSelectBoardAndTab(nextSlug, nextTab);
  };

  return (
    <div className="min-h-screen bg-[#05070D] pt-24 pb-20 relative overflow-hidden">
      <div className="absolute inset-0 tech-grid-pattern opacity-20 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        {/* Top Back Button + Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <button
            type="button"
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/15 text-sm text-white font-sans transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#22E4FF]" />
            <span>Về trang chủ</span>
          </button>

          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
            <button
              type="button"
              onClick={onNavigateHome}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Trang chủ
            </button>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>Bảng thi</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className={isRobotics ? 'text-[#22E4FF] font-bold' : 'text-[#F37021] font-bold'}>
              {boardTitle}
            </span>
            {currentTabItem && (
              <>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-white">{currentTabItem.label}</span>
              </>
            )}
          </nav>
        </div>

        {/* 1. Large Centered Segmented Control Toggle (Robotics / Drone Soccer) */}
        <div className="flex justify-center">
          <div
            className="relative inline-grid grid-cols-2 p-1.5 rounded-full bg-[#0A193C] border border-white/15 shadow-2xl w-full max-w-md"
            role="tablist"
            aria-label="Chuyển đổi giữa bảng Robotics và Drone Soccer"
          >
            {/* Sliding Indicator */}
            <div
              className={`absolute top-1.5 bottom-1.5 left-1.5 w-[calc(50%-6px)] rounded-full transition-all duration-300 ease-out shadow-lg ${
                isRobotics
                  ? 'translate-x-0 bg-gradient-to-r from-[#14C8D8] to-[#0B5FA5] shadow-[0_0_24px_rgba(20,200,216,0.45)]'
                  : 'translate-x-full bg-gradient-to-r from-[#F37021] to-[#F59E0B] shadow-[0_0_24px_rgba(243,112,33,0.45)]'
              }`}
              aria-hidden="true"
            />

            {/* Robotics Option */}
            <button
              type="button"
              role="tab"
              aria-selected={isRobotics}
              onClick={() => handleToggleBoard('robotics')}
              className={`relative z-10 flex items-center justify-center gap-2.5 py-3 px-4 rounded-full font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                isRobotics ? 'text-white' : 'text-slate-300 hover:text-white'
              }`}
            >
              {!hiddenImages['toggle-robo'] && (
                <img
                  src={LINH_VAT_ROBOTICS_URL}
                  alt="Linh vật Robotics"
                  referrerPolicy="no-referrer"
                  onError={() => hideImage('toggle-robo')}
                  className="w-7 h-7 rounded-full object-contain bg-white/15 p-0.5 shrink-0"
                />
              )}
              <span>Robotics</span>
            </button>

            {/* Drone Soccer Option */}
            <button
              type="button"
              role="tab"
              aria-selected={!isRobotics}
              onClick={() => handleToggleBoard('drone')}
              className={`relative z-10 flex items-center justify-center gap-2.5 py-3 px-4 rounded-full font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                !isRobotics ? 'text-white' : 'text-slate-300 hover:text-white'
              }`}
            >
              {!hiddenImages['toggle-drone'] && (
                <img
                  src={LINH_VAT_DRONE_URL}
                  alt="Linh vật Drone Soccer"
                  referrerPolicy="no-referrer"
                  onError={() => hideImage('toggle-drone')}
                  className="w-7 h-7 rounded-full object-contain bg-white/15 p-0.5 shrink-0"
                />
              )}
              <span>Drone Soccer</span>
            </button>
          </div>
        </div>

        {/* 2. Board Banner */}
        <div
          className={`relative rounded-3xl overflow-hidden border shadow-2xl p-6 sm:p-10 lg:p-12 transition-colors duration-300 ${
            isRobotics
              ? 'bg-gradient-to-br from-[#0A1F5C] via-[#0B5FA5]/70 to-[#0D3878] border-cyan-400/40'
              : 'bg-gradient-to-br from-[#2B1408] via-[#7C2D12]/80 to-[#0A193C] border-orange-400/40'
          }`}
        >
          {/* Ambient Glow */}
          <div
            className={`pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl opacity-35 ${
              isRobotics ? 'bg-[#14C8D8]' : 'bg-[#F37021]'
            }`}
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center md:text-left">
              <div
                className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full font-mono text-xs font-bold uppercase tracking-widest border mb-4 ${
                  isRobotics
                    ? 'bg-cyan-500/15 border-cyan-400/40 text-[#22E4FF]'
                    : 'bg-orange-500/20 border-orange-400/40 text-orange-300'
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                <span>{isRobotics ? 'BẢNG THI · THCS' : 'BẢNG THI · 3 CẤP HỌC'}</span>
              </div>

              <h1 className="font-heading font-black text-5xl sm:text-6xl lg:text-7xl text-white uppercase tracking-tight leading-[0.95]">
                {boardTitle}
              </h1>

              {/* Chips */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 mt-5">
                <span
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold border ${
                    isRobotics
                      ? 'bg-cyan-500/20 border-cyan-400/40 text-cyan-200'
                      : 'bg-orange-500/20 border-orange-400/40 text-orange-200'
                  }`}
                >
                  <GraduationCap className="w-4 h-4" />
                  {isRobotics ? 'Lớp 6–9' : 'Lớp 3–12'}
                </span>

                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-white/10 border border-white/20 text-white">
                  <Users className="w-4 h-4" />
                  3–4 HS/đội
                </span>
              </div>

              {/* Banner Actions */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-7">
                <button
                  type="button"
                  onClick={() => onOpenRegister(boardType)}
                  className={`px-6 py-3.5 rounded-full font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-white inline-flex items-center gap-2 transition-all cursor-pointer shadow-lg ${
                    isRobotics
                      ? 'bg-gradient-to-r from-[#14C8D8] to-[#0B5FA5] hover:brightness-110 shadow-[0_0_25px_rgba(20,200,216,0.45)]'
                      : 'bg-gradient-to-r from-[#F37021] to-[#F59E0B] hover:brightness-110 shadow-[0_0_25px_rgba(243,112,33,0.45)]'
                  }`}
                >
                  <Flame className="w-4 h-4" />
                  <span>Đăng ký bảng này</span>
                </button>

                <a
                  href={fanrocUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 rounded-full font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 border border-white/25 inline-flex items-center gap-2 transition-colors"
                >
                  <span>Xem trên fanroc.vn</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Large Mascot on the Right */}
            {!hiddenImages[`banner-${boardSlug}`] && (
              <div className="w-48 h-48 sm:w-64 sm:h-64 shrink-0 flex items-center justify-center">
                <img
                  src={mascotUrl}
                  alt={`Linh vật ${boardTitle}`}
                  referrerPolicy="no-referrer"
                  onError={() => hideImage(`banner-${boardSlug}`)}
                  className="w-full h-full object-contain drop-shadow-[0_18px_28px_rgba(0,0,0,0.5)]"
                />
              </div>
            )}
          </div>
        </div>

        {/* 3. 5 Pill Tabs (Horizontally scrollable on mobile) */}
        <div className="overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="inline-flex sm:flex sm:flex-wrap items-center gap-2.5 min-w-max sm:min-w-0">
            {tabs.map((tab) => {
              const isTabActive = tab.id === resolvedTab;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onSelectBoardAndTab(boardSlug, tab.id)}
                  className={`px-5 py-2.5 rounded-full font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap border ${
                    isTabActive
                      ? isRobotics
                        ? 'bg-gradient-to-r from-[#14C8D8] to-[#0B5FA5] text-white border-cyan-300/60 shadow-[0_0_20px_rgba(20,200,216,0.4)]'
                        : 'bg-gradient-to-r from-[#F37021] to-[#F59E0B] text-white border-orange-300/60 shadow-[0_0_20px_rgba(243,112,33,0.4)]'
                      : 'bg-[#0A193C]/80 text-slate-300 border-white/15 hover:text-white hover:border-white/30'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Active Tab Content Panel */}
        <div
          key={`${boardSlug}-${resolvedTab}`}
          className="animate-roadmap-stage rounded-3xl bg-[#0A193C]/90 border border-white/15 p-6 sm:p-8 lg:p-10 shadow-2xl"
        >
          {/* ROBOTICS CONTENT */}
          {isRobotics && resolvedTab === 'gioi-thieu' && (
            <div className="space-y-6">
              <h2 className="font-heading font-black text-3xl text-white uppercase tracking-wide">
                Giới thiệu bảng thi Robotics
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-[#071645] border border-cyan-400/25">
                  <Cpu className="w-6 h-6 text-[#22E4FF] mb-3" />
                  <h3 className="font-bold text-white text-base mb-2">Nhiệm vụ chủ đề Cyan Flames</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Thiết kế, chế tạo và lập trình robot thực hiện nhiệm vụ theo chủ đề Cyan Flames, kèm Hồ sơ kĩ thuật (Engineering Notebook).
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-[#071645] border border-cyan-400/25">
                  <GraduationCap className="w-6 h-6 text-[#22E4FF] mb-3" />
                  <h3 className="font-bold text-white text-base mb-2">Đối tượng dự thi</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Dành cho học sinh cấp THCS (lớp 6–9) thuộc hệ thống FPT Schools.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-[#071645] border border-cyan-400/25">
                  <Users className="w-6 h-6 text-[#22E4FF] mb-3" />
                  <h3 className="font-bold text-white text-base mb-2">Quy mô đội thi</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Mỗi đội 3–4 học sinh cố định xuyên suốt các vòng thi và tối đa 1 mentor.
                  </p>
                </div>
              </div>
            </div>
          )}

          {isRobotics && resolvedTab === 'the-le' && (
            <div className="space-y-6">
              <h2 className="font-heading font-black text-3xl text-white uppercase tracking-wide">
                Thể lệ bảng Robotics
              </h2>
              <ul className="space-y-3.5 text-sm sm:text-base text-slate-200 leading-relaxed">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#22E4FF] shrink-0 mt-0.5" />
                  <span>
                    Thành viên trong đội là học sinh cùng một trường, cùng một cấp học, không thi vượt cấp; thành phần đội giữ cố định xuyên suốt các vòng thi.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#22E4FF] shrink-0 mt-0.5" />
                  <span>
                    Một học sinh chỉ đăng ký một lần, thuộc một đội và một bảng thi duy nhất trong toàn bộ hành trình (không thi đồng thời Robotics và Drone Soccer).
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#22E4FF] shrink-0 mt-0.5" />
                  <span>
                    Mỗi đội cử tối đa 1 huấn luyện viên/mentor (giáo viên hoặc cha mẹ học sinh có đủ năng lực chuyên môn), vai trò đồng hành, hướng dẫn công cụ, hỗ trợ tinh thần và kỹ thuật cơ bản; mentor không trực tiếp điều khiển robot hay can thiệp vào phần thi.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#22E4FF] shrink-0 mt-0.5" />
                  <span>
                    Đội Nhất và Nhì vòng cơ sở tại mỗi điểm thi giành vé vào Chung kết toàn quốc, BTC có thể bổ sung suất wildcard.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-[#FACC15] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">Nộp hồ sơ kỹ thuật bảng Robotics:</strong> 20/03/2027.
                  </span>
                </li>
              </ul>

              <QrCodeBox
                url={RULE_URL_ROBOTICS}
                title="Luật đấu chi tiết · Robotics"
                buttonLabel="Xem luật đấu chi tiết"
                accent="cyan"
              />
            </div>
          )}

          {isRobotics && resolvedTab === 'the-thuc' && (
            <div className="space-y-6">
              <h2 className="font-heading font-black text-3xl text-white uppercase tracking-wide">
                Thể thức thi đấu Robotics
              </h2>
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-[#071645] border border-cyan-400/25">
                  <h3 className="font-bold text-[#22E4FF] text-base mb-1.5">Thi đấu liên minh</h3>
                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                    Một trận là một trận đấu giữa hai liên minh. Vòng cơ sở diễn ra tại các điểm thi.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#071645] border border-cyan-400/25">
                  <h3 className="font-bold text-[#22E4FF] text-base mb-2">
                    Chung kết toàn quốc (dự kiến 26–27/03/2027 tại FPT School Bắc Giang)
                  </h3>
                  <ul className="space-y-2.5 text-sm sm:text-base text-slate-200">
                    <li className="flex items-start gap-2.5">
                      <span className="font-mono text-xs px-2 py-0.5 rounded bg-cyan-500/20 text-[#22E4FF] font-bold shrink-0 mt-0.5">
                        26/03
                      </span>
                      <span>Kiểm tra kỹ thuật, phỏng vấn giải phụ và thi đấu sơ loại.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="font-mono text-xs px-2 py-0.5 rounded bg-cyan-500/20 text-[#22E4FF] font-bold shrink-0 mt-0.5">
                        27/03
                      </span>
                      <span>Thi đấu vòng chung kết.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {isRobotics && resolvedTab === 'giai-thuong' && (
            <div className="space-y-6">
              <h2 className="font-heading font-black text-3xl text-white uppercase tracking-wide">
                Giải thưởng bảng Robotics
              </h2>
              <PrizeTable boardSlug="robotics" />
            </div>
          )}

          {isRobotics && resolvedTab === 'giai-phu' && (
            <div className="space-y-6">
              <h2 className="font-heading font-black text-3xl text-white uppercase tracking-wide">
                Giải phụ bảng Robotics (5 hạng mục)
              </h2>
              <SubAwardsList boardSlug="robotics" />
            </div>
          )}

          {/* DRONE SOCCER CONTENT */}
          {!isRobotics && resolvedTab === 'gioi-thieu' && (
            <div className="space-y-6">
              <h2 className="font-heading font-black text-3xl text-white uppercase tracking-wide">
                Giới thiệu bảng thi Drone Soccer
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-[#071645] border border-orange-400/25">
                  <Gamepad2 className="w-6 h-6 text-[#F37021] mb-3" />
                  <h3 className="font-bold text-white text-base mb-2">Phi công nhí làm chủ bầu trời</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Học sinh hóa thân thành phi công nhí, rèn kỹ năng điều khiển trên môi trường mô phỏng và cả thiết bị thực tế.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-[#071645] border border-orange-400/25">
                  <GraduationCap className="w-6 h-6 text-[#F37021] mb-3" />
                  <h3 className="font-bold text-white text-base mb-2">Hai hình thức theo cấp học</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Dành cho lớp 3–12 với hai hình thức: Mô phỏng (Tiểu học) và Thiết bị thật (THCS, THPT).
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-[#071645] border border-orange-400/25">
                  <Users className="w-6 h-6 text-[#F37021] mb-3" />
                  <h3 className="font-bold text-white text-base mb-2">Quy mô đội thi</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Mỗi đội 3–4 học sinh cố định xuyên suốt các vòng thi và tối đa 1 mentor.
                  </p>
                </div>
              </div>
            </div>
          )}

          {!isRobotics && resolvedTab === 'the-le' && (
            <div className="space-y-6">
              <h2 className="font-heading font-black text-3xl text-white uppercase tracking-wide">
                Thể lệ bảng Drone Soccer
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-slate-200 leading-relaxed">
                <div className="p-5 rounded-2xl bg-[#071645] border border-orange-400/25">
                  <h3 className="font-bold text-orange-300 mb-2">Quy định chung</h3>
                  <p>
                    Các quy định chung giống Robotics: thành viên cùng một trường, cùng một cấp học, không thi vượt cấp; thành phần cố định xuyên suốt các vòng thi; một học sinh chỉ đăng ký một đội, một bảng thi duy nhất; tối đa 1 mentor (giáo viên/cha mẹ học sinh) không trực tiếp điều khiển thiết bị hay can thiệp vào phần thi.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-[#071645] border border-orange-400/25">
                    <h3 className="font-bold text-orange-300 mb-2">Hình thức Mô phỏng (Tiểu học)</h3>
                    <p>03 học sinh thi đấu chính thức mỗi trận, 01 dự bị, 01 HLV/đội.</p>
                  </div>
                  <div className="p-5 rounded-2xl bg-[#071645] border border-orange-400/25">
                    <h3 className="font-bold text-orange-300 mb-2">Hình thức Thiết bị thật (THCS, THPT)</h3>
                    <p>
                      03 vị trí thi đấu: Tiền đạo (Striker), Thủ môn (Keeper), Trung vệ (Sweeper); 01 đội trưởng làm việc với trọng tài.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#071645] border border-orange-400/25">
                  <h3 className="font-bold text-orange-300 mb-2">Thiết bị và tài khoản</h3>
                  <p>
                    Không phải tự mua drone hay phần mềm; vòng loại thi trên phần mềm mô phỏng bằng tài khoản do BTC cơ sở cấp, mỗi tài khoản dành cho 1 người chơi; vòng thiết bị thật dùng drone Class 20 do BTC cung cấp, các đội vào Chung kết cơ sở được xếp lịch bay thử tối thiểu 3 buổi có giáo viên giám sát.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#071645] border border-orange-400/25 flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-[#F37021] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-orange-300 mb-1">An toàn thi đấu</h3>
                    <p>
                      Drone Class 20 nặng dưới 250g, bay trong lồng lưới kín, thí sinh và trọng tài đeo kính bảo hộ, pin LiPo sạc tại trạm có người giám sát.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#071645] border border-orange-400/25 flex items-start gap-3">
                  <Award className="w-5 h-5 text-[#FACC15] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-orange-300 mb-1">Quy định vé Chung kết toàn quốc</h3>
                    <p>
                      Đội Hạng Nhất Chung kết cơ sở của THCS và THPT tại mỗi điểm thi giành vé Chung kết toàn quốc; Tiểu học chỉ thi đến Chung kết cơ sở.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <QrCodeBox
                  url={RULE_URL_DRONE_SIM}
                  title="Hình thức Mô phỏng (Tiểu học)"
                  buttonLabel="Xem luật đấu chi tiết"
                  accent="orange"
                />
                <QrCodeBox
                  url={RULE_URL_DRONE_REAL}
                  title="Hình thức Thiết bị thật (THCS, THPT)"
                  buttonLabel="Xem luật đấu chi tiết"
                  accent="orange"
                />
              </div>
            </div>
          )}

          {!isRobotics && resolvedTab === 'the-thuc' && (
            <div className="space-y-6">
              <h2 className="font-heading font-black text-3xl text-white uppercase tracking-wide">
                Thể thức thi đấu Drone Soccer
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Column 1: Mô phỏng */}
                <div className="p-6 rounded-2xl bg-[#071645] border border-orange-400/35 space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 font-mono text-xs font-bold uppercase">
                    <Gamepad2 className="w-3.5 h-3.5" />
                    Mô phỏng
                  </div>
                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                    Thi đấu với Bot NPC (mỗi lượt một thí sinh đấu 1x1 với Bot NPC) hoặc đối kháng trên nền tảng mô phỏng 3D theo thể thức BO3 (tối đa 3 hiệp, mỗi hiệp 3 phút, thắng trước 2 hiệp thì thắng trận; hòa thì hiệp phụ 1 phút rồi luân lưu penalty 1v1, 15 giây).
                  </p>
                </div>

                {/* Column 2: Thiết bị thật */}
                <div className="p-6 rounded-2xl bg-[#071645] border border-orange-400/35 space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 font-mono text-xs font-bold uppercase">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Thiết bị thật
                  </div>
                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                    Các đội đối kháng 3×3 bằng Drone Class 20 trong lồng lưới kín, một trận gồm tối đa 3 hiệp, mỗi hiệp 3 phút.
                  </p>
                </div>
              </div>
            </div>
          )}

          {!isRobotics && resolvedTab === 'giai-thuong' && (
            <div className="space-y-6">
              <h2 className="font-heading font-black text-3xl text-white uppercase tracking-wide">
                Giải thưởng bảng Drone Soccer
              </h2>
              <PrizeTable boardSlug="drone" />
            </div>
          )}

          {!isRobotics && resolvedTab === 'giai-phu' && (
            <div className="space-y-6">
              <h2 className="font-heading font-black text-3xl text-white uppercase tracking-wide">
                Giải phụ bảng Drone Soccer (2 hạng mục)
              </h2>
              <SubAwardsList boardSlug="drone" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
