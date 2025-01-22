import { useEffect, useState } from "react";
import VolumeUp from "@mui/icons-material/VolumeUp";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeMute from "@mui/icons-material/VolumeOff";
import Slider from "@mui/material/Slider";
import { useContext } from "react";
import bgAudioUrl from "./assets/audio/bgAudio.mp3";
import goToMenu from "./assets/goToMenu.png";
import { Context } from "./Context";
import "./styles/App.css";
import "./styles/MainPage.css";
import { Manual } from "./Modal/Manual";
import bg from "./assets/bg.jpg";
import { preloadAssets } from "./utils";
import { answers as game3Answers } from "./Game3/const";
import { answers as game4Answers } from "./Game4/const";
import { answers as game5Answers } from "./Game5/const";
import { extra as game5Extra } from "./Game5/const";
import LoadingBar from 'react-top-loading-bar';

const bgAudio = new Audio(bgAudioUrl);
bgAudio.loop = true;
bgAudio.autoplay = true;
bgAudio.volume = 0.1;
bgAudio.preload = "auto";

function App() {
  const {
    title,
    currentPage,
    setCurrentPage,
    volume,
    prevVolume,
    currentPageIndex,
    setVolume,
    onClickAudio,
  } = useContext(Context);

  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  bgAudio.volume = volume / 100;

  useEffect(() => {
    const assets = [
      bg,
      goToMenu,
      ...game3Answers,
      ...game4Answers,
      ...game5Answers,
      ...game5Extra.map((item) => item.src),
    ];

    const totalAssets = assets.length;
    let loadedAssets = 0;

    const updateProgress = () => {
      loadedAssets += 1;
      setLoadingProgress((loadedAssets / totalAssets) * 100);
      if (loadedAssets === totalAssets) {
        setIsLoading(false);
      }
    };

    preloadAssets(assets, updateProgress);
  }, []);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setVolume(newValue as number);
  };

  const onClickHandler = () => {
    onClickAudio();
    bgAudio.play();
    setCurrentPage(1);
  };

  const renderVolumeBtn = () => {
    if (volume === 0) return <VolumeMute />;
    if (volume > 0 && volume <= 50) return <VolumeDown />;
    if (volume > 50) return <VolumeUp />;
  };

  const volumeBtnClick = () => {
    if (volume !== 0) {
      setVolume(0);
    } else {
      if (prevVolume === 0) {
        setVolume(20);
      } else {
        setVolume(prevVolume);
      }
    }
  };

  const goToHomePage = () => {
    setCurrentPage(1);
  };

  return (
    <>
      {isLoading && <LoadingBar color="#f11946" progress={loadingProgress} />}
      {!isLoading && (
        <>
          <div className="background" style={{ backgroundImage: `url(${bg})` }} />
          <div className="mainPageContainer">
            <div className="mainHeader">
              {currentPageIndex > 1 && (
                <img
                  src={goToMenu}
                  className="goToMenuBtn"
                  onClick={goToHomePage}
                />
              )}
              <div className="mainTitle">{title}</div>
              <div className="volumeContainer">
                <div className="volumeButton" onClick={volumeBtnClick}>
                  {renderVolumeBtn()}
                </div>
                <Slider className="slider" value={volume} onChange={handleChange} />
              </div>
            </div>
            <div className="mainArea">{currentPage}</div>
            <Manual />
            <div className="footer">
              Автор игры: учитель-логопед Ковязина Светлана Евгеньевна <br /> МАДОУ
              «Детский сад №390» г. Перми
            </div>
            {currentPageIndex === 0 && (
              <button className="starButton" role="button" onClick={onClickHandler}>
                Вперед!
              </button>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default App;