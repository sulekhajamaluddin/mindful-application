import TeacherRoutes from "./TeacherRoutes";
import StudentRoutes from "./StudentRoutes";

export default function Router({ user }) {
  return (
    <div>
      {user.role === "teacher" && <TeacherRoutes />}
      {user.role === "student" && <StudentRoutes />}
    </div>
  );
}
