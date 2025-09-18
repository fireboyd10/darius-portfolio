import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Accordion from "react-bootstrap/Accordion";
import mySong from "./audio/my-song.m4a";

export default function AccordionText() {
  const [activeKey, setActiveKey] = useState(null);
  const audioRef = useRef(null);

  const handleSelect = (k) => setActiveKey(k);

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
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  return (
    <>
      <Accordion activeKey={activeKey} onSelect={handleSelect} className="accordion-custom">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Click me to drop the beat ♫</Accordion.Header>
          <Accordion.Body className="text-center text-muted" style={{ fontStyle: "italic" }}>
            VOLUME UP!!! One of my tracks is playing — close to pause, open again to replay.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <audio ref={audioRef} src={mySong} preload="auto" />
    </>
  );
}
