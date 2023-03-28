//Node Modules
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//Project Files
import { readDocuments } from "../../scripts/firestore/readDocuments";
import { useUser } from "../../state/UserProvider";
import Loader from "../../components/common/Loader";
import Error from "../../pages/common/Error";
import CourseCard from "../../components/student/CourseCard";
import EmptyList from "../../components/common/EmptyList";

// good
export default function Home() {
  const navigate = useNavigate();
  const { courses, coursesDispatch } = useUser();
  const [status, setStatus] = useState(0);
  const COLLECTION_NAME = "courses";

  useEffect(() => {
    loadData(COLLECTION_NAME);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadData(collectionName) {
    const data = await readDocuments(collectionName).catch(onFail);
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
    <div className="all-courses page-layout flex-column-center">
      <h1>All available courses</h1>
      <div className="course-list">
        {courses.length === 0 ? <EmptyList /> : courseList}
        <button className="back" onClick={() => navigate(-1)}>
          Go back
        </button>
      </div>
    </div>
  );
}
