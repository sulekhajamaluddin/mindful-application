import { firebaseApp } from "../firebase/firebaseSetUp";
import { getAuth } from "firebase/auth";

export const auth = getAuth(firebaseApp);
