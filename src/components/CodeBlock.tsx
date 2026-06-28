"use client";

import React, { useState } from "react";

interface CodeBlockProps {
  code: string;
  language?: "json" | "headers" | "bash" | "text";
}

export default function CodeBlock({ code, language = "json" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code: ", err);
    }
  };

  const getHighlightedCode = () => {
    if (!code) return "";
    
    // Simple HTML escape to prevent breaking layouts
    let escaped = code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    if (language === "json") {
      // Highlight keys in JSON: double quotes followed by optional whitespace and a colon
      return escaped.replace(
        /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*")(\s*:)/g,
        '<span class="text-[#FF6B00] font-semibold">$1</span>$3'
      );
    }

    if (language === "headers") {
      // Highlight HTTP headers like Authorization:, Content-Type: at start of line
      return escaped.replace(
        /^([a-zA-Z0-9_-]+):/gm,
        '<span class="text-[#FF6B00] font-semibold">$1</span>:'
      );
    }

    return escaped;
  };

  return (
    <div className="relative group rounded-xl bg-[#1A1A1A] border border-[#2d2d2d] overflow-hidden my-4 shadow-lg font-mono">
      {/* Top Bar with Language Tag and Copy Button */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#252525] border-b border-[#2d2d2d] text-xs text-[#8A8070]">
        <span className="uppercase tracking-wider font-bold text-[10px]">
          {language === "headers" ? "http headers" : language}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-[#333333] hover:text-[#F7F3EC] transition-all duration-200"
          title="Copy code"
        >
          {copied ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                className="w-3.5 h-3.5 text-[#22c55e]"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
              <span className="text-[#22c55e] font-semibold text-[10px]">Copied!</span>
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-3.5 h-3.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a3.375 3.375 0 0 0-3.375 3.375v1.875m7.5 0H7.5m7.5 0v-1.5m-7.5 1.5v-1.5m0 0V8.25m0 0h6.375c.621 0 1.125.504 1.125 1.125v1.5m-7.5-1.5h1.5m-.75 11.25t-1.5 0"
                />
              </svg>
              <span className="text-[10px] tracking-wide">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Area */}
      <div className="p-4 overflow-x-auto text-[13px] leading-relaxed text-[#F7F3EC]">
        <pre className="m-0 font-mono">
          <code
            dangerouslySetInnerHTML={{ __html: getHighlightedCode() }}
            className="block whitespace-pre font-mono"
          />
        </pre>
      </div>
    </div>
  );
}
