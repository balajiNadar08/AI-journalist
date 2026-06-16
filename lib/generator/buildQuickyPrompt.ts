export function buildQuickyPrompt(articles: any[]) {
  const articleText = articles
    .map((article, index) => {
      const snippet = (article.contentSnippet || "")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 200);

      return `ID:${index}
TITLE:${article.title}
SNIPPET:${snippet}`;
    })
    .join("\n\n");

  return `You are a senior news editor.

Return ONLY valid JSON.

Output format:
[
  {
    "id": 0,
    "title": "Short headline",
    "summary": "A concise but informative summary."
  }
]

Rules:
- Select the 12 most important stories.
- Keep the exact ID.
- Generate a short, engaging title.
- Summary should be 1-2 sentences.
- Summary should be 25-40 words.
- Focus on the key development and why it matters.
- No markdown.
- No explanations.
- Return only valid JSON.

ARTICLES:

${articleText}`;
}
