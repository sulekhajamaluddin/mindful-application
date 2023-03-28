//Node modules

//Project Files
import Modal from "./components/common/Modal";
import Router from "./routes/Router";
import SignedOutRoutes from "./routes/SignedOutRoutes";
import { useUser } from "./state/UserProvider";

//Styles
import "./styles/styles.scss";

// naming -1 for not renaming to App.jsx
export default function App() {
  const { uid, user } = useUser();

  // Naming -3
  // Why is called SignOut and Routes?
  // Is like calling OpenDoor to opening a door and Door to close the door. It makes no sense.
  // This is really important for good develpment
  return (
    <>
      {!uid && <SignedOutRoutes />}
      {uid && <Router user={user} />}
      <Modal />
    </>
  );
}
