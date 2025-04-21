import checkAnswer from "../util/checkAnswer";
import useStore from "../store/store";
import Row from "./Row";
import { useEffect, useCallback } from "react";
import { toast } from "sonner";
function Board() {
  const chance = useStore((state) => state.chance);
  const allGuesses = useStore((state) => state.allGuesses);
  const answerLength = useStore((state) => state.answerLength);
  const answer = useStore((state) => state.answer);
  const wordList = useStore((state) => state.wordList);
  const setWinner = useStore((state) => state.setGotWinner);
  const results = useStore((state) => state.results);
  const addResult = useStore((state) => state.addResult);
  const deleteLetter = useStore((state) => state.deleteLastLetter);
  const addLetter = useStore((state) => state.updateCurrentGuess);
  const addGuess = useStore((state) => state.addGuess);

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
        currentGuess?.length < answerLength &&
        /^[a-zA-Z]$/.test(e.key)
      ) {
        addLetter(currentIndex, e.key);
      } else if (e.key === "Enter" && currentGuess.length === 5) {
        // Create a new guess and save the current guess as previous guess
        if (!wordList.includes(currentGuess)) {
          // toast(`${currentGuess} is not in word list`);
          toast.warning(`${currentGuess.toUpperCase()} is not in word list`);
          return;
        }
        const { result, isCorrect } = checkAnswer(currentGuess, answer);
        addResult(result);
        if (isCorrect) {
          setTimeout(() => setWinner());
        }
        addGuess("");
      } else {
        return [...allGuesses, currentGuess];
      }
    },
    [
      answerLength,
      wordList,
      setWinner,
      addLetter,
      currentIndex,
      deleteLetter,
      addGuess,
      allGuesses,
      addResult,
      answer,
    ]
  );
  console.log(answer);
  useEffect(() => {
    window.addEventListener("keydown", keyDownHandler);
    return () => {
      window.removeEventListener("keydown", keyDownHandler);
    };
  }, [keyDownHandler]);

  return (
    <>
      <div className="flex flex-col justify-center place-self-center gap-1 ">
        {[...Array(chance)].map((_, i) => {
          return (
            <Row
              key={i}
              guess={allGuesses[i]}
              showResult={i < currentIndex ? true : false}
              result={results[i]}
            />
          );
        })}
      </div>
    </>
  );
}
export default Board;
