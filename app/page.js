import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Footer from "./components/Footer";
import HowItWorks from "./components/HowItWorks";
import Services from "./components/Services";
import Showcase from "./components/Showcase";
import Ticker from "./components/Ticker";
export default function Home() {
  return (
    <>
      <Header />
      <Hero id="hero" />
      <Ticker id="ticker" />
      <Showcase id="showcase" />
      <About id="about" />
      <Services id="services" />
      <HowItWorks id="how-it-works" />
      <Footer />
    </>
  );
}
