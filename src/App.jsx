import { useEffect, useState } from "react";
import { Button } from "./components/button/Button";
import { Draw } from "./components/draw/Draw";

import refresh from "./img/refresh.svg";

function App() {
  const [word, setWord] = useState("");
  const [hideWord, setHideWord] = useState("");
  const [errorCount, setErrorCount] = useState(0);
  const [gameStatus, setGameStatus] = useState("ongoing");
  const [errorMessage, setErrorMessage] = useState("");
  const maxError = 10;

  const fetchWord = () => {
    fetch("http://localhost:3001/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        locale: "fr-FR",
      }),
    })
      .then((res) => res.json())
      .then((word) => {
        setWord(word.word);
        setHideWord("_".repeat(word.word.length));
      })
      .catch((err) => {
        console.log(err.message);
        setErrorMessage("Impossible de récupérer les données");
      });
  };

  useEffect(() => {
    fetchWord();
  }, []);

  const alphabet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

  const checkWord = (letter, e) => {
    e.target.disabled = true;

    if (errorCount >= maxError) {
      setGameStatus("failed");
      setErrorCount(maxError + 1);
      return;
    }

    if (word.includes(letter)) {
      const splitWord = word.split("");
      const splitHideWord = hideWord.split("");
      splitWord.map((l, index) => {
        if (letter === l) {
          splitHideWord[index] = letter;
        }
      });
      setHideWord(splitHideWord.join(""));
    } else {
      setErrorCount(errorCount + 1);
    }
  };

  const restart = () => {
    setErrorCount(0);
    setGameStatus("ongoing");
    fetchWord();
    const buttons = document.querySelectorAll("button");
    buttons.forEach((button) => {
      button.disabled = false;
    });
  };

  const handleKeyDown = (e) => {
    if (alphabet.includes(e.key)) {
      const buttons = document.querySelectorAll(".keyboard button");
      buttons.forEach((button) => {
        if (button.innerText.toLowerCase() === e.key) {
          console.log("click");
          button.click();
        }
      });
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="App">
      <h1>Jeu du pendu !</h1>
      <div className="mid">
        <div className="mid-left">
          <div className="word">{hideWord}</div>
          {errorCount > 0 && (
            <p>
              Vous avez fait {errorCount} erreur{errorCount > 1 && "s"}
            </p>
          )}
          <Button onClick={restart}>
            <img src={refresh} alt="" /> Changer de mot
          </Button>
        </div>
        <Draw errorCount={errorCount} />
        {errorMessage ? <p className="error">{errorMessage}</p> : ""}
      </div>
      <div className="keyboard">
        {alphabet.map((letter) => {
          return (
            <Button key={letter} onClick={(e) => checkWord(letter, e)}>
              {letter}
            </Button>
          );
        })}
      </div>

      {gameStatus == "failed" && (
        <>
          <div className="game-over">
            <h2>Dommage ! Vous avez perdu.</h2>
            <Button onClick={restart}>Retenter ma chance</Button>
          </div>
          <div className="game-over-overlay"></div>
        </>
      )}
    </div>
  );
}

export default App;
