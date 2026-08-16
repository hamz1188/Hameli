import { HeroSection } from './components/HeroSection';
import { WorkSection } from './components/WorkSection';
import { EpisodesSection } from './components/EpisodesSection';
import { HowIFilmSection } from './components/HowIFilmSection';
import { ContactSection } from './components/ContactSection';
import { SiteFooter } from './components/SiteFooter';

export default function Home() {
  return (
    <>
      <HeroSection />
      <WorkSection />
      <EpisodesSection />
      <HowIFilmSection />
      <ContactSection />
      <SiteFooter />
    </>
  );
}
