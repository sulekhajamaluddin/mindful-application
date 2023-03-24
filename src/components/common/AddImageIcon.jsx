//Node Modules
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useModal } from "../../state/ModalProvider";
import Form from "../../components/teacher/forms/UploadImage";

export default function AddImageIcon({ course }) {
  const { openModal } = useModal();

  return (
    <button onClick={() => openModal(<Form course={course} />)}>
      <FontAwesomeIcon className="camera-icon" icon={"fa-solid fa-camera"} />
    </button>
  );
}
