'use client';

/** Full-bleed desk atmosphere — screen + desk + phone. The visual of Made in public. */
export function DeskStage({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {/* Desk surface plane */}
      <div
        className="absolute inset-x-0 bottom-0 h-[48%] md:h-[42%]"
        style={{
          background:
            'linear-gradient(180deg, color-mix(in srgb, var(--color-desk) 70%, transparent) 0%, var(--color-desk) 28%, color-mix(in srgb, var(--color-desk) 92%, #c4b89a) 100%)',
        }}
      />

      {/* Desk edge highlight */}
      <div
        className="absolute left-0 right-0 h-px opacity-40"
        style={{ top: '52%', background: 'var(--color-rule-strong)' }}
      />

      {/* Laptop / screen — dominant visual */}
      <div className="absolute left-1/2 top-[12%] md:top-[10%] w-[min(88vw,920px)] -translate-x-1/2">
        <div
          className="relative aspect-[16/10] rounded-[4px] border border-[var(--color-rule-strong)] overflow-hidden"
          style={{
            background: 'var(--color-screen)',
            boxShadow:
              '0 40px 80px rgba(0,0,0,0.28), 0 0 0 1px rgba(255,255,255,0.04) inset, 0 0 120px var(--color-screen-glow)',
          }}
        >
          {/* Fake UI chrome */}
          <div className="absolute top-0 inset-x-0 h-7 md:h-8 flex items-center gap-1.5 px-3 border-b border-white/5 bg-black/40">
            <span className="w-2 h-2 rounded-full bg-white/15" />
            <span className="w-2 h-2 rounded-full bg-white/15" />
            <span className="w-2 h-2 rounded-full bg-white/15" />
            <span className="ml-3 font-mono text-[9px] tracking-widest text-white/25 uppercase">
              screen record · live
            </span>
          </div>
          {/* Editor-ish lines */}
          <div className="absolute inset-0 top-8 p-5 md:p-8 opacity-[0.35]">
            <div className="h-2 w-1/3 bg-[var(--color-olive)]/50 mb-4" />
            <div className="space-y-2.5">
              <div className="h-1.5 w-[78%] bg-white/20" />
              <div className="h-1.5 w-[62%] bg-white/15" />
              <div className="h-1.5 w-[70%] bg-white/18" />
              <div className="h-1.5 w-[45%] bg-white/12" />
              <div className="h-1.5 w-[66%] bg-white/16 mt-6" />
              <div className="h-1.5 w-[58%] bg-white/14" />
            </div>
          </div>
          {/* Soft scan / glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(180deg, transparent 40%, var(--color-screen-glow) 100%)',
            }}
          />
        </div>
        {/* Laptop base */}
        <div
          className="mx-auto h-2 md:h-2.5 w-[102%] -mt-px rounded-b-[3px]"
          style={{ background: 'color-mix(in srgb, var(--color-ink) 55%, #555)' }}
        />
        <div
          className="mx-auto h-1 w-[38%] mt-0.5 rounded-b-sm opacity-50"
          style={{ background: 'var(--color-ink)' }}
        />
      </div>

      {/* Phone on desk — natural filming cue */}
      <div className="absolute right-[8%] md:right-[14%] bottom-[14%] md:bottom-[16%] w-14 md:w-16 rotate-[-18deg]">
        <div
          className="aspect-[9/19] rounded-[10px] border border-[var(--color-rule-strong)] p-1"
          style={{
            background: 'color-mix(in srgb, var(--color-ink) 88%, #333)',
            boxShadow: '0 12px 28px rgba(0,0,0,0.25)',
          }}
        >
          <div className="h-full w-full rounded-[7px] bg-[var(--color-desk)]/30 relative overflow-hidden">
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-6 h-1 rounded-full bg-black/40" />
            <div className="absolute inset-x-2 bottom-3 top-6 border border-white/10 rounded-sm opacity-60" />
          </div>
        </div>
      </div>

      {/* Notebook margin line */}
      <div
        className="absolute top-0 bottom-0 w-px opacity-30 hidden md:block"
        style={{ left: 'max(1.25rem, 8%)', background: 'var(--color-olive)' }}
      />
    </div>
  );
}
