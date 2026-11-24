import { SiteConfig } from '@/types';

interface FooterProps {
  siteConfig: SiteConfig;
}

export default function Footer({ siteConfig }: FooterProps) {
  return (
    <footer className="pt-20 md:pt-32 pb-32 md:pb-20 bg-black border-t border-white/10 relative overflow-hidden">
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[300px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="w relative z-10">
        <div className="flex flex-col items-center md:items-start md:flex-row justify-between gap-10 text-center md:text-left">
          <a href="#home" className="block group">
            <img
              src="/only_geethanjalee.png"
              alt="Geethanjalee Logo"
              className="w-48 sm:w-64 md:w-72 h-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-xl"
            />
          </a>

          <div className="space-y-6 md:w-3/5 w-full">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-accent tracking-tight">
              {siteConfig.name}
            </h2>
            <p className="text-neutral-300 font-prompt text-sm sm:text-base leading-relaxed">
              {siteConfig.description}
            </p>

            <div className="flex gap-4 text-white justify-center md:justify-start items-center">
              <a
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                href={siteConfig.socials.instagram}
                className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent hover:scale-110 transition-all duration-300"
              >
                <i className="ri-instagram-line text-xl" />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                href={siteConfig.socials.facebook}
                className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent hover:scale-110 transition-all duration-300"
              >
                <i className="ri-facebook-fill text-xl" />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                href={siteConfig.socials.youtube}
                className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent hover:scale-110 transition-all duration-300"
              >
                <i className="ri-youtube-fill text-xl" />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Spotify"
                href={siteConfig.socials.spotify}
                className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent hover:scale-110 transition-all duration-300"
              >
                <i className="ri-spotify-fill text-xl" />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                href={siteConfig.socials.tiktok}
                className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent hover:scale-110 transition-all duration-300"
              >
                <i className="ri-tiktok-fill text-xl" />
              </a>
            </div>
          </div>
        </div>

        <hr className="border-t-0 bg-white/10 mt-16 md:mt-24 border-b border-white/10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-neutral-400 font-prompt">
          <p className="text-center sm:text-left">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </p>
          <p className="text-accent animate-pulse font-medium">
            Live Symphony Orchestral Experience
          </p>
        </div>
      </div>
    </footer>
  );
}
