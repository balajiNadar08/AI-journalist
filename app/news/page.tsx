"use client";

import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Playfair_Display, Lato } from "next/font/google";
import Link from "next/link";

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

type Article = {
  title: string;
  source: string;
  summary: string;
  link: string;
};

const FUN_FACTS = [
  "The first newspaper was published in Germany in 1605.",
  "The word 'news' may come from North, East, West and South.",
  "More people read headlines than full articles.",
  "The New York Times was founded in 1851.",
  "The shortest war in history lasted only 38 minutes.",
  "Honey never spoils and has been found edible after thousands of years.",
  "Octopuses have three hearts.",
  "Bananas are technically berries.",
  "The Eiffel Tower grows taller during summer.",
  "A day on Venus is longer than a year on Venus.",
  "Wombat poop is cube-shaped.",
  "Sharks existed before trees.",
  "A group of flamingos is called a flamboyance.",
  "The human nose can detect over a trillion different scents.",
  "There are more stars in the universe than grains of sand on Earth.",
  "The fingerprints of a koala are very similar to those of humans.",
  "Scotland's national animal is the unicorn.",
  "The heart of a blue whale is about the size of a small car.",
  "Water can boil and freeze at the same time under special conditions.",
  "The longest English word has 189,819 letters.",
  "Some turtles can breathe through their rear ends.",
  "A cloud can weigh more than a million pounds.",
  "The inventor of the Frisbee was later turned into a Frisbee-shaped urn.",
  "Sloths can hold their breath longer than dolphins.",
  "The Moon is slowly drifting away from Earth.",
  "A bolt of lightning is five times hotter than the Sun's surface.",
  "Sea otters hold hands while sleeping so they don't drift apart.",
  "An apple, potato, and onion taste the same if you eat them with your nose plugged.",
  "The first alarm clock could only ring at 4 a.m.",
  "Cows have best friends and become stressed when separated.",
  "A shrimp's heart is located in its head.",
  "The world's oldest known pet cat lived over 9,500 years ago.",
  "The shortest commercial flight lasts less than two minutes.",
  "Butterflies can taste with their feet.",
  "The inventor of the microwave discovered it after a chocolate bar melted in his pocket.",
  "There are more possible chess games than atoms in the observable universe.",
  "A jellyfish has no brain, heart, or bones.",
  "The largest snowflake ever recorded was reportedly 15 inches wide.",
  "The first computer mouse was made of wood.",
  "Your stomach gets a new lining every few days.",
  "The world's quietest room is so silent that people can hear their own heartbeat.",
  "Some frogs can freeze completely and come back to life.",
  "A crocodile cannot stick its tongue out.",
  "The world's oldest known tree is over 4,800 years old.",
  "Penguins propose to their mates with pebbles.",
  "The average person walks enough in a lifetime to circle Earth several times.",
  "The dot over the letters 'i' and 'j' is called a tittle.",
  "The first email was sent in 1971.",
  "A single strand of spaghetti is called a spaghetto.",
  "Rabbits can't vomit.",
  "The Sun accounts for about 99.8% of the mass in our solar system.",
  "Some cats are allergic to humans.",
  "A day on Mercury lasts about 59 Earth days.",
  "The tongue is one of the strongest muscles in the human body.",
  "The world's largest desert is Antarctica.",
  "An astronaut can grow slightly taller in space.",
  "The tiny pocket in jeans was originally designed for pocket watches.",
  "There are more possible ways to shuffle a deck of cards than there are stars in our galaxy.",
  "A group of crows is called a murder.",
];

const QUOTES = [
  {
    quote:
      "Journalism is printing what someone else does not want printed: everything else is public relations.",
    author: "George Orwell",
  },
  {
    quote: "The first draft of history is journalism.",
    author: "Philip L. Graham",
  },
  {
    quote:
      "News is what somebody somewhere wants to suppress; all the rest is advertising.",
    author: "Lord Northcliffe",
  },
  {
    quote: "Facts are sacred, but comment is free.",
    author: "C. P. Scott",
  },
  {
    quote: "A journalist is a reporter of facts, not a maker of them.",
    author: "Unknown",
  },
  {
    quote: "Truth is the foundation of every great story.",
    author: "Unknown",
  },
  {
    quote: "Without facts, you cannot have truth.",
    author: "Maria Ressa",
  },
  {
    quote: "Journalism can never be silent.",
    author: "Henry Anatole Grunwald",
  },
  {
    quote: "Good journalism is good business.",
    author: "James B. Stewart",
  },
  {
    quote: "The press is the best instrument for enlightening the mind of man.",
    author: "Thomas Jefferson",
  },
  {
    quote: "In seeking truth, you have to get both sides of a story.",
    author: "Walter Cronkite",
  },
  {
    quote: "Accuracy to a newspaper is what virtue is to a lady.",
    author: "Joseph Pulitzer",
  },
  {
    quote:
      "Freedom of the press is not just important to democracy, it is democracy.",
    author: "Walter Cronkite",
  },
  {
    quote: "Journalism is literature in a hurry.",
    author: "Matthew Arnold",
  },
  {
    quote:
      "The duty of a journalist is to comfort the afflicted and afflict the comfortable.",
    author: "Finley Peter Dunne",
  },
  {
    quote: "A free press is the unsleeping guardian of every other right.",
    author: "Winston Churchill",
  },
  {
    quote: "Great stories happen to those who can tell them.",
    author: "Ira Glass",
  },
  {
    quote: "The best journalism is transparent about its methods.",
    author: "Unknown",
  },
  {
    quote: "Truth emerges from facts honestly gathered.",
    author: "Unknown",
  },
  {
    quote: "Journalism is an act of faith in the future.",
    author: "Ann Curry",
  },
  {
    quote:
      "The newspaper is a greater treasure to the people than uncounted millions of gold.",
    author: "Henry Ward Beecher",
  },
  {
    quote: "A good headline is a window to the story.",
    author: "Unknown",
  },
  {
    quote: "Information is the oxygen of democracy.",
    author: "Ronald Reagan",
  },
  {
    quote: "Reporting is not stenography.",
    author: "Unknown",
  },
  {
    quote:
      "The role of journalism is to shine a light where people would rather keep things hidden.",
    author: "Unknown",
  },
  {
    quote: "A story well told can change the world.",
    author: "Unknown",
  },
  {
    quote: "Investigative journalism is democracy's watchdog.",
    author: "Unknown",
  },
  {
    quote: "The truth does not mind being questioned.",
    author: "Unknown",
  },
  {
    quote: "Every fact has a story behind it.",
    author: "Unknown",
  },
  {
    quote: "Credibility is a journalist's most valuable asset.",
    author: "Unknown",
  },
];

export default function NewsPage() {
  const router = useRouter();
  const randomQuote = useMemo(
    () => QUOTES[Math.floor(Math.random() * QUOTES.length)],
    [],
  );

  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState<Article[]>([]);
  const [username, setUsername] = useState("Reader");
  const [mode, setMode] = useState<"quick" | "brief">("quick");
  useEffect(() => {
    loadNews();
  }, []);

  async function loadNews() {
    const selectedMode =
      (sessionStorage.getItem("newsMode") as "quick" | "brief") || "quick";
    setMode(selectedMode);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/auth/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", user.id)
        .single();

      if (profile?.username) {
        setUsername(profile.username);
      }
      const usePersonalisedNews =
  sessionStorage.getItem("usePersonalisedNews") === "true";

const selectedCategories = JSON.parse(
  sessionStorage.getItem("selectedCategories") || "[]"
);

const newsMode =
  sessionStorage.getItem("newsMode") || "quick";

const response = await fetch(
  "/api/generate-brief",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
  userId: user.id,
  categories: usePersonalisedNews
    ? undefined
    : selectedCategories,
  personalised: usePersonalisedNews,
  mode: newsMode,
}),
  }
);

      const data = await response.json();

      console.log("NEWS RESPONSE:", data);

      if (!response.ok) {
        alert(data.error);
        return;
      }

      setArticles(data.articles || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const today = new Date();
  const dateline = today
    .toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    .toUpperCase();

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f2e7] px-6">
        <div className="flex flex-col items-center gap-5 text-[#1e1b16]">
          <div className="seal-spin flex h-14 w-14 items-center justify-center rounded-full border-2 border-dashed border-[#b8860b] sm:h-16 sm:w-16">
            <span className={`${playfair.className} text-2xl font-black`}>
              S
            </span>
          </div>
          <p
            className={`${lato.className} text-xs uppercase tracking-[0.3em] sm:tracking-[0.35em]`}
          >
            Setting the type&hellip;
          </p>
        </div>
        <style jsx>{`
          .seal-spin {
            animation: spin 2.4s linear infinite;
          }
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
          @media (prefers-reduced-motion: reduce) {
            .seal-spin {
              animation: none;
            }
          }
        `}</style>
      </main>
    );
  }

  const leadArticle = articles[0];
  const remainingArticles = articles.slice(1);

  function QuickEdition({
    username,
    articles,
  }: {
    username: string;
    articles: Article[];
  }) {
    const today = new Date();

    return (
      <main className="min-h-screen bg-[#f7f2e7] flex justify-center px-3 sm:px-4 py-4 sm:py-8">
        <div className="w-full max-w-4xl bg-[#fffdf8] border border-[#1e1b16] px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8 my-3 sm:my-5 shadow-sm">
          <div className="text-center border-b border-dashed border-[#1e1b16] pb-5">
            <h1
              className={`${playfair.className} text-3xl sm:text-4xl md:text-5xl tracking-tight`}
            >
              SANDESA
            </h1>

            <p
              className={`${lato.className} mt-1 text-[10px] sm:text-[11px] uppercase tracking-[0.25em] sm:tracking-[0.4em]`}
            >
              Quicky
            </p>

            <p
              className={`${lato.className} mt-3 sm:mt-4 text-xs sm:text-sm text-[#6b6457]`}
            >
              {today.toLocaleDateString()}
            </p>
          </div>

          <div
            className={`${lato.className} mt-5 space-y-2 text-xs sm:text-sm uppercase tracking-wider`}
          >
            <div className="flex items-center justify-between gap-4">
              <span>Reader</span>
              <span className="font-medium text-right break-all">
                {username}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span>Stories</span>
              <span className="font-medium">{articles.length}</span>
            </div>
          </div>

          <div className="border-t border-dashed border-black my-6"></div>

          <div className="space-y-6">
            {articles.map((article, index) => (
              <div key={index}>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-5">
                  <h3
                    className={`${playfair.className} flex-1 text-xl sm:text-2xl font-bold leading-snug`}
                  >
                    <span className="pr-2">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {article.title}
                  </h3>

                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${lato.className} shrink-0 text-[10px] sm:text-xs uppercase tracking-widest text-[#8b0000] hover:underline`}
                  >
                    Source →
                  </a>
                </div>

                <p
                  className={`${lato.className} mt-3 text-sm sm:text-base leading-7 sm:leading-8 text-[#4b463f]`}
                >
                  {article.summary}
                </p>

                <div className="mt-5 border-b border-dashed border-[#bfb6a6]" />
              </div>
            ))}
          </div>

          <div className="mt-8 border-t border-dashed border-[#1e1b16] pt-5 text-center">
            <p className={`${playfair.className} text-sm sm:text-base italic`}>
              End of Brief
            </p>

            <p
              className={`${lato.className} mt-2 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.35em] text-[#6b6457]`}
            >
              Read • Learn • Reflect
            </p>
          </div>

          <div className="mt-8 border-t border-dashed border-[#1e1b16] pt-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/category"
                className={`${lato.className} inline-flex items-center justify-center border border-[#1e1b16] px-5 py-3 text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] transition-colors hover:bg-[#1e1b16] hover:text-[#fffdf8]`}
              >
                Select Other Category
              </Link>

              <Link
                href="/feedback"
                className={`${lato.className} inline-flex items-center justify-center border border-[#d90429] bg-[#d90429] px-5 py-3 text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white transition-opacity hover:opacity-90`}
              >
                Give Feedback
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (mode === "quick") {
    return <QuickEdition username={username} articles={articles} />;
  }

  return (
    <main className="min-h-screen bg-[#f7f2e7] text-[#1e1b16]">
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:pt-10 lg:px-12">
        <div
          className={`${lato.className} flex flex-col items-center gap-1 border-b border-[#d8cfbe] pb-3 text-center text-[10px] uppercase tracking-[0.2em] text-[#6b6457] sm:flex-row sm:flex-wrap sm:justify-between sm:gap-2 sm:text-[11px] sm:tracking-[0.25em]`}
        >
          <span>Personal Edition</span>
          <span>{dateline}</span>
          <span>No. 001</span>
        </div>

        <header className="relative border-b-4 border-[#1e1b16] py-8 sm:py-10">
          <div className="flex flex-col items-center px-0 text-center sm:px-20">
            <p
              className={`${lato.className} text-[10px] uppercase tracking-[0.35em] text-[#d90429] sm:text-xs sm:tracking-[0.6em]`}
            >
              A Dispatch Curated For
            </p>

            <h1
              className={`${playfair.className} mt-3 text-5xl  tracking-tight sm:text-6xl md:text-8xl`}
            >
              SANDESA
            </h1>

            <div
              className={`${lato.className} mt-4 flex flex-col items-center justify-center gap-y-2 text-base italic text-[#6b6457] sm:flex-row sm:gap-x-6 sm:text-lg`}
            >
              <span>{username}'s Morning Brief</span>
              <span
                aria-hidden="true"
                className="hidden text-[#d8cfbe] sm:inline"
              >
                &bull;
              </span>
              <span>Read. Learn. Reflect.</span>
            </div>
          </div>
        </header>

        {leadArticle && (
          <section className="border-b border-[#d8cfbe] py-8 sm:py-10">
            <p
              className={`${lato.className} inline-block border-b-2 border-[#d90429] pb-1 text-[10px] uppercase tracking-[0.3em] text-[#d90429] sm:text-xs sm:tracking-[0.35em]`}
            >
              Today&rsquo;s Lead
            </p>

            <h2
              className={`${playfair.className} mt-5 text-3xl font-bold leading-[1.15] sm:text-4xl md:text-6xl`}
            >
              {leadArticle.title}
            </h2>

            <p
              className={`${lato.className} mt-6 max-w-full text-base leading-8 text-[#3a352e] sm:mt-8 sm:text-lg sm:leading-9 first-letter:mr-3 first-letter:float-left first-letter:font-black first-letter:leading-none first-letter:text-[#d90429] ${playfair.className} first-letter:text-6xl sm:first-letter:text-8xl`}
            >
              {leadArticle.summary}
            </p>

            <div className="mt-8">
              <a
                href={leadArticle.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`${lato.className} group inline-flex w-full items-center justify-center gap-2 border border-[#1e1b16] px-5 py-3 text-xs uppercase tracking-[0.2em] transition-colors hover:bg-[#1e1b16] hover:text-[#f7f2e7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d90429] sm:w-auto sm:py-2.5 sm:tracking-[0.25em]`}
              >
                Read Full Story
                <span
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1"
                >
                  &rarr;
                </span>
              </a>
            </div>
          </section>
        )}

        <section className="grid gap-10 py-8 sm:gap-12 sm:py-10 lg:grid-cols-[2fr_1fr]">
          <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {remainingArticles.map((article, index) => (
              <article
                key={index}
                className="group border-b border-[#d8cfbe] pb-8 transition-opacity"
              >
                <p
                  className={`${lato.className} text-[10px] uppercase tracking-[0.25em] text-[#d90429] sm:text-[11px] sm:tracking-[0.3em]`}
                >
                  {article.source}
                </p>

                <h3
                  className={`${playfair.className} mt-3 text-xl font-bold leading-tight transition-colors group-hover:text-[#d90429] sm:text-2xl`}
                >
                  {article.title}
                </h3>

                <p
                  className={`${lato.className} mt-4 text-sm leading-7 text-[#3a352e] sm:text-[15px]`}
                >
                  {article.summary}
                </p>

                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${lato.className} mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] underline decoration-[#d8cfbe] underline-offset-4 transition-colors hover:decoration-[#d90429] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d90429] sm:tracking-[0.25em]`}
                >
                  Continue Reading
                  <span
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-1"
                  >
                    &rarr;
                  </span>
                </a>
              </article>
            ))}

            {remainingArticles.length === 0 && (
              <p className={`${lato.className} text-[#6b6457] italic`}>
                No further dispatches today &mdash; check back tomorrow for
                more.
              </p>
            )}
          </div>

          <aside className="border-t border-[#1e1b16] pt-8 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <h3
              className={`${playfair.className} text-2xl font-bold sm:text-3xl`}
            >
              The Almanac
            </h3>
            <p
              className={`${lato.className} mt-1 text-[10px] uppercase tracking-[0.25em] text-[#6b6457] sm:text-[11px] sm:tracking-[0.3em]`}
            >
              Ten things worth knowing
            </p>

            <ol className="mt-8 space-y-6">
              {[...FUN_FACTS]
                .sort(() => Math.random() - 0.5)
                .slice(0, 5)
                .map((fact, index) => (
                  <li
                    key={index}
                    className="flex gap-4 border-b border-[#d8cfbe] pb-5"
                  >
                    <span
                      className={`${lato.className} flex-none text-sm font-bold text-red-600`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p
                      className={`${lato.className} text-sm leading-7 sm:text-[15px]`}
                    >
                      {fact}
                    </p>
                  </li>
                ))}
            </ol>

            <div className="mt-12 border-t border-[#1e1b16] pt-8">
              <h4
                className={`${playfair.className} text-xl font-bold sm:text-2xl`}
              >
                Quote of the Day
              </h4>

              <blockquote className="mt-4">
                <span
                  aria-hidden="true"
                  className={`${playfair.className} block text-5xl leading-none text-red-600`}
                >
                  &ldquo;
                </span>
                <p
                  className={`${playfair.className} -mt-3 text-base italic leading-8 sm:text-lg`}
                >
                  {randomQuote.quote}
                </p>
              </blockquote>

              <p
                className={`${lato.className} mt-4 text-xs uppercase tracking-[0.25em] text-[#6b6457] sm:tracking-[0.3em]`}
              >
                &mdash; {randomQuote.author}
              </p>
            </div>
          </aside>
        </section>

        <footer className="border-t border-[#1e1b16] pt-6 text-center">
          <p
            className={`${lato.className} text-[10px] uppercase tracking-[0.25em] text-[#6b6457] sm:text-[11px] sm:tracking-[0.35em]`}
          >
            &mdash; End of Today&rsquo;s Edition &mdash;
          </p>
        </footer>

        <div className="pb-10 pt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/category"
              className={`${lato.className} inline-flex items-center justify-center border border-[#1e1b16] px-6 py-3 text-xs uppercase tracking-[0.25em] transition-colors hover:bg-[#1e1b16] hover:text-[#f7f2e7]`}
            >
              Select Other Category
            </Link>

            <Link
              href="/feedback"
              className={`${lato.className} inline-flex items-center justify-center border border-[#d90429] bg-[#d90429] px-6 py-3 text-xs uppercase tracking-[0.25em] text-white transition-opacity hover:opacity-90`}
            >
              Give Feedback
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
