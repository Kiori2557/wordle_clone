import Row from "./Row";

type BoardProps = {
  letter: number;
  chance: number;
};

function Board({ letter, chance }: BoardProps) {
  return (
    <div className="flex flex-col justify-center place-self-center gap-1">
      {[...Array(chance)].map((_, i) => {
        return <Row key={i} letter={letter} />;
      })}
    </div>
  );
}
export default Board;
