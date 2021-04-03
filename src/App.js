import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Figure from "./components/Figure";
import WrongLetter from "./components/WrongLetter";
import Word from "./components/Word";
import Notification from "./components/Notification";
import PopUp from "./components/PopUp";
import { showNotification as show } from "./helpers/helpers";

import "./App.css";

const word = ["brasil", "carnaval", "futebol", "samba"];
let selectedWord = word[Math.floor(Math.random() * word.length)];

const App = () => {
  const [playable, setPlayable] = useState(true);
  const [correctLetter, setCorrectLetter] = useState([]);
  const [wrongLetter, setWrongLetter] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const handleKeydown = (event) => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();

        if (selectedWord.includes(letter)) {
          if (!correctLetter.includes(letter)) {
            setCorrectLetter((currentLetter) => [...currentLetter, letter]);
          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongLetter.includes(letter)) {
            setWrongLetter((wrongLetter) => [...wrongLetter, letter]);
          } else {
            show(setShowNotification);
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  }, [correctLetter, wrongLetter, playable]);

  function playAgain() {
      setPlayable(true);

      setCorrectLetter([]);
      setWrongLetter([]);

      const random = Math.floor(Math.random() * word.length)
      selectedWord = word[random];
  }

  return (
    <>
      <Header />
      <div className="game-container">
        <Figure wrongLetter={wrongLetter} />
        <WrongLetter wrongLetter={wrongLetter} />
        <Word selectedWord={selectedWord} correctLetter={correctLetter} />
      </div>
        <PopUp 
            correctLetter={correctLetter} 
            wrongLetter={wrongLetter} 
            selectedWord={selectedWord} 
            setPlayable={setPlayable} 
            playAgain={playAgain}
        />
        <Notification showNotification={showNotification} />
    </>
  );
};

export default App;
