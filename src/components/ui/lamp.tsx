import React, { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 100 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 1.2 + 0.2,
      speedX: (Math.random() - 0.5) * 0.25,
      speedY: (Math.random() - 0.5) * 0.18,
      opacity: Math.random() * 0.45 + 0.05,
      twinkle: Math.random() * Math.PI * 2,
    }));

    let raf: number;
    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      for (const p of particles) {
        p.x += p.speedX;
        p.y += p.speedY;
        p.twinkle += 0.015;
        if (p.x < 0) p.x = canvas!.width;
        if (p.x > canvas!.width) p.x = 0;
        if (p.y < 0) p.y = canvas!.height;
        if (p.y > canvas!.height) p.y = 0;
        const alpha = p.opacity * (0.7 + 0.3 * Math.sin(p.twinkle));
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(180, 220, 255, ${alpha})`;
        ctx!.fill();
      }
      raf = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
}

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        'relative min-h-screen overflow-hidden w-full',
        className
      )}
      style={{ background: 'radial-gradient(ellipse at 50% 0%, #0d1117 0%, #060810 60%, #020305 100%)' }}
    >
      {/* Particles */}
      <ParticleField />

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none z-0"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.7) 100%)' }} />

      {/* Lamp beams */}
      <div className="pointer-events-none absolute inset-x-0 top-[16%] flex items-start justify-center isolate z-10">
        <motion.div
          initial={{ opacity: 0, width: '8rem' }}
          animate={{ opacity: 1, width: '30rem' }}
          transition={{ delay: 0.5, duration: 1.4, ease: 'easeInOut' }}
          style={{ backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))` }}
          className="absolute right-1/2 h-56 overflow-visible bg-gradient-conic from-cyan-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute w-full left-0 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]"
            style={{ background: 'radial-gradient(ellipse at 50% 0%, #0d1117 0%, #060810 60%, #020305 100%)' }} />
          <div className="absolute w-40 h-full left-0 bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]"
            style={{ background: 'radial-gradient(ellipse at 50% 0%, #0d1117 0%, #060810 60%, #020305 100%)' }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, width: '8rem' }}
          animate={{ opacity: 1, width: '30rem' }}
          transition={{ delay: 0.5, duration: 1.4, ease: 'easeInOut' }}
          style={{ backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))` }}
          className="absolute left-1/2 h-56 bg-gradient-conic from-transparent via-transparent to-cyan-500 text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute w-40 h-full right-0 bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]"
            style={{ background: 'radial-gradient(ellipse at 50% 0%, #0d1117 0%, #060810 60%, #020305 100%)' }} />
          <div className="absolute w-full right-0 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]"
            style={{ background: 'radial-gradient(ellipse at 50% 0%, #0d1117 0%, #060810 60%, #020305 100%)' }} />
        </motion.div>

        {/* Glow orb */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.8, duration: 1.2 }}
          className="absolute h-36 w-[28rem] rounded-full bg-cyan-500 blur-3xl"
        />

        {/* Bright core */}
        <motion.div
          initial={{ width: '4rem', opacity: 0 }}
          animate={{ width: '16rem', opacity: 1 }}
          transition={{ delay: 0.8, duration: 1.2, ease: 'easeInOut' }}
          className="absolute h-32 rounded-full bg-cyan-400 blur-2xl translate-y-4"
        />

        {/* Beam line */}
        <motion.div
          initial={{ width: '0rem', opacity: 0 }}
          animate={{ width: '30rem', opacity: 1 }}
          transition={{ delay: 0.6, duration: 1.0, ease: 'easeInOut' }}
          className="absolute h-0.5 bg-cyan-400"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center px-5 pt-36 pb-20">
        {children}
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/25">Листать</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-cyan-400/60 to-transparent"
        />
      </motion.div>
    </div>
  );
};
