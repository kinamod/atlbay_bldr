import '@/builder-registry';
import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import AnnouncementCarousel from '@/components/AnnouncementCarousel';
import Footer from '@/components/Footer';

export default function ClonedHome() {
  return (
    <>
      <NavBar />
      <Hero />
      <AnnouncementCarousel />
      <Footer />
    </>
  );
}
