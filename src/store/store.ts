import { create } from "zustand";

type StoreType = {
    answer: string,
    gotWinner:boolean,
    answerLength: number,
    chance:number,
    allGuesses: string[],
    results: string[][],
    wordList: string[],
    setWordList:(words:string[])=>void,
    setAnswer:(answer:string)=>void,
    addGuess:(guess:string) => void,
    deleteLastLetter:(currentIndex:number) => void,
    updateCurrentGuess: (currentIndex: number, letter: string) => void,
    addResult:(result:string[])=>void
    resetStore: () => void,
    setGotWinner:()=>void
}

const useStore = create<StoreType>((set) => ({
    answer: 'dread',
    gotWinner: false,
    answerLength: 5,
    chance:6,
    allGuesses: [""],
    wordList:[],
    results: [],
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
    resetStore: () => set({ allGuesses: [""], gotWinner:false,results:[], answer:''}),
    setGotWinner:()=>set(() => ({ gotWinner: true}))
}))

export default useStore