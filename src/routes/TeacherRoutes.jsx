//Node Modules
import { Routes, Route } from "react-router-dom";

//Project Files
import NotFound from "../pages/common/NotFound";
import Home from "../pages/teacher/Home";
import Navbar from "../components/teacher/Navbar";
import Course from "../pages/teacher/Course";
import Footer from "../components/common/Footer";

export default function TeacherRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course/:id" element={<Course />} />
        <Route path="*" element={<NotFound text={"page"} routePath={"/"} />} />
      </Routes>
      <Footer />
    </>
  );
}
