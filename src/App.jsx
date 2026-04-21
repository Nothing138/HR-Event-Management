import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import Navbar     from "./components/Navbar";
import Footer     from "./components/Footer";
import GetStarted from "./components/GetStarted";

import HomePage    from "./pages/HomePage";
import AboutPage   from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import GalleryPage from "./pages/GalleryPage";
import ContactPage from "./pages/ContactPage";

export default function App() {
  const [getStartedOpen, setGetStartedOpen] = useState(false);

  const openGetStarted  = () => setGetStartedOpen(true);
  const closeGetStarted = () => setGetStartedOpen(false);

  return (
    <BrowserRouter>
      <Navbar onGetStarted={openGetStarted} />

      <Routes>
        <Route path="/"         element={<HomePage    onGetStarted={openGetStarted} />} />
        <Route path="/about"    element={<AboutPage   onGetStarted={openGetStarted} />} />
        <Route path="/services" element={<ServicesPage onGetStarted={openGetStarted} />} />
        <Route path="/gallery"  element={<GalleryPage  onGetStarted={openGetStarted} />} />
        <Route path="/contact"  element={<ContactPage />} />
      </Routes>

      <Footer onGetStarted={openGetStarted} />
      <GetStarted isOpen={getStartedOpen} onClose={closeGetStarted} />
    </BrowserRouter>
  );
}