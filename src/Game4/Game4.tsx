import React, { useContext, useEffect, useState } from "react";
import "./Game4.css";
import { Context } from "../Context";
import { Status } from "../types";
import { Grid, GridItem } from "../Grid/Grid";
import { NextButton } from "../NextButton/NextButton";
import { PapugStatus } from "../PapugStatus/PapugStatus";
import { answers, extra, questions } from "./const";
import { ManualButton } from "../Modal/ManualButton";
import { getRandomElementsExcludingIndex, shuffleArray } from "../utils";

export const Game4 = () => {
  const { setStatus, onClickAudio, setTitle, setCurrentPage } =
    useContext(Context);

  const [stage, setStage] = useState<number>(0);
  const [checked, setChecked] = useState<boolean>(false);
  const [preparedAnswers, setPreparedAnswers] = useState<
    { src: string; isCorrect: boolean }[]
  >([]);

  useEffect(() => {
    setTitle("Кто, что делает?");
  }, []);

  useEffect(() => {
    const getAnswers = () => {

      const answersArr: { src: string; isCorrect: boolean }[] = [
        { src: answers[stage], isCorrect: true },
      ];
      
      const randomElements = getRandomElementsExcludingIndex(
        answers,
        stage,
        4,
        extra
      ).map((elem) => ({ src: elem, isCorrect: false }));

      return shuffleArray(answersArr.concat(randomElements));
    };

    setPreparedAnswers(getAnswers());
  }, [stage]);

  const nextStageHandler = () => {
    if (!questions[stage + 1] && checked) {
      setCurrentPage(7);
    } else {
      onClickAudio();
      setStage((prev) => prev + 1);
      setStatus(Status.whait);
      setChecked(false);
    }
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
    { colStart: 2, colEnd: 7, rowStart: 2, rowEnd: 12 },
    { colStart: 14, colEnd: 19, rowStart: 2, rowEnd: 12 },
    { colStart: 2, colEnd: 7, rowStart: 13, rowEnd: 23 },
    { colStart: 14, colEnd: 19, rowStart: 13, rowEnd: 23 },
    { colStart: 8, colEnd: 13, rowStart: 8, rowEnd: 17 },
  ];

  return (
    <div className="game1Container">
      <Grid>
        <GridItem
          position={{ colStart: 19, colEnd: 25, rowStart: 8, rowEnd: 12 }}
          multiple={1}
        >
          <div className="questionText4">{questions[stage]}</div>
        </GridItem>
        {preparedAnswers.map(({ src, isCorrect }, i) => (
          <GridItem key={i} position={positions[i]} multiple={1}>
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
        {checked && (
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
