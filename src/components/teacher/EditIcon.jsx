//Node Modules
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//Project Files
import Form from "./forms/EditTitle";
import { useModal } from "../../state/ModalProvider";

export default function EditIcon({ item, collectionName, type }) {
  const { openModal } = useModal();
  const editForm = (
    <Form item={item} collectionName={collectionName} type={type} />
  );

  const editIcon = "fa-solid fa-pen-to-square";
  return (
    <button onClick={() => openModal(editForm)}>
      <FontAwesomeIcon className="edit-icon" icon={editIcon} />
    </button>
  );
}
