'use client';

import { portfolioData } from '../data/portfolio';
import { AnimatedSection } from './AnimatedSection';

export function Projects() {
  const { projects } = portfolioData;

  return (
    <section id="projects" className="py-32 px-6 md:px-24 border-t border-[var(--color-accent)]/10">
      <div className="flex flex-col md:flex-row gap-12 md:gap-24">
        <div className="md:w-1/4">
          <AnimatedSection>
            <span className="font-mono text-4xl md:text-6xl text-[var(--color-accent)]/30">03</span>
          </AnimatedSection>
        </div>

        <div className="md:w-3/4">
          <AnimatedSection>
            <h2 className="text-5xl md:text-7xl font-bold uppercase mb-16 tracking-tight">
              Experience
            </h2>
          </AnimatedSection>

          <div className="space-y-0 group-hover-reduce">
            {projects.map((project, index) => (
              <AnimatedSection key={index} delay={0.1 * (index + 1)}>
                <div className="hover-reduce-siblings group/item border-t border-[var(--color-accent)]/10 py-10 md:py-12 transition-all duration-500 hover:bg-[var(--color-accent)]/5 rounded-lg px-4 -mx-4">
                  <div className="flex flex-col md:flex-row justify-between md:items-start gap-6">
                    <div className="flex items-start gap-6">
                      {/* Project Number */}
                      <span className="font-mono text-3xl md:text-5xl text-[var(--color-accent)]/30 group-hover/item:text-[var(--color-accent)] transition-colors duration-500">
                        0{index + 1}
                      </span>

                      <div>
                        <h3 className="text-2xl md:text-4xl font-bold uppercase mb-3 group-hover/item:translate-x-2 transition-transform duration-500">
                          {project.title}
                        </h3>
                        <div className="flex flex-wrap gap-2 group-hover/item:translate-x-2 transition-transform duration-500 delay-75">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs font-mono text-[var(--color-accent)]/70 bg-[var(--color-accent)]/10 px-3 py-1 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="max-w-md text-gray-400 group-hover/item:text-gray-300 transition-colors md:text-right">
                      <p className="mb-4 text-sm md:text-base">{project.description}</p>
                      <div className="flex gap-6 uppercase font-bold text-sm tracking-widest md:justify-end">
                        {project.demoLink && (
                          <a
                            href={project.demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="animated-underline hover:text-[var(--color-accent)] transition-colors"
                          >
                            {project.demoLabel || 'Live Demo'} &nearr;
                          </a>
                        )}
                        {project.codeLink && (
                          <a
                            href={project.codeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="animated-underline hover:text-[var(--color-accent)] transition-colors"
                          >
                            Code &nearr;
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
            <div className="border-t border-[var(--color-accent)]/10" />
          </div>
        </div>
      </div>
    </section>
  );
}
