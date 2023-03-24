//Node Modules
import React, { useState } from "react";
//Project Files
import { updateDocument } from "../../../scripts/firestore/updateDocument";
import { useUser } from "../../../state/UserProvider";
import { useModal } from "../../../state/ModalProvider";

export default function UploadTitle({ item, collectionName, type }) {
  const { coursesDispatch, contentsDispatch } = useUser();
  const { closeModal } = useModal();
  const [itemName, setItemName] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const editedItem = { ...item, name: itemName };
    await updateDocument(collectionName, editedItem);
    type === "course" &&
      coursesDispatch({ type: "update", payload: editedItem });
    type === "content" &&
      contentsDispatch({ type: "update", payload: editedItem });

    closeModal();
  }

  return (
    <form className="form modal-form" onSubmit={(event) => handleSubmit(event)}>
      <label>Name of the {type}</label>
      <input
        type="text"
        value={itemName}
        placeholder={`Name of the ${type}`}
        required
        onChange={(e) => setItemName(e.target.value)}
      />
      <input type="submit" />
    </form>
  );
}
