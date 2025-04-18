import { useEffect, useState } from "react";
import Board from "./components/Board";

function App() {
  const letter: number = 5;
  const chance: number = 6;
  const [guesses, setGuesses] = useState<string[]>([]);
  const keyPressHandler = (e: KeyboardEvent) => {
    setGuesses((guesses) => {
      const updated = [...guesses, e.key];
      console.log(updated);
      return updated;
    });
  };
  useEffect(() => {
    window.addEventListener("keypress", keyPressHandler);
    console.log("useEffect run");
    return () => {
      window.removeEventListener("keypress", keyPressHandler);
    };
  }, []);
  return (
    <>
      <Board letter={letter} chance={chance} />
    </>
  );
}

export default App;
