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
  const gotWinner = useStore((state) => state.gotWinner);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const resetGame = useStore((state) => state.resetStore);

  useEffect(() => {
    if (gotWinner) {
      setTimeout(() => triggerRef.current?.click(), 1000);
    }
  }, [gotWinner]);
  return (
    <Dialog>
      <DialogTrigger ref={triggerRef} className="hidden">
        Open
      </DialogTrigger>
      <DialogContent className=" w-3xs p-0">
        <DialogHeader>
          <DialogTitle className="text-center pt-4">You Win 🏆</DialogTitle>
        </DialogHeader>
        <DialogClose onClick={resetGame} className=" pb-4">
          Reset
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
export default ResultDialog;
