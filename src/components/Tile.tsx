type TileProps = {
  letter?: string;
};
function Tile({ letter }: TileProps) {
  return (
    <div className=" w-20 h-20 border-2 border-black rounded-sm inline-flex items-center justify-center text-4xl align-middle uppercase leading-none font-bold">
      {letter}
    </div>
  );
}
export default Tile;
