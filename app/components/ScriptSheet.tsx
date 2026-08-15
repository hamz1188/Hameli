'use client';

import { PunchHoles } from './PunchHoles';

/** Physical script page: desk around it, three-hole punch. */
export function ScriptSheet({ children }: { children: React.ReactNode }) {
  return (
    <div className="script-sheet">
      <PunchHoles />
      <div className="relative z-[2]">{children}</div>
    </div>
  );
}
