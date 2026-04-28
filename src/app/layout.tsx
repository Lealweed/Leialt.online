import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["700", "800"],
});

export const metadata: Metadata = {
  title: "LeIALT | Inteligência Artificial Estratégica",
  description: "A IA não substitui pessoas. Ela potencializa operações. Site institucional da LeIALT.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark scroll-smooth">
      <body className={`${inter.variable} ${sora.variable} font-sans antialiased text-foreground bg-background selection:bg-primary/30 min-h-screen flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
