//Node Modules
import React, { useState } from "react";
//Project Files
import { getURL } from "../../../scripts/cloudStorage/getURL";
import { updateDocument } from "../../../scripts/firestore/updateDocument";
import { useUser } from "../../../state/UserProvider";
import { useModal } from "../../../state/ModalProvider";

export default function UploadFile({ content, id }) {
  const [fileURL, setFileURL] = useState("");
  const [type, setType] = useState("file");
  const { contentsDispatch } = useUser();
  const { closeModal } = useModal();
  const COLLECTION_NAME = `courses/${id}/contents/`;
  const [disabled, setDisabled] = useState(true);

  async function handleFile(e) {
    const file = e.target.files[0];
    if (file.type.match("video.*")) {
      setDisabled(true);
      alert(
        "Please provide a link to the video using the option to add links to contents."
      );
    } else {
      file.type.match("image.*") && setType("image");
      const filePath = `courses/${id}/contents/${content.id}_${file.name}`;
      const url = await getURL(file, filePath);
      setFileURL(url);
      setDisabled(false);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const editedContent = { ...content, url: fileURL, type: type };
    await updateDocument(COLLECTION_NAME, editedContent);
    contentsDispatch({ type: "update", payload: editedContent });
    closeModal();
  }

  return (
    <form className="form modal-form" onSubmit={(event) => handleSubmit(event)}>
      <label>Choose the file to be uploaded</label>
      <input type="file" onChange={(e) => handleFile(e)} required />
      <input className="primary" type="submit" disabled={disabled} />
    </form>
  );
}
