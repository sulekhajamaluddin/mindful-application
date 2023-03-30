//Project Files
import Modal from "./components/common/Modal";
import SignedInRoutes from "./routes/Router";
import SignedOutRoutes from "./routes/SignedOutRoutes";
import { useUser } from "./state/UserProvider";

//Styles
import "./styles/styles.scss";

export default function App() {
  const { uid, user } = useUser();
  return (
    <>
      {!uid && <SignedOutRoutes />}
      {uid && <SignedInRoutes user={user} />}
      <Modal />
    </>
  );
}
