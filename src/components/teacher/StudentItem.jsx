//Node Modules
import { useParams } from "react-router-dom";
//Project Files
import { useUser } from "../../state/UserProvider";
import DeleteIcon from "./DeleteIcon";
import deleteDocument from "../../scripts/firestore/deleteDocument";

export default function StudentItem({ student }) {
  const { id } = useParams();
  const { studentsDispatch } = useUser();
  const COLLECTION_NAME = `courses/${id}/students`;
  const COLLECTION_NAME_USERS = `users/${student.id}/courses`;

  async function deleteStudent(item) {
    const message = `Are you sure you want to delete ${item.name}`;
    const result = window.confirm(message);
    if (!result) return;
    await deleteDocument(COLLECTION_NAME, item.id);
    await deleteDocument(COLLECTION_NAME_USERS, id);
    studentsDispatch({ type: "delete", payload: item.id });
  }

  return (
    <div className="student-item flex-center">
      <span>{student.email}</span>
      <DeleteIcon onDelete={() => deleteStudent(student)} />
    </div>
  );
}
