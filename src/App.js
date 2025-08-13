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
} from "./db";

function App() {
  return (
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
      />
    </div>
  );
}

export default App;
