"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Playfair_Display, Lato } from "next/font/google";

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

export default function DashboardPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/auth/login");
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("PROFILE ERROR:", error);
        setUsername("User");
        setLoading(false);
        return;
      }

      setUsername(data?.username || "User");
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f2e7]">
        <p className="text-lg text-neutral-600">Loading your newsroom...</p>
      </main>
    );
  }

  const getGreeting = () => {
    const indiaTime = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
    });

    const hour = new Date(indiaTime).getHours();

    if (hour >= 12 && hour < 17) {
      return "Good Afternoon";
    }

    if (hour >= 17) {
      return "Good Evening";
    }

    return "Good Morning";
  };

  return (
    <main
      className="relative flex min-h-screen items-center justify-center bg-[#f7f2e7] px-4 sm:px-6 py-20"
      style={{
        backgroundImage:
          "radial-gradient(rgba(0,0,0,0.04) 0.8px, transparent 0.8px)",
        backgroundSize: "14px 14px",
      }}
    >
      <div className="absolute right-4 top-4 sm:right-10 sm:top-6">
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 sm:gap-3 rounded-full border border-neutral-300 bg-white px-3 sm:px-4 py-2 shadow-sm transition hover:shadow-md"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-sm font-medium text-white">
              {(username || "U").charAt(0).toUpperCase()}
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
            <div className="absolute right-0 mt-2 w-48 sm:w-56 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-xl">
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

      <section className="mx-auto w-full max-w-187.5 text-center">
        <h2
          className="mb-4 text-4xl font-bold leading-[0.95] sm:mb-4 sm:text-5xl md:text-6xl lg:text-7xl"
          style={{ fontFamily: playfair.className }}
        >
          {getGreeting()},
          <br />
          {username}.
        </h2>

        <h3
          className="mx-auto mb-8 max-w-162.5 text-2xl font-semibold leading-[1.1] text-neutral-500 sm:mb-12 sm:text-3xl sm:leading-[1.05] md:text-4xl lg:text-5xl"
          style={{ fontFamily: playfair.className }}
        >
          What would you like to
          <br />
          know today?
        </h3>

        <button
          onClick={() => router.push("/category")}
          className="
        group
        inline-flex
        items-center
        gap-2
        sm:gap-4
        bg-black
        px-6
        py-3
        text-lg
        font-medium
        text-white
        transition-all
        hover:scale-[1.02]
        sm:px-12
        sm:py-6
        sm:text-xl
      "
        >
          Select Categories
          <span className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </button>

        <p className="mx-auto mt-6 max-w-125 px-2 text-base text-neutral-600 sm:mt-8 sm:text-lg">
          Select one or more categories to generate your personalized news
          briefing.
        </p>
      </section>
    </main>
  );
}
