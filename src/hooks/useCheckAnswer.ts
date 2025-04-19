import useStore from "../store/store";

const useCheckAnswer = (guess:string) => {
    const answer = useStore((state) => state.answer)
    const allGuesses = useStore((state) => state.allGuesses)
    const ansLength = useStore((state)=>state.answerLength)
    const result: string[] = []
    
    if (!allGuesses.includes(guess)) {
        for (let i = 0; i < ansLength; i++) {
             result.push("UNCHECKED") 
        }
        return result
    }

    const answerArr = answer.split('')
    const guessArr = guess.split('')
    answerArr.map((ans, i) => {
        if(ans=== guessArr[i]?.toLowerCase()) return result[i] = "CORRECT_INDEX"
        else if (answerArr.includes(guessArr[i])) return result[i] = "CORRECT_LETTER"
        else return result[i] = 'INCORRECT'
    })
    return result
}

export default useCheckAnswer