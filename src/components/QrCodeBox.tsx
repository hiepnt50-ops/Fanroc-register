import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { ExternalLink, QrCode } from 'lucide-react';

interface QrCodeBoxProps {
  url: string;
  title?: string;
  buttonLabel?: string;
  accent?: 'cyan' | 'orange';
}

export const QrCodeBox: React.FC<QrCodeBoxProps> = ({
  url,
  title,
  buttonLabel = 'Xem luật đấu chi tiết',
  accent = 'cyan',
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  useEffect(() => {
    let active = true;
    QRCode.toDataURL(url, {
      width: 140,
      margin: 1,
      color: {
        dark: '#0A1F5C',
        light: '#FFFFFF',
      },
    })
      .then((dataUrl) => {
        if (active) setQrDataUrl(dataUrl);
      })
      .catch(() => {
        if (active) setQrDataUrl('');
      });
    return () => {
      active = false;
    };
  }, [url]);

  const isCyan = accent === 'cyan';

  return (
    <div
      className={`flex flex-col sm:flex-row items-center gap-4 p-4 sm:p-5 rounded-2xl border bg-[#071645]/80 ${
        isCyan ? 'border-cyan-400/35' : 'border-orange-400/35'
      }`}
    >
      {/* QR Code */}
      <div className="w-24 h-24 rounded-xl bg-white p-1.5 shrink-0 flex items-center justify-center shadow-md">
        {qrDataUrl ? (
          <img
            src={qrDataUrl}
            alt={`Mã QR ${title || buttonLabel}`}
            className="w-full h-full object-contain"
          />
        ) : (
          <QrCode className="w-10 h-10 text-[#0A1F5C]" />
        )}
      </div>

      {/* Text & Link Button */}
      <div className="flex-1 text-center sm:text-left">
        {title && (
          <div className="font-mono text-xs uppercase tracking-wider text-cyan-200/80 mb-1 font-bold">
            {title}
          </div>
        )}
        <p className="text-xs text-slate-300 font-sans mb-3">
          Quét mã QR hoặc bấm nút bên dưới để mở tài liệu luật thi đấu chi tiết.
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider text-white transition-all shadow-md ${
            isCyan
              ? 'bg-gradient-to-r from-[#14C8D8] to-[#0B5FA5] hover:brightness-110'
              : 'bg-gradient-to-r from-[#F37021] to-[#F59E0B] hover:brightness-110'
          }`}
        >
          <span>{buttonLabel}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
