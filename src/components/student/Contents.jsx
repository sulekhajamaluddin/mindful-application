//Project Files
import ContentItem from "../../components/student/ContentItem";

export default function Contents({ contents, id }) {
  const contentsList = contents.map((content) => (
    <ContentItem key={content.id} content={content} />
  ));

  return <div className="contents flex-column-center">{contentsList}</div>;
}
