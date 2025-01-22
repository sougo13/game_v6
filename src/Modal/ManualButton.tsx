import React, { useContext } from "react";
import { GridItem } from "../Grid/Grid";
import { Context } from "../Context";

export const ManualButton = () => {
  const { setOpen } = useContext(Context);

  const handleOpen = () => setOpen(true);
  return (
    <GridItem
      position={{ colStart: 10, colEnd: 13, rowStart: 1, rowEnd: 2 }}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      style={{ textAlign: "-webkit-right", transform: "translateY(-18vh)" }}
    >
      <button className="manualButton" onClick={handleOpen}>
        Инструкция
      </button>
    </GridItem>
  );
};
