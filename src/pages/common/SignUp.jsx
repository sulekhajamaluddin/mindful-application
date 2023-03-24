// Node modules
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

// Project files
import { createAccount } from "../../scripts/authentication/createAccount";
import { readDocument } from "../../scripts/firestore/readDocument";
import { createDocumentManualID } from "../../scripts/firestore/createDocumentManualID";
import { useUser } from "../../state/UserProvider";
import setLocalStorage from "../../scripts/localStorage/setLocalStorage";

export default function SignUp() {
  // Global state
  const navigate = useNavigate();
  const { setCurrentUserId, dispatch } = useUser();

  const formRef = useRef();

  // Methods
  async function onSubmit(event) {
    event.preventDefault();
    const email = formRef.current.email.value;
    const password = formRef.current.password.value;
    const result = await createAccount(email, password);
    result.status ? onSuccess(result, email) : onFailure(result);
  }

  async function onSuccess(result, email) {
    const currentUserId = result.payload;
    const data = { email: email, role: "student", profilepicURL: "" };
    await createDocumentManualID("users", currentUserId, data);
    setCurrentUserId(currentUserId);
    const user = await readDocument("users", currentUserId);
    dispatch({ type: "initialise", payload: user });
    await setLocalStorage("user", {
      uid: currentUserId,
      user: user,
    });
    navigate("/");
  }

  function onFailure(result) {
    alert(`Cannot create an account, ${result.message}`);
  }

  return (
    <div className="common-pages page-layout flex-column">
      <span>Please enter the details</span>
      <form ref={formRef} className="form" onSubmit={(e) => onSubmit(e)}>
        <label>Email</label>
        <input type="email" name="email" required />
        <label>Password</label>
        <input type="password" name="password" required />
        <input type="submit"></input>
      </form>
      <Link className="link" to="/login">
        Back to login
      </Link>
    </div>
  );
}
