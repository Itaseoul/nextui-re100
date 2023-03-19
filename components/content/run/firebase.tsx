// v9 firebase
import FirebaseDbConfig_RTDB from './FirebaseConfig_RTDB'

import { initializeApp } from "firebase/app"; // vercel 에서 읽지못하는 것인가?
import { getDatabase } from "@firebase/database";
// import { getFirestore } from "firebase/firestore";


const app = initializeApp(FirebaseDbConfig_RTDB);
const realDB = getDatabase(app);
// const db = getFirestore(app);





export { realDB };