"use client";

import { useEffect, useRef } from "react";

const INK_COLORS = [
  "99, 102, 241",   // indigo (accent)
  "236, 72, 153",   // pushti
  "56, 189, 248",   // moviy
  "251, 191, 36",   // oltin
  "52, 211, 153",   // zumrad
];

export function InkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = width + "px";
      canvas!.style.height = height + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    type Drop = { x: number; y: number; r: number; color: string; life: number; maxLife: number };
    let drops: Drop[] = [];

    let mouseX = -9999;
    let mouseY = -9999;
    let lastMoveX = -9999;
    let lastMoveY = -9999;
    const DIAMETER = 90; // sichqoncha atrofidagi "siyoh maydoni" radiusi

    function handleMouse(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;

      const dx = mouseX - lastMoveX;
      const dy = mouseY - lastMoveY;
      const moved = Math.sqrt(dx * dx + dy * dy);

      if (moved > 8) {
        const color = INK_COLORS[Math.floor(Math.random() * INK_COLORS.length)];
        drops.push({
          x: mouseX + (Math.random() - 0.5) * DIAMETER * 0.4,
          y: mouseY + (Math.random() - 0.5) * DIAMETER * 0.4,
          r: DIAMETER * (0.5 + Math.random() * 0.5),
          color,
          life: 0,
          maxLife: 240, // ~4 soniya (60fps da)
        });
        lastMoveX = mouseX;
        lastMoveY = mouseY;
      }
    }
    window.addEventListener("mousemove", handleMouse);

    let rafId: number;
    function draw() {
      ctx!.clearRect(0, 0, width, height);
      ctx!.globalCompositeOperation = "multiply";

      drops = drops.filter((d) => d.life < d.maxLife);
      for (const drop of drops) {
        drop.life++;
        const t = drop.life / drop.maxLife;
        // Boshida tez paydo bo'ladi, keyin sekin so'nadi
        const fadeIn = Math.min(1, drop.life / 12);
        const fadeOut = 1 - Math.pow(t, 2);
        const alpha = fadeIn * fadeOut * 0.35;

        const grad = ctx!.createRadialGradient(
          drop.x, drop.y, 0,
          drop.x, drop.y, drop.r
        );
        grad.addColorStop(0, `rgba(${drop.color}, ${alpha})`);
        grad.addColorStop(1, `rgba(${drop.color}, 0)`);

        ctx!.beginPath();
        ctx!.arc(drop.x, drop.y, drop.r, 0, Math.PI * 2);
        ctx!.fillStyle = grad;
        ctx!.fill();
      }

      ctx!.globalCompositeOperation = "source-over";
      rafId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: "transparent" }}
    />
  );
}
