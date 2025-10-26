import React from 'react';
import Spline from '@splinetool/react-spline';
import { Rocket, Target } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Soft gradient overlay to improve text contrast without blocking interaction */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/30 to-slate-950/80" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 ring-1 ring-white/15 mb-6">
          <Rocket size={16} className="text-violet-300" />
          <span className="text-xs tracking-wide text-slate-200">AI-Powered Personalized Learning</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-semibold leading-tight">
          Master any subject with your own
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-violet-300 via-sky-300 to-amber-200"> AI study coach</span>
        </h1>
        <p className="mt-4 md:mt-6 text-slate-200/90 text-base md:text-lg max-w-2xl mx-auto">
          Structured plans, adaptive assessments, and clear feedback — all tailored to your time and goals.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <a href="#planner" className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-violet-500 hover:bg-violet-600 transition text-white font-medium shadow-lg shadow-violet-500/20">
            Get your plan
          </a>
          <a href="#overview" className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white/10 hover:bg-white/15 transition text-white font-medium ring-1 ring-white/15">
            <Target size={18} />
            See progress
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
