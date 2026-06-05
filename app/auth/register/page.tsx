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

export default function RegisterPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
  try {
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
        emailRedirectTo:
          "http://localhost:3000/auth/login",
      },
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert(
      "Account created.Please log in to continue."
    );

    router.push("/auth/login");
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
      <div className="text-center mb-8">
        <h1
          className={`${playfair.className} text-3xl md:text-4xl font-semibold text-black mb-3`}
        >
          Join The Future Of News
        </h1>

        <p className="text-gray-600 text-base md:text-lg">
          Create your account and receive personalized
          AI-powered news briefings.
        </p>
      </div>

      <div className="relative overflow-hidden w-full max-w-md rounded-xl border border-gray-200 bg-white p-8 shadow-md">
        <h2
          className={`${playfair.className} mb-6 text-center text-2xl font-semibold`}
        >
          Sign Up
        </h2>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">
            Username
          </label>

          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

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

        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full rounded-md bg-black py-2 text-white transition hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-black hover:underline"
          >
            Login
          </Link>
        </p>

        <BorderBeam duration={4} size={200} />
      </div>
    </div>
  );
}