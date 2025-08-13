import React, { useState } from "react";
import sort from "../../../img/sort.svg";
import add from "../../../img/add.svg";
import lists from "../../../img/lists.svg";
import diagram from "../../../img/diagram.svg";
import style from "./menubar.module.css";
import ModalCrete from "../../modal/modalcreate/ModalCreate";

function MenuBar({ addTransaction, fileToDataUrl }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const category = [
    "Продукти",
    "Одяг",
    "Телефон",
    "Інтернет",
    "Оренда",
    "Інше",
  ];
  const monthNamesUA = [
    "Січень",
    "Лютий",
    "Березень",
    "Квітень",
    "Травень",
    "Червень",
    "Липень",
    "Серпень",
    "Вересень",
    "Жовтень",
    "Листопад",
    "Грудень",
  ];
  return (
    <>
      <div className={style.container}>
        <div className={style.category}>
          <select className={style.select}>
            <option value="" disabled selected>
              Категорії
            </option>
            {category.map((item, index) => (
              <option className={style.option} key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className={style.month}>
          <select className={style.select}>
            <option value="" disabled selected>
              Місяць
            </option>
            {monthNamesUA.map((item, index) => (
              <option className={style.option} key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className={style.sort}>
          <img src={sort} alt="sort" />
        </div>
        <div className={style.view}>
          <img className={style.lists} src={lists} alt="" />
          <div className={style.border}></div>
          <img className={style.diagram} src={diagram} alt="" />
        </div>
        <div className={style.add}>
          <img src={add} alt="add" onClick={() => setIsModalOpen(true)} />
        </div>
      </div>
      <ModalCrete
        isOpen={isModalOpen}
        onCloseModal={() => setIsModalOpen(false)}
        addTransaction={addTransaction}
      />
    </>
  );
}
export default MenuBar;
