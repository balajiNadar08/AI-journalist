import type { Metadata } from "next";
import "./globals.css";

import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import LayoutContent from "@/components/LayoutContent";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "AI Journalist",
  description: "Newspaper in a click",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="min-h-screen flex flex-col">
        <LayoutContent>
          {children}
        </LayoutContent>
      </body>
    </html>
  );
}
