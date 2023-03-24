import { collectionGroup, getDocs } from "firebase/firestore";
import { database } from "./databaseSetUp";

export async function readAllSubcollections(subcollectionName) {
  const documentReference = collectionGroup(database, subcollectionName);
  const documents = await getDocs(documentReference);
  const result = [];

  documents.forEach((doc) => {
    const parentId = doc.ref.parent.parent.id;
    const dataItem = { id: doc.id, parent_id: parentId, ...doc.data() };
    result.push(dataItem);
  });

  return result;
}
