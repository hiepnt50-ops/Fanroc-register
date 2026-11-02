import React, { useRef, useState, useEffect } from 'react';
import { MEDIA_ITEMS } from '../constants.ts';
import { MediaItem } from '../types.ts';
import { ChevronLeft, ChevronRight, Play, Maximize2, X, Image as ImageIcon } from 'lucide-react';

export const MediaCarousel: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const cardWidth = 320;
    const scrollAmount = direction === 'left' ? -cardWidth * 1.5 : cardWidth * 1.5;
    scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const handleImageError = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!selectedMedia) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedMedia(null);
      } else if (e.key === 'ArrowRight') {
        const currentIndex = MEDIA_ITEMS.findIndex((item) => item.id === selectedMedia.id);
        const nextIndex = (currentIndex + 1) % MEDIA_ITEMS.length;
        setSelectedMedia(MEDIA_ITEMS[nextIndex]);
      } else if (e.key === 'ArrowLeft') {
        const currentIndex = MEDIA_ITEMS.findIndex((item) => item.id === selectedMedia.id);
        const prevIndex = (currentIndex - 1 + MEDIA_ITEMS.length) % MEDIA_ITEMS.length;
        setSelectedMedia(MEDIA_ITEMS[prevIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedMedia]);

  return (
    <section id="media" className="py-20 md:py-28 bg-[#05070D] border-b border-white/10 relative overflow-hidden">
      {/* Decorative tech grid backdrop */}
      <div className="absolute inset-0 tech-grid-pattern opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header: Left Title | Right Description (Congra style 2) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-2 font-mono text-xs text-[#22E4FF] uppercase tracking-widest font-bold">
              <span className="w-2 h-2 bg-[#22E4FF]" />
              KHOẢNH KHẮC ĐẤU TRƯỜNG MÙA 2025–2026
            </div>
            <h2 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl text-white uppercase tracking-tight leading-[1.1]">
              HÌNH ẢNH CUỘC THI
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-sm sm:text-base text-neutral-300 font-sans leading-relaxed">
              Chiêm ngưỡng tinh thần quả cảm, những pha tranh bóng drone mãn nhãn và bản lĩnh làm chủ công nghệ của học sinh FPT Schools qua từng mùa giải.
            </p>
          </div>
        </div>

        {/* Horizontal Carousel */}
        <div className="mt-8 relative">
          <div
            ref={scrollContainerRef}
            className="flex gap-5 sm:gap-6 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory focus:outline-none scrollbar-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            tabIndex={0}
            role="region"
            aria-label="Danh sách hình ảnh cuộc thi"
          >
            {MEDIA_ITEMS.map((item) => {
              const isFailed = failedImages[item.id];
              const isVideo = item.type === 'video';

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedMedia(item)}
                  className="group relative flex-none w-[280px] sm:w-[320px] md:w-[360px] aspect-[4/5] bg-neutral-900 border border-white/15 hover:border-[#22E4FF] transition-all duration-300 cursor-pointer overflow-hidden snap-start flex flex-col justify-end"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedMedia(item);
                    }
                  }}
                  aria-label={`${item.title} - bấm để xem chi tiết`}
                >
                  {/* Media Image / Fallback */}
                  {isFailed ? (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0066B3] to-[#05070D] flex flex-col items-center justify-center p-6 text-center">
                      <ImageIcon className="w-12 h-12 text-[#22E4FF]/60 mb-3" />
                      <span className="font-mono text-xs text-white/80 uppercase tracking-wider">
                        {item.title}
                      </span>
                    </div>
                  ) : (
                    <img
                      src={isVideo ? item.thumbnailUrl : item.url}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      onError={() => handleImageError(item.id)}
                      className="absolute inset-0 w-full h-full object-cover grayscale contrast-115 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out"
                    />
                  )}

                  {/* Gradient Overlay for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05070D] via-[#05070D]/40 to-transparent group-hover:from-[#0066B3]/90 group-hover:via-black/50 transition-all duration-300" />

                  {/* Top-Right Badge: Only for Video, Photo text tag removed */}
                  {isVideo && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="px-2.5 py-1 bg-[#F37021] text-white font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-md">
                        <Play className="w-3 h-3 fill-current" />
                        VIDEO CLIP
                      </span>
                    </div>
                  )}

                  {/* Center Play Button for Video */}
                  {isVideo && (
                    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                      <div className="w-14 h-14 rounded-none bg-[#F37021] border border-orange-300 text-white flex items-center justify-center shadow-[0_0_20px_rgba(243,112,33,0.6)] group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 fill-current ml-0.5" />
                      </div>
                    </div>
                  )}

                  {/* Bottom Content Card */}
                  <div className="relative z-10 p-5 border-t border-white/10 group-hover:border-[#22E4FF]/40 bg-[#05070D]/75 backdrop-blur-sm">
                    <span className="font-mono text-[10px] text-[#22E4FF] uppercase tracking-widest block font-bold mb-1">
                      KHOẢNH KHẮC ĐÁNG NHỚ
                    </span>
                    <h3 className="font-heading font-bold text-xl text-white uppercase tracking-wide group-hover:text-[#22E4FF] transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    {item.caption && (
                      <p className="text-xs text-neutral-300 font-sans mt-1 line-clamp-2 leading-relaxed">
                        {item.caption}
                      </p>
                    )}
                  </div>

                  {/* Hover Corner Tech Accent */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#22E4FF] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#22E4FF] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              );
            })}
          </div>

          {/* 2 Square Navigation Buttons Below Carousel (FPT Blue #0066B3) */}
          <div className="mt-8 flex items-center justify-between">
           

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleScroll('left')}
                className="w-12 h-12 bg-[#0066B3] hover:bg-[#22E4FF] hover:text-black text-white flex items-center justify-center transition-colors cursor-pointer border border-white/10 shadow-lg"
                aria-label="Hình ảnh trước đó"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={() => handleScroll('right')}
                className="w-12 h-12 bg-[#0066B3] hover:bg-[#22E4FF] hover:text-black text-white flex items-center justify-center transition-colors cursor-pointer border border-white/10 shadow-lg"
                aria-label="Hình ảnh tiếp theo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedMedia && (
        <div
          className="fixed inset-0 z-50 bg-[#05070D]/95 backdrop-blur-lg flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={selectedMedia.title}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setSelectedMedia(null)}
            className="absolute top-6 right-6 p-3 bg-neutral-900 border border-white/20 text-neutral-300 hover:text-white hover:border-[#22E4FF] transition-colors z-20 cursor-pointer"
            aria-label="Đóng xem chi tiết (Esc)"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Modal Container */}
          <div className="max-w-4xl w-full bg-[#05070D] border border-white/20 shadow-2xl overflow-hidden relative">
            <div className="aspect-video w-full bg-black relative flex items-center justify-center">
              {selectedMedia.type === 'video' ? (
                <iframe
                  src={`${selectedMedia.url}?autoplay=1`}
                  title={selectedMedia.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              ) : (
                <img
                  src={selectedMedia.url}
                  alt={selectedMedia.title}
                  referrerPolicy="no-referrer"
                  className="max-h-[70vh] w-auto max-w-full object-contain"
                />
              )}
            </div>

            {/* Info footer in Lightbox */}
            <div className="p-6 bg-[#05070D] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="font-mono text-xs text-[#22E4FF] uppercase tracking-widest block font-bold">
                  {selectedMedia.type === 'video' ? 'VIDEO GIỚI THIỆU' : 'KHOẢNH KHẮC THI ĐẤU'}
                </span>
                <h3 className="font-heading font-extrabold text-2xl text-white uppercase tracking-wide mt-1">
                  {selectedMedia.title}
                </h3>
                {selectedMedia.caption && (
                  <p className="text-sm text-neutral-300 font-sans mt-1">
                    {selectedMedia.caption}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    const currentIndex = MEDIA_ITEMS.findIndex((item) => item.id === selectedMedia.id);
                    const prevIndex = (currentIndex - 1 + MEDIA_ITEMS.length) % MEDIA_ITEMS.length;
                    setSelectedMedia(MEDIA_ITEMS[prevIndex]);
                  }}
                  className="px-3 py-2 bg-neutral-900 hover:bg-[#0066B3] text-white border border-white/20 transition-colors font-mono text-xs uppercase"
                  aria-label="Mục trước"
                >
                  Trước
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const currentIndex = MEDIA_ITEMS.findIndex((item) => item.id === selectedMedia.id);
                    const nextIndex = (currentIndex + 1) % MEDIA_ITEMS.length;
                    setSelectedMedia(MEDIA_ITEMS[nextIndex]);
                  }}
                  className="px-3 py-2 bg-[#0066B3] hover:bg-[#22E4FF] hover:text-black text-white transition-colors font-mono text-xs uppercase font-bold"
                  aria-label="Mục kế tiếp"
                >
                  Kế tiếp
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
