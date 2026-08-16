'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

declare global {
  interface Window {
    __hameliScrollTo?: (hash: string) => void;
  }
}

export function scrollToHash(hash: string) {
  const id = hash.startsWith('#') ? hash.slice(1) : hash;
  if (window.__hameliScrollTo) {
    window.__hameliScrollTo(hash);
    return;
  }
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const goRef = useRef<(hash: string, immediate?: boolean) => boolean>(() => false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lenis = new Lenis({
      duration: reduce ? 0 : 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: !reduce,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      autoRaf: false,
    });
    lenisRef.current = lenis;

    let running = true;
    function raf(time: number) {
      if (!running) return;
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    function go(hash: string, immediate = false) {
      const id = hash.startsWith('#') ? hash.slice(1) : hash;
      if (!id) return false;
      const el = document.getElementById(id);
      if (!el) return false;
      lenis.scrollTo(el, { offset: -80, immediate: immediate || reduce });
      return true;
    }
    goRef.current = go;
    window.__hameliScrollTo = (hash: string) => {
      go(hash);
    };

    function onClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest('a[href^="#"]');
      if (!(link instanceof HTMLAnchorElement)) return;
      const hash = link.hash || link.getAttribute('href') || '';
      if (!go(hash)) return;
      event.preventDefault();
    }

    document.addEventListener('click', onClick);

    const onHashChange = () => {
      if (window.location.hash) go(window.location.hash);
    };
    window.addEventListener('hashchange', onHashChange);

    if (window.location.hash) {
      let tries = 0;
      const tick = () => {
        if (goRef.current(window.location.hash, true) || tries++ > 30) return;
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }

    return () => {
      running = false;
      document.removeEventListener('click', onClick);
      window.removeEventListener('hashchange', onHashChange);
      delete window.__hameliScrollTo;
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
