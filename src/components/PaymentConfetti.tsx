"use client";
import React from "react";
import Confetti from "react-confetti";

const ConfettiComponent = () => {
  return (
    <Confetti
      className="flex-1"
      style={{ zIndex: 0 }}
      run={true}
      recycle={true}
      numberOfPieces={200}
      wind={0}
      gravity={0.1}
      opacity={1}
    />
  );
};

export default ConfettiComponent;
