"use client";
import React, { useEffect, useRef, useState, useCallback, useId } from "react";

export interface RealityTearProps {
  normalLayer: React.ReactNode;
  alternateLayer: React.ReactNode;
  initialTearWidth?: number;
}

interface TearPoint { x: number; y: number; vx: number; vy: number; width: number; seed: number; }
interface TearStroke { points: TearPoint[]; leftEdge: { x: number; y: number }[]; rightEdge: { x: number; y: number }[]; svgPath: string; }

function pseudoNoise(x: number, y: number, seed: number): number {
  const n = Math.sin(x * 12.9898 + y * 78.233 + seed * 43.123) * 43758.5453;
  return (n - Math.floor(n)) * 2 - 1;
}

export default function RealityTear({ normalLayer, alternateLayer, initialTearWidth = 68 }: RealityTearProps) {
  const rawId = useId();
  const maskId = `reality-tear-mask-${rawId.replace(/[^a-zA-Z0-9]/g, "")}`;
  const [tearWidth] = useState<number>(initialTearWidth);
  const [tearCount, setTearCount] = useState<number>(0);

  const maskPathRef = useRef<SVGPathElement | null>(null);
  const strokesRef = useRef<TearStroke[]>([]);
  const activeStrokeRef = useRef<TearStroke | null>(null);
  const isPointerDownRef = useRef<boolean>(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  const buildStrokeGeometry = useCallback((stroke: TearStroke) => {
    const pts = stroke.points;
    if (pts.length < 2) { stroke.svgPath = ""; return; }
    const leftEdge: { x: number; y: number }[] = [];
    const rightEdge: { x: number; y: number }[] = [];
    for (let i = 0; i < pts.length; i++) {
      const curr = pts[i]; const prev = i > 0 ? pts[i - 1] : curr; const next = i < pts.length - 1 ? pts[i + 1] : curr;
      let dx = next.x - prev.x; let dy = next.y - prev.y; const len = Math.hypot(dx, dy) || 1;
      dx /= len; dy /= len; const nx = -dy; const ny = dx;
      const taper = i === 0 || i === pts.length - 1 ? 0.15 : i === 1 || i === pts.length - 2 ? 0.65 : 1.0;
      const n1 = pseudoNoise(i * 0.45, curr.seed, 1.1); const jagLeft = (1 + n1 * 0.55) * curr.width * taper;
      const n3 = pseudoNoise(i * 0.45, curr.seed + 10, 3.3); const jagRight = (1 + n3 * 0.55) * curr.width * taper;
      leftEdge.push({ x: curr.x + nx * jagLeft, y: curr.y + ny * jagLeft });
      rightEdge.push({ x: curr.x - nx * jagRight, y: curr.y - ny * jagRight });
    }
    stroke.leftEdge = leftEdge; stroke.rightEdge = rightEdge;
    let d = `M ${leftEdge[0].x.toFixed(1)} ${leftEdge[0].y.toFixed(1)} `;
    for (let i = 1; i < leftEdge.length; i++) d += `L ${leftEdge[i].x.toFixed(1)} ${leftEdge[i].y.toFixed(1)} `;
    for (let i = rightEdge.length - 1; i >= 0; i--) d += `L ${rightEdge[i].x.toFixed(1)} ${rightEdge[i].y.toFixed(1)} `;
    d += "Z "; stroke.svgPath = d;
  }, []);

  const syncSvgMaskDom = useCallback(() => {
    if (!maskPathRef.current) return;
    maskPathRef.current.setAttribute("d", strokesRef.current.map((s) => s.svgPath).join(""));
  }, []);

  useEffect(() => {
    const w = window.innerWidth; const h = window.innerHeight;
    const demoStroke: TearStroke = { points: [], leftEdge: [], rightEdge: [], svgPath: "" };
    for (let i = 0; i <= 14; i++) {
      const t = i / 14;
      demoStroke.points.push({ x: w * 0.52 + t * (w * 0.32), y: h * 0.22 + t * (h * 0.48) + Math.sin(t * Math.PI * 2) * 28, vx: 12, vy: 12, width: initialTearWidth, seed: i * 19.7 });
    }
    buildStrokeGeometry(demoStroke);
    strokesRef.current = [demoStroke];
    setTearCount(1);
    syncSvgMaskDom();

    const handlePointerDown = (e: PointerEvent) => {
      if ((e.target as HTMLElement)?.closest("[data-glitch-hud]")) return;
      isPointerDownRef.current = true;
      lastPointRef.current = { x: e.clientX, y: e.clientY };
      const newStroke: TearStroke = { points: [{ x: e.clientX, y: e.clientY, vx: 0, vy: 0, width: tearWidth * 0.5, seed: Math.random() * 1000 }], leftEdge: [], rightEdge: [], svgPath: "" };
      strokesRef.current.push(newStroke);
      activeStrokeRef.current = newStroke;
      setTearCount(strokesRef.current.length);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isPointerDownRef.current) return;
      const last = lastPointRef.current;
      if (last && Math.hypot(e.clientX - last.x, e.clientY - last.y) >= 10) {
        activeStrokeRef.current?.points.push({ x: e.clientX, y: e.clientY, vx: 0, vy: 0, width: tearWidth, seed: Math.random() * 1000 });
        lastPointRef.current = { x: e.clientX, y: e.clientY };
        if (activeStrokeRef.current) buildStrokeGeometry(activeStrokeRef.current);
        syncSvgMaskDom();
      }
    };

    const handlePointerUp = () => { isPointerDownRef.current = false; activeStrokeRef.current = null; };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [tearWidth, initialTearWidth, buildStrokeGeometry, syncSvgMaskDom]);

  const topLayerMaskStyle: React.CSSProperties = { WebkitMaskImage: `url(#${maskId})`, maskImage: `url(#${maskId})` };

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden select-none cursor-crosshair">
      <svg className="fixed inset-0 w-full h-full pointer-events-none opacity-0" aria-hidden="true">
        <defs><mask id={maskId} maskUnits="userSpaceOnUse"><rect x="0" y="0" width="100%" height="100%" fill="white" /><path ref={maskPathRef} d="" fill="black" /></mask></defs>
      </svg>
      <div className="w-full min-h-screen">{alternateLayer}</div>
      <div style={topLayerMaskStyle} className="fixed inset-0 w-full h-full overflow-y-auto">{normalLayer}</div>
      <aside data-glitch-hud="true" className="fixed bottom-5 right-5 z-50 bg-zinc-950 text-cyan-300 rounded-xl p-3 font-mono text-xs shadow-2xl">
        <button onClick={() => { strokesRef.current = []; setTearCount(0); syncSvgMaskDom(); }} className="px-3 py-1.5 rounded bg-pink-600 text-black font-bold cursor-pointer">Reset Surface ({tearCount})</button>
      </aside>
    </div>
  );
}