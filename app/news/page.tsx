"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type Article = {
  title: string;
  source: string;
  summary: string;
  link: string;
};

export default function NewsPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState<Article[]>([]);
  const [username, setUsername] = useState("User");

  useEffect(() => {
    loadNews();
  }, []);

  async function loadNews() {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/auth/login");
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", user.id)
      .single();

    if (profile?.username) {
      setUsername(profile.username);
    }

    const selectedCategories = JSON.parse(
      sessionStorage.getItem("selectedCategories") || "[]"
    );

    const response = await fetch(
      "/api/generate-brief",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          categories: selectedCategories,
        }),
      }
    );

    const data = await response.json();

    console.log("NEWS RESPONSE:", data);

    if (!response.ok) {
      alert(data.error);
      return;
    }

    setArticles(data.articles || []);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
}

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#f4f3f1]">
        Loading news...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f4f3f1]">
      <section className="mx-auto max-w-6xl px-8 py-20">
        <h1
          className="text-6xl font-bold"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Your News Brief
        </h1>

        <p className="mt-4 text-lg text-neutral-600">
          Curated for {username}
        </p>

        <div className="mt-12 space-y-8">
          {articles.map((article, index) => (
            <div
              key={index}
              className="border border-neutral-300 bg-white p-8"
            >
              <p className="mb-2 text-sm uppercase text-neutral-500">
                {article.source}
              </p>

              <h2
                className="text-3xl font-bold"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {article.title}
              </h2>

              <p className="mt-4 text-neutral-700">
                {article.summary}
              </p>

              <a
                href={article.link}
                target="_blank"
                className="mt-6 inline-block border border-black px-4 py-2"
              >
                Read Source →
              </a>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}