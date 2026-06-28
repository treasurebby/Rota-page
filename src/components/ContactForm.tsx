"use client";

import React, { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setLoading(true);
    // Simulate API request
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
    }, 800);
  };

  return (
    <div className="min-h-screen py-24 px-6 md:px-12 bg-[#F7F3EC] pt-32 flex items-center justify-center">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tight text-[#1A1A1A] mb-3">
          Get in touch
        </h2>
        <p className="text-base text-[#8A8070] mb-10 max-w-md mx-auto leading-relaxed">
          Interested in early access or a technical walkthrough? Reach out.
        </p>

        {submitted ? (
          <div className="bg-orange-50 border border-[#FF6B00]/20 rounded-2xl p-8 text-center animate-fade-in">
            <div className="w-12 h-12 bg-[#FF6B00]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                className="w-6 h-6 text-[#FF6B00]"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
            </div>
            <h3 className="text-lg font-bold font-display text-[#1A1A1A] mb-1">
              Submission Received
            </h3>
            <p className="text-sm text-[#8A8070]">
              Thanks, we&apos;ll be in touch.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-6 text-xs text-[#FF6B00] hover:underline font-semibold"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="text-left space-y-5 bg-[#FAF8F5] border border-[#E4DEC9] p-8 rounded-2xl shadow-sm">
            <div>
              <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-[#8A8070] mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-[#E4DEC9] rounded-xl text-sm text-[#1A1A1A] placeholder-[#C4BCAC] focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] transition-colors"
                placeholder="Tunde Alao"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-[#8A8070] mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-[#E4DEC9] rounded-xl text-sm text-[#1A1A1A] placeholder-[#C4BCAC] focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] transition-colors"
                placeholder="tunde@company.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-[#8A8070] mb-2">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-[#E4DEC9] rounded-xl text-sm text-[#1A1A1A] placeholder-[#C4BCAC] focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] transition-colors resize-none"
                placeholder="Tell us about your project..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-[#FF6B00] text-white font-bold text-sm tracking-wide rounded-xl shadow-md shadow-[#FF6B00]/10 hover:bg-[#E05E00] hover:shadow-[#FF6B00]/25 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6B00] disabled:opacity-50 transition-all duration-200 text-center"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
