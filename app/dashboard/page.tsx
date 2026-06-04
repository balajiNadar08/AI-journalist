"use client";

import { useRouter } from "next/navigation";
export default function DashboardPage() {
  const router = useRouter();

  return (
    <main
      className="relative flex min-h-screen items-center justify-center bg-[#f8f7f5] px-6"
      style={{
        backgroundImage:
          "radial-gradient(rgba(0,0,0,0.04) 0.8px, transparent 0.8px)",
        backgroundSize: "14px 14px",
      }}
    >

      

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

      {/* CENTER CONTENT */}

      <section className="w-full max-w-[900px] text-center">
        <h2
          className="mb-4 text-[92px] font-bold leading-[0.90] text-black"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Good Evening,
          <br />
          Prathamesh.
        </h2>

        <h3
          className="mx-auto mb-14 max-w-[860px] text-[72px] font-semibold leading-[1.05] text-neutral-500"
          style={{ fontFamily: "Georgia, serif" }}
        >
          What would you like to
          <br />
          know today?
        </h3>

        {/* CTA */}

        <button
      onClick={() => router.push("/category")}
      className="group inline-flex items-center gap-4 bg-black px-12 py-6 text-xl font-medium text-white transition-all hover:scale-[1.02]"
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