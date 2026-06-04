"use client";

import Link from "next/link";
import { useState } from "react";
import { Playfair_Display, Lato } from "next/font/google";
import { BorderBeam } from "@/components/ui/border-beam";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-lato",
  display: "swap",
});

const Page = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    const res = await fetch("http://localhost:8000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        username,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Signup successful");
      window.location.href = "/product";
    } else {
      alert(data.error || "Signup failed");
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4  ${lato.className}`}
    >
      <div className="text-center mb-8">
        <h1
          className={`${playfair.className} text-3xl md:text-4xl font-semibold text-black mb-3`}
        >
          Join the Future of News
        </h1>
        <p className="text-gray-600 text-base md:text-lg">
          Register to explore AI-powered reporting tailored to what matters
          most.
        </p>
      </div>

      <div className="relative overflow-hidden w-full max-w-md bg-white p-8 rounded-xl shadow-md border border-gray-200">
        <h2
          className={`${playfair.className} text-2xl font-semibold text-center mb-6`}
        >
          Sign Up
        </h2>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Username</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <button
          onClick={handleSignup}
          className="w-full py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
        >
          Sign Up
        </button>

        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-black hover:underline">
            Login
          </Link>
        </p>
        <BorderBeam duration={4} size={200} />
      </div>
    </div>
  );
};

export default Page;
