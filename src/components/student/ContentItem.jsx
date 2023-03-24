//Node Modules
import { useParams } from "react-router-dom";
//Project Files
import { useModal } from "../../state/ModalProvider";
import ContentFrame from "../student/ContentFrame";

export default function ContentItem({ content }) {
  const { id } = useParams();
  const { openModal } = useModal();
  const COLLECTION_NAME = `courses/${id}/contents/`;
  const state = [content, id, COLLECTION_NAME];

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

  return (
    <div className="content-item flex-column-center">
      <div className="details flex-center">
        <span>{content.name}</span>
        {content.type === "link" ? openLinkButton : openModalButton}
      </div>
    </div>
  );
}
