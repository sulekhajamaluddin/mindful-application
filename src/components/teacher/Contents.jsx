import ContentItem from "../../components/teacher/ContentItem";
import AddContent from "./forms/AddContent";
import { useModal } from "../../state/ModalProvider";

export default function Contents({ contents, id }) {
  const { openModal } = useModal();
  const contentsList = contents.map((content) => (
    <ContentItem key={content.id} content={content} />
  ));

  return (
    <div className="contents flex-column-center">
      <button
        className="add-btn"
        onClick={() => openModal(<AddContent id={id} />)}
      >
        Add new content
      </button>
      {contentsList}
    </div>
  );
}
