import useStore from "../store/store";
import Row from "./Row";
import { useState, useEffect, useCallback } from "react";
function Board() {
  const chance = useStore((state) => state.chance);
  const allGuesses = useStore((state) => state.allGuesses);
  const [guesses, setGuesses] = useState<string[]>([""]);
  const answerLength = useStore((state) => state.answerLength);
  const answer = useStore((state) => state.answer);
  const { addGuess } = useStore.getState();
  const keyDownHandler = useCallback(
    (e: KeyboardEvent) => {
      if (e.repeat) return;
      const currentGuess = guesses[guesses?.length - 1];
      if (e.key === "Enter") {
        if (currentGuess === answer) {
          console.log("u win");
        } else {
          addGuess(currentGuess);
          setGuesses([...guesses, ""]);
        }
        console.log(allGuesses);
        return;
      }

      setGuesses((guesses: string[]) => {
        const lastGuess = guesses[guesses.length - 1];
        if (e.key === "Backspace") {
          console.log("delete");
          return [...allGuesses, lastGuess.slice(0, lastGuess.length - 1)];
        } else if (
          lastGuess.length < answerLength &&
          /^[a-zA-Z]$/.test(e.key)
        ) {
          const updated = lastGuess + e.key;
          return [...allGuesses, updated];
        } else {
          return [...allGuesses, lastGuess];
        }
      });
    },
    [answerLength, answer, addGuess, guesses, allGuesses]
  );
  useEffect(() => {
    window.addEventListener("keydown", keyDownHandler);
    console.log("useEffect run");
    return () => {
      window.removeEventListener("keydown", keyDownHandler);
    };
  }, [keyDownHandler]);
  return (
    <div className="flex flex-col justify-center place-self-center gap-1 ">
      {[...Array(chance)].map((_, i) => {
        return <Row key={i} guess={guesses[i]} />;
      })}
    </div>
  );
}
export default Board;
