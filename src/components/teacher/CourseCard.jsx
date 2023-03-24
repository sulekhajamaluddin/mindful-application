//Node Modules
import { Link } from "react-router-dom";
//Project Files
import AddImageIcon from "../common/AddImageIcon";
import DeleteIcon from "./DeleteIcon";
import EditIcon from "./EditIcon";
import deleteDocument from "../../scripts/firestore/deleteDocument";
import { useUser } from "../../state/UserProvider";
import placeholder from "../../assets/thumbnail_placeholder.jpeg";

export default function CourseCard({ course }) {
  const { coursesDispatch } = useUser();
  const imageSource = course?.thumbnailURL ? course.thumbnailURL : placeholder;

  async function onDelete(item) {
    const message = `Are you sure you want to delete ${item.name}`;
    const result = window.confirm(message);
    if (!result) return;
    await deleteDocument("courses", item.id);
    coursesDispatch({ type: "delete", payload: item.id });
  }

  return (
    <div className="card flex-column-center">
      <Link className="thumbnail-holder" to={`/course/${course.id}`}>
        <img className="thumbnail" src={imageSource} alt="thumbnail" />
        <h2>{course.name}</h2>
      </Link>
      <div className="button-holder">
        <AddImageIcon course={course} />
        <EditIcon item={course} collectionName={"courses"} type={"course"} />
        <DeleteIcon onDelete={() => onDelete(course)} />
      </div>
    </div>
  );
}
