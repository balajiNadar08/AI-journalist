export function cleanArticle(content: string | null | undefined) {
  if (!content) return "";

  const cleaned = content.replace(/\s+/g, " ").trim();

  return cleaned.slice(0, 10000);
}
