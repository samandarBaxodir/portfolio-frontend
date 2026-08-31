"use client";

import { useEffect, useRef } from "react";

export function CosmicBackground() {
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

   const STAR_COUNT = 180;
const starColors = [
  "200, 210, 255",
  "255, 244, 214",
  "255, 220, 200",
  "220, 255, 250",
];
const stars = Array.from({ length: STAR_COUNT }, () => {
  const r = Math.random() * 1.6 + 0.3;
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    r,
    depth: r / 1.9, // kattaroq yulduz = yaqinroq = parallaxga ko'proq javob beradi
    baseAlpha: Math.random() * 0.6 + 0.25,
    twinkleSpeed: Math.random() * 0.025 + 0.006,
    phase: Math.random() * Math.PI * 2,
    color: starColors[Math.floor(Math.random() * starColors.length)],
    flareChance: Math.random(),
  };
});
    type Comet = {
      x: number; y: number; vx: number; vy: number; life: number; maxLife: number;
    };
    let comets: Comet[] = [];

function spawnComet() {
  const fromCenter = Math.random() > 0.5;
  let x: number, y: number, targetX: number, targetY: number;

  if (fromCenter) {
    // Markaz atrofidan chiqib, chetga qarab uchadi
    x = width * 0.3 + Math.random() * width * 0.4;
    y = height * 0.3 + Math.random() * height * 0.4;

    const edge = Math.floor(Math.random() * 4);
    if (edge === 0) { targetX = Math.random() * width; targetY = -100; }
    else if (edge === 1) { targetX = Math.random() * width; targetY = height + 100; }
    else if (edge === 2) { targetX = -100; targetY = Math.random() * height; }
    else { targetX = width + 100; targetY = Math.random() * height; }
  } else {
    // Chetdan chiqib, ekran ichiga qarab uchadi
    const edge = Math.floor(Math.random() * 4);
    if (edge === 0) { x = Math.random() * width; y = -50; }
    else if (edge === 1) { x = Math.random() * width; y = height + 50; }
    else if (edge === 2) { x = -50; y = Math.random() * height; }
    else { x = width + 50; y = Math.random() * height; }

    targetX = Math.random() * width;
    targetY = Math.random() * height;
  }

  const dx = targetX - x;
  const dy = targetY - y;
  const dist = Math.sqrt(dx * dx + dy * dy) || 1;
  const speed =8 + Math.random() * 10;

  comets.push({
    x, y,
    vx: (dx / dist) * speed,
    vy: (dy / dist) * speed,
    life: 0,
    maxLife: 70 + Math.random() * 30,
  });
}

    let nextComet = 20 + Math.random() * 40;
    let frame = 0;

    let mouseX = width / 2;
    let mouseY = height / 2;
    function handleMouse(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }
    window.addEventListener("mousemove", handleMouse);

    let rafId: number;
    function draw() {
      frame++;
      ctx!.clearRect(0, 0, width, height);

      const parallaxX = (mouseX / width - 0.5) * 12;
      const parallaxY = (mouseY / height - 0.5) * 12;

      const GRAVITY_RADIUS = 260;
      const MAX_SWIRL = 2.2; // radian, qancha ko'p burilishi mumkinligi

for (const star of stars) {
  const twinkle = Math.sin(frame * star.twinkleSpeed + star.phase);
  const alpha = Math.max(0, star.baseAlpha + twinkle * 0.35);
  let px = star.x + parallaxX * star.depth;
  let py = star.y + parallaxY * star.depth;

  // "Qora tuynuk" burilish effekti
  const dx = px - mouseX;
  const dy = py - mouseY;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist < GRAVITY_RADIUS && dist > 0.1) {
    const proximity = 1 - dist / GRAVITY_RADIUS; // 0..1, markazga yaqinlashgan sari 1ga intiladi
    const swirlAngle = proximity * proximity * MAX_SWIRL;
    const pull = 1 - proximity * 0.55; // markazga tortilish (masofa qisqaradi)

    const cos = Math.cos(swirlAngle);
    const sin = Math.sin(swirlAngle);
    const rotatedX = dx * cos - dy * sin;
    const rotatedY = dx * sin + dy * cos;

    px = mouseX + rotatedX * pull;
    py = mouseY + rotatedY * pull;
  }

  // Nur porlashi (glow)
  ctx!.shadowBlur = star.r * 4;
  ctx!.shadowColor = `rgba(${star.color}, ${alpha * 0.8})`;

  ctx!.beginPath();
  ctx!.arc(px, py, star.r, 0, Math.PI * 2);
  ctx!.fillStyle = `rgba(${star.color}, ${alpha})`;
  ctx!.fill();

  // Vaqti-vaqti bilan yorqin "chaqnash"
  if (twinkle > 0.97 && star.flareChance > 0.6) {
    ctx!.beginPath();
    ctx!.arc(px, py, star.r * 2.5, 0, Math.PI * 2);
    ctx!.fillStyle = `rgba(${star.color}, ${(twinkle - 0.97) * 10})`;
    ctx!.fill();
  }
}
ctx!.shadowBlur = 0;

      if (frame > nextComet) {
        spawnComet();
        nextComet = frame + 30 + Math.random() * 60;
      }

comets = comets.filter((c) => c.life < c.maxLife);
for (const comet of comets) {
  // Qora tuynuk tortishishi kometaning tezligini (yo'nalishini) buradi
  const dx = comet.x - mouseX;
  const dy = comet.y - mouseY;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist < GRAVITY_RADIUS && dist > 0.1) {
    const proximity = 1 - dist / GRAVITY_RADIUS;
    const pullStrength = proximity * proximity * 0.35;

    // Kometa tezligini kursorga tomon egib boradi
    const towardX = mouseX - comet.x;
    const towardY = mouseY - comet.y;
    const towardDist = Math.sqrt(towardX * towardX + towardY * towardY) || 1;

    comet.vx += (towardX / towardDist) * pullStrength;
    comet.vy += (towardY / towardDist) * pullStrength;
  }

  comet.x += comet.vx;
  comet.y += comet.vy;
  comet.life++;
  const fade = 1 - comet.life / comet.maxLife;

        const grad = ctx!.createLinearGradient(
          comet.x, comet.y,
          comet.x - comet.vx * 6, comet.y - comet.vy * 6
        );
        grad.addColorStop(0, `rgba(180, 200, 255, ${fade})`);
        grad.addColorStop(1, "rgba(180, 200, 255, 0)");

        ctx!.strokeStyle = grad;
        ctx!.lineWidth = 2;
        ctx!.beginPath();
        ctx!.moveTo(comet.x, comet.y);
        ctx!.lineTo(comet.x - comet.vx * 6, comet.y - comet.vy * 6);
        ctx!.stroke();

        ctx!.beginPath();
        ctx!.arc(comet.x, comet.y, 1.6, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255, 255, 255, ${fade})`;
        ctx!.fill();
      }

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
