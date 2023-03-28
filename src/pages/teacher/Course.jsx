import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { readDocuments } from "../../scripts/firestore/readDocuments";
import Loader from "../../components/common/Loader";
import Error from "../common/Error";
import StudentItem from "../../components/teacher/StudentItem";
import Contents from "../../components/teacher/Contents";
import { useUser } from "../../state/UserProvider";
import EmptyList from "../../components/common/EmptyList";

export default function Course() {
  const [status, setStatus] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();
  const { contents, contentsDispatch, students, studentsDispatch } = useUser();
  const [state, setState] = useState("contents");
  const COLLECTION_NAME = `courses/${id}/contents`;
  const COLLECTION_NAME_STUDENTS = `courses/${id}/students`;

  useEffect(() => {
    loadData(COLLECTION_NAME, COLLECTION_NAME_STUDENTS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadData(collectionName, collectionNameStudents) {
    const data = await readDocuments(collectionName).catch(onFail);
    const studentData = await readDocuments(collectionNameStudents).catch(
      onFail
    );
    onSuccess(data, studentData);
  }

  function onSuccess(data, studentData) {
    contentsDispatch({ type: "initialise", payload: data });
    studentsDispatch({ type: "initialise", payload: studentData });
    setStatus(1);
  }

  function onFail() {
    setStatus(2);
  }

  // Formating -1
  // This ones should be closer to your return
  if (status === 0) return <Loader />;
  if (status === 2) return <Error />;

  const studentsList =
    students.length === 0 ? (
      <EmptyList />
    ) : (
      students.map((student) => (
        <StudentItem key={student.id} student={student} />
      ))
    );

  return (
    <div className="course page-layout flex-column-center">
      <h1>Course details</h1>
      <div className="button-holder">
        <button className="content-btn" onClick={() => setState("contents")}>
          Contents
        </button>
        <button className="student-btn" onClick={() => setState("students")}>
          Students
        </button>
      </div>
      {state === "contents" && <Contents contents={contents} id={id} />}
      {state === "students" && studentsList}
      <button className="back" onClick={() => navigate(-1)}>
        Go Back
      </button>
    </div>
  );
}
