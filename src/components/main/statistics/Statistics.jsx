import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import style from "./statistics.module.css";
import darkhryvnia from "../../../img/darkhryvnia.png";
import arrow_back from "../../../img/arrow_back.svg";
import { Link } from "react-router-dom";

import productsIcon from "../../../img/products.svg";
import clothesIcon from "../../../img/clothes.svg";
import phoneIcon from "../../../img/phone.svg";
import internetIcon from "../../../img/internet.svg";
import rentIcon from "../../../img/rent.svg";
import otherIcon from "../../../img/other.svg";

function Statistics({ getSummary, getByDateRange }) {
  const [monthSummary, setMonthSummary] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [yearSummary, setYearSummary] = useState({});
  const year = new Date().getFullYear();

  const [monthlyExpenses, setMonthlyExpenses] = useState([]);

  const COLORS = [
    "#235347",
    "#657166",
    "#728156",
    "#88976c",
    "#98a77c",
    "#cfd6c4",
  ];

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

      const filtered = Object.entries(monthByCat).map(([name, value]) => ({
        name,
        value,
      }));

      setFilteredData(filtered);

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

  const totalValue = filteredData.reduce((sum, entry) => sum + entry.value, 0);
  const categoryIcons = {
    Продукти: productsIcon,
    Одяг: clothesIcon,
    Телефон: phoneIcon,
    Інтернет: internetIcon,
    Оренда: rentIcon,
    Інше: otherIcon,
  };

  return (
    <div className={style.statistics}>
      <Link className={style.header} to="/">
        <img src={arrow_back} alt="arrow_back" className={style.icon} />
        <h2 className={style.font}>Статистика</h2>
      </Link>
      <h2 className={style.month}>
        {currentMonthName}, {year}
      </h2>
      <div className={style.pieChart}>
        <PieChart width={300} height={300}>
          <Pie
            data={filteredData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {filteredData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          {/* <Tooltip /> */}
        </PieChart>

        {/* Список под диаграммой */}
        <ul className={style.ul}>
          {filteredData.map((entry, index) => (
            <li className={style.li} key={index}>
              <div
                style={{
                  width: 12,
                  height: 12,
                  backgroundColor: COLORS[index % COLORS.length],
                  marginRight: 8,
                }}
              />
              {entry.name}:{" "}
              {totalValue > 0
                ? ((entry.value / totalValue) * 100).toFixed(0)
                : 0}
              %
            </li>
          ))}
        </ul>
      </div>

      <div className={style.monthContainer}>
        {Object.entries(monthSummary).map(([cat, sum]) => (
          <div className={style.block} key={cat}>
            <div className={style.cat}>
              {categoryIcons[cat] && (
                <img className={style.img} src={categoryIcons[cat]} alt={cat} />
              )}
              <p>{cat}</p>
            </div>
            <div className={style.money}>
              <img src={darkhryvnia} alt="darkhryvnia" />
              <p>{sum}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className={style.month}>{year}</h2>

      <div className={style.monthContainer}>
        {Object.entries(yearSummary).map(([cat, sum]) => (
          <div className={style.block} key={cat}>
            <div className={style.cat}>
              {categoryIcons[cat] && (
                <img className={style.img} src={categoryIcons[cat]} alt={cat} />
              )}
              <p>{cat}</p>
            </div>
            <div className={style.money}>
              <img src={darkhryvnia} alt="darkhryvnia" />
              <p>{sum}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={style.container}>
        {monthlyExpenses.map(({ month, total }) => (
          <div className={style.blockMonth} key={month}>
            <p>{month}</p>
            <div className={style.money}>
              <img src={darkhryvnia} alt="darkhryvnia" />
              <p>{total}</p>
            </div>
          </div>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={monthlyExpenses}
          margin={{ top: 20, bottom: 5 }}
          boxSizing="border-box"
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          {/* <XAxis dataKey="month" /> */}
          <XAxis dataKey="month" />

          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#728156">
            {/* <LabelList
              dataKey="value"
              tick={{ fontSize: 12 }}
              // наклон на 45 градусов
              textAnchor="top"
              position="insideTop"
              fill="#fff"
            /> */}
            {/* <LabelList
              dataKey="value"
              position="top"
              offset={15}
              angle={-45}
              formatter={(value) => (value > 0 ? value : "")}
            /> */}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Statistics;
