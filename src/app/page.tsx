import Navbar from "@/components/layout/Navbar";
import VideoHero from "@/components/sections/VideoHero";
import ScrollTopics from "@/components/sections/ScrollTopics";
import CompanyInfo from "@/components/sections/CompanyInfo";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";

export default function Home() {
  return (
    <main className="flex flex-col text-foreground">
      {/* Fixed video background — visible through transparent sections */}
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        className="fixed inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
        src="/video-HOME.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />

      {/* All content sits above the video */}
      <div className="relative" style={{ zIndex: 10 }}>
        <Navbar />
        <VideoHero />
        <ScrollTopics />
        <CompanyInfo />
        <FloatingWhatsApp />
      </div>
    </main>
  );
}
