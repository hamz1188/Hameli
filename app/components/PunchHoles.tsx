'use client';

import { useEffect, useRef, useState } from 'react';

/** US Letter 3-hole geometry, repeated per page-length of the sheet. */
export function PunchHoles() {
  const ref = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    const sheet = ref.current?.closest('.script-sheet') as HTMLElement | null;
    if (!sheet) return;

    const measure = () => {
      const pageLen = Math.min(window.innerHeight, Math.max(480, sheet.clientWidth * (11 / 8.5)));
      setPages(Math.max(1, Math.ceil(sheet.scrollHeight / pageLen)));
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(sheet);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  return (
    <div ref={ref} className="script-holes" aria-hidden="true">
      {Array.from({ length: pages }, (_, i) => (
        <div key={i} className="script-holes-page">
          <span />
          <span />
          <span />
        </div>
      ))}
    </div>
  );
}
