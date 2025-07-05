import posts from '../data/posts.json';

export function fetchPosts() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(posts);
    }, 1000);
  });
}
