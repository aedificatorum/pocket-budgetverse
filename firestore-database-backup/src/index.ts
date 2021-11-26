import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getAllAccounts } from "./accounts";
import serviceAccount from "./serviceAccount.json";
import { getAllTransactions } from "./transactions";

initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
});

(async () => {
  const [transactions, transactionWarnings] = await getAllTransactions();
  
  console.log(transactions);
  console.log(transactionWarnings);
  
  const [accounts, accountWarnings] = await getAllAccounts();
  console.log(accounts);
  console.log(accountWarnings);
})();
