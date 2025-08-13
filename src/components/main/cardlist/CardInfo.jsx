import React, { useEffect, useState } from "react";
import style from "./cardinfo.module.css";
import hryvnia from "../../../img/hryvnia.png";
import imgedit from "../../../img/edit.svg";
import imgdelete from "../../../img/delete.svg";
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

function CardInfo({ getAllTransactions, deleteTransaction }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const loadTransactions = async () => {
      const allTx = await getAllTransactions();
      setTransactions(allTx);
      console.log(allTx);
    };

    loadTransactions();
  }, [getAllTransactions]);

  return (
    <div>
      {transactions.length === 0 && <p>Транзакций нет</p>}
      <ul className={style.container}>
        {transactions.map(({ id, category, amount, date }) => (
          <li key={id} className={style.card}>
            <div className={style.cat}>
              {categoryIcons[category] && (
                <img
                  className={style.img}
                  src={categoryIcons[category]}
                  alt={category}
                />
              )}
            </div>
            <div className={style.info}>
              <div className={style.head}>
                <p className={style.category}>{category}</p>
                <p className={style.date}>{date}</p>
              </div>
              <div className={style.block}>
                <img className={style.hryvnia} src={hryvnia} alt="hryvnia" />
                <p className={style.amount}>{amount}</p>
              </div>
            </div>
            <div className={style.icon}>
              <img className={style.edit} src={imgedit} alt="edit" />
              <img
                className={style.delete}
                src={imgdelete}
                alt="delete"
                onClick={() => {
                  deleteTransaction(id);
                  window.location.reload();
                }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default CardInfo;
