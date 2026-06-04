import { Playfair_Display, Lato } from "next/font/google";
import { BlurFade } from "@/components/ui/blur-fade";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-lato",
});

export default function Home() {
  return (
    <main className="bg-white text-black">
      <section className="relative min-h-[calc(100vh-80px)] overflow-hidden flex flex-col items-center justify-center px-6">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/landing-page-background.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/10" />

        <div className="relative z-10 rounded-xl text-center max-w-4xl px-10 py-10">
          <BlurFade delay={0.25} inView>
            <h1
              className={`text-6xl md:text-8xl font-semibold ${playfair.className} pb-10 text-white`}
            >
              Understand The World Faster
            </h1>
          </BlurFade>

          <BlurFade delay={0.5} inView>
            <p className={`text-lg md:text-xl ${lato.className} text-white/90`}>
              An AI-driven news experience built for speed, clarity and modern
              readers.
            </p>
          </BlurFade>

          <BlurFade delay={0.75}>
            <button
              className={`${lato.className} rounded-full mt-8 border border-white text-white px-10 py-3 text-md font-bold uppercase tracking-widest cursor-pointer hover:bg-white hover:text-black transition-all duration-300`}
            >
              Try Now
            </button>
          </BlurFade>
        </div>
      </section>

      <section className="w-full min-h-screen  px-6 py-24 border">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className=" p-10 md:p-14 h-125 flex flex-col justify-center">
            <BlurFade delay={0.25} inView>
              <h2
                className={`${playfair.className} text-4xl md:text-6xl leading-tight`}
              >
                Read Smarter,
                <span className="block text-red-500">Not Longer.</span>
              </h2>
            </BlurFade>

            <BlurFade delay={0.25 * 2} inView>
              <p
                className={`${lato.className} mt-8 text-lg text-black/70 leading-relaxed`}
              >
                AI Journalist is a personalized AI-powered news platform that
                filters unnecessary information and delivers only the stories
                you care about.
              </p>
            </BlurFade>

            <BlurFade delay={0.25 * 3} inView>
              <p
                className={`${lato.className} mt-5 text-black/50 leading-relaxed`}
              >
                Choose categories like technology, business, sports, science,
                etc. and receive concise summaries within seconds without
                endless scrolling, ads or clickbait.
              </p>
            </BlurFade>
          </div>

          <div className="relative h-125 w-full flex items-center justify-center rounded-xl">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover rounded-2xl"
            >
              <source src="/read-smarter.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      <section className="w-full px-6 py-28 bg-white text-black border">
        <div className="max-w-7xl mx-auto border border-white/20 p-10 md:p-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "Quicky Mode",
                desc: "Short bullet-point summaries for users in a hurry. Get the facts without the fluff instantly",
              },
              {
                title: "Source Links",
                desc: "Direct links to original articles for full reading. Verify the facts and dive deep into original reporting.",
              },
              {
                title: "Personalized Categories",
                desc: "Combine multiple categories in one click. Tailor your morning briefing to exactly what matters to you.",
              },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <BlurFade delay={0.25} inView className="w-full">
                  <div className="w-full h-64 bg-[#ffbf2f] flex items-center justify-center rounded-2xl">
                    <p className="text-white text-xs tracking-[0.3em] uppercase">
                      ASCII
                    </p>
                  </div>
                </BlurFade>

                <BlurFade delay={0.25 * 2} inView>
                  <div className="mt-12 w-[90%] h-60 border-2 border-black/70 px-8 py-10 flex flex-col items-center text-center rounded-2xl hover:border-[#ffbf2f] transition-all duration-300 ">
                    <h3 className="text-2xl font-semibold mb-4">
                      {item.title}
                    </h3>

                    <p className="text-black/60 leading-relaxed text-sm">
                      {item.desc}
                    </p>
                  </div>
                </BlurFade>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full px-6 py-24 border border-black">
        <div className="max-w-7xl mx-auto border border-black rounded-2xl p-6 md:p-10">
          <div className="min-h-105 flex flex-col items-center justify-center px-8 text-center">
            <h2
              className={`${playfair.className} text-4xl md:text-6xl font-semibold leading-tight`}
            >
              Built for Modern Readers
            </h2>

            <p
              className={`${lato.className} mt-8 max-w-3xl text-black/70 text-lg leading-relaxed`}
            >
              AI Journalist transforms long, cluttered news articles into
              concise, meaningful summaries powered by AI. Instead of spending
              hours scrolling through headlines, readers can instantly
              understand what matters most in technology, business, sports,
              startups, AI and more.
            </p>

            <p
              className={`${lato.className} mt-5 max-w-2xl text-black/50 leading-relaxed`}
            >
              Designed with a clean and distraction-free experience, the
              platform removes clickbait, unnecessary ads and information
              overload helping users stay informed faster and smarter every day.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
