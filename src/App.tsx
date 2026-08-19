import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import { BackgroundGrid } from './components/BackgroundGrid';
import { Footer } from './components/Footer';
import { Nav } from './components/Nav';
import { About } from './pages/about/About';
import { Contact } from './pages/contact/Contact';
import { Home } from './pages/home/Home';
import { Work } from './pages/work/Work';
import styles from './App.module.css';

/** Every route change starts at the top, matching the prototype's page switch. */
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return; // the target page handles its own anchor scroll
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <div className={styles.shell}>
      {/* Four nav links, a theme toggle and a CTA repeat ahead of the content
          on every route. Keyboard and screen-reader users get one stop to
          skip the lot. */}
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <BackgroundGrid />
      <ScrollToTop />
      <Nav />
      <div className={styles.navSpacer} />

      <main id="main" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/work" element={<Work />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
