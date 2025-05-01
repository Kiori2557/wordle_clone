import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useStore from "@/store/store";
import { useEffect, useRef } from "react";
import { DialogClose } from "@radix-ui/react-dialog";

function ResultDialog() {
  const gotStatus = useStore((state) => state.status);
  const answer = useStore((state) => state.answer);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const resetGame = useStore((state) => state.resetStore);

  useEffect(() => {
    if (gotStatus) {
      setTimeout(() => triggerRef.current?.click(), 3200);
    }
  }, [gotStatus]);
  return (
    <Dialog>
      <DialogTrigger ref={triggerRef} className=" hidden">
        Open
      </DialogTrigger>
      <DialogContent className=" w-3xs p-8">
        <DialogHeader>
          <DialogTitle className="text-center pt-4">
            {gotStatus && gotStatus === "WON"
              ? "You Win 🏆"
              : `Game Over - 
                  the word is "${answer.toUpperCase()}"`}
          </DialogTitle>
        </DialogHeader>
        <DialogClose
          onClick={resetGame}
          className=" mt-4 px-4 bg-green-400 text-white p-4 rounded-2xl"
        >
          Next Game
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
export default ResultDialog;
