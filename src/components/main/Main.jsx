import CardInfo from "./cardlist/CardInfo";
import Statistics from "./statistics/Statistics";
import { Routes, Route, Link } from "react-router-dom";
import style from "./main.module.css";

function Main({
  getAllTransactions,
  deleteTransaction,
  addTransaction,
  getSummary,
  getByDateRange,
}) {
  return (
    <main>
      <div className={style.linkContainer}>
        <Link className={style.link} to="/">
          Витрати
        </Link>
        <Link className={style.link} to="/statistics">
          Статистика
        </Link>
      </div>

      <Routes>
        <Route
          path="/"
          element={
            <CardInfo
              getAllTransactions={getAllTransactions}
              deleteTransaction={deleteTransaction}
              addTransaction={addTransaction}
            />
          }
        />
        <Route
          path="/statistics"
          element={
            <Statistics
              getSummary={getSummary}
              getByDateRange={getByDateRange}
            />
          }
        />
      </Routes>
    </main>
  );
}
export default Main;
