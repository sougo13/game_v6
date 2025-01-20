import { useContext, useEffect } from "react";
import { Context } from "../Context";
import { Grid, GridItem } from "../Grid/Grid";
import "./Surprise.css";
import b1 from "../assets/surprise/b1.gif";
import b2 from "../assets/surprise/b2.gif";
import d from "../assets/surprise/d.gif";
import box from "../assets/surprise/box.gif";
import surpriseAudioUrl from "../assets/surprise/surpriseAudio.mp3";

const surpriseAudio: HTMLAudioElement = new Audio(surpriseAudioUrl);
surpriseAudio.volume = 0.4;

export const Surprise = () => {
  const { setTitle } = useContext(Context);

  useEffect(() => {
    setTitle("Сокровища");
    surpriseAudio.currentTime = 0;
    surpriseAudio.play();
  }, []);

  return (
    <div className="surprise3Container">
      <Grid>
        <GridItem position={{ colStart: 1, colEnd: 3, rowStart: 2, rowEnd: 5 }}>
          <img src={b1} />
        </GridItem>
        <GridItem
          position={{ colStart: 2, colEnd: 4, rowStart: 9, rowEnd: 12 }}
        >
          <img src={b1} />
        </GridItem>
        <GridItem
          position={{ colStart: 5, colEnd: 9, rowStart: 9, rowEnd: 12 }}
        >
          <img src={b1} />
        </GridItem>
        <GridItem position={{ colStart: 3, colEnd: 5, rowStart: 4, rowEnd: 8 }}>
          <img src={b2} />
        </GridItem>
        <GridItem
          position={{ colStart: 9, colEnd: 12, rowStart: 2, rowEnd: 5 }}
        >
          <img src={b2} />
        </GridItem>
        <GridItem position={{ colStart: 5, colEnd: 9, rowStart: 4, rowEnd: 9 }}>
          <img src={d} />
        </GridItem>
        <GridItem
          position={{ colStart: 10, colEnd: 12, rowStart: 7, rowEnd: 13 }}
        >
          <img src={box} />
        </GridItem>
      </Grid>
    </div>
  );
};
