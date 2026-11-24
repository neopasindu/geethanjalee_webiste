import { Achievement } from '@/types';
import SponsorsMarquee from './SponsorsMarquee';

interface AboutProps {
  achievements: Achievement[];
}

export default function About({ achievements }: AboutProps) {
  return (
    <section
      id="about"
      className="py-20 sm:py-28 bg-[#0a0a0b] relative overflow-hidden"
    >
      <div className="w relative z-10">
        <div className="space-y-3 text-center lg:text-left mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-accent font-semibold block">
            The Concept &amp; Legacy
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
            About Geethanjalee
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-center gap-10 lg:gap-16">
          <div className="w-full lg:w-2/5 shrink-0 group">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-neutral-900 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop"
                alt="Geethanjalee Concert Artwork"
                className="w-full h-auto object-cover aspect-square transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none select-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-xs uppercase font-semibold text-accent tracking-widest block mb-1">
                  The Official Anthem
                </span>
                <h4 className="text-xl font-display font-bold text-white">
                  Geethanjalee Symphonic Suite
                </h4>
                <p className="text-xs text-neutral-300 mt-1">
                  Recorded live with 45-piece symphony orchestra &amp;
                  traditional percussionists.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-3/5 font-prompt space-y-6 text-neutral-300 text-sm sm:text-base leading-relaxed text-center sm:text-left">
            <p>
              Nestled beneath the misty hills of Hanthana,{' '}
              <strong className="text-white">Geethanjalee</strong> emerged as a
              beacon of artistic excellence from the University of Peradeniya.
              Conceived as a celebration of pure acoustic integrity and vocal
              majesty, it bridges traditional Sri Lankan melodies with
              contemporary symphonic orchestrations.
            </p>
            <p>
              Music carries the singular power to heal, inspire, and unite
              hearts across generations. In an era where digital noise often
              overshadows lyrical depth, Geethanjalee revives the reverence for
              authentic live performance—giving voice to timeless compositions
              that echo human emotion, nostalgia, and courage.
            </p>
            <p>
              Each edition brings together celebrated masters of Sri Lankan
              song, visionary instrumentalists, and passionate university
              ensembles to weave an unforgettable tapestry of sound. From gentle
              sarod and flute intros to sweeping string crescendos, every bar is
              played with heart and soul.
            </p>
            <p className="text-white font-medium border-l-2 border-accent pl-4 text-left italic">
              &ldquo;Geethanjalee is not merely a concert; it is a sacred space
              where poetry becomes melody, and melody becomes memories that
              linger long after the final ovation.&rdquo;
            </p>
          </div>
        </div>

        <SponsorsMarquee achievements={achievements} />
      </div>
    </section>
  );
}
