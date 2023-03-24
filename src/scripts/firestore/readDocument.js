import { doc, getDoc } from "firebase/firestore";
import { database } from "./databaseSetUp";

export async function readDocument(collectionName, docId) {
  const documentReference = doc(database, collectionName, docId);
  const document = await getDoc(documentReference);
  if (document.exists()) {
    return document.data();
  } else {
    console.log("No such document!");
  }
}
