export function getArticles(feeds: any[]) {
  return feeds
    .flatMap((feed) => feed.items.slice(0, 5))
    .slice(0, 20);
}