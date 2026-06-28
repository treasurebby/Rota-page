import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] border-t border-[#2d2d2d] py-12 px-6 text-center select-none text-xs text-[#8A8070] font-mono">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div>&copy; {new Date().getFullYear()} Rota Technologies, Inc. All rights reserved.</div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-[#FF6B00] transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[#FF6B00] transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-[#FF6B00] transition-colors">Security</a>
        </div>
      </div>
    </footer>
  );
}
