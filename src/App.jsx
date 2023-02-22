import { useEffect, useState } from "react";
import { Button } from "./components/button/Button";

function App() {
  const [word, setWord] = useState(null);
  const [hideWord, setHideWord] = useState(null);
  const [errorCount, setErrorCount] = useState(0);
  const [gameStatus, setGameStatus] = useState("ongoing");
  const [errorMessage, setErrorMessage] = useState(null);

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
  console.log(word);

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
    if (errorCount >= 10) {
      setGameStatus("failed");
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

  window.addEventListener("keyup", (e) => {
    if (e.key.match(/[a-z]/i)) {
      checkWord(e.key);
    }
  });

  return (
    <div className="App">
      <p>Vous avez fait {errorCount} erreur(s)</p>
      <h1>{hideWord}</h1>
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
      {gameStatus == "failed" ? <p>Vous avez perdu</p> : ""}
    </div>
  );
}

export default App;
