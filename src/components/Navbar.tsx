"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface NavbarProps {
  activeRoute: "home" | "docs" | "contact";
}

export default function Navbar({ activeRoute }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#F7F3EC]/90 backdrop-blur-md border-b border-[#E4DEC9] shadow-sm py-4"
          : "bg-[#F7F3EC] py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Rota Wordmark */}
        <Link
          href="/"
          onClick={() => setMobileMenuOpen(false)}
          className="text-2xl font-bold font-display tracking-tight text-[#1A1A1A] hover:text-[#FF6B00] transition-colors"
        >
          Rota
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/docs"
            className={`text-sm font-semibold tracking-wide transition-colors ${
              activeRoute === "docs"
                ? "text-[#FF6B00]"
                : "text-[#8A8070] hover:text-[#1A1A1A]"
            }`}
          >
            Docs
          </Link>
          <Link
            href="/contact"
            className={`text-sm font-semibold tracking-wide transition-colors ${
              activeRoute === "contact"
                ? "text-[#FF6B00]"
                : "text-[#8A8070] hover:text-[#1A1A1A]"
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#1A1A1A] hover:text-[#FF6B00] transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-[73px] left-0 right-0 bottom-0 bg-[#F7F3EC] border-t border-[#E4DEC9] z-45 animate-fade-in flex flex-col p-6 space-y-6">
          <Link
            href="/docs"
            onClick={() => setMobileMenuOpen(false)}
            className={`text-lg font-bold font-display py-2 border-b border-[#E4DEC9]/40 transition-colors ${
              activeRoute === "docs" ? "text-[#FF6B00]" : "text-[#1A1A1A] hover:text-[#FF6B00]"
            }`}
          >
            Documentation
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className={`text-lg font-bold font-display py-2 border-b border-[#E4DEC9]/40 transition-colors ${
              activeRoute === "contact" ? "text-[#FF6B00]" : "text-[#1A1A1A] hover:text-[#FF6B00]"
            }`}
          >
            Contact Support
          </Link>
        </div>
      )}
    </header>
  );
}
