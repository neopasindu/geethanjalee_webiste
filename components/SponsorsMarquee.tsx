"use client";

import React from "react";
import { ACHIEVEMENTS } from "@/constants";

export default function SponsorsMarquee() {
  // Duplicate list to ensure continuous infinite loop
  const list = [...ACHIEVEMENTS, ...ACHIEVEMENTS];

  return (
    <div className="mt-16 pt-10 border-t border-white/10">
      <h3 className="text-xl sm:text-2xl font-display font-semibold text-white text-center lg:text-left mb-8">
        Concert Milestones & Recognition
      </h3>

      <div className="relative overflow-hidden w-full py-4 [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
        <div className="flex w-max animate-marquee space-x-8">
          {list.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-accent/40 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center shrink-0">
                <i className="ri-award-fill text-accent text-xl" />
              </div>
              <div className="flex flex-col">
                <span className="text-white text-sm font-semibold whitespace-nowrap">
                  {item.label}
                </span>
                <span className="text-xs text-neutral-400 font-mono">
                  {item.year}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
