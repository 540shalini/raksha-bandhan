import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  opacity: number;
}

export const PetalParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Warm marigold, saffron, gold, and deep rose colors
    const colors = [
      '#E07A5F', // Marigold Orange
      '#F4A261', // Warm Gold-Orange
      '#E5C158', // Metallic Gold
      '#9E2A2B', // Rose Crimson
      '#FFB703', // Yellow Petal
    ];

    const petalCount = Math.min(Math.floor(window.innerWidth / 35), 45);
    const petals: Petal[] = [];

    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 8 + 6,
        speedY: Math.random() * 0.8 + 0.3,
        speedX: Math.sin(Math.random() * Math.PI) * 0.5 - 0.25,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.6 + 0.3,
      });
    }

    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;

      // Organic Petal Shape
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(p.size / 2, -p.size, p.size * 1.2, -p.size / 2, 0, p.size * 1.3);
      ctx.bezierCurveTo(-p.size * 1.2, -p.size / 2, -p.size / 2, -p.size, 0, 0);
      ctx.fill();

      // Soft center vein
      ctx.strokeStyle = 'rgba(255,255,255,0.3)';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, p.size * 0.8);
      ctx.stroke();

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      petals.forEach((p) => {
        p.y += p.speedY;
        p.x += Math.sin(p.y * 0.01) * 0.6 + p.speedX;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        drawPetal(p);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 opacity-70"
    />
  );
};
