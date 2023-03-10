import { useEffect, useState } from "react";
import { Button } from "./components/button/Button";
import { Draw } from "./components/draw/Draw";

function App() {
  const [word, setWord] = useState(null);
  const [hideWord, setHideWord] = useState(null);
  const [errorCount, setErrorCount] = useState(0);
  const [gameStatus, setGameStatus] = useState("ongoing");
  const [errorMessage, setErrorMessage] = useState(null);
  const maxError = 10;

  const fetchWord = async () => {
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
      .then((word) => setWord(word.word))
      .catch((err) => {
        console.log(err.message);
        setErrorMessage("Impossible de récupérer les données");
      });
  };

  useEffect(() => {
    fetchWord();
  }, []);

  useEffect(() => {
    if (word) {
      setHideWord("_".repeat(word.length));
    }
  }, [word]);

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

  const checkWord = (letter) => {
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
  };

  return (
    <div className="App">
      <p>Vous avez fait {errorCount} erreur(s)</p>
      <div className="word">{hideWord}</div>
      {errorMessage ? <p className="error">{errorMessage}</p> : ""}
      <div className="keyboard">
        {alphabet.map((letter) => {
          return (
            <Button key={letter} onClick={() => checkWord(letter)}>
              {letter}
            </Button>
          );
        })}
      </div>
      <Draw errorCount={errorCount} />
      {gameStatus == "failed" && (
        <div className="game-over">
          <h1>Dommage ! Vous avez perdu</h1>
          <Button onClick={restart}>Retenter ma chance</Button>
        </div>
      )}
    </div>
  );
}

export default App;
