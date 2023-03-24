//Node Modules
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
//Project Files
import { readDocuments } from "../../scripts/firestore/readDocuments";
import { useUser } from "../../state/UserProvider";
import Loader from "../../components/common/Loader";
import Error from "../../pages/common/Error";
import CourseCard from "../../components/student/CourseCard";
import EmptyList from "../../components/common/EmptyList";

export default function Home() {
  const { user, uid, courses, coursesDispatch } = useUser();
  const [status, setStatus] = useState(0);
  const COLLECTION_NAME = `users/${uid}/courses`;

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
    <div className="home student-home page-layout flex-column-center">
      <h2>
        Welcome, <span>{user.email}</span>
      </h2>
      <Link className="course-btn" to="/allcourses">
        View Available Courses
      </Link>
      <h1>My courses</h1>
      <div className="course-list">
        {courses.length === 0 ? <EmptyList /> : courseList}
      </div>
    </div>
  );
}
