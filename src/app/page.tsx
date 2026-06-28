import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar activeRoute="home" />
      <main>
        <Hero />
      </main>
      <Footer />
    </>
  );
}
