export type SchoolLevel = 'Tiểu học' | 'THCS' | 'THPT';
export type BoardType = 'Robotics' | 'Drone Soccer';
export type CompetitionCategory = 'Nội bộ (FPT Schools)' | 'Mở rộng';
export type MemberRole = 'Đội trưởng' | 'Thành viên' | 'Mentor' | 'Huấn luyện viên';

export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnailUrl?: string;
  title: string;
  caption?: string;
  youtubeId?: string;
}

export interface TimelineItem {
  step: string;
  date: string;
  title: string;
  description: string;
  isTentative?: boolean;
}

export interface BoardCardInfo {
  id: BoardType;
  title: string;
  subtitle: string;
  targetLevel: string;
  description: string;
  features: string[];
  isFeatured?: boolean;
}

export interface TeamMember {
  id: string;
  role: MemberRole;
  fullName: string;
  birthDate: string;
  grade: string;
  phone: string;
  email: string;
  notes?: string;
}

export interface TeamRegistration {
  board: BoardType;
  schoolLevel: SchoolLevel;
  category: CompetitionCategory;
  teamName: string;
  schoolName: string;
  province: string;
  members: TeamMember[];
  committed: boolean;
}

export interface ExcelExportRow {
  'STT': number;
  'Bảng': string;
  'Tên đội': string;
  'Trường': string;
  'Tỉnh': string;
  'Họ tên': string;
  'Ngày sinh': string;
  'Lớp': string;
  'Số điện thoại': string;
  'Email': string;
  'Nhiệm vụ': string;
  'Ghi chú': string;
}

export interface RegistrationSuccessData {
  registrationCode: string;
  timestamp: string;
  registration: TeamRegistration;
  rows: ExcelExportRow[];
  isDemo: boolean;
}
