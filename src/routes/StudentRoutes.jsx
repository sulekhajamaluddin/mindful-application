//Node Modules
import { Routes, Route } from "react-router-dom";
import Navbar from "../components/student/Navbar";
import AllCourses from "../pages/student/AllCourses";

//Project Files
import NotFound from "../pages/common/NotFound";
import Home from "../pages/student/Home";
import Course from "../pages/student/Course";
import Footer from "../components/common/Footer";
export default function StudentRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course/:id" element={<Course />} />
        <Route path="/allcourses" element={<AllCourses />} />
        <Route path="*" element={<NotFound text={"page"} routePath={"/"} />} />
      </Routes>
      <Footer />
    </>
  );
}
