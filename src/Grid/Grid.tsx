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
};

export const GridItem: FC<TGridItem> = (props) => {
  const {
    children,
    position: { colEnd, colStart, rowEnd, rowStart },
    style,
  } = props;

  return (
    <div
      className="gridItem"
      style={{
        gridColumnStart: colStart,
        gridColumnEnd: colEnd,
        gridRowStart: rowStart,
        gridRowEnd: rowEnd,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
