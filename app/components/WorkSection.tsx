import { LivingBriefDemo } from './LivingBriefDemo';

export function WorkSection() {
  return (
    <section id="work" className="section-pad">
      <div className="script-page">
        <p className="transition-line mb-8">Cut to: the first build.</p>
        <h2 className="text-section">
          <span className="hl hl-yellow">Project 01 — Living Brief</span>
        </h2>
        <p className="mt-5 text-lede text-[var(--color-ink-soft)]">
          A person speaks naturally. The rough thought becomes a useful creative
          brief while they are still explaining it.
        </p>

        <LivingBriefDemo />
      </div>
    </section>
  );
}
