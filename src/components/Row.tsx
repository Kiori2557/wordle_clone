import useStore from "../store/store";
import Tile from "./Tile";

type RowProps = {
  guess?: string;
};

function Row({ guess }: RowProps) {
  const letter = useStore((state) => state.answerLength);

  return (
    <div className="flex gap-1">
      {[...Array(letter)].map((_, i) => {
        return <Tile key={i} letter={guess && guess[i]} />;
      })}
    </div>
  );
}
export default Row;
