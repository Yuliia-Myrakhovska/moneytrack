import React, { useEffect, useState } from "react";
import style from "./statistics.module.css";
import darkhryvnia from "../../../img/darkhryvnia.png";

function Statistics({ getSummary, getByDateRange }) {
  const [monthSummary, setMonthSummary] = useState({});
  const [yearSummary, setYearSummary] = useState({});
  const year = new Date().getFullYear();

  const [monthlyExpenses, setMonthlyExpenses] = useState([]);

  const categories = [
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
  const currentMonthName = monthNamesUA[new Date().getMonth()];
  useEffect(() => {
    const now = new Date();

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
      .toISOString()
      .slice(0, 10);

    const startOfYear = new Date(now.getFullYear(), 0, 1)
      .toISOString()
      .slice(0, 10);

    const today = now.toISOString().slice(0, 10);

    async function loadData() {
      const monthData = await getSummary(startOfMonth, today);
      const monthByCat = {};
      categories.forEach((cat) => {
        monthByCat[cat] = monthData.byCategory[cat] || 0;
      });
      setMonthSummary(monthByCat);

      const yearData = await getSummary(startOfYear, today);
      const yearByCat = {};
      categories.forEach((cat) => {
        yearByCat[cat] = yearData.byCategory[cat] || 0;
      });
      setYearSummary(yearByCat);

      const allYearTransactions = await getByDateRange(startOfYear, today);

      const monthsMap = {};
      allYearTransactions.forEach((t) => {
        const monthIndex = new Date(t.date).getMonth();
        monthsMap[monthIndex] = (monthsMap[monthIndex] || 0) + Number(t.amount);
      });

      const monthsArray = monthNamesUA.map((name, i) => ({
        month: name,
        total: monthsMap[i] || 0,
      }));

      setMonthlyExpenses(monthsArray);
    }

    loadData();
  }, []);

  return (
    <div className={style.statistics}>
      <h2 className={style.month}>{currentMonthName}</h2>
      <div style={{ borderBottom: "1px solid #728156" }}>
        {Object.entries(monthSummary).map(([cat, sum]) => (
          <div className={style.block} key={cat}>
            <p>{cat}</p>
            <span className={style.span}></span>
            <div className={style.money}>
              <img src={darkhryvnia} alt="darkhryvnia" />
              <p>{sum}</p>
            </div>
          </div>
        ))}
      </div>
      <h2 className={style.month}>{year}</h2>
      <div style={{ borderBottom: "1px solid #728156" }}>
        {Object.entries(yearSummary).map(([cat, sum]) => (
          <div className={style.block} key={cat}>
            <p>{cat}</p>
            <span className={style.span}></span>
            <div className={style.money}>
              <img src={darkhryvnia} alt="darkhryvnia" />
              <p>{sum}</p>
            </div>
          </div>
        ))}
      </div>
      <h2 className={style.month}>{year}</h2>
      <div style={{ borderBottom: "1px solid #728156" }}>
        {monthlyExpenses.map(({ month, total }) => (
          <div className={style.block} key={month}>
            <p>{month}</p>
            <span className={style.span}></span>
            <div className={style.money}>
              <img src={darkhryvnia} alt="darkhryvnia" />
              <p>{total}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Statistics;
