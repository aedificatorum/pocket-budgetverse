import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore, Timestamp } from "firebase-admin/firestore";

import serviceAccount from "./serviceAccount.json";

initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
});
(async () => {
  const db = getFirestore();
  const queryResult = await db
    .collection("transactions")
    .orderBy("reportingDateTicks")
    .limit(1)
    .get();

  const allItems = queryResult.docs.map((d) => <any>{ ...d.data(), id: d.id });

  const finalItems = allItems.map((item) => {
    return {
      ...item,
      insertedAtTicks: (item!.insertedAt as Timestamp).toMillis(),
      updatedAtTicks: (item.updatedAt as Timestamp).toMillis(),
    };
  });

  console.log(finalItems);
})();
