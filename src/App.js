import React, { useState } from "react";
import "./App.css";
import Main from "./components/main/Main";
import Statistics from "./components/main/statistics/Statistics";
import ModalCreate from "./components/modal/modalcreate/ModalCreate";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <BrowserRouter basename="/moneytrack">
        <Routes>
          <Route
            path="/"
            element={
              <Main
                getAllTransactions={getAllTransactions}
                deleteTransaction={deleteTransaction}
                getSumCurrentMonth={getSumCurrentMonth}
                getSumLast6Months={getSumLast6Months}
                getSumCurrentYear={getSumCurrentYear}
                onOpenModal={() => setIsModalOpen(true)}
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
      <ModalCreate
        isOpen={isModalOpen}
        onCloseModal={() => setIsModalOpen(false)}
        addTransaction={addTransaction}
      />
    </>
  );
}

export default App;
