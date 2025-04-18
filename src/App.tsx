import Board from "./components/Board";
import useStore from "./store/store";

function App() {
  const answer: string = useStore((state) => state.answer);

  console.log(answer);

  return (
    <>
      <Board />
    </>
  );
}

export default App;
