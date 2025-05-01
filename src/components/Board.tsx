import useStore from "../store/store";
import Keyboard from "./Keyboard";
import Row from "./Row";
import { useEffect, useState } from "react";
import useKeyboardHandler from "@/hooks/useKeyboardHandler";
function Board() {
  const chance = useStore((state) => state.chance);
  const allGuesses = useStore((state) => state.allGuesses);
  const results = useStore((state) => state.results);
  const keyRecord = useStore((state) => state.keyRecord);
  const currentIndex = allGuesses?.length - 1;
  const [shakeRow, setShakeRow] = useState(false);

  const keyDownHandler = useKeyboardHandler(setShakeRow);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => keyDownHandler(e.key);
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [keyDownHandler]);
  return (
    <>
      <div className="flex flex-col justify-center place-self-center gap-1 mt-10">
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
