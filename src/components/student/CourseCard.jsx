//Node Modules
import { Link, useNavigate } from "react-router-dom";
//Project Files
import placeholder from "../../assets/thumbnail_placeholder.jpeg";
import { useUser } from "../../state/UserProvider";
import { createDocumentManualID } from "../../scripts/firestore/createDocumentManualID";

export default function CourseCard({ course }) {
  const { uid, user } = useUser();
  const navigate = useNavigate();
  const COLLECTION_NAME = `courses/${course.id}/students`;
  const COLLECTION = `users/${uid}/courses`;

  async function handleEnroll() {
    await createDocumentManualID(COLLECTION_NAME, uid, user);
    await createDocumentManualID(COLLECTION, course.id, course);
    navigate("/");
  }

  const imageSource = course?.thumbnailURL ? course.thumbnailURL : placeholder;

  return (
    <div className="student-course flex-column-center">
      <Link className="thumbnail-holder" to={`/course/${course.id}`}>
        <img className="thumbnail" src={imageSource} alt="thumbnail" />
        <h2>{course.name}</h2>
      </Link>
      <span className="teacher">-By {course.teacherName}</span>
      <button className="enroll" onClick={() => handleEnroll()}>
        Enroll
      </button>
    </div>
  );
}
