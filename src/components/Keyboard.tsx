import { DeleteIcon } from "lucide-react";
import { keyRecordType } from "@/store/store";
type KeyboardProps = {
  keyboardHandler: (key: string | KeyboardEvent) => string[] | undefined;
  keyRecord: keyRecordType;
};
function Keyboard({ keyboardHandler, keyRecord }: KeyboardProps) {
  const defaultClassName =
    "border-2 hover:bg-gray-100 border-black rounded-sm p-3 text-center min-w-20";
  const keyboard = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Backspace"],
  ];
  return (
    <div className="grid grid-rows-3 justify-center gap-1 mt-auto mb-auto">
      {keyboard.map((row, index) => {
        return (
          <div key={"row" + index} className="flex gap-1 justify-center">
            {row.map((key) => {
              let keyClassName = defaultClassName;
              if (key == "Enter" || key == "Backspace") {
                keyClassName = defaultClassName + " flex-1 flex justify-center";
              }
              if (keyRecord.CORRECT_INDEX.includes(key.toLowerCase())) {
                keyClassName = keyClassName + " bg-green-200  delay-5";
              } else if (keyRecord.CORRECT_LETTER.includes(key.toLowerCase())) {
                keyClassName = keyClassName + " bg-yellow-200  delay-5";
              } else if (keyRecord.INCORRECT.includes(key.toLowerCase())) {
                keyClassName = keyClassName + " bg-gray-200  delay-5";
              }
              return (
                <div
                  onClick={() => keyboardHandler(key)}
                  key={key}
                  className={keyClassName}
                >
                  {key == "Backspace" ? <DeleteIcon /> : key}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
export default Keyboard;
