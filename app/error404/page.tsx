export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f4f2] px-6">
      <div className="text-center">
        <h1
          className="text-[180px] leading-none text-black"
          style={{ fontFamily: "Georgia, serif" }}
        >
          404
        </h1>

        <h2
          className="mb-8 text-6xl text-black"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Page Not Found
        </h2>

        <div className="space-y-4 text-lg text-neutral-600">
          <p>
            Oops! The page you're looking for doesn't exist
            <br />
            or has been moved.
          </p>

          <p>Let's get you back on track.</p>
        </div>

        <div className="mt-10">
          <a
            href="/"
            className="inline-block rounded-md bg-black px-16 py-4 text-xl font-medium text-white transition hover:bg-neutral-800"
          >
            Go Home
          </a>
        </div>
      </div>
    </main>
  );
}