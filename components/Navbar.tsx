"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Playfair_Display, Lato } from "next/font/google";

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

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [username, setUsername] = useState("");

  const router = useRouter();

  useEffect(() => {
    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);

      if (session?.user) {
        loadUser();
      } else {
        setUsername("");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function loadUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setUser(null);
      setUsername("");
      return;
    }

    setUser(user);

    const { data } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", user.id)
      .single();

    setUsername(data?.username || user.email || "User");
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setUser(null);
    setUsername("");
    setProfileOpen(false);
    router.push("/");
  }

  return (
    <nav className={`w-full bg-black ${lato.className}`}>
      <div className="mx-auto max-w-7xl px-6">
        {/* Desktop Navbar */}
        <div className="relative flex h-20 items-center">
          {/* Left Links */}
          <div className="flex items-center space-x-10">
            <div className="hidden md:flex space-x-10 text-md font-medium tracking-[0.2px]">
              <Link
                href="/"
                className="text-white border-b-2 border-transparent hover:border-white transition-all duration-200"
              >
                Home
              </Link>

              <Link
                href="/about"
                className="text-white border-b-2 border-transparent hover:border-white transition-all duration-200"
              >
                About
              </Link>

              <Link
                href="/feedback"
                className="text-white border-b-2 border-transparent hover:border-white transition-all duration-200"
              >
                Feedback
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden inline-flex items-center rounded-full p-2 text-white hover:bg-gray-200 hover:text-black transition"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Logo */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <Link
              href="/"
              className={`${playfair.className} text-2xl md:text-3xl font-semibold tracking-wide text-white hover:opacity-80 transition`}
            >
              SANDESA
            </Link>
          </div>

          {/* Right Side */}
          <div className="ml-auto hidden md:flex items-center">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-3 rounded-full border border-neutral-300 bg-white px-4 py-2 shadow-sm"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white">
                    {(username || "U").charAt(0).toUpperCase()}
                  </div>

                  <span className="text-sm font-medium">
                    {username}
                  </span>

                  <span
                    className={`text-xs transition-transform ${
                      profileOpen ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-xl z-50">
                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        router.push("/dashboard");
                      }}
                      className="block w-full px-4 py-3 text-left hover:bg-neutral-100"
                    >
                      Dashboard
                    </button>

                    <hr />

                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-3 text-left text-red-600 hover:bg-neutral-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/auth/login">
                <button className="px-5 py-2 text-[15px] tracking-[0.2px] text-white border border-white rounded-md hover:bg-white hover:text-black transition-all duration-200">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-800 bg-black">
            <div className="space-y-4 px-6 py-5 text-base font-medium">
              <Link
                href="/"
                className="block text-white hover:text-gray-400"
              >
                Home
              </Link>

              <Link
                href="/about"
                className="block text-white hover:text-gray-400"
              >
                About
              </Link>

              <Link
                href="/feedback"
                className="block text-white hover:text-gray-400"
              >
                Feedback
              </Link>

              <div className="pt-3">
                {user ? (
                  <>
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        router.push("/dashboard");
                      }}
                      className="w-full px-4 py-2 text-md font-medium text-white border border-white rounded-md hover:bg-white hover:text-black transition"
                    >
                      Dashboard
                    </button>

                    <button
                      onClick={handleLogout}
                      className="mt-2 w-full px-4 py-2 text-md font-medium text-red-500 border border-red-500 rounded-md hover:bg-red-500 hover:text-white transition"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link href="/auth/login">
                    <button className="w-full px-4 py-2 text-md font-medium text-white border border-white rounded-md hover:bg-white hover:text-black transition">
                      Login
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;