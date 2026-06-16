export function buildPrompt(articles: any[]) {
  const articleText = articles
    .map((article, index) => {
      const snippet = (article.contentSnippet || article.content || "")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 400);

      return `ID:${index}
TITLE:${article.title}
SNIPPET:${snippet}`;
    })
    .join("\n\n");

  return `You are an elite AI newspaper editor.

Return ONLY valid JSON.

Output format:
[
  {
    "id": 0,
    "title": "Short headline",
    "summary": "A concise newspaper-style summary."
  }
]

Rules:
- Select the 9 most important stories.
- Out of 9 selected articles there must be atleast two related to India.
- Keep the exact ID.
- Create a NEW title; do not copy the original title.
- Title must be 4-8 words.
- Use a professional newspaper tone.
- Summary must be 2-3 sentences.
- Summary should be approximately 50-80 words.
- Explain what happened and why it matters.
- Be informative, concise, and engaging.
- Do not use clickbait.
- Do not generate URLs.
- Return only valid JSON.
- Return only: id, title, summary.

ARTICLES:

${articleText}`;
}
