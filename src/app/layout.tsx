import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
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
      <body className={`${montserrat.variable} font-sans antialiased text-foreground bg-background selection:bg-primary/30 min-h-screen flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
