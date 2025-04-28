import { useQuery } from "@tanstack/react-query";
import Board from "./components/Board";
import ResultDialog from "./components/ResultDialog";
import axios from "axios";
import useStore from "./store/store";

function App() {
  const setAnswer = useStore((state) => state.setAnswer);
  const answer = useStore((state) => state.answer);
  const wordList = useStore((state) => state.wordList);
  const setWordList = useStore((state) => state.setWordList);
  const { isLoading: randomWordLoading } = useQuery({
    queryKey: ["randomWord"],
    queryFn: async () => {
      const res = await axios.get(
        "https://random-word-api.vercel.app/api?length=5"
      );
      setAnswer(res.data[0]);
      return res.data;
    },
    enabled: !answer,
  });
  const { isLoading: wordListLoading } = useQuery({
    queryKey: ["wordList"],
    queryFn: async () => {
      const res = await axios.get("https://random-word-api.herokuapp.com/all");
      setWordList(res.data);
      return res.data;
    },
    enabled: !wordList.length,
    gcTime: 1000 * 60 * 60,
  });
  const content =
    randomWordLoading && wordListLoading ? (
      <div>Loading</div>
    ) : (
      <>
        <ResultDialog />
        <Board />
      </>
    );

  return content;
}

export default App;
