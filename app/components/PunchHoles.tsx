'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Binder holes along the sheet at a constant pitch (US Letter 4.25" / 11").
 * Even spacing avoids the “double hole” look you get when separate 3-hole
 * page stacks meet at a seam.
 */
export function PunchHoles() {
  const ref = useRef<HTMLDivElement>(null);
  const [holes, setHoles] = useState<number[]>([0.114, 0.5, 0.886]);

  useEffect(() => {
    const root = ref.current;
    const sheet = root?.closest('.script-sheet') as HTMLElement | null;
    if (!root || !sheet) return;

    const measure = () => {
      const styles = getComputedStyle(sheet);
      const pageLenStr = styles.getPropertyValue('--script-page-len').trim();
      // Fall back probe: one page ≈ min(100dvh, 52rem)
      let pageLen = 0;
      if (pageLenStr) {
        const probe = document.createElement('div');
        probe.style.cssText = `position:absolute;visibility:hidden;height:${pageLenStr}`;
        sheet.appendChild(probe);
        pageLen = probe.offsetHeight;
        probe.remove();
      }
      if (pageLen <= 0) {
        const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
        pageLen = Math.min(window.innerHeight, 52 * rem);
      }

      const sheetH = sheet.scrollHeight;
      // US Letter: first hole ~1.25/11 from top, then every 4.25/11
      const offset = pageLen * (1.25 / 11);
      const pitch = pageLen * (4.25 / 11);
      const positions: number[] = [];
      for (let y = offset; y <= sheetH - offset * 0.35; y += pitch) {
        positions.push(y);
      }
      if (positions.length < 3) {
        setHoles([offset, offset + pitch, offset + pitch * 2]);
        return;
      }
      setHoles(positions);
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
