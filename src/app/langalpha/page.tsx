import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { LangAlphaSection } from "@/components/LangAlphaSection";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "LangAlpha — Michael Yao",
  description:
    "An open-source agentic investing platform with sandboxed, cited research memory. Live market data over SSE and WebSocket.",
};

export default function LangAlphaPage() {
  return (
    <>
      <Nav />
      <main className="page-with-nav">
        <LangAlphaSection />
      </main>
      <Footer />
    </>
  );
}
