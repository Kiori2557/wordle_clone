import { create } from "zustand";

export type keyRecordType = {
    CORRECT_INDEX: string[],
    CORRECT_LETTER: string[],
    INCORRECT:string[]
}

type StoreType = {
    answer: string,
    status:string,
    answerLength: number,
    chance:number,
    allGuesses: string[],
    results: string[][],
    wordList: string[],
    keyRecord: keyRecordType
    setWordList:(words:string[])=>void,
    setAnswer:(answer:string)=>void,
    addGuess:(guess:string) => void,
    deleteLastLetter:(currentIndex:number) => void,
    updateCurrentGuess: (currentIndex: number, letter: string) => void,
    addResult:(result:string[])=>void
    resetStore: () => void,
    setStatus: (status:string) => void,
    updateKeyRecord:(guess:string[],result:string[])=>void
}

const useStore = create<StoreType>((set) => ({
    answer: 'dread',
    status:'',
    answerLength: 5,
    chance:6,
    allGuesses: [""],
    wordList:[],
    results: [],
    keyRecord: {
        CORRECT_INDEX: [],
        CORRECT_LETTER: [],
        INCORRECT: []
    },
    setWordList:(words:string[])=>set(()=>({wordList:[...words]})),
    setAnswer:(answer:string)=>set(()=>({answer:answer})),
    addGuess: (guess: string) => set((state: StoreType) => ({ allGuesses: [...state.allGuesses, guess] })),
    deleteLastLetter: (currentIndex:number) => set((state: StoreType) => ({
         allGuesses: state.allGuesses.map((guess,i)=> (i === currentIndex) ? guess.slice(0, guess.length - 1): guess)
    })),
    updateCurrentGuess:  (currentIndex:number,letter:string) => set((state: StoreType) => ({
         allGuesses: state.allGuesses.map((guess,i)=> (i === currentIndex) ? guess+letter: guess)
    })),
    addResult: (result: string[]) => set((state: StoreType) => ({ results: [...state.results,result] })),
    resetStore: () => set({ allGuesses: [""], status:'',results:[], answer:'',keyRecord:{
        CORRECT_INDEX: [],
        CORRECT_LETTER: [],
        INCORRECT: []
    }}),
    setStatus: (status:string) => set(() => ({ status: status })),
    updateKeyRecord: (guess: string[], result: string[]) => set((state: StoreType) => {
        const correctIndex:string[] = [...state.keyRecord.CORRECT_INDEX];
        let correctLetter:string[] = [...state.keyRecord.CORRECT_LETTER];
        const incorrect: string[] = [...state.keyRecord.INCORRECT];
        result.map((r, index) => {
            if (r === "CORRECT_INDEX" && !correctIndex.includes(guess[index])) {
                if (correctLetter.includes(guess[index])) {
                    correctLetter = correctLetter.filter((letter)=> letter != guess[index])
                }
                correctIndex.push(guess[index])
            }
            if (r === "CORRECT_LETTER" && !correctLetter.includes(guess[index]) && !correctIndex.includes(guess[index])) {
                correctLetter.push(guess[index])
            }
            if (r === "INCORRECT" && !incorrect.includes(guess[index])) {
                incorrect.push(guess[index])
            }
        })
        return ({
            keyRecord: {
                CORRECT_INDEX: correctIndex,
                CORRECT_LETTER: correctLetter,
                INCORRECT: incorrect,
            }
        }
    )}),
}))

export default useStore