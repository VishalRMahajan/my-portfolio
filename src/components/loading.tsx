"use client";

import React, { useEffect, useRef, useState } from "react";

interface LoadingScreenProps {
  imgSrc: string;
  width: number;
  height: number;
}

const SQUARE_SIZE = 5;

export default function LoadingScreen({
  imgSrc,
  width,
  height,
}: LoadingScreenProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [done, setDone] = useState(false);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    let animationFrameId: number;
    const img = new window.Image();
    img.src = imgSrc;
    img.onload = () => {
      if (!canvasRef.current) return;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, width, height);
      const imgData = ctx.getImageData(0, 0, width, height).data;

      const cols = Math.ceil(width / SQUARE_SIZE);
      const rows = Math.ceil(height / SQUARE_SIZE);
      const totalSquares = cols * rows;

      const squares: {
        x: number;
        y: number;
        color: [number, number, number];
      }[] = [];
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          let r = 0,
            g = 0,
            b = 0,
            count = 0;
          for (
            let y = row * SQUARE_SIZE;
            y < Math.min((row + 1) * SQUARE_SIZE, height);
            y++
          ) {
            for (
              let x = col * SQUARE_SIZE;
              x < Math.min((col + 1) * SQUARE_SIZE, width);
              x++
            ) {
              const idx = (y * width + x) * 4;
              r += imgData[idx];
              g += imgData[idx + 1];
              b += imgData[idx + 2];
              count++;
            }
          }
          squares.push({
            x: col * SQUARE_SIZE,
            y: row * SQUARE_SIZE,
            color: [
              Math.round(r / count),
              Math.round(g / count),
              Math.round(b / count),
            ],
          });
        }
      }

      const revealOrder = squares.map((_, i) => i);
      for (let i = revealOrder.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [revealOrder[i], revealOrder[j]] = [revealOrder[j], revealOrder[i]];
      }

      let revealed = 0;
      function animate() {
        const revealPerFrame = Math.max(1, Math.ceil(totalSquares / 60));
        if (!ctx) return;
        for (
          let i = 0;
          i < revealPerFrame && revealed < totalSquares;
          i++, revealed++
        ) {
          const idx = revealOrder[revealed];
          const sq = squares[idx];
          ctx.fillStyle = `rgb(${sq.color[0]},${sq.color[1]},${sq.color[2]})`;
          ctx.fillRect(sq.x, sq.y, SQUARE_SIZE, SQUARE_SIZE);
        }
        if (revealed < totalSquares) {
          animationFrameId = requestAnimationFrame(animate);
        } else {
          setTimeout(() => setFade(true), 200);
        }
      }

      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, width, height);

      animate();
    };
    img.onerror = () => {
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext("2d");
        if (ctx) {
          ctx.fillStyle = "#000";
          ctx.fillRect(0, 0, width, height);
        }
      }
      setTimeout(() => setFade(true), 200);
    };

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [imgSrc, width, height]);

  useEffect(() => {
    if (fade) {
      const timeout = setTimeout(() => setDone(true), 400);
      return () => clearTimeout(timeout);
    }
  }, [fade]);

  if (done) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black transition-opacity duration-400 ${
        fade ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100vw",
          height: "100vh",
          imageRendering: "pixelated",
          display: "block",
        }}
      />
    </div>
  );
}
