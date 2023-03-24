//Node Modules
import React, { useRef } from "react";
//Project Files
import { createDocument } from "../../../scripts/firestore/createDocument";
import { useUser } from "../../../state/UserProvider";
import { useModal } from "../../../state/ModalProvider";

export default function AddContent({ id }) {
  const { contentsDispatch } = useUser();
  const formRef = useRef();
  const { closeModal } = useModal();
  const COLLECTION_NAME = `courses/${id}/contents/`;

  async function handleSubmit(e) {
    e.preventDefault();
    const newContentName = formRef.current.name.value;
    const newContent = { name: newContentName, url: "", type: "image" };
    const documentId = await createDocument(COLLECTION_NAME, newContent);
    contentsDispatch({
      type: "create",
      payload: { id: documentId, ...newContent },
    });
    closeModal();
  }

  return (
    <form ref={formRef} className="form" onSubmit={(e) => handleSubmit(e)}>
      <label>Title of content</label>
      <input type="text" name="name" required />
      <input type="submit" className="primary-button"></input>
    </form>
  );
}
