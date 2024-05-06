"use client";
import { generateGame } from "@/lib/Game/Slitherlink";
import { Directions } from "@mui/icons-material";

export default function Login() {
  function seTTT(row: number, col: number) {
    generateGame(5, 5);
  }

  return (
    <main className="bg-lightDark">
      <button
        onClick={(e) => {
          console.table(generateGame(10, 10));
        }}
      >
        Generate
      </button>
    </main>
  );
}
