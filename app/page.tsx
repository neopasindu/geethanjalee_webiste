import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AudioPlayer from "@/components/AudioPlayer";
import Schedule from "@/components/Schedule";
import Artists from "@/components/Artists";
import VideoSection from "@/components/VideoSection";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import TicketsSection from "@/components/TicketsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex flex-col relative">
      {/* Navigation Header & Mobile App Dock */}
      <Navbar />

      {/* Hero Fullscreen Experience */}
      <Hero />

      {/* Persistent / Interactive Audio Bar */}
      <AudioPlayer />

      {/* Tour & Schedule Section */}
      <Schedule />

      {/* Performers & Artists Section */}
      <Artists />

      {/* Video Trailer Spotlight */}
      <VideoSection />

      {/* Official Concert Passes & Seating */}
      <TicketsSection />

      {/* About The Concert & Infinite Marquee */}
      <About />

      {/* Bento Gallery & Lightbox */}
      <Gallery />

      {/* Concert Footer */}
      <Footer />
    </main>
  );
}
