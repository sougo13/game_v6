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
import { bg } from "./bgConst";

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

  bgAudio.volume = volume / 100;

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
      <div
        className="background"
        style={{ backgroundImage: `url(${bg[currentPageIndex]})` }}
      />
      <div className="mainPageContainer">
        <div className="mainHeader">
          {currentPageIndex === 0 && (
            <button
              className="starButton"
              role="button"
              onClick={onClickHandler}
            >
              Вперед!
            </button>
          )}
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
      </div>
    </>
  );
}

export default App;
