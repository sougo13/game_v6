import { createContext, FC, useRef, useState } from "react";
import { Game1 } from "./Game1/Game1";
import { Game2 } from "./Game2/Game2";
import { Game3 } from "./Game3/Game3";
import { Game4 } from "./Game4/Game4";
import { Game5 } from "./Game5/Game5";
import { Menu } from "./Menu/Menu";
import { StartPage } from "./StartPage/StartPage";
import clickAudioUrl from "./assets/audio/click.mp3";
import wrongAudioUrl from "./assets/audio/wrongAudio.mp3";
import correctAudioUrl from "./assets/audio/correctAudio.mp3";
import { Status, TContext } from "./types";
import { Surprise } from "./Surprise/Surprise";

const clickAudio: HTMLAudioElement = new Audio(clickAudioUrl);
const wrongAudio: HTMLAudioElement = new Audio(wrongAudioUrl);
wrongAudio.volume = 0.4;
const correctAudio: HTMLAudioElement = new Audio(correctAudioUrl);
correctAudio.volume = 0.4;

export const Context = createContext<TContext>({
  open: false,
  setOpen: () => {},
  title: "",
  setTitle: () => {},
  currentPage: <StartPage />,
  currentPageIndex: 0,
  setCurrentPage: () => {},
  volume: 0,
  prevVolume: 0,
  setVolume: () => {},
  status: Status.whait,
  setStatus: () => {},
  onClickAudio: () => {},
  onWrongAudio: () => {},
  onCorrectAudio: () => {},
});

const time = 3000;

export const ContextProvider: FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const [title, setTitle] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0);
  const [prevVolume, setPrevVolume] = useState<number>(0);
  const [status, setStatus] = useState<Status>(Status.whait);
  const timer = useRef<number | null>(null);

  const setPageHandler = (pageIndex: number) => {
    setStatus(Status.whait);
    setCurrentPage(pageIndex);
  };

  const setVolumeHandler = (newVolume: number) => {
    setPrevVolume(volume);
    setVolume(newVolume);
  };

  const setStatusHandler = (newStatus: Status) => {
    if (newStatus === Status.correct) {
      correctAudio.currentTime = 0;
      correctAudio.play();
    }
    if (newStatus === Status.wrong) {
      wrongAudio.currentTime = 0;
      wrongAudio.play();
    }
    if (timer.current) {
      clearTimeout(timer.current);
    }
    setStatus(newStatus);
    timer.current = setTimeout(() => {
      setStatus(Status.whait);
    }, time);
  };

  const pages: JSX.Element[] = [
    <StartPage />,
    <Menu />,
    <Game1 />,
    <Game2 />,
    <Game3 />,
    <Game4 />,
    <Game5 />,
    <Surprise />,
  ];

  return (
    <Context.Provider
      value={{
        open,
        setOpen,
        title,
        setTitle,
        currentPage: pages[currentPage],
        currentPageIndex: currentPage,
        setCurrentPage: setPageHandler,
        volume,
        prevVolume,
        setVolume: setVolumeHandler,
        status,
        setStatus: setStatusHandler,
        onClickAudio: () => clickAudio.play(),
        onCorrectAudio: () => {
          correctAudio.currentTime = 0;
          correctAudio.play();
        },
        onWrongAudio: () => {
          wrongAudio.currentTime = 0;
          wrongAudio.play();
        },
      }}
    >
      {children}
    </Context.Provider>
  );
};
