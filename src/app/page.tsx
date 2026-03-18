import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Problems from "@/components/sections/Problems";
import Solutions from "@/components/sections/Solutions";
import Niches from "@/components/sections/Niches";
import Results from "@/components/sections/Results";
import SocialProof from "@/components/sections/SocialProof";
import Cta from "@/components/sections/Cta";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground relative selection:bg-cyan-500/30">
      <Navbar />
      
      <Hero />
      <Problems />
      <Solutions />
      <Niches />
      <Results />
      <SocialProof />
      <Cta />
      
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
