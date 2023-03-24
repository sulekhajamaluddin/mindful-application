//Node Modules
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//Project Files
import logo from "../../assets/logo.png";
import { useUser } from "../../state/UserProvider";
import placeholder from "../../assets/profilepic_placeholder.png";
import clearLocalStorage from "../../scripts/localStorage/clearLocalStorage";

export default function Navbar() {
  const { user, dispatch, setCurrentUserId } = useUser();
  const navigate = useNavigate();
  const { profilepicURL } = user;
  const imageSource = profilepicURL === "" ? placeholder : profilepicURL;

  function logout() {
    dispatch({
      type: "reset",
    });
    setCurrentUserId("");
    clearLocalStorage();
    navigate("/landingpage");
  }

  const logoutIcon = "fa-solid fa-right-from-bracket";
  const calendarURL = "https://calendar.google.com/calendar/u/0";

  return (
    <nav className="navbar">
      <div className="container flex-center">
        <Link className="logo" to="/">
          <img className="logo" src={logo} alt="mindful written in green" />
        </Link>
        <div className="user flex-center">
          <a href={calendarURL} className="icon">
            <FontAwesomeIcon className="calendar" icon="fa-solid fa-calendar" />
          </a>
          <button className="icon" onClick={() => logout()}>
            <FontAwesomeIcon className="logout" icon={logoutIcon} />
          </button>
          <img className="avatar" src={imageSource} alt="A photograph" />
        </div>
      </div>
    </nav>
  );
}
