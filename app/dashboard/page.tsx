"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

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

  const handleLogout = async () => {
    await supabase.auth.signOut();

    router.push("/");
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f4f3f1]">
        <p className="text-lg text-neutral-600">
          Loading your newsroom...
        </p>
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

  if (hour >= 17 && hour < 23.59) {
    return "Good Evening";
  }

  return "Good Morning";
};

  return (
    <main
      className="relative flex min-h-screen items-center justify-center bg-[#f4f3f1] px-6"
      style={{
        backgroundImage:
          "radial-gradient(rgba(0,0,0,0.04) 0.8px, transparent 0.8px)",
        backgroundSize: "14px 14px",
      }}
    >
      {/* PROFILE */}

      <div className="absolute right-10 top-6">
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="
              flex
              items-center
              gap-3
              rounded-full
              border
              border-neutral-300
              bg-white
              px-4
              py-2
              shadow-sm
              hover:shadow-md
              transition
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
                font-medium
                text-white
              "
            >
              {username.charAt(0).toUpperCase()}
            </div>

            <span className="text-sm font-medium">
              {username}
            </span>

            <span className="text-xs">▼</span>
          </button>

          {profileOpen && (
            <div
              className="
                absolute
                right-0
                mt-2
                w-48
                overflow-hidden
                rounded-xl
                border
                border-neutral-200
                bg-white
                shadow-xl
              "
            >
              

              <button
                onClick={handleLogout}
                className="
                  block
                  w-full
                  px-4
                  py-3
                  text-left
                  text-red-600
                  hover:bg-neutral-100
                "
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* MAIN CONTENT */}

      <section className="mx-auto w-full max-w-[750px] text-center">
        <h2
        className="mb-4 text-5xl font-bold leading-[0.95] md:text-6xl lg:text-7xl"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {getGreeting()},
      <br />
        {username}.
      </h2>

        <h3
          className="mx-auto mb-12 max-w-[650px] text-3xl font-semibold leading-[1.05] text-neutral-500 md:text-4xl lg:text-5xl"
          style={{ fontFamily: "Georgia, serif" }}
        >
          What would you like to
          <br />
          know today?
        </h3>

        {/* CTA */}

        <button
          onClick={() => router.push("/category")}
          className="
            group
            inline-flex
            items-center
            gap-4
            bg-black
            px-12
            py-6
            text-xl
            font-medium
            text-white
            transition-all
            hover:scale-[1.02]
          "
        >
          Select Categories

          <span className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </button>

        <p className="mx-auto mt-8 max-w-[500px] text-lg text-neutral-600">
          Select one or more categories to generate
          your personalized news briefing.
        </p>
      </section>
    </main>
  );
}