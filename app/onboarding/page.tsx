"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Playfair_Display, Lato } from "next/font/google";
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

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-playfair",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-lato",
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

export default function OnboardingPage() {
  const router = useRouter();

  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("User");
  const [profileOpen, setProfileOpen] = useState(false);

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
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name],
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

      const { data: categoryRows, error } = await supabase
        .from("categories")
        .select("*");

      if (error) {
        alert(error.message);
        return;
      }

      const selectedIds =
        categoryRows
          ?.filter((c) => selected.includes(c.name))
          .map((c) => ({
            user_id: user.id,
            category_id: c.id,
          })) || [];

      await supabase.from("user_interests").delete().eq("user_id", user.id);

      const { error: insertError } = await supabase
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
    <main
  className={`${lato.className} relative min-h-screen bg-[#f7f2e7] text-black`}
>
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
            router.push("/dashboard");
          }}
          className="block w-full border-b border-neutral-200 px-4 py-3 text-left text-sm sm:text-base hover:bg-neutral-100"
        >
          Dashboard
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
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 md:px-10 md:py-20">
        <div className="mb-10 text-center sm:mb-16">
          <h2
            className={`${playfair.className} mx-auto max-w-4xl text-4xl font-bold leading-[1.05] sm:text-5xl sm:leading-none md:text-6xl lg:text-7xl lg:leading-[0.95]`}
          >
            Welcome,
            <br />
            {username}
          </h2>

          <p className="mt-6 text-base text-neutral-600 sm:mt-8 sm:text-lg md:text-xl">
            Select your favorite categories.
          </p>

          <p className="mt-3 text-sm text-neutral-500 sm:text-base">
            We'll use these interests to give you a personalized news
            experience.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 md:gap-6">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <button
                key={category.name}
                onClick={() => toggleCategory(category.name)}
                className={`
                    flex
                    h-28
                    flex-col
                    items-center
                    justify-center
                    border
                    border-neutral-400
                    transition-all
                    duration-200
                    sm:h-36
                    md:h-40
                    lg:h-42.5
                ${
                  selected.includes(category.name)
                    ? "bg-black text-white border-black"
                    : "bg-[#f7f2e7] text-black hover:bg-black hover:text-white hover:border-black"
                }
         `}
              >
                <Icon className="mb-3 h-6 w-6 sm:mb-4 sm:h-7 sm:w-7 md:mb-6 md:h-8 md:w-8" />

                <span className="text-[10px] tracking-[0.2em] sm:text-xs sm:tracking-[0.25em]">
                  {category.name}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-16 flex justify-center sm:mt-20 md:mt-24">
          <div className="w-full max-w-xl border border-neutral-400 bg-[#f4f3f1] p-4 shadow-[8px_8px_0px_#000] sm:p-6">
            <button
              onClick={handleContinue}
              disabled={loading}
              className="
                w-full
                border
                border-neutral-400
                bg-black
                py-4
                text-sm
                tracking-[0.2em]
                text-white
                transition-all
                hover:scale-[1.02]
                disabled:opacity-50
                sm:py-6
              "
            >
              {loading ? "SAVING..." : "CONTINUE →"}
            </button>

            <p className="mt-4 text-center text-xs tracking-[0.18em] text-neutral-600 sm:mt-6">
              These preferences can be changed later.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
