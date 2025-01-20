import React, { useContext, useEffect, useState } from "react";
import "./Game4.css";
import { Context } from "../Context";
import { Status } from "../types";
import { Grid, GridItem } from "../Grid/Grid";
import { NextButton } from "../NextButton/NextButton";
import { PapugStatus } from "../PapugStatus/PapugStatus";
import { photos } from "./const";
import { ManualButton } from "../Modal/ManualButton";

export const Game4 = () => {
  const { setStatus, onClickAudio, setTitle } = useContext(Context);

  const [stage, setStage] = useState<number>(0);
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  useEffect(() => {
    setTitle("Предлоги");
  }, []);

  const nextStageHandler = () => {
    onClickAudio();
    setStage((prev) => prev + 1);
    setStatus(Status.whait);
    setCheckedItems([]);
  };

  const itemClickHandler = (isCorrect: boolean, index: number) => {
    if (checkedItems.includes(index)) return;

    onClickAudio();
    if (isCorrect) {
      setStatus(Status.correct);
      setCheckedItems((prev) => [...prev, index]);
    }
    if (!isCorrect) {
      setStatus(Status.wrong);
    }
  };

  const positions = [
    { colStart: 2, colEnd: 4, rowStart: 5, rowEnd: 8 },
    { colStart: 5, colEnd: 7, rowStart: 5, rowEnd: 8 },
    { colStart: 8, colEnd: 10, rowStart: 5, rowEnd: 8 },
    { colStart: 2, colEnd: 4, rowStart: 9, rowEnd: 12 },
    { colStart: 5, colEnd: 7, rowStart: 9, rowEnd: 12 },
    { colStart: 8, colEnd: 10, rowStart: 9, rowEnd: 12 },
  ];

  const { predlog, items, text } = photos[stage];

  return (
    <div className="game1Container">
      <Grid>
        <GridItem position={{ colStart: 5, colEnd: 7, rowStart: 1, rowEnd: 4 }}>
          <div className="col">
            <img src={predlog} className="border" />
            <div className="textBlock">{text}</div>
          </div>
        </GridItem>
        {items.map(({ src, isCorrect }, i) => (
          <GridItem key={src} position={positions[i]}>
            <img
              className={
                checkedItems.includes(i) ? "greenBorder" : "imgBorder scale"
              }
              src={src}
              onClick={() => itemClickHandler(isCorrect, i)}
            />
          </GridItem>
        ))}
        {!!photos[stage + 1] && (
          <NextButton nextStageHandler={nextStageHandler} />
        )}
        <PapugStatus />
        <ManualButton />
      </Grid>
    </div>
  );
};
