import { Metadata } from "next";
import Navbar from "../../components/Navbar";
import DocsSection from "../../components/DocsSection";
import Footer from "../../components/Footer";

export const metadata: Metadata = {
  title: "API Documentation — Rota",
  description:
    "Explore Rota's complete API reference for provisioning rotational savings cycles, managing participants, reconciliation, settlements, and webhooks.",
};

export default function DocsPage() {
  return (
    <>
      <Navbar activeRoute="docs" />
      <main>
        <DocsSection />
      </main>
      <Footer />
    </>
  );
}
