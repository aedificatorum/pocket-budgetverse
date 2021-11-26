import { initializeApp, cert, ServiceAccount } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

import serviceAccount from './serviceAccount.json';

initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
});
(async () => {
  const db = getFirestore();
  const queryResult = await db.collection('transactions').limit(1).get();
  console.log(queryResult.docs[0].data());
})();