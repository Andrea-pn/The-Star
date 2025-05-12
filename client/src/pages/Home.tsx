import { useEffect } from "react";
import { Helmet } from "react-helmet";
import Navbar from "../components/Navbar";
import SectionSeparator from "../components/SectionSeparator";
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
        <title>The Star Kenya - 18 Years of Journalism Excellence</title>
        <meta name="description" content="Celebrating 18 years of trusted journalism, community impact, and giving voice to Kenyans. Join us in marking this special milestone." />
        <meta property="og:title" content="The Star Kenya - 18th Anniversary Celebration" />
        <meta property="og:description" content="For 18 years, The Star has been Kenya's trusted source of news and information. Join our anniversary celebration as we reflect on our journey and look ahead to the future." />
        <meta property="og:type" content="website" />
      </Helmet>

      <Navbar />
      <main>
        <Hero />
        <SectionSeparator color="#f8fafc" />
        <LevellingField />
        <SectionSeparator color="#fff" />
        <BeyondGame />
        <SectionSeparator color="#f8fafc" />
        <ChampionsChange />
        <SectionSeparator color="#111111" />
        <Impact />
        <SectionSeparator color="#f8fafc" />
        <Sponsors />
      </main>
      <Footer />
    </>
  );
};

export default Home;
