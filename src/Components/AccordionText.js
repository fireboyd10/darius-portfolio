import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Accordion from "react-bootstrap/Accordion";
import mySong from "./audio/my-song.m4a";
import { useLanguage } from "../LanguageContext";
import translations from "../translations";

export default function AccordionText() {
  const [activeKey, setActiveKey] = useState(null);
  const audioRef = useRef(null);
  const { language } = useLanguage();
  const copy = translations[language].accordion;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (activeKey === "0") {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [activeKey]);

  useEffect(() => {
    const audio = audioRef.current;
    return () => audio?.pause();
  }, []);

  return (
    <>
      <Accordion activeKey={activeKey} onSelect={setActiveKey} className="accordion-custom">
        <Accordion.Item eventKey="0">
          <Accordion.Header>{copy.title}</Accordion.Header>
          <Accordion.Body className="text-center text-muted" style={{ fontStyle: "italic" }}>
            {copy.detail}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <audio ref={audioRef} src={mySong} preload="auto" aria-label={copy.audio} />
    </>
  );
}
