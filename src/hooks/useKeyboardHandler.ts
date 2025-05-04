import { toast } from "sonner";
import  useStore  from "../store/store";
import { useCallback } from "react";
import checkAnswer from "@/util/checkAnswer";
export default function useKeyboardHandler(setShakeRow:(val:boolean)=>void) {
    const chance = useStore((state) => state.chance);
    const allGuesses = useStore((state) => state.allGuesses);
    const answer = useStore((state) => state.answer);
    const wordList = useStore((state) => state.wordList);;
    const setGameStatus = useStore((state) => state.setStatus);
    const addResult = useStore((state) => state.addResult);
    const deleteLetter = useStore((state) => state.deleteLastLetter);
    const addLetter = useStore((state) => state.updateCurrentGuess);
    const addGuess = useStore((state) => state.addGuess);
    const updateKeyRecord = useStore((state) => state.updateKeyRecord);
    const currentIndex = allGuesses?.length - 1;
    const answerLength = answer.length
    const keyDownHandler = useCallback(
        (key: string) => {
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
            if (wordList.length !== 0 && !wordList.includes(currentGuess)) {
            // Check whether the guess is a valid word
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
                setTimeout(() => setGameStatus("WON"));
            } else if (!isCorrect && allGuesses.length >= chance) {
             setTimeout(() => setGameStatus("LOSS"));
            }
            addGuess("");
            updateKeyRecord(currentGuess.split(""), result);
        } else {
            return [...allGuesses, currentGuess];
        }
        },
        [
            answer,
            chance,
            wordList,
            allGuesses,
            answerLength,
            currentIndex,
            addGuess,
            addLetter,
            addResult,
            setShakeRow,
            deleteLetter,
            setGameStatus,
            updateKeyRecord,
        ]
     )
    return keyDownHandler
}