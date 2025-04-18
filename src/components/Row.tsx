import Tile from "./tile";

type RowProps = {
  letter: number;
};

function Row({ letter }: RowProps) {
  return (
    <div className="flex gap-1">
      {[...Array(letter)].map((_, i) => {
        return <Tile key={i} />;
      })}
    </div>
  );
}
export default Row;
