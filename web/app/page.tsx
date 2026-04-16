import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import BillCategories from "@/components/home/BillCategories";
import TrustSection from "@/components/home/TrustSection";
import HowItWorks from "@/components/home/HowItWorks";
import ProtocolStats from "@/components/home/ProtocolStats";
import FAQ from "@/components/home/FAQ";
import CTABanner from "@/components/home/CTABanner";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <BillCategories />
        <TrustSection />
        <HowItWorks />
        <ProtocolStats />
        <FAQ />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
