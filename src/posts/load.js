import posts from './index.js';

export async function loadPost(slug) {
  return posts.find((p) => p.slug === slug) || null;
}
