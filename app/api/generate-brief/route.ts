import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import Parser from "rss-parser";
import { geminiModel } from "@/lib/gemini";
import { RSS_FEEDS } from "@/lib/rss-feeds";

type CategoryName = keyof typeof RSS_FEEDS;

const parser = new Parser();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { error: "Missing userId" },
        { status: 400 }
      );
    }

    // ==========================
    // USER INTERESTS
    // ==========================

    const { data: interests, error: interestsError } =
      await supabase
        .from("user_interests")
        .select("category_id")
        .eq("user_id", userId);

    if (interestsError) {
      return NextResponse.json(
        { error: interestsError.message },
        { status: 500 }
      );
    }

    if (!interests?.length) {
      return NextResponse.json({
        success: true,
        articles: [],
      });
    }

    const categoryIds = interests.map(
      (i) => i.category_id
    );

    // ==========================
    // CATEGORY NAMES
    // ==========================

    const { data: categories, error: categoryError } =
      await supabase
        .from("categories")
        .select("id,name")
        .in("id", categoryIds);

    if (categoryError) {
      return NextResponse.json(
        { error: categoryError.message },
        { status: 500 }
      );
    }

    const categoryNames =
      categories?.map((c) => c.name) || [];

    // ==========================
    // RSS FEEDS
    // ==========================

    const feedUrls = categoryNames.flatMap(
      (name) =>
        RSS_FEEDS[
          name as keyof typeof RSS_FEEDS
        ] || []
    );

    const feedResults = await Promise.all(
      feedUrls.map(async (url) => {
        try {
          return await parser.parseURL(url);
        } catch {
          return null;
        }
      })
    );

    const articles = feedResults
      .filter(Boolean)
      .flatMap((feed) =>
        feed?.items.slice(0, 5) || []
      )
      .slice(0, 20);

    if (!articles.length) {
      return NextResponse.json({
        success: true,
        articles: [],
      });
    }

    // ==========================
    // PREPARE ARTICLE TEXT
    // ==========================

    const articleText = articles
      .map(
        (article, index) => `
${index + 1}.
TITLE: ${article.title}
LINK: ${article.link}
DESCRIPTION: ${
          article.contentSnippet ||
          article.content ||
          ""
        }
`
      )
      .join("\n\n");

    // ==========================
    // GEMINI
    // ==========================

    const prompt = `
You are an elite AI news editor.

Analyze the news articles below.

Return ONLY valid JSON.

Format:

[
  {
    "title":"...",
    "summary":"...",
    "link":"..."
  }
]

Rules:
- Select the 8 most important stories.
- Summary must be 2-3 sentences.
- Keep title concise.
- Preserve original article link.
- Return valid JSON only.

ARTICLES:

${articleText}
`;

    const result =
      await geminiModel.generateContent(prompt);

    const response =
      await result.response.text();

    let cleaned = response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let generatedArticles;

    try {
      generatedArticles = JSON.parse(cleaned);
    } catch {
      generatedArticles = [];
    }

    return NextResponse.json({
      success: true,
      articles: generatedArticles,
    });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error:
          error.message ||
          "Failed to generate brief",
      },
      {
        status: 500,
      }
    );
  }
}