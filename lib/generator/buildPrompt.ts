export function buildPrompt(articles: any[]) {
  const articleText = articles
    .map(
      (article, index) => `
ID: ${index}
TITLE: ${article.title}
DESCRIPTION:
${article.contentSnippet || article.content || ""}
`
    )
    .join("\n\n")
    .slice(0, 10000);

  return `
You are an elite AI news editor.

Analyze the news articles below.

Return ONLY valid JSON.

[
  {
    "id": 0,
    "summary": "..."
  }
]

Rules:
- Keep the exact ID of the article.
- Do not generate URLs.
- Do not generate article titles.
- Return only id and summary.
- Select the 8 most important stories.
- Summary must be 2-3 sentences.
- Return valid JSON only.

ARTICLES:

${articleText}
`;
}