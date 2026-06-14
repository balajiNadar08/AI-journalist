"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hideNavbarFooter =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/category") ||
    pathname.startsWith("/news") ||
    pathname.startsWith("/brief") ||
    pathname.startsWith("/settings") ||
    pathname.startsWith("/archive") ||
    pathname.startsWith("/saved");

  return (
    <>
      {!hideNavbarFooter && <Navbar />}

      <main className="flex-1">{children}</main>

      {!hideNavbarFooter && <Footer />}
    </>
  );
}