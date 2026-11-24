import { useState, useEffect } from 'react';
import { NAV_ITEMS } from '@/constants';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = [
        'home',
        'experience',
        'schedule',
        'artists',
        'tickets',
        'gallery',
        'about',
      ];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Desktop & Tablet Top Navigation */}
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-black/85 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
        }`}
      >
        <div className="w">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <a href="#home" className="block group">
              <img
                src="/only_geethanjalee.png"
                alt="Geethanjalee Logo"
                className="h-14 sm:h-16 md:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-lg"
              />
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {NAV_ITEMS.map((item) => {
                const sectionId = item.href.replace('#', '');
                const isActive = activeSection === sectionId;

                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`relative px-3 lg:px-4 py-2 text-xs lg:text-sm font-medium tracking-wide transition-colors duration-300 flex items-center ${
                      isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <span className="absolute top-1/2 -translate-y-1/2 left-0 w-1 h-4 bg-accent rounded-full shadow-[0_0_12px_#D4A017]" />
                    )}
                    {item.label}
                  </a>
                );
              })}
            </nav>

            {/* Action CTA */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="#tickets"
                className="px-5 py-2 text-xs lg:text-sm font-semibold tracking-wider uppercase rounded-full bg-accent hover:bg-accent-hover text-white transition-all duration-300 shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:scale-105"
              >
                Get Passes
              </a>
            </div>

            {/* Mobile Top Header Minimal Bar */}
            <div className="md:hidden flex items-center gap-2">
              <a
                href="#tickets"
                className="px-3.5 py-1.5 text-xs font-semibold rounded-full bg-accent text-white shadow-md shadow-accent/20"
              >
                Passes
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Dock */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 flex items-center justify-around bg-black/95 backdrop-blur-2xl border-t border-white/10 px-2 pt-2 z-50 shadow-2xl"
        style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}
      >
        {NAV_ITEMS.slice(0, 5).map((item) => {
          const sectionId = item.href.replace('#', '');
          const isActive = activeSection === sectionId;

          return (
            <a
              key={item.href}
              href={item.href}
              className="relative flex flex-col items-center justify-center gap-1 flex-1 py-1.5 transition-all group"
            >
              {isActive && (
                <span className="absolute -top-2 w-8 h-1 bg-accent rounded-full shadow-[0_0_8px_#D4A017]" />
              )}
              <i
                className={`${item.iconName} text-xl transition-all duration-300 ${
                  isActive
                    ? 'text-accent scale-110'
                    : 'text-white/50 group-hover:text-white/80'
                }`}
              />
              <span
                className={`text-[10px] font-medium tracking-tight font-prompt transition-colors duration-300 ${
                  isActive
                    ? 'text-accent font-semibold'
                    : 'text-white/40 group-hover:text-white/60'
                }`}
              >
                {item.label}
              </span>
            </a>
          );
        })}
      </nav>
    </>
  );
}
