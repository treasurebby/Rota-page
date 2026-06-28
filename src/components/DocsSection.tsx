"use client";

import React, { useState, useEffect, useRef } from "react";
import { docsSections, navigationStructure } from "../data/docsData";
import Badge from "./ui/Badge";
import CodeBlock from "./CodeBlock";

export default function DocsSection() {
  const [activeId, setActiveId] = useState("introduction");
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Scrollspy for sidebar links
  useEffect(() => {
    const ids = docsSections.map((item) => item.id);
    
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    observerRef.current = new IntersectionObserver(observerCallback, observerOptions);

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const handleSidebarClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileDrawerOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 90; // height of the fixed top navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveId(id);
    }
  };

  const renderMarkdown = (text: string) => {
    if (!text) return "";
    let formatted = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Bold tags
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-[#1A1A1A]">$1</strong>');

    // Inline Code tags
    formatted = formatted.replace(
      /`([^`]+)`/g,
      '<code class="px-1.5 py-0.5 rounded bg-[#FAF8F5] border border-[#E4DEC9] text-[12px] font-mono text-[#FF6B00] font-semibold">$1</code>'
    );

    // Markdown Bullet Points (Convert lines starting with "* " to list elements)
    if (formatted.includes("* ")) {
      const lines = formatted.split("\n");
      let inList = false;
      const newLines = lines.map((line) => {
        if (line.trim().startsWith("* ")) {
          const itemText = line.replace(/^\s*\*\s+/, "");
          let prefix = "";
          if (!inList) {
            inList = true;
            prefix = '<ul class="list-disc pl-5 my-3 space-y-1.5 text-sm text-[#8A8070]">';
          }
          return `${prefix}<li>${itemText}</li>`;
        } else {
          let suffix = "";
          if (inList) {
            inList = false;
            suffix = "</ul>";
          }
          return `${suffix}${line}`;
        }
      });
      if (inList) {
        newLines.push("</ul>");
      }
      formatted = newLines.join("\n");
    }

    // Split paragraphs
    formatted = formatted
      .split("\n\n")
      .map((p) => {
        if (p.trim().startsWith("<ul") || p.trim().startsWith("<li>") || p.trim().endsWith("</ul>")) {
          return p;
        }
        return `<p class="mb-4 last:mb-0 leading-relaxed text-sm text-[#8A8070]">${p}</p>`;
      })
      .join("");

    return formatted;
  };

  const currentActiveTitle = docsSections.find((item) => item.id === activeId)?.title || "Navigation";

  return (
    <div className="relative min-h-screen bg-[#F7F3EC] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6 flex">
        
        {/* Desktop Left Sidebar */}
        <aside className="hidden lg:block w-[260px] shrink-0 sticky top-24 h-[calc(100vh-120px)] overflow-y-auto pb-10 pr-6 border-r border-[#E4DEC9]/60 select-none">
          <nav className="space-y-8">
            {navigationStructure.map((group) => (
              <div key={group.title} className="space-y-3">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#8A8070]">
                  {group.title}
                </h4>
                <ul className="space-y-1.5 pl-1">
                  {group.items.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        onClick={(e) => handleSidebarClick(e, item.id)}
                        className={`block py-1 text-sm font-medium transition-all duration-150 rounded ${
                          activeId === item.id
                            ? "text-[#FF6B00] font-semibold border-l-2 border-[#FF6B00] pl-3 -ml-3"
                            : "text-[#8A8070] hover:text-[#1A1A1A] pl-0"
                        }`}
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* Mobile Navigation Sticky Floating Button */}
        <div className="lg:hidden fixed bottom-6 right-6 z-40">
          <button
            onClick={() => setMobileDrawerOpen(true)}
            className="flex items-center gap-2 px-4 py-3 bg-[#FF6B00] text-white font-bold text-sm tracking-wide rounded-full shadow-lg shadow-[#FF6B00]/20 hover:bg-[#E05E00] active:scale-95 transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-3.75 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            <span>Docs Menu ({currentActiveTitle})</span>
          </button>
        </div>

        {/* Mobile TOC Drawer Modal */}
        {mobileDrawerOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-[#1A1A1A]/30 backdrop-blur-sm"
              onClick={() => setMobileDrawerOpen(false)}
            />
            {/* Panel */}
            <div className="relative w-80 max-w-full h-full bg-[#F7F3EC] shadow-2xl p-6 overflow-y-auto z-10 flex flex-col justify-between border-l border-[#E4DEC9] animate-slide-over">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#E4DEC9] pb-4">
                  <h3 className="text-sm font-bold font-display uppercase tracking-widest text-[#1A1A1A]">
                    API Documentation
                  </h3>
                  <button
                    onClick={() => setMobileDrawerOpen(false)}
                    className="p-1 rounded text-[#8A8070] hover:text-[#1A1A1A] transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <nav className="space-y-6">
                  {navigationStructure.map((group) => (
                    <div key={group.title} className="space-y-2.5">
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#8A8070]">
                        {group.title}
                      </h4>
                      <ul className="space-y-1.5 pl-1">
                        {group.items.map((item) => (
                          <li key={item.id}>
                            <a
                              href={`#${item.id}`}
                              onClick={(e) => handleSidebarClick(e, item.id)}
                              className={`block py-1 text-sm font-semibold transition-all duration-150 ${
                                activeId === item.id
                                  ? "text-[#FF6B00] border-l-2 border-[#FF6B00] pl-3 -ml-3"
                                  : "text-[#8A8070] hover:text-[#1A1A1A]"
                              }`}
                            >
                              {item.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </nav>
              </div>
              <div className="pt-6 border-t border-[#E4DEC9]/60">
                <p className="text-[10px] font-mono text-[#8A8070] text-center">
                  Rota API v1.0.0
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Right Scrollable Content Area */}
        <main className="flex-1 lg:pl-10 pb-32 max-w-full overflow-hidden">
          <div className="space-y-24">
            {docsSections.map((item) => {
              const hasCode = !!(item.requestHeaders || item.requestBody || item.responseBody);
              
              return (
                <div
                  key={item.id}
                  id={item.id}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-b border-[#E4DEC9]/30 pb-16 last:border-0 last:pb-0"
                >
                  {/* Left Column: Text & Descriptions */}
                  <div className={`${hasCode ? "lg:col-span-7" : "lg:col-span-12"} space-y-4`}>
                    
                    {/* Breadcrumbs for nested endpoints */}
                    {item.parent && (
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#8A8070]">
                        {item.parent}
                      </span>
                    )}

                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-2xl md:text-3xl font-bold font-display tracking-tight text-[#1A1A1A]">
                        {item.title}
                      </h2>
                      {item.method && <Badge method={item.method} />}
                    </div>

                    {item.endpoint && (
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#FAF8F5] border border-[#E4DEC9] font-mono text-xs font-semibold text-[#1A1A1A]">
                        <span className="text-[#8A8070] select-none">ENDPOINT</span>
                        <span>{item.endpoint}</span>
                      </div>
                    )}

                    <div
                      dangerouslySetInnerHTML={{ __html: renderMarkdown(item.description) }}
                      className="prose prose-sm max-w-none text-[#8A8070]"
                    />

                    {/* Webhooks/Errors table if exists */}
                    {item.table && (
                      <div className="mt-6 overflow-x-auto border border-[#E4DEC9] rounded-xl bg-[#FAF8F5]">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead>
                            <tr className="bg-[#FAF8F5] border-b border-[#E4DEC9]">
                              {item.table.headers.map((h, i) => (
                                <th
                                  key={i}
                                  className="px-4 py-3 font-bold uppercase tracking-wider text-[#8A8070] font-sans"
                                >
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {item.table.rows.map((row, ri) => (
                              <tr
                                key={ri}
                                className="border-b border-[#E4DEC9]/40 last:border-0 hover:bg-[#F7F3EC]/20 transition-colors"
                              >
                                {row.map((cell, ci) => (
                                  <td
                                    key={ci}
                                    className={`px-4 py-3 font-sans leading-relaxed text-[#1A1A1A] ${
                                      ci === 0 ? "font-mono font-semibold text-[#FF6B00]" : ""
                                    } ${
                                      ci === 1 && item.id === "errors" ? "font-mono font-semibold text-[#8A8070]" : ""
                                    }`}
                                  >
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {item.extraHtml && (
                      <div dangerouslySetInnerHTML={{ __html: item.extraHtml }} />
                    )}
                  </div>

                  {/* Right Column: Code Blocks / Response Panels */}
                  {hasCode && (
                    <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-24 self-start">
                      
                      {item.requestHeaders && (
                        <div>
                          <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A8070] mb-2 px-1">
                            Request Headers
                          </div>
                          <CodeBlock code={item.requestHeaders} language="headers" />
                        </div>
                      )}

                      {item.requestBody && (
                        <div>
                          <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A8070] mb-2 px-1">
                            Request Body
                          </div>
                          <CodeBlock code={item.requestBody} language="json" />
                        </div>
                      )}

                      {item.responseBody && (
                        <div>
                          <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A8070] mb-2 px-1">
                            Response Payload
                          </div>
                          <CodeBlock code={item.responseBody} language="json" />
                        </div>
                      )}
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        </main>

      </div>
    </div>
  );
}
