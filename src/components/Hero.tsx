"use client";

import React from "react";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-[#F7F3EC] px-6"
    >
      {/* Decorative Slowly Rotating Dashed Circles Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        {/* Outer dashed circle */}
        <div className="absolute w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] md:w-[650px] md:h-[650px] rounded-full border-2 border-dashed border-[#FF6B00]/10 animate-spin-slow" />
        
        {/* Inner subtle concentric circle */}
        <div className="absolute w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[480px] md:h-[480px] rounded-full border border-dashed border-[#FF6B00]/5 animate-[spin_180s_linear_infinite_reverse]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-3xl text-center space-y-6 md:space-y-8 animate-fade-in">
        <h1 className="text-7xl sm:text-8xl md:text-9xl font-bold font-display tracking-tighter text-[#1A1A1A] select-none">
          Rota
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-[#8A8070] font-normal leading-relaxed max-w-xl mx-auto">
          Rotational savings infrastructure for developers.
        </p>
        <div className="pt-4">
          <Link
            href="/docs"
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-[#FF6B00] text-white font-bold text-base tracking-wide rounded-xl shadow-lg shadow-[#FF6B00]/10 hover:bg-[#E05E00] hover:shadow-[#FF6B00]/25 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Read the docs</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className="w-4.5 h-4.5 transition-transform group-hover:translate-x-0.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
