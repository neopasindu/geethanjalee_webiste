"use client";

import React from "react";
import Link from "next/link";
import { CONCERT_SCHEDULE } from "@/constants";

export default function Schedule() {
  return (
    <section id="schedule" className="py-16 sm:py-24 bg-[#0a0a0b] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w relative z-10">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-accent font-semibold block mb-2">
              Concert Tour & Experience
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
              Tour Dates & Venues
            </h2>
          </div>
          <p className="text-sm text-neutral-400 max-w-md font-prompt">
            Catch the symphony live across key Sri Lankan venues and international stops.
          </p>
        </div>

        {/* Schedule List */}
        <div className="flex flex-col gap-2">
          {CONCERT_SCHEDULE.map((item) => {
            const isLive = item.status === "tickets-live";
            const isComingSoon = item.status === "coming-soon";
            const isPast = item.status === "past";

            return (
              <div
                key={item.id}
                className="group relative block border-b border-white/10 last:border-b-0 py-5 sm:py-7 px-3 sm:px-6 -mx-3 sm:-mx-6 transition-all duration-300 hover:bg-white/[0.03] rounded-2xl"
              >
                {/* Mobile View */}
                <div className="block md:hidden">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-bold font-display text-white">
                        {item.day}
                      </span>
                      <div className="flex flex-col text-xs font-medium text-neutral-400">
                        <span className="text-accent font-semibold">{item.month}</span>
                        <span>{item.weekday}</span>
                      </div>
                    </div>

                    <div className="flex-1 min-w-0 px-2">
                      <h3 className="text-sm font-semibold text-white truncate">{item.venue}</h3>
                      <p className="text-xs text-neutral-400 truncate">{item.city}</p>
                    </div>

                    <div className="shrink-0">
                      {isLive ? (
                        <Link
                          href={item.ticketUrl || "#tickets"}
                          className="px-3 py-1.5 rounded-full bg-accent text-white text-xs font-semibold shadow-md shadow-accent/20"
                        >
                          Book Now
                        </Link>
                      ) : isComingSoon ? (
                        <span className="text-[11px] font-medium text-neutral-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                          Coming Soon
                        </span>
                      ) : (
                        <span className="text-[11px] font-medium text-neutral-500 bg-white/5 px-2.5 py-1 rounded-full">
                          Event Ended
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Desktop View with Dual-Layer Roll-Up Effect (Kataka Signature) */}
                <div className="hidden md:block relative overflow-hidden p-1">
                  {/* Layer 1: Normal State (White & Gray) */}
                  <div className="transition-transform duration-300 ease-out group-hover:-translate-y-full">
                    <div className="flex items-center justify-between w-full gap-6">
                      <div className="flex items-center gap-8 shrink-0">
                        <span className="text-4xl font-display font-medium text-white w-20">
                          {item.year}
                        </span>
                        <div className="flex flex-col font-medium text-xs uppercase tracking-wider text-neutral-400 w-12">
                          <span className="text-accent">{item.month}</span>
                          <span>{item.weekday}</span>
                        </div>
                        <span className="text-4xl font-display font-semibold text-white w-14">
                          {item.day}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-medium text-white truncate">{item.venue}</h3>
                        <p className="text-xs text-neutral-400">{item.city}</p>
                      </div>

                      <div className="shrink-0 w-32 text-right">
                        {isLive ? (
                          <span className="inline-block text-xs font-semibold text-white bg-accent px-4 py-1.5 rounded-full shadow-md shadow-accent/30">
                            Book Tickets
                          </span>
                        ) : isComingSoon ? (
                          <span className="text-xs font-medium text-neutral-400 border border-white/10 px-3.5 py-1.5 rounded-full bg-white/5">
                            Coming Soon
                          </span>
                        ) : (
                          <span className="text-xs font-medium text-neutral-500 bg-white/5 px-3 py-1.5 rounded-full">
                            Event Ended
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Layer 2: Hover State (Slides up in Glowing Accent Color) */}
                  <div className="absolute top-0 left-0 w-full transition-transform duration-300 ease-out translate-y-full group-hover:translate-y-0">
                    <div className="flex items-center justify-between w-full gap-6">
                      <div className="flex items-center gap-8 shrink-0">
                        <span className="text-4xl font-display font-medium text-accent w-20 drop-shadow-[0_0_12px_rgba(212,160,23,0.5)]">
                          {item.year}
                        </span>
                        <div className="flex flex-col font-medium text-xs uppercase tracking-wider text-accent w-12">
                          <span>{item.month}</span>
                          <span>{item.weekday}</span>
                        </div>
                        <span className="text-4xl font-display font-semibold text-accent w-14 drop-shadow-[0_0_12px_rgba(212,160,23,0.5)]">
                          {item.day}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-medium text-accent truncate">{item.venue}</h3>
                        <p className="text-xs text-neutral-300">{item.city}</p>
                      </div>

                      <div className="shrink-0 w-32 text-right">
                        {isLive ? (
                          <Link
                            href={item.ticketUrl || "#tickets"}
                            className="inline-block text-xs font-semibold text-white bg-accent-hover hover:bg-accent px-4 py-1.5 rounded-full shadow-lg shadow-accent/50 scale-105 transition-transform"
                          >
                            Book Tickets
                          </Link>
                        ) : isComingSoon ? (
                          <span className="text-xs font-medium text-neutral-300 border border-accent/40 px-3.5 py-1.5 rounded-full bg-accent/10">
                            Coming Soon
                          </span>
                        ) : (
                          <span className="text-xs font-medium text-neutral-500 bg-white/5 px-3 py-1.5 rounded-full">
                            Event Ended
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
