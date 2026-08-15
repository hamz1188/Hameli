import Link from 'next/link';
import type { Metadata } from 'next';
import { getSortedPostsData } from '../lib/posts';
import { hameli } from '../data/hameli';

export const metadata: Metadata = {
  title: 'Notes',
  description: `Pages from ${hameli.brand} — how the work is made.`,
};

export default function BlogPage() {
  const allPosts = getSortedPostsData();

  return (
    <section className="section-pad min-h-screen">
      <div className="script-page">
        <p className="transition-line mb-8">Insert:</p>
        <h1 className="text-section">Notes</h1>
        <p className="mt-5 text-lede text-[var(--color-ink-soft)] mb-12">
          Pages from the desk — how the work is made.
        </p>

        <div>
          {allPosts.map((post) => (
            <article key={post.slug} className="py-8 border-b border-[var(--color-rule)]">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div className="flex flex-wrap gap-3">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-label text-[var(--color-ink-faint)]">
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
                <h2 className="mt-4 text-lg group-hover:opacity-60 transition-opacity">{post.title}</h2>
                <p className="mt-2 text-[var(--color-ink-soft)] text-body">{post.excerpt}</p>
                <span className="mt-4 inline-block text-label text-[var(--color-ink-faint)]">
                  More →
                </span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
