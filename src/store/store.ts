import { create } from "zustand";

type StoreType = {
    answer: string,
    answerLength: number,
    chance:number,
    allGuesses: string[],
    addGuess:(guess:string) => void,
    resetStore:() => void,
}

const useStore = create<StoreType>((set) => ({
    answer: 'hello',
    answerLength: 5,
    chance:6,
    allGuesses: [],
    addGuess: (guess: string) => set((state: StoreType) => ({ allGuesses: [...state.allGuesses, guess] })),
    resetStore: ()=>set({allGuesses:[]})
}))

export default useStore