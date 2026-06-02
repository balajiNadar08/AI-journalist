import { Playfair_Display, Lato } from "next/font/google";

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
      <section className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center px-6">
        <div className="border rounded-xl border-black w-175 max-w-full px-10 py-14">
          <h1
            className={`${playfair.className} text-4xl text-center md:text-6xl font-bold tracking-tight`}
          >
            AI Journalist
          </h1>

          <p
            className={`${lato.className} mt-5 text-black/70 text-lg max-w-2xl`}
          >
            Tired of reading unnecessary news? Choose your favorite category and
            get concise AI-powered summaries instantly.
          </p>
        </div>

        <button
          className={`${lato.className} mt-8 border border-black px-10 py-4 text-lg font-bold uppercase tracking-widest cursor-pointer hover:bg-black hover:text-white transition-all duration-300`}
        >
          Try Now!
        </button>
      </section>

      <section className="w-full min-h-screen px-6 py-24 border">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className=" p-10 md:p-14 h-125 flex flex-col justify-center">
            <h2
              className={`${playfair.className} text-4xl md:text-6xl leading-tight`}
            >
              Read Smarter,
              <span className="block text-black/70">Not Longer.</span>
            </h2>

            <p
              className={`${lato.className} mt-8 text-lg text-black/70 leading-relaxed`}
            >
              AI Journalist is a personalized AI-powered news platform that
              filters unnecessary information and delivers only the stories you
              care about.
            </p>

            <p
              className={`${lato.className} mt-5 text-black/50 leading-relaxed`}
            >
              Choose categories like technology, business, sports, startups, or
              AI and receive concise summaries within seconds — without endless
              scrolling, ads, or clickbait.
            </p>
          </div>

          <div className="border-2 border-[#ffb300] h-125 w-full flex items-center justify-center rounded-xl">
            <p className="text-[#ffb300]/70 uppercase tracking-[0.3em] text-sm">
              ASCII
            </p>
          </div>
        </div>
      </section>

      <section className="w-full px-6 py-28 bg-white text-black border">
        <div className="max-w-7xl mx-auto border border-white/20 p-10 md:p-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "AI Summaries",
                desc: "Get concise AI-generated news summaries instantly.",
              },
              {
                title: "Personalized Feed",
                desc: "Choose categories that actually matter to you.",
              },
              {
                title: "No Clickbait",
                desc: "Clean reading experience without unnecessary noise.",
              },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-full h-64 bg-[#ffbf2f] flex items-center justify-center rounded-2xl">
                  <p className="text-white text-xs tracking-[0.3em] uppercase">
                    ASCII
                  </p>
                </div>

                <div className="mt-12 w-[90%] border-2 border-black/70 px-8 py-10 flex flex-col items-center text-center rounded-2xl hover:border-[#ffbf2f] transition-all duration-300 ">
                  <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>

                  <p className="text-black/60 leading-relaxed text-sm">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
