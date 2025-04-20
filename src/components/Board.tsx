import useStore from "../store/store";
import Row from "./Row";
import { useEffect, useCallback } from "react";
function Board() {
  const chance = useStore((state) => state.chance);
  const allGuesses = useStore((state) => state.allGuesses);
  const deleteLetter = useStore((state) => state.deleteLastLetter);
  const addLetter = useStore((state) => state.updateCurrentGuess);
  const answerLength = useStore((state) => state.answerLength);
  const { addGuess } = useStore.getState();
  const currentIndex = allGuesses?.length - 1;

  const keyDownHandler = useCallback(
    (e: KeyboardEvent) => {
      if (e.repeat) return;
      const currentGuess = allGuesses[currentIndex];
      if (e.key === "Backspace") {
        //Delete when backspace is pressed
        deleteLetter(currentIndex);
      } else if (
        //Add to guess when any key from A-Z is pressed
        currentGuess.length < answerLength &&
        /^[a-zA-Z]$/.test(e.key)
      ) {
        addLetter(currentIndex, e.key);
      } else if (e.key === "Enter" && currentGuess.length === 5) {
        // Create a new guess and save the current guess as previous guess
        addGuess("");
      } else {
        return [...allGuesses, currentGuess];
      }
    },
    [answerLength, addLetter, currentIndex, deleteLetter, addGuess, allGuesses]
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
        return (
          <Row
            key={i}
            guess={allGuesses[i]}
            showResult={i < currentIndex ? true : false}
          />
        );
      })}
    </div>
  );
}
export default Board;
