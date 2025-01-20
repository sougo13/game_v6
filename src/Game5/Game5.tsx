import React, { useContext, useEffect, useState } from "react";
import "./Game5.css";
import { Context } from "../Context";
import { Status } from "../types";
import { Grid, GridItem } from "../Grid/Grid";
import { NextButton } from "../NextButton/NextButton";
import { PapugStatus } from "../PapugStatus/PapugStatus";
import { photos } from "./const";
import { ManualButton } from "../Modal/ManualButton";

export const Game5 = () => {
  const { setStatus, onClickAudio, setTitle, setCurrentPage } =
    useContext(Context);

  const [stage, setStage] = useState<number>(0);
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    setTitle("Кто, что ест?");
  }, []);

  useEffect(() => {
    if (!photos[stage + 1] && checked) {
      setTimeout(() => {
        setCurrentPage(7);
      }, 2000);
    }
  }, [stage, checked]);

  const nextStageHandler = () => {
    onClickAudio();
    setStage((prev) => prev + 1);
    setStatus(Status.whait);
    setChecked(false);
  };

  const itemClickHandler = (isCorrect: boolean) => {
    if (checked) return;

    onClickAudio();
    if (isCorrect) {
      setStatus(Status.correct);
      setChecked(true);
    }
    if (!isCorrect) {
      setStatus(Status.wrong);
    }
  };

  const positions = [
    { colStart: 5, colEnd: 7, rowStart: 1, rowEnd: 6 },
    { colStart: 8, colEnd: 10, rowStart: 1, rowEnd: 6 },
    { colStart: 5, colEnd: 7, rowStart: 7, rowEnd: 12 },
    { colStart: 8, colEnd: 10, rowStart: 7, rowEnd: 12 },
  ];

  const { animal, food } = photos[stage];

  return (
    <div className="game1Container">
      <Grid>
        <GridItem
          position={{ colStart: 1, colEnd: 4, rowStart: 1, rowEnd: 13 }}
        >
          <img
            loading="eager"
            onLoad={() => {
              console.log("onLoad");
            }}
            onLoadStart={() => {
              console.log("onLoadStart");
            }}
            src={animal}
            className="imgBorder noPointer"
          />
        </GridItem>
        {food.map(({ src, isCorrect }, i) => (
          <GridItem key={src} position={positions[i]}>
            <img
              loading="eager"
              className={
                checked && !isCorrect
                  ? "imgBorder filter noPointer"
                  : "imgBorder scale"
              }
              src={src}
              onClick={() => itemClickHandler(isCorrect)}
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
