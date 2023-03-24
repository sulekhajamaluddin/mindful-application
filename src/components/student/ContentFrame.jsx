//Project Files
import placeholder from "../../assets/placeholder.png";

export default function ContentFrame({ state }) {
  const [content] = state;
  const imageSource = content.url === "" ? placeholder : content.url;
  const fileSource = encodeURIComponent(content.url);
  const source = `https://docs.google.com/gview?url=${fileSource}&embedded=true`;

  const displayUnit =
    content.type === "image" ? (
      <img src={imageSource} alt="Content" />
    ) : (
      <iframe
        className="embed"
        src={source}
        title="content"
        loading="lazy"
      ></iframe>
    );

  return (
    <div className="content-frame flex-column-center">
      {displayUnit}
      {/* <iframe src={source} height="90%" width="100%" title="Content"></iframe> */}
    </div>
  );
}
