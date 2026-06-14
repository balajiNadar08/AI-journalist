import { geminiModel } from "@/lib/gemini";
import { buildPrompt } from "./buildPrompt";
import { buildQuickyPrompt } from "./buildQuickyPrompt";
import { cleanResponse } from "./cleanResponse";

export async function generateBrief(
  articles: any[],
  mode: "quick" | "brief" = "brief",
) {
  const prompt =
    mode === "quick" ? buildQuickyPrompt(articles) : buildPrompt(articles);

  const result = await geminiModel.generateContent(prompt);

  const text = result.response.text();

  const generatedArticles = cleanResponse(text);

  return generatedArticles.map((article: any) => ({
    title: article.title ?? articles[article.id]?.title ?? "Untitled",

    summary: article.summary,

    link: articles[article.id]?.link ?? "#",

    source: articles[article.id]?.source ?? "",
  }));
}
