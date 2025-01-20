import React, { FC } from "react";
import { GridItem } from "../Grid/Grid";
import nextBtn from "../assets/next.png";

type TProps = {
  nextStageHandler: () => void;
};

export const NextButton: FC<TProps> = ({ nextStageHandler }) => {
  return (
    <GridItem position={{ colStart: 11, colEnd: 13, rowStart: 3, rowEnd: 6 }}>
      <img className="pointer" src={nextBtn} onClick={nextStageHandler} />
    </GridItem>
  );
};
