import { useContext, useEffect } from "react";
import { Context } from "../Context";
import "./Menu.css";
import papug from "../assets/papug.webp";

export const Menu = () => {
  const { setCurrentPage, setTitle, setOpen } = useContext(Context);

  useEffect(() => {
    setTitle("Играем с Говорушей: знаю все профессии");
  }, []);

  const clickHandler = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };

  return (
    <div className="menuContainer">
      <div className="manualItem manual" onClick={() => setOpen(true)}>
        Структура игры
      </div>
      <div className="gamesContainer">
        <div className="titleBtn">Выбери игру</div>
        <div className="menuItem" onClick={() => clickHandler(5)}>
          Кто, что делает?
        </div>
        <div className="menuItem" onClick={() => clickHandler(6)}>
          Загадки по профессиям
        </div>
        <div className="menuItem" onClick={() => clickHandler(4)}>
          Кому, что нужно?
        </div>
      </div>
      <img className="papugMenu" src={papug} />
    </div>
  );
};
