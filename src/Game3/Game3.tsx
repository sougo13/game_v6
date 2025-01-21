import React, { useContext, useEffect, useState } from "react";
import "./Game3.css";
import { Context } from "../Context";
import { Status } from "../types";
import { Grid, GridItem } from "../Grid/Grid";
import { NextButton } from "../NextButton/NextButton";
import { PapugStatus } from "../PapugStatus/PapugStatus";
import { answers, questions, res } from "./const";
import { ManualButton } from "../Modal/ManualButton";

export const Game3 = () => {
  const { setStatus, onClickAudio, setTitle, setCurrentPage } =
    useContext(Context);

  const [stage, setStage] = useState<number>(0);
  const [checked, setChecked] = useState<number>(0);
  const [checkedIndex, setCheckedIndex] = useState<number[]>([]);

  useEffect(() => {
    setTitle("Кому, что нужно?");
  }, []);

  const nextStageHandler = () => {
    if (!answers[stage + 1] && checked) {
      setCurrentPage(7);
    } else {
      onClickAudio();
      setStage((prev) => prev + 1);
      setStatus(Status.whait);
      setChecked(0);
      setCheckedIndex([]);
    }
  };

  const itemClickHandler = (isCorrect: boolean, index: number) => {
    if (checked === 2 || checkedIndex.includes(index)) return;

    onClickAudio();
    if (isCorrect) {
      setStatus(Status.correct);
      setChecked((prev) => prev + 1);
      setCheckedIndex((prev) => [...prev, index]);
    }
    if (!isCorrect) {
      setStatus(Status.wrong);
    }
  };

  const positions = [
    { colStart: 2, colEnd: 7, rowStart: 2, rowEnd: 12 },
    { colStart: 14, colEnd: 19, rowStart: 2, rowEnd: 12 },
    { colStart: 2, colEnd: 7, rowStart: 13, rowEnd: 23 },
    { colStart: 14, colEnd: 19, rowStart: 13, rowEnd: 23 },
    { colStart: 8, colEnd: 13, rowStart: 13, rowEnd: 23 },
  ];

  return (
    <div className="game1Container">
      <Grid>
        <GridItem
          position={{ colStart: 19, colEnd: 25, rowStart: 8, rowEnd: 12 }}
          multiple={1}
        >
          <div className="questionText3">{questions[stage]}</div>
        </GridItem>
        <GridItem
          position={{ colStart: 8, colEnd: 13, rowStart: 2, rowEnd: 12 }}
          multiple={1}
        >
          <img
            loading="eager"
            className={"imgBorderRed noPointer"}
            src={answers[stage]}
          />
        </GridItem>
        {res[stage].map(({ src, isCorrect }, i) => (
          <GridItem key={i} position={positions[i]} multiple={1}>
            <img
              loading="eager"
              className={
                checkedIndex.includes(i)
                  ? "imgBorderGreen"
                  : checked === 2 && !isCorrect
                  ? "imgBorder filter noPointer"
                  : "imgBorder scale"
              }
              src={src}
              onClick={() => itemClickHandler(isCorrect, i)}
            />
          </GridItem>
        ))}
        {checked === 2 && (
          <NextButton
            nextStageHandler={nextStageHandler}
            multiple={1}
            colStart={21}
            colEnd={24}
            rowStart={4}
            rowEnd={8}
          />
        )}
        <PapugStatus />
        <ManualButton />
      </Grid>
    </div>
  );
};
