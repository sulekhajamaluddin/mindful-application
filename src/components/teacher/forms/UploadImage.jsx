//Node Modules
import React, { useState } from "react";
//Project Files
import { getURL } from "../../../scripts/cloudStorage/getURL";
import { updateDocument } from "../../../scripts/firestore/updateDocument";
import { useUser } from "../../../state/UserProvider";
import { useModal } from "../../../state/ModalProvider";

export default function UploadImage({ course }) {
  const [imageURL, setImageURL] = useState("");
  const [disabled, setDisabled] = useState(true);
  const { coursesDispatch } = useUser();
  const { closeModal } = useModal();

  async function handleImage(e) {
    const file = e.target.files[0];
    const filePath = `courses/${course.id}_${file.name}`;
    const url = await getURL(file, filePath);
    setImageURL(url);
    setDisabled(false);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const editedCourse = { ...course, thumbnailURL: imageURL };
    await updateDocument("courses", editedCourse);
    coursesDispatch({ type: "update", payload: editedCourse });
    closeModal();
  }

  return (
    <form className="form modal-form" onSubmit={(event) => handleSubmit(event)}>
      <label>Choose the image to be uploaded</label>
      <input
        type="file"
        accept="image/png, image/jpeg, image/webp"
        onChange={(e) => handleImage(e)}
        required
      />
      <input type="submit" disabled={disabled} />
    </form>
  );
}
