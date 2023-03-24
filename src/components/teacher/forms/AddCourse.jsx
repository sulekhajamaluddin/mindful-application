//Node Modules
import React, { useState } from "react";
//Project Files
import { createDocument } from "../../../scripts/firestore/createDocument";
import { useUser } from "../../../state/UserProvider";
import { useModal } from "../../../state/ModalProvider";

export default function AddCourse() {
  const [newCourseName, setNewCourseName] = useState("");
  const { uid, user, coursesDispatch } = useUser();
  const { closeModal } = useModal();

  async function handleSubmit(e) {
    e.preventDefault();
    const newCourse = {
      name: newCourseName,
      thumbnailURL: "",
      teacherId: uid,
      teacherName: user.name,
    };
    const documentId = await createDocument("courses", newCourse);
    coursesDispatch({
      type: "create",
      payload: { id: documentId, ...newCourse },
    });
    closeModal();
  }

  return (
    <form className="form" onSubmit={(e) => handleSubmit(e)}>
      <label>Name</label>
      <input
        type="text"
        value={newCourseName}
        required
        onChange={(e) => setNewCourseName(e.target.value)}
      />
      <input type="submit" className="primary-button"></input>
    </form>
  );
}
