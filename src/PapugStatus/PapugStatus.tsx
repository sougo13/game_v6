import React, { useContext } from "react";
import { GridItem } from "../Grid/Grid";
import { Status } from "../types";
import { Context } from "../Context";
import okPapug from "../assets/okPapug.png";
import neOkPapug from "../assets/neOkPapug.png";
import papug from "../assets/papug.webp";
import "./PapugStatus.css";

export const PapugStatus = () => {
  const { status } = useContext(Context);
  return (
    <GridItem position={{ colStart: 10, colEnd: 13, rowStart: 6, rowEnd: 13 }}>
      {status === Status.correct && (
        <img className="papugStatus" src={okPapug} />
      )}
      {status === Status.wrong && (
        <img className="papugStatus" src={neOkPapug} />
      )}
      {status === Status.whait && <img className="papugStatus" src={papug} />}
    </GridItem>
  );
};
