import type { Metadata } from "next";
import DemoHub from "@/components/dashboard/DemoHub";

export const metadata: Metadata = {
  title: "Demo Interativo — Leialt.IA",
  description: "Explore soluções de IA para CRM, e-commerce, TikTok Shop, Instagram e Google.",
};

export default function DashboardPage() {
  return <DemoHub />;
}
