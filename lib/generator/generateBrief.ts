import { geminiModel } from "@/lib/gemini";
import { buildPrompt } from "./buildPrompt";
import { cleanResponse } from "./cleanResponse";

export async function generateBrief(articles: any[]) {
  const prompt = buildPrompt(articles);

  const result = await geminiModel.generateContent(prompt);

  const text = result.response.text();

  const generatedArticles = cleanResponse(text);

  console.log(generatedArticles.map((article: any) => ({
    title:
      article.title ??
      articles[article.id]?.title ??
      "Untitled",
    summary: article.summary,
    link: articles[article.id]?.link ?? "#",
  })));

  return generatedArticles.map((article: any) => ({
    title:
      article.title ??
      articles[article.id]?.title ??
      "Untitled",
    summary: article.summary,
    link: articles[article.id]?.link ?? "#",
  }));
}