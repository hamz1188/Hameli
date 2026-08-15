'use client';

import { AnimatedSection } from './AnimatedSection';

export function About() {
  return (
    <section id="about" className="py-32 px-6 md:px-24 border-t border-[var(--color-accent)]/10">
      <div className="flex flex-col md:flex-row gap-12 md:gap-24">
        {/* Section Number */}
        <div className="md:w-1/4">
          <AnimatedSection>
            <span className="font-mono text-4xl md:text-6xl text-[var(--color-accent)]/30">01</span>
          </AnimatedSection>
        </div>

        {/* Content */}
        <div className="md:w-3/4">
          <AnimatedSection>
            <h2 className="text-5xl md:text-7xl font-bold uppercase mb-16 tracking-tight">
              Manifesto
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="glass rounded-2xl p-8 md:p-12">
              <div className="space-y-8 text-xl md:text-2xl font-light leading-relaxed text-gray-300">
                <p>
                  Adapting and changing constantly. Thinking outside the box to overcome every challenge.
                </p>
                <p>
                  I combine software development skills with AI-assisted tools like{' '}
                  <span className="text-[var(--color-accent)] font-medium">Claude Code</span> and{' '}
                  <span className="text-[var(--color-accent)] font-medium">Cursor IDE</span>.
                </p>
                <p>
                  Based in{' '}
                  <span className="text-[var(--color-accent)] font-medium">Abu Dhabi</span>, my pragmatism and the wealth of my environment
                  shape a distinct consciousness that is reflected in every line of code I write.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
