import { useContext, useEffect, useState } from "react";
import "./Game1.css";
import fruitsBasket from "../assets/Game1/fru.png";
import vegetablesBasket from "../assets/Game1/veg.png";
import { ElemType, elements } from "./const";
import { Grid, GridItem } from "../Grid/Grid";
import { Context } from "../Context";
import { Status } from "../types";
import { PapugStatus } from "../PapugStatus/PapugStatus";
import { NextButton } from "../NextButton/NextButton";
import { ManualButton } from "../Modal/ManualButton";

export const Game1 = () => {
  const { setStatus, onClickAudio, setTitle, setCurrentPage } =
    useContext(Context);

  const [stage, setStage] = useState<number>(0);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [correctItems, setCorrectItems] = useState<number[]>([]);

  const isFirstStage = stage === 0 || stage === 1;

  const basketImg = isFirstStage ? vegetablesBasket : fruitsBasket;

  useEffect(() => {
    setTitle("Корзинки овощей и фруктов");
  }, []);

  useEffect(() => {
    if (!elements[stage + 1] && correctItems.length === 3) {
      setTimeout(() => {
        setCurrentPage(7);
      }, 2000);
    }
  }, [stage, correctItems]);

  const nextStageHandler = () => {
    onClickAudio();
    setSelectedItems([]);
    setCorrectItems([]);
    setStage((prev) => prev + 1);
    setStatus(Status.whait);
  };

  const positions = [
    { colStart: 2, colEnd: 4, rowStart: 1, rowEnd: 4 },
    { colStart: 4, colEnd: 6, rowStart: 4, rowEnd: 7 },
    { colStart: 6, colEnd: 8, rowStart: 1, rowEnd: 4 },
    { colStart: 8, colEnd: 10, rowStart: 5, rowEnd: 8 },
    { colStart: 1, colEnd: 3, rowStart: 5, rowEnd: 8 },
  ];

  const itemClickHandler = (type: ElemType, index: number) => {
    onClickAudio();
    setSelectedItems((prev) => [...prev, index]);
    if (isFirstStage && type === ElemType.veg) {
      setStatus(Status.correct);
      setCorrectItems((prev) => [...prev, index]);
      return;
    }
    if (!isFirstStage && type === ElemType.fruit) {
      setStatus(Status.correct);
      setCorrectItems((prev) => [...prev, index]);
      return;
    }
    setStatus(Status.wrong);
  };

  const basketPositions = [
    { colStart: 4, colEnd: 5, rowStart: 9, rowEnd: 11 },
    { colStart: 5, colEnd: 6, rowStart: 9, rowEnd: 11 },
    { colStart: 6, colEnd: 7, rowStart: 9, rowEnd: 11 },
  ];

  return (
    <div className="game1Container">
      <Grid>
        <>
          <GridItem
            position={{ colStart: 3, colEnd: 8, rowStart: 7, rowEnd: 13 }}
          >
            <img src={basketImg} />
          </GridItem>
          <PapugStatus />
          {stage < 3 && <NextButton nextStageHandler={nextStageHandler} />}
          {elements[stage].map(({ src, type }, index) => (
            <GridItem key={src} position={positions[index]}>
              <img
                className={
                  selectedItems.includes(index)
                    ? "checkedElement scale imgBorder noBorder"
                    : "scale imgBorder noBorder"
                }
                src={src}
                onClick={() => itemClickHandler(type, index)}
              />
            </GridItem>
          ))}
          {correctItems.map((itemIndex, index) => {
            const { src } = elements[stage][itemIndex];
            return (
              <GridItem key={src} position={basketPositions[index]}>
                <img src={src} className="imgBorder noBorder" />
              </GridItem>
            );
          })}
        </>
        <ManualButton />
      </Grid>
    </div>
  );
};
