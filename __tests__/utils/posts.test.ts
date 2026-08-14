import { getSortedPostsData } from '../../app/lib/posts';

describe('getSortedPostsData', () => {
  it('should be defined', () => {
    expect(getSortedPostsData).toBeDefined();
  });

  it('should return posts sorted by date descending', () => {
    const posts = getSortedPostsData();
    expect(Array.isArray(posts)).toBe(true);
    for (let i = 1; i < posts.length; i++) {
      expect(posts[i - 1].date >= posts[i].date).toBe(true);
    }
  });
});
