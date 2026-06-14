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

export default function OnboardingPage() {
  const router = useRouter();

  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("User");

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
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
  }

  const toggleCategory = (name: string) => {
    setSelected((prev) =>
      prev.includes(name)
        ? prev.filter((c) => c !== name)
        : [...prev, name]
    );
  };

  async function handleContinue() {
    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/auth/login");
        return;
      }

      const { data: categoryRows, error } =
        await supabase
          .from("categories")
          .select("*");

      if (error) {
        alert(error.message);
        return;
      }

      const selectedIds =
        categoryRows
          ?.filter((c) =>
            selected.includes(c.name)
          )
          .map((c) => ({
            user_id: user.id,
            category_id: c.id,
          })) || [];

      await supabase
        .from("user_interests")
        .delete()
        .eq("user_id", user.id);

      const { error: insertError } =
        await supabase
          .from("user_interests")
          .insert(selectedIds);

      if (insertError) {
        alert(insertError.message);
        return;
      }

      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f4f3f1] text-black">
      <section className="mx-auto max-w-7xl px-10 py-20">
        <div className="mb-16 text-center">
          <h2
            className="mx-auto max-w-4xl text-7xl font-bold leading-[0.95]"
            style={{
              fontFamily: "Georgia, serif",
            }}
          >
            Welcome,
            <br />
            {username}
          </h2>

          <p className="mt-8 text-xl text-neutral-600">
            Select your favorite topics.
          </p>

          <p className="mt-3 text-neutral-500">
            We'll use these interests to
            personalize your AI newsroom.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-4 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <button
                key={category.name}
                onClick={() =>
                  toggleCategory(category.name)
                }
                className={`
                  flex
                  h-[170px]
                  flex-col
                  items-center
                  justify-center
                  border
                  transition-all
                  duration-200
                  ${
                    selected.includes(
                      category.name
                    )
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
              onClick={handleContinue}
              disabled={loading}
              className="
                w-[620px]
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
              {loading
                ? "SAVING..."
                : "CONTINUE →"}
            </button>

            <p className="mt-6 text-center text-xs tracking-[0.18em] text-neutral-600">
              These preferences can be
              changed later.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}