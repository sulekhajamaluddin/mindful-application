import { firebaseApp } from "../firebase/firebaseSetUp";
import { getStorage } from "firebase/storage";

export const cloudStorage = getStorage(firebaseApp);
