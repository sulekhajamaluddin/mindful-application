//Node Modules
import React, { useState, useEffect } from "react";
//Project Files
import { queryDocuments } from "../../scripts/firestore/queryDocuments";
import { useUser } from "../../state/UserProvider";
import { useModal } from "../../state/ModalProvider";
import Loader from "../../components/common/Loader";
import Error from "../../pages/common/Error";
import CourseCard from "../../components/teacher/CourseCard";
import AddCourse from "../../components/teacher/forms/AddCourse";

export default function Home() {
  const { uid, user, courses, coursesDispatch } = useUser();
  const { openModal } = useModal();
  const [status, setStatus] = useState(0);
  const COLLECTION_NAME = "courses";

  useEffect(() => {
    loadData(COLLECTION_NAME);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadData(collectionName) {
    const data = await queryDocuments(collectionName, "teacherId", uid).catch(
      onFail
    );
    onSuccess(data);
  }

  function onSuccess(data) {
    coursesDispatch({ type: "initialise", payload: data });
    setStatus(1);
  }

  function onFail() {
    setStatus(2);
  }

  if (status === 0) return <Loader />;
  if (status === 2) return <Error />;

  const courseList = courses.map((course) => (
    <CourseCard key={course.id} course={course} />
  ));
  return (
    <div className="home page-layout flex-column-center">
      <p>Teacher Dashboard: {user.name}</p>
      <h1>My courses</h1>
      <button className="course-btn" onClick={() => openModal(<AddCourse />)}>
        Add course
      </button>
      <div className="course-list">{courseList}</div>
    </div>
  );
}
