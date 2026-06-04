export default function FeaturesPage() {
  const features = [
    {
      title: "Quicky Mode",
      description:
        "Short bullet-point summaries for users in a hurry. Get the facts without the fluff instantly",
    },
    {
      title: "Source Links",
      description:
        "Direct links to original articles for full reading. Verify the facts and dive deep into original reporting.",
    },
    {
      title: "Personalized Categories",
      description:
        "Combine multiple categories in one click. Tailor your morning briefing to exactly what matters to you.",
    },
    {
      title: "Fresh Daily News",
      description:
        "Latest stories updated by topic, with readable summaries. Stay ahead of the curve with real-time AI indexing.",
    },
  ];

  return (
    <section className="w-full bg-[#f4f3f1] py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20">
          <h2
            className="mb-2 text-[64px] leading-none font-semibold tracking-[-0.04em]"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Features built for fast news reading
          </h2>

          <p
            className="max-w-225 text-[20px] leading-[1.8] text-neutral-800"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Select categories, get summarized news from multiple sources, and
            read deeper through direct source links.
          </p>
        </div>

        <div className="mb-20 border-t border-neutral-500" />

        <div className="grid grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex h-125 flex-col border border-neutral-500 bg-transparent p-8"
            >
              <h3
                className="text-[36px] leading-[1.15] font-semibold"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {feature.title}
              </h3>

              <div className="flex-1" />

              <div className="mb-8 border-t border-neutral-500" />

              <p
                className="text-[18px] leading-[1.9] text-neutral-800"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
