import React, { useEffect, useState } from "react";
import MenuBar from "../menubar/MenuBar";
import style from "./cardinfo.module.css";
import hryvnia from "../../../img/darkhryvnia.png";
// import imgedit from "../../../img/edit.svg";
// import imgdelete from "../../../img/delete.svg";
import productsIcon from "../../../img/products.svg";
import clothesIcon from "../../../img/clothes.svg";
import phoneIcon from "../../../img/phone.svg";
import internetIcon from "../../../img/internet.svg";
import rentIcon from "../../../img/rent.svg";
import otherIcon from "../../../img/other.svg";
import arrow_down from "../../../img/arrow_down.svg";

const categoryIcons = {
  Продукти: productsIcon,
  Одяг: clothesIcon,
  Телефон: phoneIcon,
  Інтернет: internetIcon,
  Оренда: rentIcon,
  Інше: otherIcon,
};

function CardInfo({ getAllTransactions, deleteTransaction, addTransaction }) {
  const [transactions, setTransactions] = useState([]);
  // const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const loadTransactions = async () => {
      const allTx = await getAllTransactions();
      setTransactions(allTx);
    };
    loadTransactions();
  }, [getAllTransactions]);

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const [visibleCount, setVisibleCount] = useState(8);

  const filteredTransactions = transactions
    .filter((tx) => {
      const txDate = new Date(tx.date);
      return (
        txDate.getMonth() === currentMonth &&
        txDate.getFullYear() === currentYear
      );
    })
    .slice(0, visibleCount);

  return (
    <div className={style.containerWrapper}>
      <div className={style.containerInner}>
        <MenuBar addTransaction={addTransaction} />
        {transactions.length === 0 && <p>Транзакций нет</p>}
        <ul className={style.container}>
          {filteredTransactions.map(
            ({ id, category, amount, date, description }) => (
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

                  <p className={style.date}>{description}</p>
                </div>
                <div>
                  <div className={style.block}>
                    <img
                      className={style.hryvnia}
                      src={hryvnia}
                      alt="hryvnia"
                    />
                    <p className={style.amount}>{amount}</p>
                  </div>
                </div>
                {/* <div className={style.icon}>
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
                </div> */}
              </li>
            )
          )}
        </ul>
        {/* Кнопка показать больше / меньше */}
        {transactions.length > filteredTransactions.length && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              className={style.down}
              src={arrow_down}
              alt="arrow_down"
              onClick={() => setVisibleCount(visibleCount + 5)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default CardInfo;
