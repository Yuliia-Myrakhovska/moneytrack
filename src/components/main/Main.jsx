import CardInfo from "./cardlist/CardInfo";
import style from "./main.module.css";
import HeadSwiper from "../head/HeadSwiper";
import Header from "../head/Header";

function Main({
  getAllTransactions,
  deleteTransaction,
  onOpenModal,
  getSumCurrentMonth,
  getSumLast6Months,
  getSumCurrentYear,
}) {
  return (
    <>
      <Header />
      <main>
        <div className={style.container}>
          <HeadSwiper
            getSumCurrentMonth={getSumCurrentMonth}
            getSumLast6Months={getSumLast6Months}
            getSumCurrentYear={getSumCurrentYear}
          />
        </div>

        <CardInfo
          getAllTransactions={getAllTransactions}
          deleteTransaction={deleteTransaction}
          onOpenModal={onOpenModal}
        />
      </main>
    </>
  );
}
export default Main;
