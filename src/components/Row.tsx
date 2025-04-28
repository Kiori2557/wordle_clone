import useStore from "../store/store";
import Tile from "./Tile";

type RowProps = {
  guess?: string;
  showResult: boolean;
  result?: string[];
  shake?: boolean;
};

function Row({ guess, showResult, result, shake }: RowProps) {
  const letter = useStore((state) => state.answerLength);
  const classContent = `flex gap-1 ${shake ? "animate-shake" : ""}`;
  return (
    <div className={classContent}>
      {[...Array(letter)].map((_, i) => {
        return (
          <Tile
            key={i}
            index={i}
            letter={guess && guess[i]}
            result={showResult && result ? result[i] : ""}
          />
        );
      })}
    </div>
  );
}
export default Row;
