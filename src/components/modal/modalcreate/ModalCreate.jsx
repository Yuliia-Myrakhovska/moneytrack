import React, { useState } from "react";
import style from "./modalcreate.module.css";
import close from "../../../img/close.svg";
import productsIcon from "../../../img/products.svg";
import clothesIcon from "../../../img/clothes.svg";
import phoneIcon from "../../../img/phone.svg";
import internetIcon from "../../../img/internet.svg";
import rentIcon from "../../../img/rent.svg";
import otherIcon from "../../../img/other.svg";

const categoryIcons = {
  Продукти: productsIcon,
  Одяг: clothesIcon,
  Телефон: phoneIcon,
  Інтернет: internetIcon,
  Оренда: rentIcon,
  Інше: otherIcon,
};

function ModalCreate({ isOpen, onCloseModal, addTransaction, onSaved }) {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(() => {
    const d = new Date();
    return d.toISOString().slice(0, 10);
  });

  const categoryList = [
    "Продукти",
    "Одяг",
    "Телефон",
    "Інтернет",
    "Оренда",
    "Інше",
  ];

  const handleSave = async () => {
    const tx = {
      category,
      amount: parseFloat(amount),
      description,
      date,
    };
    await addTransaction(tx);
    if (onSaved) onSaved();
    setCategory("");
    setAmount("");
    setDescription("");
  };
  if (!isOpen) return null;
  return (
    <>
      <div className={style.overlay}></div>
      <div className={style.container}>
        <div className={style.close}>
          <img
            src={close}
            alt="close"
            onClick={() => {
              onCloseModal();
              window.location.reload();
            }}
          />
        </div>
        <div className={style.head}>
          {category !== "" ? (
            <div className={style.cat}>
              <p>{category}</p>{" "}
              <img src={close} alt="close" onClick={() => setCategory("")} />
            </div>
          ) : (
            <div className={style.emty}>
              <p>Виберіть Категорію</p>
            </div>
          )}
          <input
            className={style.date}
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <ul className={style.category}>
          {categoryList.map((item, index) => (
            <li className={style.name} key={index}>
              {categoryIcons[item] && (
                <img
                  className={style.img}
                  src={categoryIcons[item]}
                  alt={item}
                />
              )}
              <p onClick={() => setCategory(item)}>{item}</p>
            </li>
          ))}
        </ul>

        <div className={style.inputGroup}>
          <label htmlFor="amount">Сумма</label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className={style.inputGroup}>
          <label htmlFor="description">Описание</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button
          className={style.button}
          onClick={async () => {
            await handleSave();
            onCloseModal();
            window.location.reload();
          }}
        >
          Сохранить
        </button>
      </div>
    </>
  );
}
export default ModalCreate;
