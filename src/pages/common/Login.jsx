//Node Modules
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
//Project Files
import { loginUser } from "../../scripts/authentication/loginUser";
import { useUser } from "../../state/UserProvider";
import { readDocument } from "../../scripts/firestore/readDocument";
import setLocalStorage from "../../scripts/localStorage/setLocalStorage";

export default function Login() {
  const navigate = useNavigate();
  const { setCurrentUserId, dispatch } = useUser();
  const formRef = useRef();

  async function onSubmit(event) {
    event.preventDefault();
    const email = formRef.current.email.value;
    const password = formRef.current.password.value;
    const result = await loginUser(email, password);
    result.status ? onSuccess(result) : onFailure(result);
  }

  async function onSuccess(result) {
    const currentUserId = result.payload;
    setCurrentUserId(currentUserId);
    const user = await readDocument("users", currentUserId);
    dispatch({ type: "initialise", payload: user });
    await setLocalStorage("uid", currentUserId);
    await setLocalStorage("user", user);
    navigate("/");
  }

  function onFailure(result) {
    alert(`Cannot login, ${result.message}`);
  }

  return (
    <div className="common-pages page-layout flex-column">
      <span>Please enter login details</span>
      <form ref={formRef} className="form" onSubmit={(e) => onSubmit(e)}>
        <label>Email</label>
        <input type="email" name="email" required />
        <label>Password</label>
        <input type="password" name="password" required />
        <input type="submit"></input>
      </form>
      <div className="link flex-column">
        <Link to="/recover-password">Forgot password?</Link>
        <Link to="/signup">Create a new account</Link>
      </div>
    </div>
  );
}
