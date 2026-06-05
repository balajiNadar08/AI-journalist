"use client";

import { useState } from "react";
import { Playfair_Display, Lato } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const categories = [
  "Bug Report",
  "Feature Request",
  "Content Feedback",
  "Business Inquiry",
  "Partnership",
  "General Feedback",
];

export default function FeedbackPage() {
  const [rating, setRating] = useState(0);

  return (
    <section className={`w-full bg-[#f4f3f1] py-20 ${lato.className}`}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="overflow-hidden border border-neutral-400 bg-white">
          <div className="grid md:grid-cols-2">
            <div
              className="flex flex-col justify-center border-b border-neutral-400 p-10 md:border-b-0 md:border-r lg:p-16"
              style={{
                backgroundImage:
                  "radial-gradient(#d8d8d8 0.8px, transparent 0.8px)",
                backgroundSize: "10px 10px",
              }}
            >
              <p className="mb-4 text-xs uppercase tracking-[0.3em] text-neutral-500">
                We Value Your Input
              </p>

              <h1
                className={`${playfair.className} mb-6 text-5xl font-semibold leading-tight lg:text-6xl`}
              >
                Help Shape the Future of AI Journalist
              </h1>

              <p className="max-w-lg text-lg leading-8 text-neutral-700">
                Whether you've found a bug, have an idea for a feature, want to
                discuss a partnership or simply want to share your
                thoughts, we'd love to hear from you.
              </p>

              <div className="mt-12 space-y-6">
                <div>
                  <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.2em]">
                    What happens next?
                  </h3>
                  <p className="text-neutral-600">
                    Every submission is reviewed by our team and helps us
                    improve the experience for all users.
                  </p>
                </div>

                <div className="border-t border-neutral-300 pt-6">
                  <p
                    className={`${playfair.className} italic text-neutral-500`}
                  >
                    "The best products are built together in collaboration with users."
                  </p>
                </div>
              </div>
            </div>

            <div className="p-10 lg:p-16">
              <form
                action="https://formspree.io/f/mdavkjad"
                method="POST"
                className="space-y-7"
              >
                <div>
                  <label className="mb-2 block text-xs uppercase tracking-[0.3em] text-neutral-600">
                    Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    className="w-full border border-neutral-400 bg-transparent p-4 outline-none transition focus:border-black"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs uppercase tracking-[0.3em] text-neutral-600">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    className="w-full border border-neutral-400 bg-transparent p-4 outline-none transition focus:border-black"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs uppercase tracking-[0.3em] text-neutral-600">
                    Feedback Category
                  </label>

                  <select
                    name="category"
                    required
                    className="w-full border border-neutral-400 bg-transparent p-4 outline-none transition focus:border-black"
                  >
                    <option value="">Select a category</option>

                    {categories.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-3 block text-xs uppercase tracking-[0.3em] text-neutral-600">
                    Experience Rating
                  </label>

                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className="text-3xl cursor-pointer transition hover:scale-110"
                      >
                        {star <= rating ? "★" : "☆"}
                      </button>
                    ))}
                  </div>

                  <input type="hidden" name="rating" value={rating} />
                </div>

                <div>
                  <label className="mb-2 block text-xs uppercase tracking-[0.3em] text-neutral-600">
                    Subject
                  </label>

                  <input
                    type="text"
                    name="subject"
                    placeholder="Brief summary"
                    className="w-full border border-neutral-400 bg-transparent p-4 outline-none transition focus:border-black"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs uppercase tracking-[0.3em] text-neutral-600">
                    Message
                  </label>

                  <textarea
                    name="message"
                    required
                    placeholder="Tell us what's on your mind..."
                    className="h-40 w-full resize-none border border-neutral-400 bg-transparent p-4 outline-none transition focus:border-black"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-black py-4 text-sm uppercase tracking-[0.25em] text-white cursor-pointer transition hover:opacity-90"
                >
                  Send Feedback
                </button>

                <p className="text-center text-sm text-neutral-500">
                  We typically review feedback within a few business days.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
