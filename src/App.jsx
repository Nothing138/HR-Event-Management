import { useState } from "react";
import "./index.css";

import Navbar      from "./components/Navbar";
import Home        from "./components/Home";
import About       from "./components/About";
import Services    from "./components/Services";
import Gallery     from "./components/Gallery";
import Contact     from "./components/Contact";
import GetStarted  from "./components/GetStarted";
import Footer      from "./components/Footer";

export default function App() {
  const [getStartedOpen, setGetStartedOpen] = useState(false);

  const openGetStarted  = () => setGetStartedOpen(true);
  const closeGetStarted = () => setGetStartedOpen(false);

  return (
    <>
      {/* ── Fixed Navigation ── */}
      <Navbar onGetStarted={openGetStarted} />

      {/* ── Main Sections ── */}
      <main>
        <Home       onGetStarted={openGetStarted} />
        <About />
        <Services />
        <Gallery />
        <Contact />
      </main>

      {/* ── Footer ── */}
      <Footer onGetStarted={openGetStarted} />

      {/* ── Get Started Modal (portal-like overlay) ── */}
      <GetStarted isOpen={getStartedOpen} onClose={closeGetStarted} />
    </>
  );
}