import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getAllAccounts } from "./accounts";
import serviceAccount from "./serviceAccount.json";
import { getAllTransactions } from "./transactions";

// TODO: Support getting the service account for injection in an action/environment
// Might not be necessary depending where this is deployed (e.g. a function app where we can also deploy the json file)
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

  // TODO: Format as json lines
  // TODO: Save data to disk
  // TODO: Decide what to do in the presence of warnings
})();
