//Node Modules
import { Routes, Route } from "react-router-dom";

//Project Files
import LandingPage from "../pages/common/LandingPage";
import SignUp from "../pages/common/SignUp";
import Login from "../pages/common/Login";
import RecoverPassword from "../pages/common/RecoverPassword";
import NotFound from "../pages/common/NotFound";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

// good
export default function SignedOutRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/landingpage" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recover-password" element={<RecoverPassword />} />
        <Route path="*" element={<NotFound text={"page"} routePath={"/"} />} />
      </Routes>
      <Footer />
    </>
  );
}
