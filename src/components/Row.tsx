import useCheckAnswer from "../hooks/useCheckAnswer";
import useStore from "../store/store";
import Tile from "./Tile";

type RowProps = {
  guess?: string;
  showResult: boolean;
};

function Row({ guess, showResult }: RowProps) {
  const letter = useStore((state) => state.answerLength);
  const result = useCheckAnswer(guess || "");
  const classContent = `flex gap-1`;

  return (
    <div className={classContent}>
      {[...Array(letter)].map((_, i) => {
        return (
          <Tile
            key={i}
            letter={guess && guess[i]}
            result={showResult ? result[i] : "null"}
          />
        );
      })}
    </div>
  );
}
export default Row;
