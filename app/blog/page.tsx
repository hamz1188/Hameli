import Link from 'next/link';
import type { Metadata } from 'next';
import { getSortedPostsData } from '../lib/posts';
import { hameli } from '../data/hameli';

export const metadata: Metadata = {
  title: 'Notes',
  description: `Field notes from ${hameli.brand} — process, shorts, and how the work is made.`,
};

export default function BlogPage() {
  const allPosts = getSortedPostsData();

  return (
    <section className="section-pad min-h-screen">
      <div className="shell max-w-3xl">
        <p className="text-label text-[var(--color-olive)] mb-5">Field notes</p>
        <h1 className="text-section max-w-xl">Notes</h1>
        <p className="mt-5 text-lede text-[var(--color-ink-soft)] max-w-2xl mb-12">
          Process, shorts, and how the work is made.
        </p>
        <hr className="rule mb-0" />

        <div>
          {allPosts.map((post) => (
            <article
              key={post.slug}
              className="grid gap-3 py-8 md:py-10 border-b border-[var(--color-rule)]"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div className="flex flex-wrap gap-3">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-label text-[var(--color-olive)]">
                      {tag}
                    </span>
                  ))}
                </div>
                <time className="text-label text-[var(--color-ink-faint)]">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </time>
              </div>
              <Link href={`/blog/${post.slug}`} className="group block">
                <h2
                  className="font-serif text-2xl md:text-[1.85rem] leading-tight tracking-tight group-hover:text-[var(--color-olive)] transition-colors"
                  style={{ fontVariationSettings: "'SOFT' 20" }}
                >
                  {post.title}
                </h2>
                <p className="mt-2 text-[var(--color-ink-soft)] text-body max-w-2xl italic">
                  {post.excerpt}
                </p>
                <span className="mt-4 inline-block text-label text-[var(--color-ink-faint)] group-hover:text-[var(--color-olive)] transition-colors">
                  Read →
                </span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
