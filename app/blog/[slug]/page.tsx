import type { Metadata } from 'next';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { getPostData, getSortedPostsData } from '../../lib/posts';
import { hameli } from '../../data/hameli';

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostData(slug);
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [hameli.person],
    },
  };
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const postData = getPostData(slug);

  return (
    <article className="section-pad min-h-screen">
      <div className="script-page">
        <Link
          href="/blog"
          className="text-label text-[var(--color-ink-faint)] hover:text-[var(--color-ink)] transition-colors"
        >
          ← Notes
        </Link>

        <header className="mt-10 mb-12">
          <div className="flex flex-wrap gap-3 mb-5">
            {postData.tags.map((tag) => (
              <span key={tag} className="text-label text-[var(--color-ink-faint)]">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-section">{postData.title}</h1>
          <time className="mt-5 block text-label text-[var(--color-ink-faint)]">
            {new Date(postData.date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </time>
        </header>

        <div className="note-prose text-body text-[var(--color-ink-soft)] space-y-5 [&_h1]:text-[var(--color-ink)] [&_h1]:text-xl [&_h1]:mt-10 [&_h1]:mb-4 [&_h1]:uppercase [&_h2]:text-[var(--color-ink)] [&_h2]:text-lg [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:uppercase [&_h3]:text-[var(--color-ink)] [&_h3]:mt-8 [&_h3]:mb-2 [&_strong]:text-[var(--color-ink)] [&_a]:text-[var(--color-ink)] [&_a]:underline [&_a]:underline-offset-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:my-1 [&_code]:text-sm [&_code]:bg-[var(--color-desk)] [&_code]:px-1.5 [&_code]:py-0.5">
          <ReactMarkdown
            components={{
              a: (props) => {
                const isExternal = props.href?.startsWith('http');
                return (
                  <a
                    {...props}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                  />
                );
              },
            }}
          >
            {postData.content}
          </ReactMarkdown>
        </div>
      </div>
    </article>
  );
}
