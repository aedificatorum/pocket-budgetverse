import * as jsonlines from "jsonlines";
import * as fs from "fs";
import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getAllAccounts } from "./accounts";
import serviceAccount from "./serviceAccount.json";
import { getAllTransactions } from "./transactions";

function writeToFile(fileName: string, data: any[]) {
  // TODO: New output folder for each date+time of run?
  const fileStream = fs.createWriteStream(
    `./output/${fileName}.jsonl`
  );
  const stringifier = jsonlines.stringify();
  stringifier.pipe(fileStream);
  data.forEach((datum) =>
    stringifier.write(datum)
  );
  stringifier.end();
}

// TODO: Support getting the service account for injection in an action/environment
// Might not be necessary depending where this is deployed (e.g. a function app where we can also deploy the json file)
initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
});


(async () => {
  const [transactions, transactionWarnings] = await getAllTransactions();
  const [accounts, accountWarnings] = await getAllAccounts();

  if (transactionWarnings.length > 0 || accountWarnings.length > 0) {
    console.log("Account Warnings");
    console.log(accountWarnings);

    console.log();

    console.log("Transaction Warnings");
    console.log(transactionWarnings);

    // TODO: Early exit on warnings?
  }

  writeToFile("transactions", transactions);
  writeToFile("accounts", accounts);
})();
