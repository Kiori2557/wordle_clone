type TileProps = {
  letter?: string;
  result: string;
};
function Tile({ letter, result }: TileProps) {
  let tileColor = "";
  if (result === "CORRECT_INDEX") {
    tileColor = "bg-green-200";
  } else if (result === "CORRECT_LETTER") {
    tileColor = "bg-yellow-200";
  } else if (result === "INCORRECT") {
    tileColor = "bg-gray-200";
  }
  const classContent = `${tileColor} w-20 h-20 border-2 border-black rounded-sm inline-flex items-center justify-center text-4xl align-middle uppercase leading-none font-bold`;

  return <div className={classContent}>{letter}</div>;
}
export default Tile;
