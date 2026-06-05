"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Playfair_Display, Lato } from "next/font/google";
import { BorderBeam } from "@/components/ui/border-beam";
import { supabase } from "@/lib/supabase";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const { error } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (error) {
        alert(error.message);
        return;
      }

      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center bg-[#f4f3f1] px-4 ${lato.className}`}
    >
      {/* Header */}

      <div className="mb-8 text-center">
        <h1
          className={`${playfair.className} mb-3 text-3xl font-semibold text-black md:text-4xl`}
        >
          Stay Ahead Of The Headlines
        </h1>

        <p className="text-base text-gray-600 md:text-lg">
          Continue exploring concise, intelligent
          coverage from around the world.
        </p>
      </div>

      {/* Login Card */}

      <div className="relative w-full max-w-md overflow-hidden rounded-xl border border-gray-200 bg-white p-8 shadow-md">
        <h2
          className={`${playfair.className} mb-6 text-center text-2xl font-semibold`}
        >
          Login
        </h2>

        {/* Email */}

        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Password */}

        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Login Button */}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full rounded-md bg-black py-2 text-white transition hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? "Logging In..." : "Login"}
        </button>

        {/* Register Link */}

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            href="/auth/register"
            className="text-black hover:underline"
          >
            Register
          </Link>
        </p>

        <BorderBeam duration={4} size={200} />
      </div>
    </div>
  );
}