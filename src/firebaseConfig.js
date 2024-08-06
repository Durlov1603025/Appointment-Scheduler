import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCgGsGZ_0AS_ur2SZ03m6wrtff7aRZb_GY",
  authDomain: "appoinment-scheduler-29ed0.firebaseapp.com",
  projectId: "appoinment-scheduler-29ed0",
  storageBucket: "appoinment-scheduler-29ed0.appspot.com",
  messagingSenderId: "504953738609",
  appId: "1:504953738609:web:ad657ab8f2c824861dd2d0",
  measurementId: "G-9DPP17QD53"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
