//Node Modules
import { Link } from "react-router-dom";

//Project Files
import logo from "../../assets/logo.png";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container flex-center">
        <Link className="logo" to="/">
          <img className="logo" src={logo} alt="mindful written in green" />
        </Link>
        <div className="links">
          <Link to="/signup">Sign Up</Link>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </nav>
  );
}
