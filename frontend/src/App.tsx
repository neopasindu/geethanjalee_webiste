import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AudioPlayer from '@/components/AudioPlayer';
import Schedule from '@/components/Schedule';
import Artists from '@/components/Artists';
import VideoSection from '@/components/VideoSection';
import TicketsSection from '@/components/TicketsSection';
import About from '@/components/About';
import Gallery from '@/components/Gallery';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/ui/SmoothScroll';
import { useConcertData } from '@/hooks/useConcertData';

export default function App() {
  const { data } = useConcertData();

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#0a0a0a] text-white flex flex-col relative">
        <Navbar />
        <Hero slides={data.siteConfig.heroSlides} />
        <AudioPlayer tracks={data.tracks} />
        <Schedule schedule={data.schedule} />
        <Artists artists={data.artists} />
        <VideoSection />
        <TicketsSection passes={data.tickets} />
        <About achievements={data.achievements} />
        <Gallery items={data.gallery} />
        <Footer siteConfig={data.siteConfig} />
      </main>
    </SmoothScroll>
  );
}
