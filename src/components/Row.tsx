import useCheckAnswer from "../hooks/useCheckAnswer";
import useStore from "../store/store";
import Tile from "./Tile";

type RowProps = {
  guess?: string;
};

function Row({ guess }: RowProps) {
  const letter = useStore((state) => state.answerLength);
  const result = useCheckAnswer(guess || "null");
  const classContent = `flex gap-1`;

  return (
    <div className={classContent}>
      {[...Array(letter)].map((_, i) => {
        return (
          <Tile
            key={i}
            letter={guess && guess[i]}
            result={result ? result[i] : ""}
          />
        );
      })}
    </div>
  );
}
export default Row;
