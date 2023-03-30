//Node Modules
import { useParams } from "react-router-dom";

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

  function modalView(action) {
    openModal(<ContentFrame state={state} action={action} />);
  }

  const uploadLinkIcon = (
    <button onClick={() => openModal(addLinkForm)}>
      <span>Edit</span>
    </button>
  );

  const handlelink = (
    <div className="link-file">
      <a href={content.url} target="_blank" rel="noreferrer">
        View
      </a>
      {uploadLinkIcon}
    </div>
  );

  const handleModal = (
    <div className="modal-file">
      <button onClick={() => modalView("view")}>View</button>
      <button onClick={() => modalView("edit")}>Edit</button>
    </div>
  );
  const addLinkForm = <AddLink item={content} id={id} />;

  return (
    <div className="content-item flex-column-center">
      <div className="details flex-center">
        <span>{content.name}</span>
        {content.type === "link" ? handlelink : handleModal}
      </div>
      <div className="button-holder">
        <EditIcon
          item={content}
          collectionName={COLLECTION_NAME}
          type={"content"}
        />
        <DeleteIcon onDelete={() => onDelete(content)} />
      </div>
    </div>
  );
}
