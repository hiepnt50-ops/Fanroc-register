import React, { useEffect, useRef } from 'react';

export const FlameCanvas: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Respect user motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;

    const resize = () => {
      if (!canvas) return;
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const onVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        lastTime = performance.now();
        loop(lastTime);
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    // Cyan flame embers
    interface Ember {
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      alpha: number;
      maxLife: number;
      life: number;
      hue: number; // 180 to 200 for cyan/electric blue, occasional 160 for green accent
    }

    const particleCount = window.innerWidth < 768 ? 24 : 45;
    const embers: Ember[] = [];

    const createEmber = (bottomSpawn = false): Ember => {
      const w = canvas.width || 800;
      const h = canvas.height || 600;
      return {
        x: Math.random() * w,
        y: bottomSpawn ? h + Math.random() * 20 : Math.random() * h,
        size: Math.random() * 2.8 + 1.2,
        vx: (Math.random() - 0.5) * 0.7,
        vy: -(Math.random() * 1.3 + 0.6),
        alpha: Math.random() * 0.7 + 0.3,
        maxLife: Math.random() * 140 + 80,
        life: 0,
        hue: Math.random() > 0.85 ? 160 : Math.random() > 0.4 ? 186 : 204, // Cyan to electric blue
      };
    };

    for (let i = 0; i < particleCount; i++) {
      embers.push(createEmber(false));
    }

    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      if (!isVisible) return;

      const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < embers.length; i++) {
        const e = embers[i];
        e.life++;
        e.x += e.vx + Math.sin(e.life * 0.05) * 0.3;
        e.y += e.vy;

        const progress = e.life / e.maxLife;
        const currentAlpha = Math.sin(progress * Math.PI) * e.alpha;

        if (e.y < -10 || e.life >= e.maxLife || e.x < -10 || e.x > canvas.width + 10) {
          embers[i] = createEmber(true);
          continue;
        }

        // Draw glowing ember
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${e.hue}, 100%, 65%, ${currentAlpha})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `hsla(${e.hue}, 100%, 60%, 0.8)`;
        ctx.fill();

        // Inner bright spark
        if (e.size > 2) {
          ctx.beginPath();
          ctx.arc(e.x, e.y, e.size * 0.45, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha * 0.9})`;
          ctx.shadowBlur = 0;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    loop(lastTime);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 z-10 ${className}`}
      aria-hidden="true"
    />
  );
};
