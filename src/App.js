import "./App.css";
import HeadSwiper from "./components/head/HeadSwiper";
import Main from "./components/main/Main";
import {
  getAllTransactions,
  getSumCurrentMonth,
  getSumLast6Months,
  getSumCurrentYear,
  deleteTransaction,
  addTransaction,
  getSummary,
  getByDateRange,
} from "./db";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="container-app">
        <HeadSwiper
          getSumCurrentMonth={getSumCurrentMonth}
          getSumLast6Months={getSumLast6Months}
          getSumCurrentYear={getSumCurrentYear}
        />
        <Main
          getAllTransactions={getAllTransactions}
          deleteTransaction={deleteTransaction}
          addTransaction={addTransaction}
          getSummary={getSummary}
          getByDateRange={getByDateRange}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
