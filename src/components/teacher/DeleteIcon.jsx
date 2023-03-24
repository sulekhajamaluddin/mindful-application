//Node Modules
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DeleteIcon({ onDelete }) {
  return (
    <button onClick={() => onDelete()}>
      <FontAwesomeIcon className="delete-icon" icon={"fa-solid fa-trash-can"} />
    </button>
  );
}
