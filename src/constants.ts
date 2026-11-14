import {
  MediaItem,
  BoardCardInfo,
  SchoolLevel,
  BoardType,
  BoardSlug,
  BoardTabItem,
  DroneFormat,
  PrizeRow,
  SubAwardItem,
} from './types.ts';

/**
 * Đường dẫn Google Apps Script Web App để nhận dữ liệu đăng ký.
 */
export const APPS_SCRIPT_URL: string =
  'https://script.google.com/macros/s/AKfycbya9SxAaMfICqNdKf6NDP9cEW1icaXPB1iqPA7GRW84cq2OhfqXh48h9t8sEY_Gh1sL/exec';

/**
 * URL linh vật của hai bảng thi đấu
 */
export const LINH_VAT_ROBOTICS_URL = 'https://fanroc.vn/img/char_robo.webp';
export const LINH_VAT_DRONE_URL = 'https://fanroc.vn/img/char_drone.webp';

/**
 * URL luật đấu chi tiết (hiển thị nút kèm mã QR)
 */
export const RULE_URL_ROBOTICS = 'https://fanroc.vn/#robotics';
export const RULE_URL_DRONE_SIM = 'https://fanroc.vn/#drone';
export const RULE_URL_DRONE_REAL = 'https://fanroc.vn/#drone';

/**
 * Quy mô học sinh mỗi đội (chỉ tính học sinh, không tính Mentor)
 */
export const MIN_STUDENTS = 3;
export const MAX_STUDENTS = 4;

/**
 * Cấu hình 5 tab trên trang chi tiết bảng thi
 */
export const BOARD_TABS: Record<BoardSlug, BoardTabItem[]> = {
  robotics: [
    { id: 'gioi-thieu', label: 'Giới thiệu bảng thi' },
    { id: 'the-le', label: 'Thể lệ' },
    { id: 'the-thuc', label: 'Thể thức thi đấu' },
    { id: 'giai-thuong', label: 'Giải thưởng' },
    { id: 'giai-phu', label: 'Giải phụ' },
  ],
  drone: [
    { id: 'gioi-thieu', label: 'Giới thiệu bảng thi' },
    { id: 'the-le', label: 'Thể lệ' },
    { id: 'the-thuc', label: 'Thể thức thi đấu' },
    { id: 'giai-thuong', label: 'Giải thưởng' },
    { id: 'giai-phu', label: 'Giải phụ' },
  ],
};

/**
 * Danh sách các trường thuộc hệ thống FPT Schools (dùng để gợi ý ở ô Trường)
 */
export const SCHOOLS: string[] = [
  'Trường TH, THCS & THPT FPT Bắc Giang',
  'Trường TH & THCS FPT Cầu Giấy',
  'Trường THPT FPT Hà Nội',
  'Trường TH, THCS & THPT FPT Bắc Ninh',
  'Trường TH, THCS & THPT FPT Hải Phòng',
  'Trường TH, THCS & THPT FPT Hà Nam',
  'Trường TH, THCS & THPT FPT Thanh Hóa',
  'Trường TH, THCS & THPT FPT Đà Nẵng',
  'Trường THPT FPT Đà Nẵng',
  'Trường TH, THCS & THPT FPT Quy Nhơn',
  'Trường THPT FPT Quy Nhơn',
  'Trường TH, THCS & THPT FPT Cần Thơ',
  'Trường THPT FPT Cần Thơ',
  'Trường TH, THCS & THPT FPT Tây Ninh',
  'Trường TH, THCS & THPT FPT Hậu Giang',
  'Trường TH, THCS & THPT FPT Sóc Trăng',
];

export const ALL_SCHOOL_LEVELS: SchoolLevel[] = ['Tiểu học', 'THCS', 'THPT'];

export const BOARD_LEVEL_CONFIG: Record<
  BoardType,
  Record<SchoolLevel, { enabled: boolean; format?: DroneFormat; note?: string }>
> = {
  Robotics: {
    'Tiểu học': { enabled: false, note: 'Không tổ chức' },
    THCS: { enabled: true },
    THPT: { enabled: false, note: 'Không tổ chức' },
  },
  'Drone Soccer': {
    'Tiểu học': { enabled: true, format: 'Mô phỏng' },
    THCS: { enabled: true, format: 'Mô phỏng và Thiết bị thật' },
    THPT: { enabled: true, format: 'Mô phỏng và Thiết bị thật' },
  },
};

export const MEDIA_ITEMS: MediaItem[] = [
  {
    id: 'media-video-1',
    type: 'video',
    url: 'https://www.youtube.com/embed/vDdrsEeKf8w',
    thumbnailUrl: 'https://img.youtube.com/vi/vDdrsEeKf8w/hqdefault.jpg',
    youtubeId: 'vDdrsEeKf8w',
    title: 'Video giới thiệu giải đấu FAnRoC',
    caption: 'Khoảnh khắc đáng nhớ: Thước phim tổng quan bùng nổ của đấu trường Robotics & Drone quy mô toàn quốc.',
  },
  {
    id: 'media-1',
    type: 'image',
    url: 'https://cdn-images.vtv.vn/66349b6076cb4dee98746cf1/2026/03/10/package-media-54876070491420346279073.png',
    title: 'Đấu trường FAnRoC sôi động',
    caption: 'Khoảnh khắc đáng nhớ: Các tuyển thủ trẻ tự tin điều khiển robot trên sa bàn thi đấu hiện đại.',
  },
  {
    id: 'media-2',
    type: 'image',
    url: 'https://cdn-images.vtv.vn/66349b6076cb4dee98746cf1/2026/03/10/package-media-63050269094787910574745.png',
    title: 'Chiến thuật & Lập trình AI',
    caption: 'Khoảnh khắc đáng nhớ: Tập trung tinh chỉnh thuật toán phát hiện và điều hướng thông minh.',
  },
  {
    id: 'media-3',
    type: 'image',
    url: 'https://cdn-images.vtv.vn/66349b6076cb4dee98746cf1/2026/03/10/package-media-24484368639685857759308.png',
    title: 'Kỹ năng Drone Soccer đỉnh cao',
    caption: 'Khoảnh khắc đáng nhớ: Không gian thi đấu 3 chiều với những pha rượt đuổi tốc độ cao.',
  },
  {
    id: 'media-4',
    type: 'image',
    url: 'https://static-images.vnncdn.net/vps_images_publish/000001/000003/2026/1/13/anh-2-2496.png?width=0&s=BRPA9ISMT35LuW229TPSZQ',
    title: 'Tình đồng đội & Khát vọng bứt phá',
    caption: 'Khoảnh khắc đáng nhớ: Sự kết hợp ăn ý giữa người điều khiển chiến lược và kỹ thuật viên.',
  },
  {
    id: 'media-5',
    type: 'image',
    url: 'https://static-images.vnncdn.net/vps_images_publish/000001/000003/2026/1/13/anh-3-2497.jpg?width=0&s=QrDCY4Z0S_qRCIfH-dKHMQ',
    title: 'Khoảnh khắc vinh quang tại FSC',
    caption: 'Khoảnh khắc đáng nhớ: Niềm vui vỡ òa của các đội thi sau những vòng tranh tài nảy lửa.',
  },
  {
    id: 'media-7',
    type: 'image',
    url: 'https://cdnphoto.dantri.com.vn/rW523fObUbRIGjkWYyX7_Nt80s0=/thumb_w/1020/2025/11/21/anh-1jpg-1763715635708.jpg',
    title: 'Thử thách giải cứu hồi sinh rừng xanh',
    caption: 'Khoảnh khắc đáng nhớ: Các kịch bản nhiệm vụ bám sát chủ đề Cyan Flames - Thanh Hỏa.',
  },
  {
    id: 'media-8',
    type: 'image',
    url: 'https://cdnphoto.dantri.com.vn/SJnwgO35N4ssxLDyYoAyx0cdE2M=/thumb_w/1020/2025/11/21/anh-3jpg-1763715631048.jpg',
    title: 'Ngày hội công nghệ FPT Schools',
    caption: 'Khoảnh khắc đáng nhớ: Nơi ươm mầm tài năng và khát vọng công nghệ cho thế hệ trẻ.',
  },
];

export const BOARDS: BoardCardInfo[] = [
  {
    id: 'Robotics',
    slug: 'robotics',
    label: 'BẢNG THI · THCS',
    title: 'ROBOTICS',
    mascotUrl: LINH_VAT_ROBOTICS_URL,
    levelChip: 'Lớp 6–9',
    teamChip: '3–4 HS/đội',
    description:
      'Thiết kế, chế tạo và lập trình robot thực hiện nhiệm vụ theo chủ đề, kèm Hồ sơ kĩ thuật (Engineering Notebook).',
  },
  {
    id: 'Drone Soccer',
    slug: 'drone',
    label: 'BẢNG THI · 3 CẤP HỌC',
    title: 'DRONE SOCCER',
    mascotUrl: LINH_VAT_DRONE_URL,
    levelChip: 'Lớp 3–12',
    teamChip: '3–4 HS/đội',
    description:
      'Với bảng Drone Soccer, học sinh được hóa thân thành các phi công nhí, rèn kỹ năng điều khiển trên môi trường mô phỏng và cả thiết bị thực tế.',
  },
];

export const ROBOTICS_PRIZES: PrizeRow[] = [
  {
    rank: 'GIẢI ĐẶC BIỆT',
    awardName: 'Seymour Papert Inspirer Award',
    count: 1,
    cashPrize: '30.000.000đ (Đã bao gồm phí đăng ký FTC)',
    scholarship: '–',
    isSpecial: true,
  },
  {
    rank: 'NHẤT',
    awardName: 'FAnRoC Robotics Excellence Award',
    count: 2,
    cashPrize: '15.000.000đ',
    scholarship: '50% học phí năm 2027–2028',
  },
  {
    rank: 'NHÌ',
    awardName: 'FAnRoC Robotics Outstanding Award',
    count: 2,
    cashPrize: '7.000.000đ',
    scholarship: '50% học phí năm 2027–2028',
  },
  {
    rank: 'BA',
    awardName: 'FAnRoC Robotics Innovation Award',
    count: 2,
    cashPrize: '5.000.000đ',
    scholarship: '50% học phí năm 2027–2028',
  },
  {
    rank: 'KHUYẾN KHÍCH',
    awardName: 'FAnRoC Robotics Rising Star Award',
    count: 6,
    cashPrize: '3.000.000đ',
    scholarship: '–',
  },
  {
    rank: 'GIẢI PHỤ',
    awardName: 'gồm 5 hạng mục',
    count: 10,
    cashPrize: '3.000.000đ',
    scholarship: '–',
  },
];

export const ROBOTICS_SUB_AWARDS: SubAwardItem[] = [
  {
    title: 'Giải Vibe Coding',
    englishTitle: 'Vibe Coding Award',
    description: 'Làm việc cùng AI hiệu quả, biết kiểm chứng và sửa lỗi kết quả AI, ghi nhận trung thực.',
  },
  {
    title: 'Giải Tài liệu kỹ thuật',
    englishTitle: 'Engineering Document Award',
    description: 'Notebook mạch lạc, thể hiện rõ quyết định thiết kế và tiến bộ qua thời gian.',
  },
  {
    title: 'Giải Thiết kế kỹ thuật',
    englishTitle: 'Engineering Design Award',
    description: 'Thiết kế tinh gọn, hiệu quả, an toàn, hài hòa chức năng và thẩm mỹ.',
  },
  {
    title: 'Giải Sáng tạo kỹ thuật',
    englishTitle: 'Engineering Innovation Award',
    description: 'Giải pháp hoặc công nghệ mới giúp sản phẩm khác biệt.',
  },
  {
    title: 'Giải Chuyên nghiệp tử tế',
    englishTitle: 'Gracious Professional Award',
    description: 'Tôn trọng, hỗ trợ đội khác, thi đấu công bằng.',
  },
];

export const DRONE_PRIZES: PrizeRow[] = [
  {
    rank: 'NHẤT',
    awardName: 'FAnRoC Drone Excellence Award',
    count: 2,
    cashPrize: '10.000.000đ',
    scholarship: '30% học phí năm 2027–2028',
  },
  {
    rank: 'NHÌ',
    awardName: 'FAnRoC Drone Outstanding Award',
    count: 2,
    cashPrize: '7.000.000đ',
    scholarship: '30% học phí năm 2027–2028',
  },
  {
    rank: 'BA',
    awardName: 'FAnRoC Drone Innovation Award',
    count: 2,
    cashPrize: '5.000.000đ',
    scholarship: '30% học phí năm 2027–2028',
  },
  {
    rank: 'KHUYẾN KHÍCH',
    awardName: 'FAnRoC Drone Rising Star Award',
    count: 2,
    cashPrize: '3.000.000đ',
    scholarship: '–',
  },
  {
    rank: 'GIẢI PHỤ',
    awardName: 'gồm 2 hạng mục',
    count: 4,
    cashPrize: '3.000.000đ',
    scholarship: '–',
  },
];

export const DRONE_SUB_AWARDS: SubAwardItem[] = [
  {
    title: 'Giải Phi công xuất sắc – Ghi bàn nhiều nhất',
    englishTitle: 'Top Scorer Award',
    description:
      '01 thí sinh mỗi cấp THCS, THPT ở vị trí Striker ghi nhiều bàn nhất toàn giải, tính cả vòng bảng và vòng loại trực tiếp.',
  },
  {
    title: 'Giải Thủ môn xuất sắc – Bảo vệ khung thành tốt nhất',
    englishTitle: 'Best Keeper Award',
    description:
      '01 thí sinh mỗi cấp THCS, THPT ở vị trí Keeper có số bàn thua ít nhất toàn giải, tính cả vòng bảng và vòng loại trực tiếp.',
  },
];

export const PROVINCES_OF_VIETNAM = [
  'Bắc Giang',
  'Hà Nội',
  'TP. Hồ Chí Minh',
  'Đà Nẵng',
  'Cần Thơ',
  'Bình Định',
  'Hải Phòng',
  'Quảng Ninh',
  'Hải Dương',
  'Bắc Ninh',
  'Nam Định',
  'Nghệ An',
  'Thanh Hóa',
  'Thừa Thiên Huế',
  'Khánh Hòa',
  'Lâm Đồng',
  'Đồng Nai',
  'Bình Dương',
  'Bà Rịa - Vũng Tàu',
  'An Giang',
  'Kiên Giang',
  'Thái Nguyên',
  'Vĩnh Phúc',
  'Phú Thọ',
  'Hà Nam',
  'Hưng Yên',
  'Thái Bình',
  'Ninh Bình',
  'Hà Tĩnh',
  'Quảng Bình',
  'Quảng Trị',
  'Quảng Nam',
  'Quảng Ngãi',
  'Phú Yên',
  'Ninh Thuận',
  'Bình Thuận',
  'Kon Tum',
  'Gia Lai',
  'Đắk Lắk',
  'Đắk Nông',
  'Tây Ninh',
  'Bình Phước',
  'Long An',
  'Tiền Giang',
  'Bến Tre',
  'Trà Vinh',
  'Vĩnh Long',
  'Đồng Tháp',
  'Hậu Giang',
  'Sóc Trăng',
  'Bạc Liêu',
  'Cà Mau',
  'Lào Cai',
  'Yên Bái',
  'Điện Biên',
  'Hòa Bình',
  'Lai Châu',
  'Sơn La',
  'Hà Giang',
  'Cao Bằng',
  'Bắc Kạn',
  'Tuyên Quang',
  'Lạng Sơn',
];
