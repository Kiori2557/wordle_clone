import checkAnswer from "../util/checkAnswer";
import useStore from "../store/store";
import Keyboard from "./Keyboard";
import Row from "./Row";
import { useEffect, useCallback, useState } from "react";
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
  const keyRecord = useStore((state) => state.keyRecord);
  const updateKeyRecord = useStore((state) => state.updateKeyRecord);
  const currentIndex = allGuesses?.length - 1;
  const [shakeRow, setShakeRow] = useState(false);

  const keyDownHandler = useCallback(
    (key: string | KeyboardEvent) => {
      if (key instanceof KeyboardEvent) {
        key = key.key;
      }

      const currentGuess = allGuesses[currentIndex];

      if (key === "Backspace") {
        //Delete when backspace is pressed
        deleteLetter(currentIndex);
      } else if (
        //Add to guess when any key from A-Z is pressed
        currentGuess?.length < answerLength &&
        /^[a-zA-Z]$/.test(key)
      ) {
        addLetter(currentIndex, key.toLowerCase());
      } else if (key === "Enter" && currentGuess.length === 5) {
        // Create a new guess and save the current guess as previous guess
        if (!wordList.includes(currentGuess)) {
          toast.warning(`${currentGuess.toUpperCase()} is not in word list`);
          setShakeRow(true);
          setTimeout(() => {
            setShakeRow(false);
          }, 500);
          return;
        }
        const { result, isCorrect } = checkAnswer(currentGuess, answer);
        addResult(result);
        if (isCorrect) {
          setTimeout(() => setWinner());
        }
        addGuess("");
        updateKeyRecord(currentGuess.split(""), result);
      } else {
        return [...allGuesses, currentGuess];
      }
    },
    [
      answerLength,
      updateKeyRecord,
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
  console.log(keyRecord);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => keyDownHandler(e.key);
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
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
              shake={i === currentIndex && shakeRow}
            />
          );
        })}
      </div>
      <Keyboard keyboardHandler={keyDownHandler} keyRecord={keyRecord} />
    </>
  );
}
export default Board;
