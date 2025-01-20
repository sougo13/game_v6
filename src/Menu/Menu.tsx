import { useContext, useEffect } from "react";
import { Context } from "../Context";
import "./Menu.css";
import papug from "../assets/papug.webp";

export const Menu = () => {
  const { setCurrentPage, setTitle, setOpen } = useContext(Context);

  useEffect(() => {
    setTitle("Остров с Говорушей");
  }, []);

  const clickHandler = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };

  return (
    <div className="menuContainer">
      <div className="manualItem manual" onClick={() => setOpen(true)}>
        Инструкция
      </div>
      <div className="gamesContainer">
        <div className="menuItem" onClick={() => clickHandler(2)}>
          Корзинки овощей и фруктов
        </div>
        <div className="menuItem" onClick={() => clickHandler(3)}>
          Что лишнее?
        </div>
        <div className="menuItem" onClick={() => clickHandler(4)}>
          Скажи наоборот
        </div>
        <div className="menuItem" onClick={() => clickHandler(5)}>
          Предлоги
        </div>
        <div className="menuItem" onClick={() => clickHandler(6)}>
          Кто, что ест?
        </div>
      </div>
      <img className="papugMenu" src={papug} />
    </div>
  );
};
