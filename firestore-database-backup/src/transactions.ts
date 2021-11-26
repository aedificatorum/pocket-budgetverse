import { getFirestore, Timestamp } from "firebase-admin/firestore";

type Transaction = {
  id: string;
  transactionId: string;
  dateTicks: number;
  reportingDateTicks: number;
  location: string;
  accountId: string;
  currency: string;
  amount: number;
  to: string;
  details?: string;
  project?: string;
  insertedAtTicks: number;
  updatedAtTicks: number;
};

async function getAllTransactions() {
  const db = getFirestore();
  const queryResult = await db
    .collection("transactions")
    .orderBy("reportingDateTicks")
    .limit(10) // TODO: There's no limit (download all)
    .get();

  const allItems = queryResult.docs.map((d) => <any>{ ...d.data(), id: d.id });
  const warnings: Warning[] = [];

  const finalItems = allItems.map((item) => {
    // Firestore documents always have an id, and for transaction it is also their transactionId
    const transaction = { id: item.id, transactionId: item.id } as Transaction;
    const warning = { id: item.id, messages: [] } as Warning;

    if (item.insertedAt) {
      transaction.insertedAtTicks = (item.insertedAt as Timestamp).toMillis();
    } else {
      warning.messages.push("No insertedAt");
    }

    if (item.updatedAt) {
      transaction.updatedAtTicks = (item.updatedAt as Timestamp).toMillis();
    } else {
      warning.messages.push("No updatedAt");
    }

    if (item.dateTicks) {
      transaction.dateTicks = item.dateTicks;
    } else {
      warning.messages.push("No dateTicks");
    }

    if (item.reportingDateTicks) {
      transaction.reportingDateTicks = item.reportingDateTicks;
    } else {
      warning.messages.push("No reportingDateTicks");
    }

    if (item.location) {
      transaction.location = item.location;
    } else {
      warning.messages.push("No location");
    }

    if (item.accountId) {
      transaction.accountId = item.accountId;
    } else {
      warning.messages.push("No accountId");
    }

    if (item.currency) {
      transaction.currency = item.currency;
    } else {
      warning.messages.push("No currency");
    }

    if (item.amount) {
      transaction.amount = item.amount;
    } else {
      warning.messages.push("No amount");
    }

    if (item.to) {
      transaction.to = item.to;
    } else {
      warning.messages.push("No to");
    }

    if (item.details) {
      transaction.details = item.details;
    } else {
      transaction.details = "";
    }

    if (item.project) {
      transaction.project = item.project;
    } else {
      transaction.project = "";
    }

    if (warning.messages.length > 0) {
      warnings.push(warning);
    }

    return transaction;
  });

  return [finalItems, warnings];
}

export { getAllTransactions };
