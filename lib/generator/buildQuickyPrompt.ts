export function buildQuickyPrompt(articles: any[]) {
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
You are an AI newspaper editor.

Analyze the articles below.

Return ONLY valid JSON.

[
  {
    "id": 0,
    "point": "One-sentence news bullet."
  }
]

Rules:
- Keep the exact ID.
- Select the 20 most important stories.
- Each point must be ONE concise sentence.
- Focus only on the key fact.
- Use a newspaper style.
- No clickbait.
- No URLs.
- Return only valid JSON.

ARTICLES:

${articleText}
`;
}