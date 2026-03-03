import Confetti from "react-confetti";
import type { JSX } from "react";

type ConffettiContainerProps = {
  isGameWon: boolean;
};

/*
CHALLENGE: Explictly type the ConfettiContainer component's return value
*/

export default function ConfettiContainer({
  isGameWon,
}: ConffettiContainerProps): JSX.Element | null {
  if (!isGameWon) {
    return null;
  } else {
    return <Confetti recycle={false} numberOfPieces={1000} />;
  }
}
