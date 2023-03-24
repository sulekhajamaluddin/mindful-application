//Node Modules
import React, { useState } from "react";
//Project Files
import { updateDocument } from "../../../scripts/firestore/updateDocument";
import { useUser } from "../../../state/UserProvider";
import { useModal } from "../../../state/ModalProvider";

export default function AddLink({ item, id }) {
  const { contentsDispatch } = useUser();
  const { closeModal } = useModal();
  const [link, setLink] = useState("");
  const COLLECTION_NAME = `courses/${id}/contents/`;

  async function handleSubmit(e) {
    e.preventDefault();
    const editedItem = { ...item, url: link, type: "link" };
    await updateDocument(COLLECTION_NAME, editedItem);
    contentsDispatch({ type: "update", payload: editedItem });
    closeModal();
  }

  return (
    <form className="form modal-form" onSubmit={(event) => handleSubmit(event)}>
      <label>Please provide the link to the content</label>
      <input
        type="text"
        value={link}
        required
        onChange={(e) => setLink(e.target.value)}
      />
      <input type="submit" />
    </form>
  );
}
