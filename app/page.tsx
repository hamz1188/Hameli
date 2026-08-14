import { HeroSection } from './components/HeroSection';
import { EpisodesSection } from './components/EpisodesSection';
import { HowIFilmSection } from './components/HowIFilmSection';
import { ContactSection } from './components/ContactSection';
import { SiteFooter } from './components/SiteFooter';

export default function Home() {
  return (
    <>
      <HeroSection />
      <EpisodesSection />
      <HowIFilmSection />
      <ContactSection />
      <SiteFooter />
    </>
  );
}
