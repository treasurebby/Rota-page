import { Metadata } from "next";
import Navbar from "../../components/Navbar";
import ContactForm from "../../components/ContactForm";
import Footer from "../../components/Footer";

export const metadata: Metadata = {
  title: "Contact — Rota",
  description:
    "Get in touch with the Rota team for early access, a technical walkthrough, or partnership enquiries.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar activeRoute="contact" />
      <main>
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
