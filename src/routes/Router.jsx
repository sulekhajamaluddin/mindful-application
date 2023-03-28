import TeacherRoutes from "./TeacherRoutes";
import StudentRoutes from "./StudentRoutes";

// good
// However...
// Why the schema says you have 2 things called Teacher and Student when here
// Is clearly stated that is just 1 user with a key called role, just like I
// recommended when reviewing the documentation
export default function Router({ user }) {
  return (
    <div>
      {user.role === "teacher" && <TeacherRoutes />}
      {user.role === "student" && <StudentRoutes />}
    </div>
  );
}
