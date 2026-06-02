export default function FeedbackPage() {
  return (
    <section className="w-full bg-[#f4f3f1] py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid border border-neutral-400 md:grid-cols-2">
          {/* Left Side */}
          <div
            className="flex flex-col justify-center border-b border-neutral-400 p-10 md:border-b-0 md:border-r"
            style={{
              backgroundImage:
                "radial-gradient(#d8d8d8 0.8px, transparent 0.8px)",
              backgroundSize: "10px 10px",
            }}
          >
            <h2
              className="mb-6 text-5xl font-semibold tracking-tight"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Share your feedback
            </h2>

            <p className="max-w-md text-lg leading-8 text-neutral-700">
              Tell us what you like, what feels missing, or what we should
              improve.
            </p>

            <p
              className="mt-10 text-sm italic text-neutral-500"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Help us improve AI Journalist.
            </p>
          </div>

          {/* Right Side */}
          <div className="p-10">
            <div className="mb-8">
              <p className="mb-4 text-xs uppercase tracking-[0.3em] text-neutral-600">
                Rating
              </p>

              <div className="flex gap-3 text-2xl">
                <button>☆</button>
                <button>☆</button>
                <button>☆</button>
                <button>☆</button>
                <button>☆</button>
              </div>
            </div>

            <div>
              <label className="mb-3 block text-xs uppercase tracking-[0.3em] text-neutral-600">
                Your Message
              </label>

              <textarea
                placeholder="How can we make Chronicle AI better for you?"
                className="h-32 w-full resize-none border border-neutral-400 bg-transparent p-4 outline-none transition focus:border-black"
              />
            </div>

            <button className="mt-6 w-full bg-black py-4 text-sm uppercase tracking-[0.2em] text-white transition hover:opacity-90">
              Send Feedback
            </button>

            <div className="mt-6 flex gap-6 text-xs text-neutral-500">
              <button className="hover:text-black">Report an issue</button>
              <button className="hover:text-black">Suggest a feature</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}