"use client";
import React, { useState } from "react";
import RealityTear from "@/components/RealityTear";

export default function GlitchRealityDemoPage() {
  const [counter, setCounter] = useState(1284);

  const normalLayer = (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-10 font-sans">
      <h1 className="text-4xl font-extrabold mb-4">AetherCloud SaaS</h1>
      <p className="text-lg text-slate-600 mb-6">This is the normal surface layer. Drag your mouse anywhere to rip it open!</p>
      <button onClick={() => setCounter(c => c + 1)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium cursor-pointer">
        Active Clusters: {counter}
      </button>
    </div>
  );

  const alternateLayer = (
    <div className="min-h-screen bg-[#06060c] text-cyan-300 p-10 font-mono">
      <h1 className="text-4xl font-black text-pink-500 mb-4">SYNAPSE // ROOT OVERRIDE</h1>
      <p className="text-cyan-200 mb-6">You breached the surface! The underlying cyberpunk DOM is fully active.</p>
      <div className="p-4 border border-cyan-500/50 bg-black/80 rounded-xl max-w-md">
        <p className="text-xs text-pink-400">STATUS: REALITY MEMBRANE RUPTURED</p>
      </div>
    </div>
  );

  return <RealityTear normalLayer={normalLayer} alternateLayer={alternateLayer} />;
}
