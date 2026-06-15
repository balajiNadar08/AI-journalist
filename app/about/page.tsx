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

export default function AboutPage() {
  const axioms = [
    {
      number: "01",
      title: "Clarity",
      description:
        "We transform complex stories into concise, readable briefings that highlight the key facts, context, and developments without overwhelming readers with unnecessary detail.",
    },
    {
      number: "02",
      title: "Trust",
      description:
        "Every claim made by Sandesa is backed by traceable, immutable data sources and verification logs.",
    },
    {
      number: "03",
      title: "Speed",
      description:
        "Information loses value over time. Our systems operate at the edge of the network, delivering the briefing before the news cycle even begins.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#f5f4f2] text-black">
      <section className="border-b border-neutral-300">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-10 lg:py-20">
          <div>
            <h1
              className="mb-6 text-4xl leading-none sm:text-5xl md:text-6xl lg:mb-8 lg:text-7xl"
              style={{ fontFamily: playfair.className }}
            >
              About Sandesa
            </h1>

            <p className={`max-w-xl text-base ${lato.className} leading-8 text-neutral-700 md:text-lg md:leading-9`}>
              Sandesa is an AI-powered news platform that brings you the news
              you care about. Instead of browsing multiple websites, you can
              choose your favorite topics and receive concise, reliable
              summaries from trusted sources. By personalizing content based on
              individual interests, the platform helps readers stay informed
              quickly and efficiently, making it easier to keep up with
              important news without information overload.
            </p>
          </div>

          <div>
            <div className="relative overflow-hidden border border-neutral-300">
              <img
                src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1200"
                alt="Newspaper"
                className="h-70 w-full object-cover grayscale sm:h-95 lg:h-130"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-neutral-300">
        <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
          <div className="p-6 lg:border-r lg:border-neutral-300 lg:p-10">
            <h2
              className="mb-6 text-3xl sm:text-4xl lg:mb-8 lg:text-5xl"
              style={{ fontFamily: playfair.className }}
            >
              Why We Exist
            </h2>

            <div className={`space-y-6 text-neutral-700 ${lato.className}`}>
              <p className="leading-8 text-base md:text-lg">
                The modern news landscape is fragmented. Important stories are
                scattered across websites, social platforms, newsletters, and
                feeds competing for attention. Sandesa was created to bring
                those signals together, filter out unnecessary noise, and
                deliver the information that truly matters.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center p-6 lg:p-10">
            <div className="w-full overflow-hidden border border-neutral-300">
              <img
                src="/IMG_2539.webp"
                alt="Sandesa"
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 lg:mb-12">
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl"
              style={{ fontFamily: playfair.className }}
            >
              Core Axioms
            </h2>
          </div>

          <div className="grid grid-cols-1 border border-neutral-300 md:grid-cols-2 lg:grid-cols-3">
            {axioms.map((axiom) => (
              <div
                key={axiom.number}
                className="border-b border-neutral-300 p-6 last:border-b-0 md:p-8 lg:border-b-0 lg:border-r lg:p-10 lg:last:border-r-0"
              >
                <div className="mb-6 text-2xl text-neutral-400 lg:text-3xl">
                  {axiom.number}
                </div>

                <h3
                  className="mb-4 text-2xl lg:mb-6 lg:text-3xl"
                  style={{ fontFamily: playfair.className }}
                >
                  {axiom.title}
                </h3>

                <p className={`leading-7 ${lato.className} text-neutral-700 lg:leading-8`}>
                  {axiom.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-300">
        <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
          <div className="p-8 sm:p-10 lg:p-16">
            <h2
              className="mb-6 text-4xl sm:text-5xl lg:mb-8 lg:text-7xl"
              style={{ fontFamily: playfair.className }}
            >
              The Mission
            </h2>

            <p className={`max-w-lg text-base ${lato.className} leading-8 text-neutral-700 md:text-lg md:leading-9`}>
              To make quality information accessible through intelligent
              summarization, helping people understand important events faster
              and make better-informed decisions every day.
            </p>
          </div>

          <div className="bg-black p-8 text-white sm:p-10 lg:p-16">
            <h2
              className="mb-6 text-4xl sm:text-5xl lg:mb-8 lg:text-7xl"
              style={{ fontFamily: playfair.className }}
            >
              The Vision
            </h2>

            <p className={`max-w-lg text-base ${lato.className} leading-8 text-neutral-300 md:text-lg md:leading-9`}>
              We envision a world where knowledge is organized, accessible,
              unbiased, and available to everyone regardless of time,
              background, or expertise.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
