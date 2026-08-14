import RSS from 'rss';
import { getSortedPostsData } from '../lib/posts';
import { hameli } from '../data/hameli';

export async function GET() {
  const posts = getSortedPostsData();
  const siteUrl = hameli.siteUrl;

  const feed = new RSS({
    title: `${hameli.brand} — notes`,
    description: hameli.tagline,
    site_url: siteUrl,
    feed_url: `${siteUrl}/feed.xml`,
    image_url: `${siteUrl}/favicon.ico`,
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}, ${hameli.person}`,
  });

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.excerpt,
      url: `${siteUrl}/blog/${post.slug}`,
      date: post.date,
      author: hameli.person,
      categories: post.tags,
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
