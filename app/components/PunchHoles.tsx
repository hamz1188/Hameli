'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Binder holes at a constant US Letter pitch (4.25" / 11") along the sheet.
 * One sequence — not stacked 3-hole pages — so seams don’t double up.
 */
export function PunchHoles() {
  const ref = useRef<HTMLDivElement>(null);
  const [holes, setHoles] = useState<number[]>([]);

  useEffect(() => {
    const sheet = ref.current?.closest('.script-sheet') as HTMLElement | null;
    if (!sheet) return;

    const pageLength = () => {
      const probe = document.createElement('div');
      probe.style.cssText =
        'position:absolute;visibility:hidden;pointer-events:none;height:min(100dvh,52rem)';
      sheet.appendChild(probe);
      const height = probe.offsetHeight;
      probe.remove();
      return height || window.innerHeight;
    };

    const measure = () => {
      const pageLen = pageLength();
      const sheetH = sheet.scrollHeight;
      const offset = pageLen * (1.25 / 11);
      const pitch = pageLen * (4.25 / 11);
      const positions: number[] = [];
      for (let y = offset; y <= sheetH - offset * 0.35; y += pitch) {
        positions.push(y);
      }
      setHoles(
        positions.length >= 3 ? positions : [offset, offset + pitch, offset + pitch * 2]
      );
    };

    measure();
    const ro = new ResizeObserver(() => requestAnimationFrame(measure));
    ro.observe(sheet);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  return (
    <div ref={ref} className="script-holes" aria-hidden="true">
      {holes.map((top, i) => (
        <span key={i} className="script-hole" style={{ top }} />
      ))}
    </div>
  );
}
