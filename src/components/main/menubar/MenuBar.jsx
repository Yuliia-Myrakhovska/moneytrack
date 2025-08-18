import React, { useState } from "react";
import add from "../../../img/add.svg";
import style from "./menubar.module.css";
import ModalCrete from "../../modal/modalcreate/ModalCreate";

function MenuBar({ onFilterChange, onOpenModal }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

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

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    onFilterChange({ category: e.target.value, month: selectedMonth });
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
    onFilterChange({ category: selectedCategory, month: e.target.value });
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.category}>
          <select
            className={style.select}
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">Категорії</option>
            {category.map((item, index) => (
              <option className={style.option} key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className={style.month}>
          <select
            className={style.select}
            value={selectedMonth}
            onChange={handleMonthChange}
          >
            <option value="">Місяць</option>
            {monthNamesUA.map((item, index) => (
              <option className={style.option} key={index} value={index}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className={style.add}>
          <img src={add} alt="add" onClick={onOpenModal} />
        </div>
      </div>
    </>
  );
}
export default MenuBar;
