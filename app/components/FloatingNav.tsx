'use client';

import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'watch', label: 'Watch' },
  { id: 'learn', label: 'Learn' },
  { id: 'contact', label: 'Contact' },
];

export function FloatingNav() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(false);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const showNav = () => setIsVisible(window.scrollY > 220);
    window.addEventListener('scroll', showNav);

    navItems.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (!element) return;
      ScrollTrigger.create({
        trigger: element,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveSection(id),
        onEnterBack: () => setActiveSection(id),
      });
    });

    return () => {
      window.removeEventListener('scroll', showNav);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  useEffect(() => {
    if (!labelRef.current) return;
    gsap.fromTo(labelRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25 });
  }, [activeSection]);

  const current = navItems.find((item) => item.id === activeSection);

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-400 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'
      }`}
    >
      <nav className="flex items-center gap-1 px-3 py-2 bg-[var(--color-background-light)]/95 border border-[var(--color-border)] shadow-[var(--shadow-sm)]">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })}
            className={`px-3 py-1.5 text-xs tracking-wide transition-colors ${
              activeSection === item.id
                ? 'text-[var(--color-background)] bg-[var(--color-foreground)]'
                : 'text-[var(--color-foreground-muted)] hover:text-[var(--color-foreground)]'
            }`}
            aria-label={item.label}
          >
            {item.label}
          </button>
        ))}
        <span ref={labelRef} className="sr-only">
          {current?.label}
        </span>
      </nav>
    </div>
  );
}
