import React, { useState, useEffect } from 'react';
import {
  BoardType,
  SchoolLevel,
  CompetitionCategory,
  TeamMember,
  ExcelExportRow,
  RegistrationSuccessData,
} from '../types.ts';
import {
  APPS_SCRIPT_URL,
  TEAM_RULES,
  VALID_BOARD_MATRIX,
  GRADES_BY_LEVEL,
  PROVINCES_OF_VIETNAM,
} from '../constants.ts';
import {
  X,
  UserPlus,
  Trash2,
  CheckCircle2,
  Download,
  Flame,
  RotateCcw,
  Info,
  UserCheck,
  GraduationCap,
  Users,
} from 'lucide-react';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialBoard?: BoardType;
}

interface CoachData {
  hasCoach: boolean;
  fullName: string;
  birthDate: string;
  phone: string;
  email: string;
  roleType: 'Giáo viên hướng dẫn' | 'Phụ huynh';
  notes: string;
}

interface StudentData {
  id: string;
  role: 'Đội trưởng' | 'Thành viên';
  fullName: string;
  birthDate: string;
  grade: string;
  phone: string;
  email: string;
  notes: string;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  initialBoard = 'Robotics',
}) => {
  const [board, setBoard] = useState<BoardType>(initialBoard);
  const [schoolLevel, setSchoolLevel] = useState<SchoolLevel>('THCS');
  const [category, setCategory] = useState<CompetitionCategory>('Nội bộ (FPT Schools)');
  const [teamName, setTeamName] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [province, setProvince] = useState(PROVINCES_OF_VIETNAM[0]);
  const [committed, setCommitted] = useState(false);

  // Dedicated Coach / Mentor Section
  const [coach, setCoach] = useState<CoachData>({
    hasCoach: true,
    fullName: '',
    birthDate: '',
    phone: '',
    email: '',
    roleType: 'Giáo viên hướng dẫn',
    notes: '',
  });

  // Students list (Captain + Members)
  const [students, setStudents] = useState<StudentData[]>([
    {
      id: 'student-captain',
      role: 'Đội trưởng',
      fullName: '',
      birthDate: '',
      grade: 'Lớp 6',
      phone: '',
      email: '',
      notes: '',
    },
    {
      id: 'student-member-1',
      role: 'Thành viên',
      fullName: '',
      birthDate: '',
      grade: 'Lớp 6',
      phone: '',
      email: '',
      notes: '',
    },
  ]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState<RegistrationSuccessData | null>(null);

  // Sync initialBoard prop when opening
  useEffect(() => {
    if (isOpen) {
      setBoard(initialBoard);
      const validLevels = VALID_BOARD_MATRIX[initialBoard].levels;
      const targetLevel = validLevels.includes(schoolLevel) ? schoolLevel : validLevels[0];
      setSchoolLevel(targetLevel);
      const validCats = VALID_BOARD_MATRIX[initialBoard].categoriesByLevel[targetLevel];
      setCategory(validCats[0]);
      setSuccessData(null);
      setErrors({});
    }
  }, [isOpen, initialBoard]);

  // Adjust level & category if board changes
  const handleBoardChange = (newBoard: BoardType) => {
    setBoard(newBoard);
    const validLevels = VALID_BOARD_MATRIX[newBoard].levels;
    let newLevel = schoolLevel;
    if (!validLevels.includes(schoolLevel)) {
      newLevel = validLevels[0];
      setSchoolLevel(newLevel);
    }
    const validCats = VALID_BOARD_MATRIX[newBoard].categoriesByLevel[newLevel];
    if (!validCats.includes(category)) {
      setCategory(validCats[0]);
    }
    const defaultGrade = GRADES_BY_LEVEL[newLevel][0];
    setStudents((prev) => prev.map((s) => ({ ...s, grade: defaultGrade })));
  };

  const handleLevelChange = (newLevel: SchoolLevel) => {
    setSchoolLevel(newLevel);
    const validCats = VALID_BOARD_MATRIX[board].categoriesByLevel[newLevel];
    if (!validCats.includes(category)) {
      setCategory(validCats[0]);
    }
    const defaultGrade = GRADES_BY_LEVEL[newLevel][0];
    // Adjust student count if exceeding THPT limit (max 2)
    const maxStudentsAllowed = TEAM_RULES[newLevel].maxStudents;
    setStudents((prev) => {
      const trimmed = prev.slice(0, maxStudentsAllowed);
      return trimmed.map((s) => ({ ...s, grade: defaultGrade }));
    });
  };

  // Team capacity rules
  const rules = TEAM_RULES[schoolLevel];
  const canAddMoreStudents = students.length < rules.maxStudents;

  const handleAddStudent = () => {
    if (!canAddMoreStudents) return;
    const newStudent: StudentData = {
      id: `student-${Date.now()}`,
      role: 'Thành viên',
      fullName: '',
      birthDate: '',
      grade: GRADES_BY_LEVEL[schoolLevel][0],
      phone: '',
      email: '',
      notes: '',
    };
    setStudents((prev) => [...prev, newStudent]);
  };

  const handleRemoveStudent = (id: string) => {
    if (students.length <= 1) return;
    // Don't allow removing captain unless there's another student
    setStudents((prev) => {
      const filtered = prev.filter((s) => s.id !== id);
      // Ensure at least one captain
      if (filtered.length > 0 && !filtered.some((s) => s.role === 'Đội trưởng')) {
        filtered[0].role = 'Đội trưởng';
      }
      return filtered;
    });
  };

  const handleUpdateStudent = (id: string, field: keyof StudentData, value: string) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id !== id) {
          if (field === 'role' && value === 'Đội trưởng') {
            return { ...s, role: 'Thành viên' as const };
          }
          return s;
        }
        if (field === 'role') {
          return { ...s, role: value as 'Đội trưởng' | 'Thành viên' };
        }
        return { ...s, [field]: value };
      })
    );
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Validation
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!teamName.trim()) {
      newErrors.teamName = 'Vui lòng nhập tên đội thi';
    }
    if (!schoolName.trim()) {
      newErrors.schoolName = 'Vui lòng nhập tên trường học';
    }
    if (!province) {
      newErrors.province = 'Vui lòng chọn Tỉnh/Thành phố';
    }

    const phoneRegex = /^0\d{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate Coach if enabled
    if (coach.hasCoach) {
      if (!coach.fullName.trim()) {
        newErrors.coach_fullName = 'Vui lòng nhập họ tên Huấn luyện viên / Mentor';
      }
      if (!coach.birthDate) {
        newErrors.coach_birthDate = 'Vui lòng chọn ngày sinh Huấn luyện viên';
      } else {
        const birthYear = new Date(coach.birthDate).getFullYear();
        const age = new Date().getFullYear() - birthYear;
        if (age < 18) {
          newErrors.coach_birthDate = 'Huấn luyện viên / Mentor phải từ 18 tuổi trở lên';
        }
      }
      if (!coach.phone.trim()) {
        newErrors.coach_phone = 'Vui lòng nhập số điện thoại Huấn luyện viên';
      } else if (!phoneRegex.test(coach.phone.trim())) {
        newErrors.coach_phone = 'Số điện thoại phải gồm 10 số, bắt đầu bằng 0';
      }
      if (!coach.email.trim()) {
        newErrors.coach_email = 'Vui lòng nhập email Huấn luyện viên';
      } else if (!emailRegex.test(coach.email.trim())) {
        newErrors.coach_email = 'Email không hợp lệ (ví dụ: hlv@example.com)';
      }
    }

    // Role checks for students
    const captainCount = students.filter((s) => s.role === 'Đội trưởng').length;
    if (captainCount !== 1) {
      newErrors.captain = 'Đội thi phải có đúng 1 Đội trưởng';
    }

    if (students.length < rules.minStudents || students.length > rules.maxStudents) {
      newErrors.students = `Cấp ${schoolLevel} yêu cầu từ ${rules.minStudents} đến ${rules.maxStudents} học sinh trong đội (hiện có: ${students.length})`;
    }

    // Validate each student
    students.forEach((s) => {
      const prefix = `student_${s.id}`;
      if (!s.fullName.trim()) {
        newErrors[`${prefix}_fullName`] = 'Vui lòng nhập họ và tên học sinh';
      }
      if (!s.birthDate) {
        newErrors[`${prefix}_birthDate`] = 'Vui lòng chọn ngày sinh';
      } else {
        const birthYear = new Date(s.birthDate).getFullYear();
        if (schoolLevel === 'Tiểu học' && (birthYear < 2013 || birthYear > 2019)) {
          newErrors[`${prefix}_birthDate`] = 'Năm sinh không phù hợp cấp Tiểu học (2013–2019)';
        } else if (schoolLevel === 'THCS' && (birthYear < 2009 || birthYear > 2015)) {
          newErrors[`${prefix}_birthDate`] = 'Năm sinh không phù hợp cấp THCS (2009–2015)';
        } else if (schoolLevel === 'THPT' && (birthYear < 2006 || birthYear > 2012)) {
          newErrors[`${prefix}_birthDate`] = 'Năm sinh không phù hợp cấp THPT (2006–2012)';
        }
      }

      if (!s.grade) {
        newErrors[`${prefix}_grade`] = 'Vui lòng chọn lớp học';
      }

      if (!s.phone.trim()) {
        newErrors[`${prefix}_phone`] = 'Vui lòng nhập số điện thoại';
      } else if (!phoneRegex.test(s.phone.trim())) {
        newErrors[`${prefix}_phone`] = 'Số điện thoại phải gồm 10 số, bắt đầu bằng 0';
      }

      if (!s.email.trim()) {
        newErrors[`${prefix}_email`] = 'Vui lòng nhập email';
      } else if (!emailRegex.test(s.email.trim())) {
        newErrors[`${prefix}_email`] = 'Email không hợp lệ (ví dụ: hocsinh@example.com)';
      }
    });

    if (!committed) {
      newErrors.committed = 'Vui lòng cam kết tính chính xác trước khi gửi đơn';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateRegistrationCode = (): string => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `FANROC-${yyyy}${mm}${dd}-${randomHex}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const boardValueFormatted = `${board} – ${schoolLevel} – ${category}`;
    const code = generateRegistrationCode();

    const allMembers: TeamMember[] = [];
    const rows: ExcelExportRow[] = [];
    let stt = 1;

    // 1. Add Coach row if present
    if (coach.hasCoach && coach.fullName.trim()) {
      allMembers.push({
        id: 'coach-1',
        role: 'Huấn luyện viên',
        fullName: coach.fullName.trim(),
        birthDate: coach.birthDate,
        grade: 'Huấn luyện viên',
        phone: coach.phone.trim(),
        email: coach.email.trim(),
        notes: `${coach.roleType}${coach.notes ? ` - ${coach.notes}` : ''}`,
      });

      rows.push({
        STT: stt++,
        Bảng: boardValueFormatted,
        'Tên đội': teamName.trim(),
        Trường: schoolName.trim(),
        Tỉnh: province,
        'Họ tên': coach.fullName.trim(),
        'Ngày sinh': coach.birthDate,
        Lớp: 'Huấn luyện viên',
        'Số điện thoại': coach.phone.trim(),
        Email: coach.email.trim(),
        'Nhiệm vụ': `Mentor (${coach.roleType})`,
        'Ghi chú': coach.notes?.trim() || '',
      });
    }

    // 2. Add Students rows
    students.forEach((student) => {
      allMembers.push({
        id: student.id,
        role: student.role,
        fullName: student.fullName.trim(),
        birthDate: student.birthDate,
        grade: student.grade,
        phone: student.phone.trim(),
        email: student.email.trim(),
        notes: student.notes,
      });

      rows.push({
        STT: stt++,
        Bảng: boardValueFormatted,
        'Tên đội': teamName.trim(),
        Trường: schoolName.trim(),
        Tỉnh: province,
        'Họ tên': student.fullName.trim(),
        'Ngày sinh': student.birthDate,
        Lớp: student.grade,
        'Số điện thoại': student.phone.trim(),
        Email: student.email.trim(),
        'Nhiệm vụ': student.role,
        'Ghi chú': student.notes?.trim() || '',
      });
    });

    const isDemo = !APPS_SCRIPT_URL || APPS_SCRIPT_URL.trim() === '';

    try {
      if (!isDemo) {
        await fetch(APPS_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
          },
          body: JSON.stringify({
            registrationCode: code,
            board: boardValueFormatted,
            teamName: teamName.trim(),
            schoolName: schoolName.trim(),
            province,
            membersCount: rows.length,
            rows,
          }),
        });
      } else {
        console.group('%c[FAnRoC 2026-2027] ĐĂNG KÝ THÀNH CÔNG (CHẾ ĐỘ DEMO)', 'color: #22E4FF; font-weight: bold;');
        console.log('Mã đăng ký:', code);
        console.log('Bảng thi:', boardValueFormatted);
        console.log('Tên đội:', teamName);
        console.log('Trường:', schoolName, 'Tỉnh:', province);
        console.table(rows);
        console.groupEnd();
      }

      setSuccessData({
        registrationCode: code,
        timestamp: new Date().toLocaleString('vi-VN'),
        registration: {
          board,
          schoolLevel,
          category,
          teamName: teamName.trim(),
          schoolName: schoolName.trim(),
          province,
          members: allMembers,
          committed,
        },
        rows,
        isDemo,
      });
    } catch (err) {
      console.error('Lỗi khi gửi đăng ký:', err);
      setSuccessData({
        registrationCode: code,
        timestamp: new Date().toLocaleString('vi-VN'),
        registration: {
          board,
          schoolLevel,
          category,
          teamName: teamName.trim(),
          schoolName: schoolName.trim(),
          province,
          members: allMembers,
          committed,
        },
        rows,
        isDemo: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadCsv = () => {
    if (!successData) return;

    // UTF-8 BOM so Vietnamese displays perfectly in Excel
    const BOM = '\uFEFF';
    const headers = [
      'STT',
      'Bảng',
      'Tên đội',
      'Trường',
      'Tỉnh',
      'Họ tên',
      'Ngày sinh',
      'Lớp',
      'Số điện thoại',
      'Email',
      'Nhiệm vụ',
      'Ghi chú',
    ];

    const csvLines = [headers.join(',')];

    successData.rows.forEach((r) => {
      const line = [
        r.STT,
        `"${r.Bảng.replace(/"/g, '""')}"`,
        `"${r['Tên đội'].replace(/"/g, '""')}"`,
        `"${r.Trường.replace(/"/g, '""')}"`,
        `"${r.Tỉnh.replace(/"/g, '""')}"`,
        `"${r['Họ tên'].replace(/"/g, '""')}"`,
        `"${r['Ngày sinh']}"`,
        `"${r.Lớp}"`,
        `"${r['Số điện thoại']}"`,
        `"${r.Email}"`,
        `"${r['Nhiệm vụ']}"`,
        `"${r['Ghi chú'].replace(/"/g, '""')}"`,
      ];
      csvLines.push(line.join(','));
    });

    const csvContent = BOM + csvLines.join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      `FAnRoC_DangKy_${successData.registration.teamName.replace(/\s+/g, '_')}_${successData.registrationCode}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleResetForNewTeam = () => {
    setSuccessData(null);
    setTeamName('');
    setSchoolName('');
    setCommitted(false);
    setCoach({
      hasCoach: true,
      fullName: '',
      birthDate: '',
      phone: '',
      email: '',
      roleType: 'Giáo viên hướng dẫn',
      notes: '',
    });
    setStudents([
      {
        id: `student-${Date.now()}-1`,
        role: 'Đội trưởng',
        fullName: '',
        birthDate: '',
        grade: GRADES_BY_LEVEL[schoolLevel][0],
        phone: '',
        email: '',
        notes: '',
      },
      {
        id: `student-${Date.now()}-2`,
        role: 'Thành viên',
        fullName: '',
        birthDate: '',
        grade: GRADES_BY_LEVEL[schoolLevel][0],
        phone: '',
        email: '',
        notes: '',
      },
    ]);
    setErrors({});
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Biểu mẫu đăng ký đội thi FAnRoC 2026-2027"
    >
      <div className="w-full max-w-3xl min-h-full bg-[#05070D] border-l border-white/20 text-white flex flex-col justify-between shadow-2xl relative">
        
        {/* Modal Header */}
        <div className="p-6 sm:p-8 bg-[#05070D] border-b border-white/10 flex items-center justify-between sticky top-0 z-20 backdrop-blur-md">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#22E4FF] uppercase tracking-widest font-bold">
              <Flame className="w-3.5 h-3.5 text-[#F37021]" />
              CỔNG ĐĂNG KÝ TRỰC TUYẾN
            </div>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-white uppercase tracking-wide mt-1">
              ĐĂNG KÝ ĐỘI THI FANROC 2026–2027
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2.5 bg-neutral-900 border border-white/20 text-neutral-300 hover:text-white hover:border-[#22E4FF] transition-colors cursor-pointer"
            aria-label="Đóng biểu mẫu (Esc)"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body: Success Screen OR Form */}
        <div className="p-6 sm:p-8 flex-1 overflow-y-auto">
          {successData ? (
            /* SUCCESS VIEW */
            <div className="space-y-8 animate-in fade-in duration-300">
              {/* Notice for Demo Mode */}
              {successData.isDemo && (
                <div className="p-4 bg-amber-500/10 border border-amber-500/40 text-amber-200 text-xs font-mono flex items-center gap-2">
                  <Info className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>
                    Chế độ demo – chưa kết nối nơi lưu dữ liệu (APPS_SCRIPT_URL). Dữ liệu đã được xuất ra console và file CSV.
                  </span>
                </div>
              )}

              {/* Success Hero Badge */}
              <div className="p-6 bg-gradient-to-r from-[#0066B3]/30 to-[#00A651]/20 border border-[#22E4FF]/60 relative text-center">
                <div className="w-14 h-14 bg-[#00A651] text-white flex items-center justify-center mx-auto mb-3 shadow-[0_0_20px_rgba(0,166,81,0.5)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-heading font-black text-3xl uppercase tracking-wide text-white">
                  ĐĂNG KÝ THÀNH CÔNG!
                </h3>
                <p className="text-sm text-neutral-300 font-sans mt-1">
                  Hồ sơ đội thi của bạn đã được ghi nhận vào hệ thống FAnRoC 2026–2027.
                </p>

                {/* Registration Code */}
                <div className="mt-4 inline-block px-5 py-2.5 bg-[#05070D] border-2 border-[#22E4FF] text-[#22E4FF] font-mono text-lg font-bold tracking-widest shadow-[0_0_15px_rgba(34,228,255,0.4)]">
                  MÃ ĐĂNG KÝ: {successData.registrationCode}
                </div>
                <span className="block text-[11px] text-neutral-400 font-mono mt-2">
                  Thời gian: {successData.timestamp}
                </span>
              </div>

              {/* Team Summary Card */}
              <div className="p-6 bg-neutral-900/60 border border-white/15">
                <h4 className="font-mono text-xs text-[#22E4FF] uppercase tracking-widest font-bold mb-4">
                  TỔNG QUAN ĐỘI THI
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-sans border-b border-white/10 pb-4 mb-4">
                  <div>
                    <span className="text-neutral-400 block font-mono text-[10px]">TÊN ĐỘI</span>
                    <span className="text-white font-bold text-sm">{successData.registration.teamName}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block font-mono text-[10px]">BẢNG & CẤP</span>
                    <span className="text-white font-semibold">{successData.registration.board} ({successData.registration.schoolLevel})</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block font-mono text-[10px]">HẠNG MỤC</span>
                    <span className="text-white font-semibold">{successData.registration.category}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block font-mono text-[10px]">TRƯỜNG & TỈNH</span>
                    <span className="text-white font-semibold">{successData.registration.schoolName} ({successData.registration.province})</span>
                  </div>
                </div>

                {/* Table of Members & Coach */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-sans">
                    <thead>
                      <tr className="border-b border-white/20 text-[#22E4FF] font-mono text-[10px] uppercase">
                        <th className="py-2 pr-2">STT</th>
                        <th className="py-2 pr-2">Họ & Tên</th>
                        <th className="py-2 pr-2">Nhiệm vụ</th>
                        <th className="py-2 pr-2">Lớp / Ngày sinh</th>
                        <th className="py-2 pr-2">Liên hệ</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10 text-neutral-300">
                      {successData.rows.map((row) => (
                        <tr key={row.STT} className="hover:bg-white/5">
                          <td className="py-2.5 pr-2 font-mono">{row.STT}</td>
                          <td className="py-2.5 pr-2 font-bold text-white">{row['Họ tên']}</td>
                          <td className="py-2.5 pr-2">
                            <span
                              className={`px-2 py-0.5 font-mono text-[9px] uppercase font-bold ${
                                row['Nhiệm vụ'].includes('Mentor') || row['Nhiệm vụ'].includes('Huấn luyện viên')
                                  ? 'bg-[#0066B3] text-white border border-[#22E4FF]/40'
                                  : row['Nhiệm vụ'] === 'Đội trưởng'
                                  ? 'bg-[#F37021] text-white'
                                  : 'bg-white/10 text-neutral-300'
                              }`}
                            >
                              {row['Nhiệm vụ']}
                            </span>
                          </td>
                          <td className="py-2.5 pr-2">
                            {row.Lớp} • {row['Ngày sinh']}
                          </td>
                          <td className="py-2.5 pr-2 font-mono text-[11px]">
                            {row['Số điện thoại']}
                            <br />
                            <span className="text-neutral-400 text-[10px]">{row.Email}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Action Buttons: CSV Export & Register Another */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="button"
                  onClick={handleDownloadCsv}
                  className="flex-1 py-4 bg-[#0066B3] hover:bg-[#22E4FF] hover:text-black text-white font-mono text-xs font-bold uppercase tracking-widest inline-flex items-center justify-center gap-2 transition-all cursor-pointer border border-[#22E4FF]/40"
                  aria-label="Tải bản sao đăng ký định dạng CSV có BOM"
                >
                  <Download className="w-4 h-4" />
                  <span>TẢI BẢN SAO (CSV, UTF-8 CÓ BOM)</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetForNewTeam}
                  className="py-4 px-6 bg-neutral-900 hover:bg-neutral-800 text-white font-mono text-xs font-bold uppercase tracking-widest inline-flex items-center justify-center gap-2 transition-all cursor-pointer border border-white/20"
                  aria-label="Đăng ký thêm đội thi khác"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>ĐĂNG KÝ ĐỘI KHÁC</span>
                </button>
              </div>
            </div>
          ) : (
            /* REGISTRATION FORM VIEW */
            <form onSubmit={handleSubmit} noValidate className="space-y-9">
              
              {/* SECTION 1: THÔNG TIN ĐỘI */}
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-[#0066B3] text-white font-mono text-xs font-bold flex items-center justify-center">
                      1
                    </span>
                    <h3 className="font-heading font-extrabold text-xl sm:text-2xl uppercase tracking-wider text-white">
                      THÔNG TIN ĐỘI THI
                    </h3>
                  </div>
                  <span className="font-mono text-xs text-[#22E4FF]">BƯỚC 1/3</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Bảng thi */}
                  <div>
                    <label className="block font-mono text-xs text-neutral-300 uppercase tracking-wider mb-1.5 font-bold">
                      Bảng thi <span className="text-[#F37021]">*</span>
                    </label>
                    <select
                      value={board}
                      onChange={(e) => handleBoardChange(e.target.value as BoardType)}
                      className="w-full bg-neutral-900 border border-white/20 p-3 text-sm text-white font-medium focus:border-[#22E4FF] focus:outline-none rounded-none"
                    >
                      <option value="Robotics">Robotics</option>
                      <option value="Drone Soccer">Drone Soccer</option>
                    </select>
                  </div>

                  {/* Cấp học */}
                  <div>
                    <label className="block font-mono text-xs text-neutral-300 uppercase tracking-wider mb-1.5 font-bold">
                      Cấp học <span className="text-[#F37021]">*</span>
                    </label>
                    <select
                      value={schoolLevel}
                      onChange={(e) => handleLevelChange(e.target.value as SchoolLevel)}
                      className="w-full bg-neutral-900 border border-white/20 p-3 text-sm text-white font-medium focus:border-[#22E4FF] focus:outline-none rounded-none"
                    >
                      {VALID_BOARD_MATRIX[board].levels.map((lvl) => (
                        <option key={lvl} value={lvl}>
                          {lvl}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Hạng mục */}
                  <div>
                    <label className="block font-mono text-xs text-neutral-300 uppercase tracking-wider mb-1.5 font-bold">
                      Hạng mục <span className="text-[#F37021]">*</span>
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as CompetitionCategory)}
                      className="w-full bg-neutral-900 border border-white/20 p-3 text-sm text-white font-medium focus:border-[#22E4FF] focus:outline-none rounded-none"
                    >
                      {VALID_BOARD_MATRIX[board].categoriesByLevel[schoolLevel].map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Team Name, School, Province */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Tên đội */}
                  <div className="sm:col-span-1">
                    <label className="block font-mono text-xs text-neutral-300 uppercase tracking-wider mb-1.5 font-bold">
                      Tên đội <span className="text-[#F37021]">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Ví dụ: CYAN DRAGONS"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      className={`w-full bg-neutral-900 border p-3 text-sm text-white placeholder-neutral-500 focus:outline-none rounded-none ${
                        errors.teamName ? 'border-red-500' : 'border-white/20 focus:border-[#22E4FF]'
                      }`}
                    />
                    {errors.teamName && (
                      <span className="text-[11px] text-red-400 font-sans mt-1 block">
                        {errors.teamName}
                      </span>
                    )}
                  </div>

                  {/* Trường */}
                  <div className="sm:col-span-1">
                    <label className="block font-mono text-xs text-neutral-300 uppercase tracking-wider mb-1.5 font-bold">
                      Trường học <span className="text-[#F37021]">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Ví dụ: THCS FPT Cầu Giấy"
                      value={schoolName}
                      onChange={(e) => setSchoolName(e.target.value)}
                      className={`w-full bg-neutral-900 border p-3 text-sm text-white placeholder-neutral-500 focus:outline-none rounded-none ${
                        errors.schoolName ? 'border-red-500' : 'border-white/20 focus:border-[#22E4FF]'
                      }`}
                    />
                    {errors.schoolName && (
                      <span className="text-[11px] text-red-400 font-sans mt-1 block">
                        {errors.schoolName}
                      </span>
                    )}
                  </div>

                  {/* Tỉnh / Thành phố */}
                  <div className="sm:col-span-1">
                    <label className="block font-mono text-xs text-neutral-300 uppercase tracking-wider mb-1.5 font-bold">
                      Tỉnh / Thành phố <span className="text-[#F37021]">*</span>
                    </label>
                    <select
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      className="w-full bg-neutral-900 border border-white/20 p-3 text-sm text-white font-medium focus:border-[#22E4FF] focus:outline-none rounded-none"
                    >
                      {PROVINCES_OF_VIETNAM.map((prov) => (
                        <option key={prov} value={prov}>
                          {prov}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION 2: Ô ĐĂNG KÝ CỦA HUẤN LUYỆN VIÊN / MENTOR (DEDICATED) */}
              <div className="space-y-5 p-5 sm:p-6 bg-[#0066B3]/10 border border-[#0066B3]/40 relative">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-[#F37021] text-white font-mono text-xs font-bold flex items-center justify-center">
                      2
                    </span>
                    <h3 className="font-heading font-extrabold text-xl sm:text-2xl uppercase tracking-wider text-white flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-[#22E4FF]" />
                      HUẤN LUYỆN VIÊN / MENTOR
                    </h3>
                  </div>

                  {/* Toggle Coach Attendance */}
                  <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={coach.hasCoach}
                      onChange={(e) => setCoach((prev) => ({ ...prev, hasCoach: e.target.checked }))}
                      className="w-4 h-4 rounded-none accent-[#F37021] cursor-pointer"
                    />
                    <span className="text-xs font-mono text-neutral-200">
                      Đội có Huấn luyện viên / Mentor đi cùng (Tối đa 1)
                    </span>
                  </label>
                </div>

                {coach.hasCoach ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Full Name */}
                      <div>
                        <label className="block font-mono text-xs text-neutral-300 uppercase tracking-wider mb-1 font-bold">
                          Họ và tên HLV <span className="text-[#F37021]">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Ví dụ: Thầy Nguyễn Văn B"
                          value={coach.fullName}
                          onChange={(e) => setCoach((prev) => ({ ...prev, fullName: e.target.value }))}
                          className={`w-full bg-[#05070D] border p-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none rounded-none ${
                            errors.coach_fullName ? 'border-red-500' : 'border-white/20 focus:border-[#22E4FF]'
                          }`}
                        />
                        {errors.coach_fullName && (
                          <span className="text-[10px] text-red-400 font-sans mt-0.5 block">
                            {errors.coach_fullName}
                          </span>
                        )}
                      </div>

                      {/* Birth Date */}
                      <div>
                        <label className="block font-mono text-xs text-neutral-300 uppercase tracking-wider mb-1 font-bold">
                          Ngày sinh HLV <span className="text-[#F37021]">*</span>
                        </label>
                        <input
                          type="date"
                          value={coach.birthDate}
                          onChange={(e) => setCoach((prev) => ({ ...prev, birthDate: e.target.value }))}
                          className={`w-full bg-[#05070D] border p-2.5 text-xs text-white focus:outline-none rounded-none ${
                            errors.coach_birthDate ? 'border-red-500' : 'border-white/20 focus:border-[#22E4FF]'
                          }`}
                        />
                        {errors.coach_birthDate && (
                          <span className="text-[10px] text-red-400 font-sans mt-0.5 block">
                            {errors.coach_birthDate}
                          </span>
                        )}
                      </div>

                      {/* Role Type */}
                      <div>
                        <label className="block font-mono text-xs text-neutral-300 uppercase tracking-wider mb-1 font-bold">
                          Vai trò HLV <span className="text-[#F37021]">*</span>
                        </label>
                        <select
                          value={coach.roleType}
                          onChange={(e) =>
                            setCoach((prev) => ({
                              ...prev,
                              roleType: e.target.value as 'Giáo viên hướng dẫn' | 'Phụ huynh',
                            }))
                          }
                          className="w-full bg-[#05070D] border border-white/20 p-2.5 text-xs text-white focus:border-[#22E4FF] focus:outline-none rounded-none"
                        >
                          <option value="Giáo viên hướng dẫn">Giáo viên hướng dẫn</option>
                          <option value="Phụ huynh">Phụ huynh học sinh</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Phone */}
                      <div>
                        <label className="block font-mono text-xs text-neutral-300 uppercase tracking-wider mb-1 font-bold">
                          Số điện thoại HLV <span className="text-[#F37021]">*</span>
                        </label>
                        <input
                          type="tel"
                          placeholder="0912345678"
                          value={coach.phone}
                          onChange={(e) => setCoach((prev) => ({ ...prev, phone: e.target.value }))}
                          className={`w-full bg-[#05070D] border p-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none rounded-none ${
                            errors.coach_phone ? 'border-red-500' : 'border-white/20 focus:border-[#22E4FF]'
                          }`}
                        />
                        {errors.coach_phone && (
                          <span className="text-[10px] text-red-400 font-sans mt-0.5 block">
                            {errors.coach_phone}
                          </span>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block font-mono text-xs text-neutral-300 uppercase tracking-wider mb-1 font-bold">
                          Email HLV <span className="text-[#F37021]">*</span>
                        </label>
                        <input
                          type="email"
                          placeholder="hlv@example.com"
                          value={coach.email}
                          onChange={(e) => setCoach((prev) => ({ ...prev, email: e.target.value }))}
                          className={`w-full bg-[#05070D] border p-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none rounded-none ${
                            errors.coach_email ? 'border-red-500' : 'border-white/20 focus:border-[#22E4FF]'
                          }`}
                        />
                        {errors.coach_email && (
                          <span className="text-[10px] text-red-400 font-sans mt-0.5 block">
                            {errors.coach_email}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="block font-mono text-[10px] text-neutral-400 uppercase tracking-wider mb-1">
                        Ghi chú Huấn luyện viên (Đơn vị công tác, chức vụ...)
                      </label>
                      <input
                        type="text"
                        placeholder="Ví dụ: Tổ trưởng tổ STEM / Trưởng đoàn thi..."
                        value={coach.notes}
                        onChange={(e) => setCoach((prev) => ({ ...prev, notes: e.target.value }))}
                        className="w-full bg-[#05070D] border border-white/10 p-2 text-xs text-white placeholder-neutral-600 focus:border-[#22E4FF] focus:outline-none rounded-none"
                      />
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-neutral-400 italic">
                    Đội hiện không đăng ký Huấn luyện viên đi cùng (các học sinh sẽ do nhà trường hoặc người đại diện chung quản lý).
                  </p>
                )}
              </div>

              {/* SECTION 3: DANH SÁCH HỌC SINH / VẬN ĐỘNG VIÊN */}
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-[#0066B3] text-white font-mono text-xs font-bold flex items-center justify-center">
                      3
                    </span>
                    <div>
                      <h3 className="font-heading font-extrabold text-xl sm:text-2xl uppercase tracking-wider text-white flex items-center gap-2">
                        <Users className="w-5 h-5 text-[#22E4FF]" />
                        DANH SÁCH HỌC SINH (VẬN ĐỘNG VIÊN)
                      </h3>
                      <p className="text-xs text-neutral-400 font-sans mt-0.5">
                        Cấp {schoolLevel}: {rules.minStudents}–{rules.maxStudents} học sinh (Hiện có: {students.length} em)
                      </p>
                    </div>
                  </div>

                  {canAddMoreStudents && (
                    <button
                      type="button"
                      onClick={handleAddStudent}
                      className="px-3.5 py-2 bg-[#0066B3] hover:bg-[#22E4FF] hover:text-black text-white font-mono text-xs uppercase font-bold tracking-wider inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                      aria-label="Thêm học sinh mới"
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>+ THÊM HỌC SINH</span>
                    </button>
                  )}
                </div>

                {/* Role Errors */}
                {errors.students && (
                  <div className="p-3 bg-red-950/40 border border-red-500/50 text-red-200 text-xs font-sans">
                    {errors.students}
                  </div>
                )}
                {errors.captain && (
                  <div className="p-3 bg-red-950/40 border border-red-500/50 text-red-200 text-xs font-sans">
                    {errors.captain}
                  </div>
                )}

                {/* Student Cards */}
                <div className="space-y-4">
                  {students.map((student, index) => {
                    const isCaptain = student.role === 'Đội trưởng';
                    const prefix = `student_${student.id}`;

                    return (
                      <div
                        key={student.id}
                        className={`p-5 border transition-all duration-200 relative ${
                          isCaptain
                            ? 'bg-[#05070D] border-orange-500/60 shadow-[0_0_15px_rgba(243,112,33,0.15)]'
                            : 'bg-neutral-900/50 border-white/15'
                        }`}
                      >
                        {/* Member Header */}
                        <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-xs font-bold text-[#22E4FF]">
                              HỌC SINH #{index + 1}
                            </span>
                            <span
                              className={`px-2 py-0.5 font-mono text-[10px] uppercase font-bold ${
                                isCaptain ? 'bg-[#F37021] text-white' : 'bg-white/10 text-neutral-300'
                              }`}
                            >
                              {student.role}
                            </span>
                          </div>

                          {students.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveStudent(student.id)}
                              className="p-1.5 text-neutral-400 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                              aria-label={`Xóa học sinh ${index + 1}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>

                        {/* Student Input Fields */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {/* Role Selector */}
                          <div>
                            <label className="block font-mono text-[11px] text-neutral-300 uppercase tracking-wider mb-1 font-bold">
                              Nhiệm vụ <span className="text-[#F37021]">*</span>
                            </label>
                            <select
                              value={student.role}
                              onChange={(e) =>
                                handleUpdateStudent(
                                  student.id,
                                  'role',
                                  e.target.value as 'Đội trưởng' | 'Thành viên'
                                )
                              }
                              className="w-full bg-[#05070D] border border-white/20 p-2.5 text-xs text-white focus:border-[#22E4FF] focus:outline-none rounded-none"
                            >
                              <option value="Đội trưởng">Đội trưởng</option>
                              <option value="Thành viên">Thành viên</option>
                            </select>
                          </div>

                          {/* Full Name */}
                          <div>
                            <label className="block font-mono text-[11px] text-neutral-300 uppercase tracking-wider mb-1 font-bold">
                              Họ và tên học sinh <span className="text-[#F37021]">*</span>
                            </label>
                            <input
                              type="text"
                              placeholder="Nguyễn Văn A"
                              value={student.fullName}
                              onChange={(e) =>
                                handleUpdateStudent(student.id, 'fullName', e.target.value)
                              }
                              className={`w-full bg-[#05070D] border p-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none rounded-none ${
                                errors[`${prefix}_fullName`]
                                  ? 'border-red-500'
                                  : 'border-white/20 focus:border-[#22E4FF]'
                              }`}
                            />
                            {errors[`${prefix}_fullName`] && (
                              <span className="text-[10px] text-red-400 font-sans mt-0.5 block">
                                {errors[`${prefix}_fullName`]}
                              </span>
                            )}
                          </div>

                          {/* Date of Birth */}
                          <div>
                            <label className="block font-mono text-[11px] text-neutral-300 uppercase tracking-wider mb-1 font-bold">
                              Ngày sinh <span className="text-[#F37021]">*</span>
                            </label>
                            <input
                              type="date"
                              value={student.birthDate}
                              onChange={(e) =>
                                handleUpdateStudent(student.id, 'birthDate', e.target.value)
                              }
                              className={`w-full bg-[#05070D] border p-2.5 text-xs text-white focus:outline-none rounded-none ${
                                errors[`${prefix}_birthDate`]
                                  ? 'border-red-500'
                                  : 'border-white/20 focus:border-[#22E4FF]'
                              }`}
                            />
                            {errors[`${prefix}_birthDate`] && (
                              <span className="text-[10px] text-red-400 font-sans mt-0.5 block">
                                {errors[`${prefix}_birthDate`]}
                              </span>
                            )}
                          </div>

                          {/* Grade */}
                          <div>
                            <label className="block font-mono text-[11px] text-neutral-300 uppercase tracking-wider mb-1 font-bold">
                              Lớp học <span className="text-[#F37021]">*</span>
                            </label>
                            <select
                              value={student.grade}
                              onChange={(e) =>
                                handleUpdateStudent(student.id, 'grade', e.target.value)
                              }
                              className={`w-full bg-[#05070D] border p-2.5 text-xs text-white focus:outline-none rounded-none ${
                                errors[`${prefix}_grade`]
                                  ? 'border-red-500'
                                  : 'border-white/20 focus:border-[#22E4FF]'
                              }`}
                            >
                              {GRADES_BY_LEVEL[schoolLevel].map((g) => (
                                <option key={g} value={g}>
                                  {g}
                                </option>
                              ))}
                            </select>
                            {errors[`${prefix}_grade`] && (
                              <span className="text-[10px] text-red-400 font-sans mt-0.5 block">
                                {errors[`${prefix}_grade`]}
                              </span>
                            )}
                          </div>

                          {/* Phone */}
                          <div>
                            <label className="block font-mono text-[11px] text-neutral-300 uppercase tracking-wider mb-1 font-bold">
                              Số điện thoại <span className="text-[#F37021]">*</span>
                            </label>
                            <input
                              type="tel"
                              placeholder="0912345678"
                              value={student.phone}
                              onChange={(e) =>
                                handleUpdateStudent(student.id, 'phone', e.target.value)
                              }
                              className={`w-full bg-[#05070D] border p-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none rounded-none ${
                                errors[`${prefix}_phone`]
                                  ? 'border-red-500'
                                  : 'border-white/20 focus:border-[#22E4FF]'
                              }`}
                            />
                            {errors[`${prefix}_phone`] && (
                              <span className="text-[10px] text-red-400 font-sans mt-0.5 block">
                                {errors[`${prefix}_phone`]}
                              </span>
                            )}
                          </div>

                          {/* Email */}
                          <div>
                            <label className="block font-mono text-[11px] text-neutral-300 uppercase tracking-wider mb-1 font-bold">
                              Email <span className="text-[#F37021]">*</span>
                            </label>
                            <input
                              type="email"
                              placeholder="student@example.com"
                              value={student.email}
                              onChange={(e) =>
                                handleUpdateStudent(student.id, 'email', e.target.value)
                              }
                              className={`w-full bg-[#05070D] border p-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none rounded-none ${
                                errors[`${prefix}_email`]
                                  ? 'border-red-500'
                                  : 'border-white/20 focus:border-[#22E4FF]'
                              }`}
                            />
                            {errors[`${prefix}_email`] && (
                              <span className="text-[10px] text-red-400 font-sans mt-0.5 block">
                                {errors[`${prefix}_email`]}
                              </span>
                            )}
                          </div>

                          {/* Notes */}
                          <div className="sm:col-span-3">
                            <label className="block font-mono text-[10px] text-neutral-400 uppercase tracking-wider mb-1">
                              Ghi chú cá nhân (tùy chọn)
                            </label>
                            <input
                              type="text"
                              placeholder="Ví dụ: Đã từng tham gia CLB STEM Robotics..."
                              value={student.notes}
                              onChange={(e) =>
                                handleUpdateStudent(student.id, 'notes', e.target.value)
                              }
                              className="w-full bg-[#05070D] border border-white/10 p-2 text-xs text-white placeholder-neutral-600 focus:border-[#22E4FF] focus:outline-none rounded-none"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* MANDATORY COMMITMENT CHECKBOX */}
              <div className="pt-2">
                <label className="flex items-start gap-3 p-4 bg-neutral-900/70 border border-white/20 cursor-pointer hover:border-[#22E4FF] transition-colors">
                  <input
                    type="checkbox"
                    checked={committed}
                    onChange={(e) => setCommitted(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded-none accent-[#F37021] cursor-pointer"
                  />
                  <div className="text-xs text-neutral-200 font-sans leading-relaxed">
                    <span className="font-bold text-white">Cam kết điều lệ: </span>
                    Tôi cam kết các học sinh cùng trường, cùng cấp học và mỗi học sinh chỉ đăng ký một đội, một bảng thi duy nhất theo đúng điều lệ FAnRoC 2026–2027.
                  </div>
                </label>
                {errors.committed && (
                  <span className="text-xs text-red-400 font-sans mt-1.5 block">
                    {errors.committed}
                  </span>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="font-mono text-[11px] text-neutral-400">
                  Dữ liệu được bảo mật bởi BTC FPT Schools
                </span>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 sm:flex-none px-5 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white font-mono text-xs uppercase tracking-wider border border-white/20 transition-colors cursor-pointer"
                  >
                    HỦY
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 sm:flex-none px-8 py-3.5 bg-[#F37021] hover:bg-[#ff7e33] disabled:opacity-50 text-white font-mono text-xs font-bold uppercase tracking-widest transition-all duration-200 shadow-[0_0_20px_rgba(243,112,33,0.4)] hover:shadow-[0_0_30px_rgba(243,112,33,0.6)] cursor-pointer border border-orange-400/40 rounded-none inline-flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent animate-spin" />
                        <span>ĐANG GỬI HỒ SƠ...</span>
                      </>
                    ) : (
                      <>
                        <Flame className="w-4 h-4" />
                        <span>XÁC NHẬN ĐĂNG KÝ</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
