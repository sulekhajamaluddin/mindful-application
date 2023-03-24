import { firebaseApp } from "../firebase/firebaseSetUp";
import { getFirestore } from "firebase/firestore";

export const database = getFirestore(firebaseApp);
