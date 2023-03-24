import { collection, getDocs, query, where } from "firebase/firestore";
import { database } from "./databaseSetUp";

export async function queryDocuments(collectionName, param, id) {
  const documentReference = query(
    collection(database, collectionName),
    where(param, "==", id)
  );

  const documents = await getDocs(documentReference);
  const result = [];

  documents.forEach((doc) => {
    const dataItem = { id: doc.id, ...doc.data() };
    result.push(dataItem);
  });
  return result;
}
