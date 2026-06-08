"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const handleGenerate = async () => {
    if (selected.length === 0) {
      alert("Please select at least one category.");
      return;
    }

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/auth/login");
      return;
    }

    const { data: categoryRows } = await supabase
      .from("categories")
      .select("*");

    const selectedIds =
      categoryRows
        ?.filter((c) => selected.includes(c.name))
        .map((c) => ({
          user_id: user.id,
          category_id: c.id,
        })) || [];

    await supabase.from("user_interests").delete().eq("user_id", user.id);

    const { error } = await supabase.from("user_interests").insert(selectedIds);

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    router.push("/news");
  };

  return (
    <main className="min-h-screen bg-[#f4f3f1] text-black">
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

            <span className="text-sm font-medium">{username}</span>

            <span
              className={`text-xs transition-transform ${
                profileOpen ? "rotate-180" : ""
              }`}
            >
              ▼
            </span>
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-44 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-xl">
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-3 text-left text-red-600 hover:bg-neutral-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-10 py-20">
        <div className="mb-16 text-center">
          <h2
            className="mx-auto max-w-4xl text-7xl font-bold leading-[0.95]"
            style={{ fontFamily: "Georgia, serif" }}
          >
            What news defines your world?
          </h2>

          <p className="mt-8 text-xl text-neutral-600">
            Select one or more categories to personalize your intelligence feed.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-4 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <button
                key={category.name}
                onClick={() => toggleCategory(category.name)}
                className={`
              flex
              h-42.5
              flex-col
              items-center
              justify-center
              border
              transition-all
              duration-200
              ${
                selected.includes(category.name)
                  ? "border-black bg-black text-white"
                  : "border-neutral-400 bg-[#f4f3f1] hover:bg-black hover:text-white"
              }
            `}
              >
                <Icon className="mb-6 h-8 w-8" />

                <span className="text-xs tracking-[0.25em]">
                  {category.name}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-24 flex justify-center">
          <div className="border border-neutral-400 bg-[#f4f3f1] p-6 shadow-[8px_8px_0px_#000]">
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="
            w-155
            border
            border-neutral-400
            bg-black
            py-6
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

            <p className="mt-6 text-center text-xs tracking-[0.18em] text-neutral-600">
              Your selected categories will be used to generate a personalized
              news briefing.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
