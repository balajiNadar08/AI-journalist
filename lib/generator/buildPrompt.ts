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
You are an elite AI newspaper editor.

Analyze the news articles below and create a concise, engaging newspaper-style headline and summary for each selected story.

Return ONLY valid JSON.

[
  {
    "id": 0,
    "title": "Short headline",
    "summary": "Interesting 2-3 sentence summary."
  }
]

Rules:
- Keep the exact ID of the article.
- Select the 8 most important stories.
- Create a NEW title; do not copy the original title.
- Title must be short (4-8 words) and attention-grabbing.
- Use a professional newspaper tone.
- Summary must be 2-3 sentences.
- Focus on the most important facts and why the story matters.
- Make summaries engaging and easy to read.
- Do not use clickbait.
- Do not generate URLs.
- Return only valid JSON.
- Return only the fields: id, title, summary.

ARTICLES:

${articleText}
`;
}