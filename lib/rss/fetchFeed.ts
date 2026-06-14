import Parser from "rss-parser";

const parser = new Parser();

export async function fetchFeeds(feedUrls: string[]) {
  const feeds = await Promise.all(
    feedUrls.map(async (url) => {
      try {
        return await parser.parseURL(url);
      } catch {
        return null;
      }
    }),
  );

  return feeds.filter(Boolean);
}
