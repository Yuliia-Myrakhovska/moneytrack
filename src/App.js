import "./App.css";
import Main from "./components/main/Main";
import Nav from "./components/head/nav/Nav";
import Statistics from "./components/main/statistics/Statistics";
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
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Main
              getAllTransactions={getAllTransactions}
              deleteTransaction={deleteTransaction}
              addTransaction={addTransaction}
              getSumCurrentMonth={getSumCurrentMonth}
              getSumLast6Months={getSumLast6Months}
              getSumCurrentYear={getSumCurrentYear}
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
    </BrowserRouter>
  );
}

export default App;
