import { getFirestore, Timestamp } from "firebase-admin/firestore";

type Account = {
  firestoreId: string;
  accountId: string;
  category: string;
  name: string;
  isIncome: boolean;
};

async function getAllAccounts() {
  const db = getFirestore();
  const queryResult = await db
    .collection("accounts")
    .get();

  const allItems = queryResult.docs.map((d) => <any>{ ...d.data(), id: d.id });
  const warnings: Warning[] = [];

  const finalItems = allItems.map((item) => {
    // We don't use the firestoreId for anything other than finding and correcting issues with the data
    // All application references refer to the accountId
    const account = { firestoreId: item.id } as Account;
    const warning = { id: item.id, messages: [] } as Warning;

    if (item.accountId) {
      account.accountId = item.accountId;
    } else {
      warning.messages.push("No accountId");
    }

    if (item.category) {
      account.category = item.category;
    } else {
      warning.messages.push("No category");
    }

    if (item.name) {
      account.name = item.name;
    } else {
      warning.messages.push("No name");
    }

    if (item.isIncome) {
      account.isIncome = item.isIncome;
    } else {
      account.isIncome = false;
    }

    return account;
  });

  return [finalItems, warnings];
}

export { getAllAccounts };