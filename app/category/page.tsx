"use client";

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
  Menu,
  Search,
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
  return (
    <main className="min-h-screen bg-[#f8f7f5] text-black">
      {/* HEADER */}
      <header >
        <div className="mx-auto flex h-16 items-center justify-between px-16">
          

          <div className="absolute right-10 top-6">
        <button className="flex items-center gap-3 rounded-full border border-neutral-300 bg-white px-4 py-2 shadow-sm">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-sm text-white">
            P
          </div>

          <span className="text-sm font-medium">
            Prathamesh
          </span>
        </button>
     
              </div>
            </div>
          
       
      </header>

      {/* HERO */}
      <section className="mx-auto max-w-7xl px-10 py-20">
        <div className="mb-16 text-center">
          <h2
            className="mx-auto max-w-4xl text-7xl font-bold leading-[0.95]"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            What news defines your world?
          </h2>

          <p className="mt-8 text-xl text-neutral-600">
            Select at least 3 categories to personalize your
            intelligence feed.
          </p>
        </div>

        {/* CATEGORIES */}
        <div className="mx-auto grid max-w-5xl grid-cols-4 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <button
                key={category.name}
                className="
                  group
                  flex
                  h-[170px]
                  flex-col
                  items-center
                  justify-center
                  border
                  border-neutral-400
                  bg-[#f8f7f5]
                  transition-all
                  duration-200
                  hover:bg-black
                  hover:text-white
                "
              >
                <Icon className="mb-6 h-8 w-8" />

                <span className="text-xs tracking-[0.25em]">
                  {category.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-24 flex justify-center">
          <div className="border border-neutral-400 bg-[#f8f7f5] p-6 shadow-[8px_8px_0px_#000]">
            <button
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
                hover:opacity-90
                transition-all hover:scale-[1.02]
              "
            >
              GENERATE MY BRIEF
               <span className="transition-transform group-hover:translate-x-1">
        →
      </span>
            </button>

            <p className="mt-6 text-center text-xs tracking-[0.18em] text-neutral-600">
              Select one or more categories to generate your
              personalized news briefing.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}