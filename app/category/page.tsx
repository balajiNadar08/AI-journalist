"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

import { Playfair_Display, Lato } from "next/font/google";

import {
  Cpu,
  Landmark,
  FlaskConical,
  Trophy,
  Wallet,
  Star,
  Clapperboard,
  Briefcase,
  Leaf,
  Heart,
  Plane,
  GraduationCap,
} from "lucide-react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  style: ["normal", "italic"],
});

const categories = [
  { name: "TECHNOLOGY", icon: Cpu },
  { name: "POLITICS", icon: Landmark },
  { name: "SCIENCE", icon: FlaskConical },
  { name: "SPORTS", icon: Trophy },
  { name: "FINANCE", icon: Wallet },
  { name: "CELEBRITY", icon: Star },
  { name: "ENTERTAINMENT", icon: Clapperboard },
  { name: "BUSINESS", icon: Briefcase },
  { name: "ENVIRONMENT", icon: Leaf },
  { name: "HEALTH", icon: Heart },
  { name: "TRAVEL", icon: Plane },
  { name: "EDUCATION", icon: GraduationCap },
];

export default function CategorySelectionPage() {
  const router = useRouter();

  const [username, setUsername] = useState("User");
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mode, setMode] = useState<"quick" | "brief">("quick");

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/auth/login");
      return;
    }

    const { data } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", user.id)
      .single();

    setUsername(data?.username || "User");
  };

  const toggleCategory = (name: string) => {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name],
    );
  };

  const handleGenerateBrief = async () => {
    if (selected.length === 0) {
      alert("Please select at least one category.");
      return;
    }

    setLoading(true);

    try {
      sessionStorage.removeItem("usePersonalisedNews");

      sessionStorage.setItem("selectedCategories", JSON.stringify(selected));

      sessionStorage.setItem("newsMode", mode);

      router.push("/news");
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  const handlePersonalisedNews = async () => {
    sessionStorage.removeItem("selectedCategories");

    sessionStorage.setItem("usePersonalisedNews", "true");

  sessionStorage.setItem(
    "newsMode",
    mode
  );

  router.push("/news");
};
  return (
    <main className="min-h-screen bg-[#f7f2e7] text-black">
      <div className="absolute right-4 top-4 sm:right-10 sm:top-6">
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="
          flex
          items-center
          gap-2
          sm:gap-3
          rounded-full
          border
          border-neutral-300
          bg-white
          px-3
          sm:px-4
          py-2
          shadow-sm
        "
          >
            <div
              className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-full
            bg-black
            text-sm
            text-white
          "
            >
              {username.charAt(0).toUpperCase()}
            </div>

            <span className="hidden sm:inline text-sm font-medium">
              {username}
            </span>

            <span
              className={`text-xs transition-transform ${
                profileOpen ? "rotate-180" : ""
              }`}
            >
              ▼
            </span>
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-48 sm:w-56 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-xl z-50">
              <button
                onClick={() => {
                  setProfileOpen(false);
                  router.push("/onboarding");
                }}
                className="block w-full border-b border-neutral-200 px-4 py-3 text-left text-sm sm:text-base hover:bg-neutral-100"
              >
                Edit Personalised News
              </button>

              <button
                onClick={() => {
                  setProfileOpen(false);
                  router.push("/");
                }}
                className="block w-full px-4 py-3 text-left text-sm sm:text-base hover:bg-neutral-100"
              >
                Back to Home
              </button>
            </div>
          )}
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-4 sm:px-10 py-16 sm:py-20">
        <div className="mb-10 sm:mb-16 text-center">
          <h2
            className="mx-auto max-w-4xl text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] sm:leading-[0.95]"
            style={{ fontFamily: playfair.className }}
          >
            What news defines your world?
          </h2>

          <p className="mt-4 sm:mt-8 text-base sm:text-lg md:text-xl text-neutral-600">
            Select one or more categories to personalize your intelligence feed.
          </p>

          <div className="mt-8 sm:mt-10 flex flex-col items-center gap-5">
            <div className="flex w-full flex-col sm:flex-row justify-center gap-4 sm:gap-6">
              <button
                onClick={() => setMode("quick")}
                className={`
        w-full
        sm:w-72
        border
        px-8
        py-4
        sm:py-5
        text-sm
        tracking-[0.2em]
        cursor-pointer
        transition-all
        ${
          mode === "quick"
            ? "border-black bg-black text-white"
            : "border-neutral-400 bg-white text-black hover:bg-black hover:text-white"
        }
      `}
              >
                QUICKY MODE
              </button>

              <button
                onClick={() => setMode("brief")}
                className={`
        w-full
        sm:w-72
        border
        px-8
        py-4
        sm:py-5
        text-sm
        tracking-[0.2em]
        cursor-pointer
        transition-all
        ${
          mode === "brief"
            ? "border-black bg-black text-white"
            : "border-neutral-400 bg-white text-black hover:bg-black hover:text-white"
        }
      `}
              >
                BRIEF MODE
              </button>
            </div>

            <p className="text-xs uppercase tracking-[0.3em] pt-8 text-neutral-500">
              Based on your interests
            </p>

            <button
              onClick={handlePersonalisedNews}
              className="
      w-full
      sm:w-72
      border border-[#d90429] bg-[#d90429]
      px-8
      py-4
      sm:py-5
      text-sm
      tracking-[0.2em]
      cursor-pointer
      transition-all
     text-white
    "
            >
              PERSONALISED NEWS
            </button>
          </div>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <button
                key={category.name}
                onClick={() => toggleCategory(category.name)}
                className={`
              flex
              h-32
              sm:h-36
              md:h-42.5
              flex-col
              items-center
              justify-center
              border
              cursor-pointer
              transition-all
              duration-200
              ${
                selected.includes(category.name)
                  ? "border-black bg-black text-white"
                  : "border-neutral-400 bg-[#f7f2e7] hover:bg-black hover:text-white"
              }
            `}
              >
                <Icon className="mb-4 sm:mb-6 h-7 w-7 sm:h-8 sm:w-8" />

                <span className="text-xs tracking-[0.25em] text-center px-2">
                  {category.name}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-16 sm:mt-24 flex justify-center">
          <div className="w-full max-w-155 border border-neutral-400 bg-[#f4f3f1] p-4 sm:p-6 shadow-[8px_8px_0px_#000]">
            <button
              onClick={handleGenerateBrief}
              disabled={loading}
              className="
            w-full
            border
            border-neutral-400
            bg-black
            py-4
            sm:py-6
            text-sm
            tracking-[0.2em]
            text-white
            transition-all
            hover:scale-[1.02]
            disabled:opacity-50
          "
            >
              {loading ? "GENERATING..." : "GENERATE MY BRIEF →"}
            </button>

            <p className="mt-4 sm:mt-6 text-center text-xs tracking-[0.18em] text-neutral-600">
              Your selected categories will be used to generate a personalized
              news briefing.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
