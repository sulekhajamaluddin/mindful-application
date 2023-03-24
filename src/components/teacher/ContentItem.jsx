//Node Modules
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//Project Files
import DeleteIcon from "../teacher/DeleteIcon";
import EditIcon from "../teacher/EditIcon";
import deleteDocument from "../../scripts/firestore/deleteDocument";
import { useUser } from "../../state/UserProvider";
import { useModal } from "../../state/ModalProvider";
import ContentFrame from "../teacher/ContentFrame";
import AddLink from "./forms/AddLink";

export default function ContentItem({ content }) {
  const { id } = useParams();
  const { contentsDispatch } = useUser();
  const { openModal } = useModal();
  const COLLECTION_NAME = `courses/${id}/contents/`;
  const state = [content, id];

  async function onDelete(item) {
    const message = `Are you sure you want to delete ${item.name}`;
    const result = window.confirm(message);
    if (!result) return;
    await deleteDocument(COLLECTION_NAME, item.id);
    contentsDispatch({ type: "delete", payload: item.id });
  }

  function modalView() {
    openModal(<ContentFrame state={state} />);
  }

  const openLinkButton = (
    <a href={content.url} target="_blank" rel="noreferrer">
      View link
    </a>
  );

  const openModalButton = (
    <button onClick={() => modalView()}>View {content.type}</button>
  );

  const addLinkForm = <AddLink item={content} id={id} />;

  const uploadLinkIcon = (
    <button onClick={() => openModal(addLinkForm)}>
      <FontAwesomeIcon className="upload-icon" icon={"fa-solid fa-link"} />
    </button>
  );

  return (
    <div className="content-item flex-column-center">
      <div className="details flex-center">
        <span>{content.name}</span>
        {content.type === "link" ? openLinkButton : openModalButton}
      </div>
      <div className="button-holder">
        <EditIcon
          item={content}
          collectionName={COLLECTION_NAME}
          type={"content"}
        />
        {content.type === "link" && uploadLinkIcon}
        <DeleteIcon onDelete={() => onDelete(content)} />
      </div>
    </div>
  );
}
