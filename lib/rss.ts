import Parser from "rss-parser";

const parser = new Parser();

export async function getFeed(url: string) {
  return parser.parseURL(url);
}