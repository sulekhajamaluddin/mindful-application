//Node modules

//Project Files
import Modal from "./components/common/Modal";
import Router from "./routes/Router";
import SignedOutRoutes from "./routes/SignedOutRoutes";
import { useUser } from "./state/UserProvider";

//Styles
import "./styles/styles.scss";

export default function App() {
  const { uid, user } = useUser();
  return (
    <>
      {!uid && <SignedOutRoutes />}
      {uid && <Router user={user} />}
      <Modal />
    </>
  );
}
