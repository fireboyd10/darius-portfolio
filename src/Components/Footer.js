import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faGit, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useLanguage } from "../LanguageContext";
import translations from "../translations";

export default function Footer() {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const { language } = useLanguage();
  const copy = translations[language].footer;

  useEffect(() => {
    const handleScroll = () => setShowTopBtn(window.scrollY > 200);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function goTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer className="footer">
      <Container fluid className="px-4">
        <div className="copyright">{copy.copyright} &copy;2026 Darius Stefan Aniculaesei</div>
        <div className="socials">
          <ul className="social-list">
            <li><a href="https://www.instagram.com/darius_anc/" aria-label="Instagram"><FontAwesomeIcon icon={faInstagram} /></a></li>
            <li><a href="https://www.facebook.com/darius.aniculaesei" aria-label="Facebook"><FontAwesomeIcon icon={faFacebookF} /></a></li>
            <li><a href="https://www.linkedin.com/in/darius-stefan-aniculaesei-437896282/" aria-label="LinkedIn"><FontAwesomeIcon icon={faLinkedin} /></a></li>
            <li><a href="mailto:anc.darius@gmail.com" aria-label={copy.email}><FontAwesomeIcon icon={faEnvelope} /></a></li>
            <li><a href="https://github.com/fireboyd10" aria-label="GitHub"><FontAwesomeIcon icon={faGit} /></a></li>
          </ul>
        </div>
        {showTopBtn && <button className="arrow-button" onClick={goTop} aria-label={copy.top} />}
      </Container>
    </footer>
  );
}
