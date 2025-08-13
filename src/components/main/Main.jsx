import MenuBar from "./menubar/MenuBar";
import CardInfo from "./cardlist/CardInfo";

function Main({ getAllTransactions, deleteTransaction, addTransaction }) {
  return (
    <main>
      <MenuBar addTransaction={addTransaction} />
      <CardInfo
        getAllTransactions={getAllTransactions}
        deleteTransaction={deleteTransaction}
      />
    </main>
  );
}
export default Main;
