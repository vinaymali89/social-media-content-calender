export function distributePostsByDateAndCategory(posts, dates, allowedCategories = []) {
    
  if (!posts.length || !dates.length) return {};

  const filtered = allowedCategories.length
    ? posts.filter((p) => allowedCategories.includes(p.category))
    : posts;

  const sortedPosts = [...filtered].sort((a, b) => b.followers - a.followers);

  const distributed = {};
  dates.forEach((date) => {
    distributed[date] = [];
  });

  let dateIndex = 0;
  sortedPosts.forEach((post) => {
    const date = dates[dateIndex];
    distributed[date].push(post);
    dateIndex = (dateIndex + 1) % dates.length;
  });

  return distributed;
}