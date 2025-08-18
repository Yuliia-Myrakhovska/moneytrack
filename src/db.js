import Dexie from "dexie";

export const db = new Dexie("FinanceDB");

db.version(1).stores({
  transactions: "++id, category, amount, description, date",
});

export async function addTransaction(tx) {
  // tx: { title, category, amount, description, date, photo }
  try {
    const id = await db.transactions.add(tx);
    return id;
  } catch (err) {
    console.error("addTransaction error:", err);
    throw err;
  }
}

export async function getAllTransactions(sort = "date", desc = true) {
  try {
    const collection = db.transactions.orderBy(sort);
    return desc
      ? await collection.reverse().toArray()
      : await collection.toArray();
  } catch (err) {
    console.error("getAllTransactions error:", err);
    throw err;
  }
}

//  по id
export async function getTransactionById(id) {
  return db.transactions.get(id);
}

export async function updateTransaction(tx) {
  try {
    const id = tx.id;
    if (!id) throw new Error("updateTransaction: missing id");
    await db.transactions.update(id, tx);
    return true;
  } catch (err) {
    console.error("updateTransaction error:", err);
    throw err;
  }
}

export async function deleteTransaction(id) {
  try {
    await db.transactions.delete(id);
  } catch (err) {
    console.error("deleteTransaction error:", err);
    throw err;
  }
}

// по категории
export async function getByCategory(category) {
  return db.transactions.where("category").equals(category).reverse().toArray();
}

export async function getByDateRange(startDate, endDate) {
  return db.transactions
    .where("date")
    .between(startDate, endDate, false, true)
    .reverse()
    .toArray();
}

export async function getSummary(startDate, endDate) {
  const items =
    startDate && endDate
      ? await getByDateRange(startDate, endDate)
      : await getAllTransactions();
  const result = { total: 0, byCategory: {} };
  for (const it of items) {
    result.total += Number(it.amount) || 0;
    const c = it.category || "Без категории";
    result.byCategory[c] =
      (result.byCategory[c] || 0) + (Number(it.amount) || 0);
  }
  return result;
}

// Утилита: конвертировать File (из input[type=file]) в dataURL (base64)
// export function fileToDataUrl(file) {
//   return new Promise((resolve, reject) => {
//     if (!file) return resolve(null);
//     const reader = new FileReader();
//     reader.onload = () => resolve(reader.result); // data:image/...
//     reader.onerror = reject;
//     reader.readAsDataURL(file);
//   });
// }

function formatDate(date) {
  return date.toISOString().slice(0, 10);
}

export async function getSumCurrentMonth() {
  const now = new Date();

  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  const startStr = formatDate(start);
  const endStr = formatDate(end);

  const items = await db.transactions
    .where("date")
    .between(startStr, endStr, false, true)
    .toArray();

  const sum = items.reduce((sum, tx) => sum + Number(tx.amount || 0), 0);
  return Number(sum.toFixed(2));
}

export async function getSumLast6Months() {
  const now = new Date();
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const start = new Date(now.getFullYear(), now.getMonth() - 5, 1);
  const startStr = formatDate(start);
  const endStr = formatDate(end);
  const items = await db.transactions
    .where("date")
    .between(startStr, endStr, false, true)
    .toArray();

  const sum = items.reduce((sum, tx) => sum + Number(tx.amount || 0), 0);
  return Number(sum.toFixed(2));
}

export async function getSumCurrentYear() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const end = new Date(now.getFullYear(), 11, 31);
  const startStr = formatDate(start);
  const endStr = formatDate(end);
  const items = await db.transactions
    .where("date")
    .between(startStr, endStr, false, true)
    .toArray();

  const sum = items.reduce((sum, tx) => sum + Number(tx.amount || 0), 0);
  return Number(sum.toFixed(2));
}

export default db;
