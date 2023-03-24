//Project Files
import ContentItem from "../../components/student/ContentItem";
import EmptyList from "../../components/common/EmptyList";

export default function Contents({ contents, id }) {
  const contentsList =
    contents.length === 0 ? (
      <EmptyList />
    ) : (
      contents.map((content) => (
        <ContentItem key={content.id} content={content} />
      ))
    );

  return <div className="contents flex-column-center">{contentsList}</div>;
}
