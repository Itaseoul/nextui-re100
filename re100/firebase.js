// v9 firebase
import FirebaseDbConfig_RTDB from './FirebaseConfig_RTDB'

import { initializeApp } from "@firebase/app";
import { getDatabase } from "@firebase/database";
// import { getFirestore } from "firebase/firestore";


const app = initializeApp(FirebaseDbConfig_RTDB);
const realDB = getDatabase(app);
// const db = getFirestore(app);





export { realDB };