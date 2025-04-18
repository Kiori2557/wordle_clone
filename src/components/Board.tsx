import useStore from "../store/store";
import Row from "./Row";
import { useState, useEffect, useCallback } from "react";

function Board() {
  const chance = useStore((state) => state.chance);
  const [guess, setGuess] = useState<string>("");
  const answerLength = useStore((state) => state.answerLength);
  const numOfGuess: number = useStore((state) => state.allGuesses.length);
  const keyPressHandler = useCallback(
    (e: KeyboardEvent) => {
      setGuess((guess: string) => {
        if (answerLength - 1 > 4) return guess;
        const updated = guess + e.key;
        console.log(updated.length);
        return updated;
      });
    },
    [answerLength]
  );
  useEffect(() => {
    window.addEventListener("keypress", keyPressHandler);
    console.log("useEffect run");
    return () => {
      window.removeEventListener("keypress", keyPressHandler);
    };
  }, [keyPressHandler]);
  return (
    <div className="flex flex-col justify-center place-self-center gap-1">
      {[...Array(chance)].map((_, i) => {
        return <Row key={i} guess={i === numOfGuess ? guess : ""} />;
      })}
    </div>
  );
}
export default Board;
