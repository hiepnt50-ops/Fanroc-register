import { MediaItem, TimelineItem, BoardCardInfo, SchoolLevel, BoardType, CompetitionCategory } from './types.ts';

/**
 * Đường dẫn Google Apps Script Web App để nhận dữ liệu đăng ký.
 * Để trống ("") để chạy chế độ Demo (vẫn lưu bảng, in console và xuất file CSV UTF-8).
 */
export const APPS_SCRIPT_URL: string = "";

export const MEDIA_ITEMS: MediaItem[] = [
  {
    id: "media-video-1",
    type: "video",
    url: "https://www.youtube.com/embed/vDdrsEeKf8w",
    thumbnailUrl: "https://img.youtube.com/vi/vDdrsEeKf8w/hqdefault.jpg",
    youtubeId: "vDdrsEeKf8w",
    title: "Video giới thiệu giải đấu FAnRoC",
    caption: "Khoảnh khắc đáng nhớ: Thước phim tổng quan bùng nổ của đấu trường Robotics & Drone quy mô toàn quốc.",
  },
  {
    id: "media-1",
    type: "image",
    url: "https://cdn-images.vtv.vn/66349b6076cb4dee98746cf1/2026/03/10/package-media-54876070491420346279073.png",
    title: "Đấu trường FAnRoC sôi động",
    caption: "Khoảnh khắc đáng nhớ: Các tuyển thủ trẻ tự tin điều khiển robot trên sa bàn thi đấu hiện đại.",
  },
  {
    id: "media-2",
    type: "image",
    url: "https://cdn-images.vtv.vn/66349b6076cb4dee98746cf1/2026/03/10/package-media-63050269094787910574745.png",
    title: "Chiến thuật & Lập trình AI",
    caption: "Khoảnh khắc đáng nhớ: Tập trung tinh chỉnh thuật toán phát hiện và điều hướng thông minh.",
  },
  {
    id: "media-3",
    type: "image",
    url: "https://cdn-images.vtv.vn/66349b6076cb4dee98746cf1/2026/03/10/package-media-24484368639685857759308.png",
    title: "Kỹ năng Drone Soccer đỉnh cao",
    caption: "Khoảnh khắc đáng nhớ: Không gian thi đấu 3 chiều với những pha rượt đuổi tốc độ cao.",
  },
  {
    id: "media-4",
    type: "image",
    url: "https://static-images.vnncdn.net/vps_images_publish/000001/000003/2026/1/13/anh-2-2496.png?width=0&s=BRPA9ISMT35LuW229TPSZQ",
    title: "Tình đồng đội & Khát vọng bứt phá",
    caption: "Khoảnh khắc đáng nhớ: Sự kết hợp ăn ý giữa người điều khiển chiến lược và kỹ thuật viên.",
  },
  {
    id: "media-5",
    type: "image",
    url: "https://static-images.vnncdn.net/vps_images_publish/000001/000003/2026/1/13/anh-3-2497.jpg?width=0&s=QrDCY4Z0S_qRCIfH-dKHMQ",
    title: "Khoảnh khắc vinh quang tại FSC",
    caption: "Khoảnh khắc đáng nhớ: Niềm vui vỡ òa của các đội thi sau những vòng tranh tài nảy lửa.",
  },
  {
    id: "media-7",
    type: "image",
    url: "https://cdnphoto.dantri.com.vn/rW523fObUbRIGjkWYyX7_Nt80s0=/thumb_w/1020/2025/11/21/anh-1jpg-1763715635708.jpg",
    title: "Thử thách giải cứu hồi sinh rừng xanh",
    caption: "Khoảnh khắc đáng nhớ: Các kịch bản nhiệm vụ bám sát chủ đề Cyan Flames - Thanh Hỏa.",
  },
  {
    id: "media-8",
    type: "image",
    url: "https://cdnphoto.dantri.com.vn/SJnwgO35N4ssxLDyYoAyx0cdE2M=/thumb_w/1020/2025/11/21/anh-3jpg-1763715631048.jpg",
    title: "Ngày hội công nghệ FPT Schools",
    caption: "Khoảnh khắc đáng nhớ: Nơi ươm mầm tài năng và khát vọng công nghệ cho thế hệ trẻ.",
  },
];

export const TIMELINE: TimelineItem[] = [
  {
    step: "01",
    date: "05/10/2026",
    title: "Công bố kế hoạch tổ chức: hạng mục Robotics",
    description: "Ban tổ chức chính thức ban hành thể lệ, luật thi đấu và hướng dẫn nhiệm vụ sa bàn hạng mục Robotics.",
  },
  {
    step: "02",
    date: "29/10/2026",
    title: "Công bố kế hoạch: hạng mục Drone Soccer",
    description: "Chính thức giới thiệu thể thức thi đấu bóng bay Drone Soccer, khung lồng tiêu chuẩn và quy cách thiết bị.",
  },
  {
    step: "03",
    date: "Tháng 11/2026",
    title: "Mở cổng đăng ký đội thi toàn quốc",
    description: "Tiếp nhận hồ sơ trực tuyến từ các trường thuộc Hệ thống FPT Schools và các trường phổ thông trên cả nước.",
    isTentative: true,
  },
  {
    step: "04",
    date: "Tháng 12/2026",
    title: "Chốt danh sách đội, tập huấn & làm quen thiết bị",
    description: "Khóa huấn luyện chuyên sâu cùng chuyên gia, phân phát tài liệu kịch bản và buổi chạy thử thiết bị.",
    isTentative: true,
  },
  {
    step: "05",
    date: "Tháng 01–02/2027",
    title: "Vòng thi cơ sở tại các điểm thi trên cả nước",
    description: "Các trận vòng bảng và chung kết cơ sở tại các cụm trường để tìm kiếm các đại diện xuất sắc nhất.",
    isTentative: true,
  },
  {
    step: "06",
    date: "26–27/03/2027",
    title: "Chung kết toàn quốc tại FSC Bắc Giang",
    description: "Đại hội tranh tài quy tụ những chiến binh robot và phi đội drone tài năng nhất trên toàn lãnh thổ.",
    isTentative: true,
  },
];

export const BOARDS: BoardCardInfo[] = [
  {
    id: "Robotics",
    title: "ROBOTICS",
    subtitle: "Thách thức chiến thuật & cơ điện tử",
    targetLevel: "THCS · LỚP 6–9",
    description: "Phát hiện sớm đốm lửa, vượt chướng ngại vật sa bàn và thực hiện nhiệm vụ giải cứu liên minh.",
    features: [
      "Đối tượng THCS (lớp 6–9)",
      "Hạng mục Nội bộ (FPT Schools) và Mở rộng (ngoài hệ thống FPT)",
      "Thi đấu theo trận giữa hai liên minh",
      "Hạng mục Mở rộng: mỗi trường tối đa 5 đội",
      "Hai đội nhất, nhì mỗi điểm thi vòng cơ sở giành vé chung kết toàn quốc",
    ],
    isFeatured: false,
  },
  {
    id: "Drone Soccer",
    title: "DRONE SOCCER",
    subtitle: "Đấu trường không gian 3 chiều đỉnh cao",
    targetLevel: "TIỂU HỌC · THCS · THPT",
    description: "Tốc độ, phản xạ và sự phối hợp đồng đội chuẩn xác qua lồng cầu bảo vệ đặc biệt.",
    features: [
      "Tiểu học (lớp 3–5): thi mô phỏng, có cả Nội bộ và Mở rộng",
      "THCS (lớp 6–9) và THPT (lớp 10–12): thi thiết bị thật, hạng mục Nội bộ",
      "Mỗi trận tối đa 3 hiệp, mỗi hiệp 3 phút (BO3)",
      "Đội Nhất chung kết cơ sở của THCS và THPT giành vé chung kết toàn quốc",
      "Tiểu học thi đến hết vòng chung kết cơ sở",
    ],
    isFeatured: false,
  },
];

export const TEAM_RULES: Record<SchoolLevel, { minStudents: number; maxStudents: number; maxMentors: number }> = {
  "Tiểu học": { minStudents: 1, maxStudents: 3, maxMentors: 1 },
  "THCS": { minStudents: 1, maxStudents: 3, maxMentors: 1 },
  "THPT": { minStudents: 1, maxStudents: 2, maxMentors: 1 },
};

export const VALID_BOARD_MATRIX: Record<BoardType, { levels: SchoolLevel[]; categoriesByLevel: Record<SchoolLevel, CompetitionCategory[]> }> = {
  "Robotics": {
    levels: ["THCS"],
    categoriesByLevel: {
      "THCS": ["Nội bộ (FPT Schools)", "Mở rộng"],
      "Tiểu học": [],
      "THPT": [],
    },
  },
  "Drone Soccer": {
    levels: ["Tiểu học", "THCS", "THPT"],
    categoriesByLevel: {
      "Tiểu học": ["Nội bộ (FPT Schools)", "Mở rộng"],
      "THCS": ["Nội bộ (FPT Schools)"],
      "THPT": ["Nội bộ (FPT Schools)"],
    },
  },
};

export const GRADES_BY_LEVEL: Record<SchoolLevel, string[]> = {
  "Tiểu học": ["Lớp 3", "Lớp 4", "Lớp 5"],
  "THCS": ["Lớp 6", "Lớp 7", "Lớp 8", "Lớp 9"],
  "THPT": ["Lớp 10", "Lớp 11", "Lớp 12"],
};

export const PROVINCES_OF_VIETNAM = [
  "Bắc Giang",
  "Hà Nội",
  "TP. Hồ Chí Minh",
  "Đà Nẵng",
  "Cần Thơ",
  "Bình Định",
  "Hải Phòng",
  "Quảng Ninh",
  "Hải Dương",
  "Bắc Ninh",
  "Nam Định",
  "Nghệ An",
  "Thanh Hóa",
  "Thừa Thiên Huế",
  "Khánh Hòa",
  "Lâm Đồng",
  "Đồng Nai",
  "Bình Dương",
  "Bà Rịa - Vũng Tàu",
  "An Giang",
  "Kiên Giang",
  "Thái Nguyên",
  "Vĩnh Phúc",
  "Phú Thọ",
  "Hà Nam",
  "Hưng Yên",
  "Thái Bình",
  "Ninh Bình",
  "Hà Tĩnh",
  "Quảng Bình",
  "Quảng Trị",
  "Quảng Nam",
  "Quảng Ngãi",
  "Phú Yên",
  "Ninh Thuận",
  "Bình Thuận",
  "Kon Tum",
  "Gia Lai",
  "Đắk Lắk",
  "Đắk Nông",
  "Tây Ninh",
  "Bình Phước",
  "Long An",
  "Tiền Giang",
  "Bến Tre",
  "Trà Vinh",
  "Vĩnh Long",
  "Đồng Tháp",
  "Hậu Giang",
  "Sóc Trăng",
  "Bạc Liêu",
  "Cà Mau",
  "Lào Cai",
  "Yên Bái",
  "Điện Biên",
  "Hòa Bình",
  "Lai Châu",
  "Sơn La",
  "Hà Giang",
  "Cao Bằng",
  "Bắc Kạn",
  "Tuyên Quang",
  "Lạng Sơn"
];
