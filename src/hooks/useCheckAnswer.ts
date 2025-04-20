import useStore from "../store/store";

const useCheckAnswer = (guess:string) => {
    const answer = useStore((state) => state.answer)
    const allGuesses = useStore((state) => state.allGuesses)
    const ansLength = useStore((state) => state.answerLength)
    const setWinner = useStore((state)=>state.setGotWinner)
    


    // const resetGame = useStore((state)=> state.resetStore)
    const result: string[] = []
    
    if (!allGuesses.includes(guess)) {
        for (let i = 0; i < ansLength; i++) {
             result.push("UNCHECKED") 
        }
        return result
    }

    const answerArr = answer.split('')
    const guessArr = guess.split('')

    // First check whether there are any letter in which is the correct letter in correct position
    answerArr.map((ans, i) => {
        if (ans === guessArr[i]?.toLowerCase() && answerArr[i] !== "checked") {
            answerArr[i] = 'checked'
            return result[i] = "CORRECT_INDEX"
        }
    })

    // Second check whether there are any letter in which is the correct letter 
    answerArr.map((_, i) => {
      if (answerArr.includes(guessArr[i]) && answerArr[i] !== "checked") {
            answerArr[i] = 'checked'
            return result[i] = "CORRECT_LETTER"
         }
    })

    // Third check which are incorrect
    answerArr.map((_, i) => {
        if (!answerArr.includes(guessArr[i]) && answerArr[i] !== "checked") {
            answerArr[i] = 'checked'
            return result[i] = "INCORRECT"
        }
    })

     if (result.every((cur) => cur === "CORRECT_INDEX")) {
        setWinner();
    }

    return result

}

export default useCheckAnswer