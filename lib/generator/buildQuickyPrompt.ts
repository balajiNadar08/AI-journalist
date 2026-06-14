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
You are a news editor.

Return ONLY valid JSON.

[
  {
    "id": 0,
    "title": "AI Chip Race Accelerates",
    "summary": "Nvidia launches next-generation AI chips."
  }
]

Rules:
- Keep exact ID.
- Select the 8 most important stories.
- Generate a short title.
- Summary must be ONE sentence.
- Maximum 20 words.
- No explanations.
- Return only valid JSON.

ARTICLES:

${articleText}
`;
}