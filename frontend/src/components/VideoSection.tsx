import { useState } from 'react';

export default function VideoSection() {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  const youtubeEmbedUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';

  return (
    <section className="relative w-full h-[40vh] sm:h-[55vh] md:h-[70vh] bg-black overflow-hidden group select-none">
      <img
        src="/assets/hanthana.jpeg"
        alt="Geethanjalee Concert Spotlight Video"
        className="w-full h-full object-cover object-center filter brightness-60 group-hover:scale-105 transition-transform duration-1000 ease-out"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60 pointer-events-none" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-20">
        <button
          onClick={() => setIsPlayingVideo(true)}
          aria-label="Play Concert Trailer"
          className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-full border border-white/30 bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:text-accent hover:border-accent hover:bg-black/70 hover:scale-110 transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(212,160,23,0.4)] cursor-pointer"
        >
          <div className="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-30 pointer-events-none" />
          <i className="ri-play-fill text-4xl sm:text-6xl translate-x-1" />
        </button>

        <div className="mt-6">
          <span className="text-xs uppercase tracking-[0.3em] text-accent font-semibold block mb-1">
            Official Teaser
          </span>
          <h3 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight drop-shadow-lg">
            Experience the Harmony
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 mt-2 font-prompt max-w-md">
            Click to watch the cinematic trailer of Geethanjalee Live in Concert
          </p>
        </div>
      </div>

      {isPlayingVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-xl"
          onClick={() => setIsPlayingVideo(false)}
        >
          <div
            className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsPlayingVideo(false)}
              className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-black/80 hover:bg-accent text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close video"
            >
              <i className="ri-close-line text-2xl" />
            </button>

            <iframe
              src={youtubeEmbedUrl}
              title="Concert Teaser Video"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}
