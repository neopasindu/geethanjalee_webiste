import { ConcertSchedule } from '@/types';

interface ScheduleProps {
  schedule: ConcertSchedule[];
}

export default function Schedule({ schedule }: ScheduleProps) {
  return (
    <section
      id="schedule"
      className="py-16 sm:py-24 bg-[#0a0a0b] relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w relative z-10">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-accent font-semibold block mb-2">
              Concert Tour &amp; Experience
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
              Tour Dates &amp; Venues
            </h2>
          </div>
          <p className="text-sm text-neutral-400 max-w-md font-prompt">
            Catch the symphony live across key Sri Lankan venues and
            international stops.
          </p>
        </div>

        {/* Schedule List */}
        <div className="flex flex-col gap-3 sm:gap-4">
          {schedule.map((item) => {
            const isLive = item.status === 'tickets-live';
            const isComingSoon = item.status === 'coming-soon';

            return (
              <div
                key={item.id}
                className={`group relative rounded-2xl transition-all duration-300 py-5 sm:py-6 px-4 sm:px-7 ${
                  isLive
                    ? 'bg-gradient-to-r from-accent/[0.10] via-white/[0.03] to-transparent border border-accent/40 shadow-[0_4px_30px_rgba(212,160,23,0.12)] hover:border-accent/70 hover:shadow-[0_6px_35px_rgba(212,160,23,0.22)]'
                    : 'border border-white/10 bg-white/[0.015] hover:bg-white/[0.04] hover:border-white/25'
                }`}
              >
                {/* Mobile View */}
                <div className="block md:hidden">
                  <div className="flex items-center justify-between gap-3">
                    <div
                      className={`flex flex-col items-center justify-center rounded-xl px-2.5 py-1.5 min-w-[62px] border ${
                        isLive
                          ? 'bg-accent/15 border-accent/40 text-accent'
                          : 'bg-white/[0.04] border-white/10'
                      }`}
                    >
                      <span className="text-[11px] font-bold uppercase font-prompt leading-tight text-accent">
                        {item.month}
                      </span>
                      <span className="text-2xl font-bold font-display leading-tight text-white">
                        {item.day}
                      </span>
                      <span className="text-[10px] text-neutral-400 font-prompt leading-none mt-0.5">
                        {item.year}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0 px-1">
                      <h3 className="text-sm font-semibold truncate font-prompt text-white">
                        {item.venue}
                      </h3>
                      <p className="text-xs text-neutral-400 truncate mt-0.5 font-prompt">
                        {item.city}
                      </p>
                      {isLive && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase text-accent mt-1 font-prompt">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                          Tickets Live
                        </span>
                      )}
                    </div>

                    <div className="shrink-0">
                      {isLive ? (
                        <a
                          href={item.ticketUrl || '#tickets'}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-accent hover:bg-accent-hover text-white text-xs font-semibold font-prompt shadow-md shadow-accent/25 transition-all"
                        >
                          <span>Book</span>
                          <i className="ri-arrow-right-line text-xs" />
                        </a>
                      ) : isComingSoon ? (
                        <span className="text-[11px] font-medium text-neutral-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full font-prompt">
                          Coming Soon
                        </span>
                      ) : (
                        <span className="text-[11px] font-medium text-neutral-500 bg-white/5 px-2.5 py-1 rounded-full font-prompt">
                          Ended
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Desktop View */}
                <div className="hidden md:flex items-center justify-between w-full gap-6">
                  <div className="flex items-center gap-6 lg:gap-8 shrink-0">
                    <span
                      className={`text-3xl lg:text-4xl font-display font-medium w-[125px] lg:w-[135px] shrink-0 tracking-tight transition-colors duration-300 ${
                        isLive
                          ? 'text-accent drop-shadow-[0_0_12px_rgba(212,160,23,0.4)]'
                          : 'text-white group-hover:text-accent'
                      }`}
                    >
                      {item.year}
                    </span>

                    <div className="flex flex-col font-prompt font-semibold text-xs uppercase tracking-wider w-[54px] shrink-0 leading-tight">
                      <span className="text-accent">{item.month}</span>
                      <span className="text-neutral-400 group-hover:text-neutral-200 transition-colors">
                        {item.weekday}
                      </span>
                    </div>

                    <span
                      className={`text-3xl lg:text-4xl font-display font-bold w-[65px] shrink-0 transition-colors duration-300 ${
                        isLive
                          ? 'text-accent drop-shadow-[0_0_12px_rgba(212,160,23,0.4)]'
                          : 'text-white group-hover:text-accent'
                      }`}
                    >
                      {item.day}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0 pr-4">
                    <div className="flex items-center gap-3">
                      <h3
                        className={`text-base lg:text-lg font-semibold truncate transition-colors duration-300 ${
                          isLive
                            ? 'text-white group-hover:text-accent'
                            : 'text-neutral-100 group-hover:text-accent'
                        }`}
                      >
                        {item.venue}
                      </h3>
                      {isLive && (
                        <span className="shrink-0 inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wider uppercase bg-accent/20 border border-accent/40 text-accent px-2.5 py-0.5 rounded-full font-prompt">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                          Main Event
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-400 group-hover:text-neutral-300 transition-colors mt-0.5 font-prompt">
                      {item.city}
                    </p>
                  </div>

                  <div className="shrink-0 w-36 text-right">
                    {isLive ? (
                      <a
                        href={item.ticketUrl || '#tickets'}
                        className="inline-flex items-center justify-center gap-2 text-xs lg:text-sm font-semibold font-prompt text-white bg-accent hover:bg-accent-hover px-5 py-2.5 rounded-full shadow-lg shadow-accent/30 hover:shadow-accent/50 hover:scale-105 transition-all duration-300"
                      >
                        <span>Book Tickets</span>
                        <i className="ri-arrow-right-line text-xs transition-transform group-hover:translate-x-0.5" />
                      </a>
                    ) : isComingSoon ? (
                      <span className="inline-block text-xs font-medium font-prompt text-neutral-400 border border-white/10 px-4 py-2 rounded-full bg-white/5">
                        Coming Soon
                      </span>
                    ) : (
                      <span className="inline-block text-xs font-medium font-prompt text-neutral-500 bg-white/5 px-4 py-2 rounded-full">
                        Event Ended
                      </span>
                    )}
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
