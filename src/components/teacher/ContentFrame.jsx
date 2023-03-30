//Node Modules
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//Project Files
import placeholder from "../../assets/placeholder_upload.png";
import UploadFile from "./forms/UploadFile";
import AddLink from "./forms/AddLink";
import { useModal } from "../../state/ModalProvider";

export default function ContentFrame({ state, action }) {
  const [content, id] = state;
  const { openModal } = useModal();
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

  const uploadForm = <UploadFile content={content} id={id} />;
  const addLinkForm = <AddLink item={content} id={id} />;
  const uploadIcon = "fa-solid fa-cloud-arrow-up";

  return (
    <div className="content-frame flex-column-center">
      {action === "edit" && (
        <div className="button-holder">
          <button onClick={() => openModal(uploadForm)}>
            <FontAwesomeIcon className="upload-icon" icon={uploadIcon} />
          </button>
          <button onClick={() => openModal(addLinkForm)}>
            <FontAwesomeIcon
              className="upload-icon"
              icon={"fa-solid fa-link"}
            />
          </button>
        </div>
      )}
      {displayUnit}
    </div>
  );
}
