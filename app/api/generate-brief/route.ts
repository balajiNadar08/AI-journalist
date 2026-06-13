import { NextRequest, NextResponse } from "next/server";
import { getUserCategories } from "@/lib/interests/getUserCategories";
import { RSS_FEEDS } from "@/lib/rss/rss-feeds";
import { fetchFeeds } from "@/lib/rss/fetchFeed";
import { getArticles } from "@/lib/rss/getArticles";
import { generateBrief } from "@/lib/generator/generateBrief";

export async function POST(req: NextRequest) {
  try {
    const { userId, categories } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { error: "Missing userId" },
        { status: 400 }
      );
    }

    let categoryNames: string[] = [];

    // Categories selected on Category page
    if (
      categories &&
      Array.isArray(categories) &&
      categories.length > 0
    ) {
      categoryNames = categories;
    } else {
      // Fallback to onboarding interests
      categoryNames = await getUserCategories(userId);
    }

    if (!categoryNames.length) {
      return NextResponse.json({
        success: true,
        articles: [],
      });
    }

    const feedUrls = categoryNames.flatMap(
      (name) =>
        RSS_FEEDS[
          name as keyof typeof RSS_FEEDS
        ] || []
    );

    const feeds = await fetchFeeds(feedUrls);

    const articles = getArticles(feeds);

    if (!articles.length) {
      return NextResponse.json({
        success: true,
        articles: [],
      });
    }

    const generatedArticles =
      await generateBrief(articles);

    return NextResponse.json({
      success: true,
      articles: generatedArticles,
    });
  } catch (error: any) {
    console.error(
      "GENERATE BRIEF ERROR:",
      error
    );

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