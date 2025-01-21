import React, { FC } from "react";
import { GridItem } from "../Grid/Grid";
import nextBtn from "../assets/next.png";

type TProps = {
  nextStageHandler: () => void;
  colStart?: number;
  colEnd?: number;
  rowStart?: number;
  rowEnd?: number;
  multiple?: number;
};

export const NextButton: FC<TProps> = ({
  nextStageHandler,
  colEnd = 11,
  colStart = 13,
  rowEnd = 3,
  rowStart = 6,
  multiple = 2,
}) => {
  return (
    <GridItem
      position={{
        colStart,
        colEnd,
        rowStart,
        rowEnd,
      }}
      multiple={multiple}
    >
      <img className="pointer" src={nextBtn} onClick={nextStageHandler} />
    </GridItem>
  );
};
