type TileProps = {
  letter?: string;
  result: string;
  index: number;
};
function Tile({ letter, result, index }: TileProps) {
  let tileColor = "";
  if (result === "CORRECT_INDEX") {
    tileColor = "bg-green-200";
  } else if (result === "CORRECT_LETTER") {
    tileColor = "bg-yellow-200";
  } else if (result === "INCORRECT") {
    tileColor = "bg-gray-200";
  }
  let animate = "";
  animate = result ? `flip delay-${index}` : "";
  const tileClass = `tile ${tileColor} ${animate}  w-20 h-20 border-2 border-black rounded-sm inline-flex items-center justify-center text-4xl align-middle uppercase leading-none font-bold`;
  const letterClass = `letter ${animate}`;

  return (
    <div className={tileClass}>
      <span className={letterClass}>{letter}</span>
    </div>
  );
}
export default Tile;
