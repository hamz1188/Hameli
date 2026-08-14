'use client';

import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { id: 'hero', label: 'Home', icon: 'home' },
  { id: 'watch', label: 'Watch', icon: 'play' },
  { id: 'learn', label: 'Learn', icon: 'layers' },
  { id: 'contact', label: 'Contact', icon: 'mail' },
];

const icons: Record<string, React.ReactNode> = {
  home: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  play: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  ),
  layers: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  mail: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
};

export function FloatingNav() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const showNav = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener('scroll', showNav);

    const sections = navItems.map((item) => item.id);

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (!element) return;

      ScrollTrigger.create({
        trigger: element,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveSection(sectionId),
        onEnterBack: () => setActiveSection(sectionId),
      });
    });

    return () => {
      window.removeEventListener('scroll', showNav);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  useEffect(() => {
    if (!labelRef.current) return;

    gsap.fromTo(
      labelRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
    );
  }, [activeSection]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentItem = navItems.find((item) => item.id === activeSection);

  return (
    <div
      ref={navRef}
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
    >
      <nav className="flex items-center gap-1 px-2 py-2 bg-[var(--color-background)]/80 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`relative w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ${
              activeSection === item.id
                ? 'bg-[var(--color-accent)] text-[var(--color-background)]'
                : 'text-[var(--color-foreground-muted)] hover:text-[var(--color-foreground)] hover:bg-white/5'
            }`}
            aria-label={item.label}
          >
            {icons[item.icon]}
          </button>
        ))}

        <div className="w-px h-6 bg-white/10 mx-2" />

        <div className="px-4 py-2 min-w-[80px]">
          <span ref={labelRef} className="text-sm font-medium text-[var(--color-foreground)]">
            {currentItem?.label}
          </span>
        </div>
      </nav>
    </div>
  );
}
