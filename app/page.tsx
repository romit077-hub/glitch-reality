"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PointerEvent } from "react";

type Mode = "tear" | "fracture" | "afterimage";
type Point = { x: number; y: number; id: number };

const modes: { id: Mode; number: string; title: string; copy: string }[] = [
  { id: "tear", number: "01", title: "Reality Tear", copy: "Drag across the surface. Find what the interface is hiding." },
  { id: "fracture", number: "02", title: "Reality Fracture", copy: "Break the interface into shards and expose the signal beneath." },
  { id: "afterimage", number: "03", title: "Afterimage World", copy: "Move through the page and leave traces in another reality." },
];

export default function GlitchRealityDemoPage() {
  const [mode, setMode] = useState<Mode>("tear");
  const [fractured, setFractured] = useState(false);
  const [points, setPoints] = useState<Point[]>([]);
  const [dragging, setDragging] = useState(false);
  const [counter, setCounter] = useState(1284);
  const pointId = useRef(0);
  const stageRef = useRef<HTMLElement | null>(null);

  const reset = useCallback(() => {
    setPoints([]);
    setDragging(false);
    setFractured(false);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") reset();
      if (event.key === "1") setMode("tear");
      if (event.key === "2") setMode("fracture");
      if (event.key === "3") setMode("afterimage");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [reset]);

  useEffect(() => {
    if (mode !== "afterimage") return;
    const cleanup = window.setInterval(() => setPoints((p) => p.filter((point) => Date.now() - point.id < 1400)), 180);
    return () => window.clearInterval(cleanup);
  }, [mode]);

  const addPoint = (event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const point = { x: event.clientX - rect.left, y: event.clientY - rect.top, id: Date.now() + pointId.current++ };
    setPoints((previous) => [...previous.slice(-24), point]);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLElement>) => {
    if (mode === "tear") {
      setDragging(true);
      event.currentTarget.setPointerCapture(event.pointerId);
      addPoint(event);
    } else if (mode === "afterimage") addPoint(event);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if ((mode === "tear" && dragging) || mode === "afterimage") addPoint(event);
  };

  const activeMode = modes.find((item) => item.id === mode)!;

  return (
    <main className="site-shell">
      <nav className="topbar">
        <a className="brand" href="#" aria-label="Glitch Reality home"><span className="brand-mark">G<span>/</span>R</span><span>GLITCH<span className="brand-muted">//REALITY</span></span></a>
        <div className="topbar-right"><span className="live-dot" /> INTERACTIVE LAB <span className="version">BUILD 0.2</span></div>
      </nav>

      <section className="hero">
        <div className="eyebrow"><span className="eyebrow-line" /> EXPERIMENTAL INTERFACE ENGINE <span className="eyebrow-line" /></div>
        <h1>Reality is a<br /><span className="headline-glitch">rendering error.</span></h1>
        <p className="hero-copy">Three ways to break the surface of an ordinary interface.<br className="desktop-break" /> Drag. Fracture. Leave something behind.</p>
        <div className="hero-meta"><span><i className="tiny-square" /> NO PLUGINS REQUIRED</span><span><i className="tiny-square" /> BUILT FOR THE WEB</span><span><i className="tiny-square" /> YOU CONTROL THE GLITCH</span></div>
      </section>

      <section className="lab-wrap" aria-label="Interactive effect laboratory">
        <div className="lab-head">
          <div><div className="section-kicker">THE LAB / 001</div><h2>Choose a reality to disrupt.</h2></div>
          <div className="lab-status"><span className="live-dot" /> ENGINE ONLINE</div>
        </div>
        <div className="mode-tabs" role="tablist" aria-label="Reality effects">
          {modes.map((item) => <button key={item.id} role="tab" aria-selected={mode === item.id} className={mode === item.id ? "mode-tab active" : "mode-tab"} onClick={() => { setMode(item.id); reset(); }}><span>{item.number}</span>{item.title}<span className="tab-arrow">↗</span></button>)}
        </div>

        <div className="stage-frame">
          <div className="stage-toolbar"><div className="window-dots"><i /><i /><i /></div><span>SIMULATION / {activeMode.title.toUpperCase()}</span><button onClick={reset} className="reset-button" title="Reset effect (Escape)">↻ RESET</button></div>
          <section ref={stageRef} className={`experience-stage mode-${mode} ${fractured ? "is-fractured" : ""}`} onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={() => setDragging(false)} onPointerCancel={() => setDragging(false)} aria-label={activeMode.title + " interactive area"}>
            <div className="stage-grid" aria-hidden="true" />
            <div className="stage-orb orb-one" aria-hidden="true" /><div className="stage-orb orb-two" aria-hidden="true" />
            <div className="stage-content" style={mode === "tear" ? { maskImage: points.length ? `radial-gradient(circle 86px at ${points[points.length - 1].x}px ${points[points.length - 1].y}px, transparent 0 72%, black 100%)` : "none", WebkitMaskImage: points.length ? `radial-gradient(circle 86px at ${points[points.length - 1].x}px ${points[points.length - 1].y}px, transparent 0 72%, black 100%)` : "none" } : undefined}>
              <div className="surface-label"><span className="surface-pulse" /> SURFACE LAYER / PUBLIC</div>
              <div className="stage-copy">
                <div className="mini-logo">A<span>·</span>C</div>
                <p className="mini-overline">AETHER CLOUD / SYSTEMS FOR TOMORROW</p>
                <h3>Make room<br />for <em>what&apos;s next.</em></h3>
                <p className="mini-description">The future doesn&apos;t wait for permission. Build something worth breaking the rules for.</p>
                <button className="surface-cta" onClick={(event) => { event.stopPropagation(); setCounter((value) => value + 1); }}>Explore the platform <span>↗</span></button>
              </div>
              <div className="stage-footer"><span>STATUS: OPERATIONAL</span><span>ACTIVE CLUSTERS <b>{counter.toLocaleString()}</b></span></div>
            </div>

            <div className="alternate-world" aria-hidden="true">
              <div className="alt-top"><span>/// ROOT ACCESS GRANTED</span><span>SYS.ERR_0xF</span></div>
              <div className="alt-core"><div className="core-ring"><div className="core-inner">G<span>R</span></div></div><p className="alt-kicker">YOU FOUND THE OTHER SIDE</p><h3>Nothing is<br /><em>as it renders.</em></h3><p className="alt-copy">The interface was a mask. The signal was always underneath.</p><div className="alt-code">REALITY_LAYER.override(true)<br /><span>MEMBRANE_INTEGRITY: 0.00%</span><br />AWAITING_INPUT<span className="cursor-block">_</span></div></div>
              <div className="alt-bottom"><span>DIMENSION 02 / UNMAPPED</span><span>DON&apos;T LOOK AWAY</span></div>
            </div>

            {mode === "fracture" && <div className="fracture-overlay" aria-hidden="true"><div className="shard shard-a" /><div className="shard shard-b" /><div className="shard shard-c" /><div className="shard shard-d" /><div className="shard shard-e" /></div>}
            {mode === "afterimage" && <div className="afterimage-layer" aria-hidden="true">{points.map((point) => <span key={point.id} className="afterimage-point" style={{ left: point.x, top: point.y, animationDelay: `-${Math.min((Date.now() - point.id) / 1400, 1)}s` }} />)}</div>}
            {mode === "fracture" && <button className="fracture-trigger" onPointerDown={(event) => event.stopPropagation()} onClick={() => setFractured((value) => !value)}>{fractured ? "↻ REASSEMBLE" : "✳ FRACTURE SURFACE"}</button>}
            {mode === "tear" && <div className="stage-instruction">{points.length ? "SURFACE BREACHED — KEEP DRAGGING" : "CLICK + DRAG TO TEAR REALITY"}</div>}
            {mode === "afterimage" && <div className="stage-instruction">MOVE YOUR POINTER THROUGH THE SIGNAL</div>}
          </section>
        </div>
        <p className="mode-description"><span>{activeMode.number} /</span> {activeMode.copy} <span className="keyboard-hint">KEYS: 1 / 2 / 3 TO SWITCH · ESC TO RESET</span></p>
      </section>

      <section className="principles">
        <div className="principle"><span className="principle-number">01</span><h3>Visual first.</h3><p>Effects should feel like a discovery, not a distraction. Every motion has a reason.</p></div>
        <div className="principle"><span className="principle-number">02</span><h3>Agent ready.</h3><p>Built to become a reusable skill for coding agents, not a one-off visual trick.</p></div>
        <div className="principle"><span className="principle-number">03</span><h3>Respect the user.</h3><p>Responsive by design, reduced-motion aware, and no hidden network calls.</p></div>
      </section>

      <footer className="footer"><a className="brand footer-brand" href="#"><span className="brand-mark">G<span>/</span>R</span><span>GLITCH<span className="brand-muted">//REALITY</span></span></a><span>AN EXPERIMENT IN INTERACTIVE REALITIES</span><span>MADE TO BE BROKEN<span className="footer-pink">.</span></span></footer>
    </main>
  );
}
