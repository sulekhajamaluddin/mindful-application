import { doc, deleteDoc } from "firebase/firestore";
import { database } from "./databaseSetUp";

export default async function deleteDocument(collectionName, dataId) {
  const documentReference = doc(database, collectionName, dataId);
  await deleteDoc(documentReference);
}
