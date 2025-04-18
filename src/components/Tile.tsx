type TileProps = {
  letter?: string;
};
function Tile({ letter }: TileProps) {
  return (
    <div className=" w-20 h-20 border-2 border-black rounded-sm">{letter}</div>
  );
}
export default Tile;
