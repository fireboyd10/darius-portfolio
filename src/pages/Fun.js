import React, { useState } from 'react';
import AccordionText from '../Components/AccordionText';

const URL = "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&format=txt&idRange=28-37"

export const Fun = () => {
  const [joke, setJoke] = useState("");
  const [loading, setLoading] = useState(false);

  const getJoke = () => {
    setLoading(true);
    setJoke(""); 

    fetch(URL)
      .then(response => response.text())
      .then(data => {
        setTimeout(() => {
          setJoke(data);
          setLoading(false);
        }, 1000);
      })
      .catch(error => {
        console.error("Error fetching joke:", error);
        setLoading(false);
      });
  };

  let jokeElement;
  if (loading) {
    jokeElement = <p className="joke-text">Fetching joke... </p>;
  } else if (joke) {
    jokeElement = <p className="joke-text">{joke}</p>;
  } else {
    jokeElement = null;
  }

  return (
    <div className="fun-page">
      <AccordionText />
      <div className="joke-section">
        <h2>a random programming joke...</h2>
        <button onClick={getJoke} disabled={loading}>
          {loading ? "Loading..." : "Get Joke"}
        </button>
        {jokeElement}
      </div>
    </div>
  );
}
