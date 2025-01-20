import { useContext, useEffect, useState } from "react";
import { Context } from "../Context";
import { Grid, GridItem } from "../Grid/Grid";
import { Status } from "../types";
import { photos } from "./const";
import "./Game2.css";
import { PapugStatus } from "../PapugStatus/PapugStatus";
import { NextButton } from "../NextButton/NextButton";
import { ManualButton } from "../Modal/ManualButton";

export const Game2 = () => {
  const { setStatus, onClickAudio, setTitle, setCurrentPage } =
    useContext(Context);

  const [stage, setStage] = useState<number>(0);
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    setTitle("Что лишнее?");
  }, []);

  useEffect(() => {
    if (!photos[stage + 1] && checked) {
      setTimeout(() => {
        setCurrentPage(7);
      }, 2000);
    }
  }, [stage, checked]);

  const positions = [
    { colStart: 2, colEnd: 5, rowStart: 2, rowEnd: 6 },
    { colStart: 6, colEnd: 9, rowStart: 2, rowEnd: 6 },
    { colStart: 2, colEnd: 5, rowStart: 7, rowEnd: 11 },
    { colStart: 6, colEnd: 9, rowStart: 7, rowEnd: 11 },
  ];

  const nextStageHandler = () => {
    setChecked(false);
    onClickAudio();
    setStage((prev) => prev + 1);
    setStatus(Status.whait);
  };

  const itemClickHandler = (isCorrect: boolean) => {
    onClickAudio();
    if (isCorrect) {
      setStatus(Status.correct);
      setChecked(true);
    }
    if (!isCorrect) {
      setStatus(Status.wrong);
    }
  };

  return (
    <div className="game2Container">
      <Grid>
        {photos[stage]?.map(({ src, isCorrect }, i) => (
          <GridItem key={src} position={positions[i]}>
            <img
              className={
                checked && isCorrect
                  ? "imgBorder scale checkedElement"
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
