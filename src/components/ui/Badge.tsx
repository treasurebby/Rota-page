import React from "react";

interface BadgeProps {
  method: "GET" | "POST" | "PUT";
}

export default function Badge({ method }: BadgeProps) {
  const styles = {
    GET: "bg-[#22c55e]/15 text-[#22c55e] border-[#22c55e]/30",
    POST: "bg-[#FF6B00]/15 text-[#FF6B00] border-[#FF6B00]/30",
    PUT: "bg-[#3b82f6]/15 text-[#3b82f6] border-[#3b82f6]/30",
  };

  return (
    <span
      className={`inline-flex items-center justify-center font-mono text-[11px] font-bold px-2 py-0.5 rounded border tracking-wider ${styles[method]}`}
    >
      {method}
    </span>
  );
}
