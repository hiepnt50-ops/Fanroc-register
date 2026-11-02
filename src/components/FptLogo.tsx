import React, { useState } from 'react';

interface FptLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const PRIMARY_LOGO_URL = "https://fschool.fpt.edu.vn/wp-content/uploads/2026/09/logo-FSC-768x370.webp";
const FALLBACK_LOGO_URL = "/assets/aistudio/Untitled_3a3f1d92.png";

export const FptLogo: React.FC<FptLogoProps> = ({ className = '', size = 'md' }) => {
  const [imgSrc, setImgSrc] = useState(PRIMARY_LOGO_URL);
  const heightClass = size === 'sm' ? 'h-7 sm:h-8' : size === 'lg' ? 'h-12 sm:h-14' : 'h-9 sm:h-11';

  return (
    <div
      className={`bg-white rounded-[2px] p-1.5 sm:px-2.5 sm:py-1 inline-flex items-center shadow-md border border-white/20 select-none transition-transform hover:scale-[1.02] ${className}`}
      title="Hệ thống Giáo dục FPT Schools"
    >
      <img
        src={imgSrc}
        alt="FPT Schools Logo"
        referrerPolicy="no-referrer"
        onError={() => {
          if (imgSrc !== FALLBACK_LOGO_URL) {
            setImgSrc(FALLBACK_LOGO_URL);
          }
        }}
        className={`${heightClass} w-auto object-contain block`}
        loading="eager"
      />
    </div>
  );
};
