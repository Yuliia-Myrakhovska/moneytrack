import React, { useEffect, useState } from "react";
import MenuBar from "../menubar/MenuBar";
import style from "./cardinfo.module.css";
import hryvnia from "../../../img/darkhryvnia.png";
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

function CardInfo({ getAllTransactions, onOpenModal }) {
  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState({ category: "", month: "" });
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    const loadTransactions = async () => {
      const allTx = await getAllTransactions();
      setTransactions(allTx);
    };
    loadTransactions();
  }, [getAllTransactions]);

  const filteredTransactions = transactions
    .filter((tx) => {
      const txDate = new Date(tx.date);
      const matchCategory = filters.category
        ? tx.category === filters.category
        : true;
      const matchMonth =
        filters.month !== ""
          ? txDate.getMonth() === Number(filters.month)
          : true;
      return matchCategory && matchMonth;
    })
    .slice(0, visibleCount);

  return (
    <div className={style.containerWrapper}>
      <div className={style.containerInner}>
        <MenuBar onFilterChange={setFilters} onOpenModal={onOpenModal} />

        {transactions.length === 0 || filteredTransactions.length === 0 ? (
          <div
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p className={style.text}>Витрат нема</p>
          </div>
        ) : (
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
                </li>
              )
            )}
          </ul>
        )}

        {transactions.length > filteredTransactions.length &&
        filteredTransactions.length > 0 ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              className={style.down}
              src={arrow_down}
              alt="arrow_down"
              onClick={() => setVisibleCount(visibleCount + 5)}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default CardInfo;
