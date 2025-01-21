import { FC } from "react";
import "./Grid.css";

type TGrid = {
  children: React.ReactNode;
};

export const Grid: FC<TGrid> = ({ children }) => {
  return <div className="gridContainer">{children}</div>;
};

type TGridItem = {
  position: {
    colStart: number;
    colEnd: number;
    rowStart: number;
    rowEnd: number;
  };
  children: React.ReactNode;
  style?: React.CSSProperties;
  multiple?: number;
};

export const GridItem: FC<TGridItem> = (props) => {
  const {
    children,
    position: { colEnd, colStart, rowEnd, rowStart },
    style,
    multiple = 2,
  } = props;

  return (
    <div
      className="gridItem"
      style={{
        gridColumnStart: colStart * multiple,
        gridColumnEnd: colEnd * multiple,
        gridRowStart: rowStart * multiple,
        gridRowEnd: rowEnd * multiple,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
