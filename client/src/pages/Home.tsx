import { useEffect } from "react";
import { Helmet } from "react-helmet";
import Navbar from "../components/Navbar";
import Hero from "../sections/Hero";
import LevellingField from "../sections/LevellingField";
import BeyondGame from "../sections/BeyondGame";
import ChampionsChange from "../sections/ChampionsChange";
import Impact from "../sections/Impact";
import Sponsors from "../sections/Sponsors";
import Footer from "../sections/Footer";

const Home = () => {
  // Set page title and meta description
  return (
    <>
      <Helmet>
        <title>Game On - Sports Community Impact</title>
        <meta name="description" content="Inspiring communities through the transformative power of sports. Building connections, fostering development and creating positive change." />
        <meta property="og:title" content="Game On - Sports Community Impact" />
        <meta property="og:description" content="Discover how our sports programs are changing lives and communities. Join our mission for positive impact through the power of sports." />
        <meta property="og:type" content="website" />
      </Helmet>

      <Navbar />
      <main>
        <Hero />
        <LevellingField />
        <BeyondGame />
        <ChampionsChange />
        <Impact />
        <Sponsors />
      </main>
      <Footer />
    </>
  );
};

export default Home;
