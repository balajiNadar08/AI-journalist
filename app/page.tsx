"use client";
import { Playfair_Display, Lato } from "next/font/google";
import { BlurFade } from "@/components/ui/blur-fade";
import { Marquee, ReviewCard } from "@/components/ui/marquee";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

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

const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Jane",
    username: "@jane",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    name: "James",
    username: "@james",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/james",
  },
];

export default function Home() {
  const router = useRouter();

  async function handleTryNow() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      router.push("/dashboard");
    } else {
      router.push("/auth/login");
    }
  }

  return (
    <main className="bg-white text-black">
      <section className="relative min-h-[calc(100vh-80px)] overflow-hidden flex flex-col items-center justify-center px-4 sm:px-6">
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

        <div className="relative z-10 rounded-xl text-center max-w-4xl px-4 sm:px-10 py-10">
          <BlurFade delay={0.25} inView>
            <h1
              className={`text-4xl sm:text-6xl md:text-8xl font-semibold ${playfair.className} pb-6 sm:pb-10 text-white`}
            >
              Understand The World Faster
            </h1>
          </BlurFade>

          <BlurFade delay={0.5} inView>
            <p
              className={`text-base sm:text-lg md:text-xl ${lato.className} text-white/90`}
            >
              An AI-driven news experience built for speed, clarity and modern
              readers.
            </p>
          </BlurFade>

          <BlurFade delay={0.75}>
            <button
              onClick={handleTryNow}
              className={`${lato.className} rounded-full mt-6 sm:mt-8 border border-white text-white px-6 sm:px-10 py-3 text-sm sm:text-md font-bold uppercase tracking-widest cursor-pointer hover:bg-white hover:text-black transition-all duration-300`}
            >
              Try Now
            </button>
          </BlurFade>
        </div>
      </section>

      <section className="w-full min-h-screen bg-[#F4F3F1] px-4 sm:px-6 py-16 sm:py-24 border">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="p-6 sm:p-10 md:p-14 flex flex-col justify-center">
            <BlurFade delay={0.25} inView>
              <h2
                className={`${playfair.className} text-3xl sm:text-4xl md:text-6xl leading-tight`}
              >
                Read Smarter,
                <span className="block text-red-500">Not Longer.</span>
              </h2>
            </BlurFade>

            <BlurFade delay={0.25 * 2} inView>
              <p
                className={`${lato.className} mt-6 sm:mt-8 text-base sm:text-lg text-black/70 leading-relaxed`}
              >
                Sandesa is a personalized AI-powered news platform that filters
                unnecessary information and delivers only the stories you care
                about.
              </p>
            </BlurFade>

            <BlurFade delay={0.25 * 3} inView>
              <p
                className={`${lato.className} mt-4 sm:mt-5 text-sm sm:text-base text-black/50 leading-relaxed`}
              >
                Choose categories like technology, business, sports, science,
                etc. and receive concise summaries within seconds without
                endless scrolling, ads or clickbait.
              </p>
            </BlurFade>
          </div>

          <div className="relative h-72 sm:h-96 md:h-125 w-full flex items-center justify-center rounded-xl overflow-hidden">
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

      <section className="w-full bg-[#f4f3f1] px-4 sm:px-6 py-16 sm:py-28 border">
        <div className="max-w-7xl mx-auto">
          <BlurFade delay={0.25} inView>
            <div className="text-center mb-12 sm:mb-24">
              <h2
                className={`text-3xl sm:text-5xl md:text-6xl ${playfair.className} font-bold`}
              >
                News that respects your time
              </h2>

              <p
                className={`max-w-2xl ${lato.className} mx-auto mt-4 sm:mt-6 text-sm sm:text-base text-black/60`}
              >
                Read less, understand more. Get concise summaries, personalized
                coverage, and instant insights from the stories that matter.
              </p>
            </div>
          </BlurFade>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.8fr] gap-6 mb-6">
            <BlurFade delay={0.15} inView>
              <div className="relative h-60 sm:h-80 rounded-3xl border-2 border-black/10 bg-[#ffbf2f] flex items-center justify-center overflow-hidden">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 h-full w-full object-cover rounded-2xl"
                >
                  <source src="/quick-mode.mp4" type="video/mp4" />
                </video>
              </div>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <div className="min-h-60 sm:h-80 rounded-3xl border-2 border-black/90 p-6 sm:p-10 md:p-14 flex flex-col justify-center">
                <h3
                  className={`text-2xl sm:text-3xl md:text-4xl font-bold ${playfair.className} mb-4 sm:mb-6`}
                >
                  Quicky Mode
                </h3>

                <p
                  className={`text-sm sm:text-base text-black/60 ${lato.className} leading-relaxed max-w-xl`}
                >
                  Short bullet-point summaries for users in a hurry. Get the
                  facts without the fluff and stay informed in seconds.
                </p>
              </div>
            </BlurFade>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1.8fr_1fr] gap-6">
            <BlurFade delay={0.25} inView>
              <div className="min-h-60 sm:h-80 rounded-3xl border-2 border-black/90 p-6 sm:p-10 md:p-14 flex flex-col justify-center">
                <h3
                  className={`text-2xl sm:text-3xl md:text-4xl font-bold ${playfair.className} mb-4 sm:mb-6`}
                >
                  Source Links
                </h3>

                <p
                  className={`text-sm sm:text-base text-black/60 ${lato.className} leading-relaxed max-w-xl`}
                >
                  Direct links to original articles for full reading. Verify
                  facts, explore different viewpoints, and dive deeper whenever
                  you want.
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.3} inView>
              <div className="relative h-60 sm:h-80 rounded-3xl border-2 border-black/10 bg-[#ffbf2f] flex items-center justify-center overflow-hidden">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 h-full w-full object-cover rounded-2xl"
                >
                  <source src="/source-links.mp4" type="video/mp4" />
                </video>
              </div>
            </BlurFade>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.8fr] gap-6 mt-6">
            <BlurFade delay={0.35} inView>
              <div className="relative h-60 sm:h-80 rounded-3xl border-2 border-black/10 bg-[#ffbf2f] flex items-center justify-center overflow-hidden">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 h-full w-full object-cover rounded-2xl"
                >
                  <source src="/personalized.mp4" type="video/mp4" />
                </video>
              </div>
            </BlurFade>

            <BlurFade delay={0.4} inView>
              <div className="min-h-60 sm:h-80 rounded-3xl border-2 border-black/90 p-6 sm:p-10 md:p-14 flex flex-col justify-center">
                <h3
                  className={`text-2xl sm:text-3xl md:text-4xl font-bold ${playfair.className} mb-4 sm:mb-6`}
                >
                  Personalized Categories
                </h3>

                <p
                  className={`text-sm sm:text-base text-black/60 ${lato.className} leading-relaxed max-w-xl`}
                >
                  Combine multiple categories in one click and create a news
                  feed tailored to your interests. Technology, business, sports,
                  politics — all in one place.
                </p>
              </div>
            </BlurFade>
          </div>
        </div>
      </section>

      <section className="w-full px-4 sm:px-6 pt-16 sm:pt-24 pb-24 sm:pb-40 bg-white border border-black">
        <div className="mx-auto mb-12 sm:mb-16 max-w-3xl text-center">
          <h2
            className={`${playfair.className} text-3xl px-2 sm:px-10 md:px-20 pb-4 sm:pb-6 font-semibold tracking-tight sm:text-4xl md:text-5xl`}
          >
            What Readers Think About Sandesa
          </h2>

          <p
            className={`${lato.className} mt-4 text-base text-muted-foreground sm:text-lg md:text-xl`}
          >
            Join readers who are transforming the way they consume news with
            faster insights, smarter summaries, and zero information overload.
          </p>
        </div>

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <Marquee pauseOnHover className="[--duration:20s]">
            {reviews.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>

          <Marquee reverse pauseOnHover className="[--duration:20s]">
            {reviews.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>

          <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r" />
          <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l" />
        </div>
      </section>
    </main>
  );
}
