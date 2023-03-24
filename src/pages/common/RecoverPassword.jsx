// Node modules
import { useRef } from "react";
import { Link } from "react-router-dom";

// Project files
import { recoverAccount } from "../../scripts/authentication/recoverAccount";

export default function RecoverPassword() {
  // Local state
  const formRef = useRef();

  // Methods
  async function onSubmit(event) {
    event.preventDefault();
    const email = formRef.current.email.value;
    const result = await recoverAccount(email);
    result.status ? onSucess() : onFailure(result);
  }

  function onSucess() {
    const text =
      "Email with a reset link sent. Please check your SPAM/Junk folder as well.";
    alert(text);
  }

  function onFailure(result) {
    alert(result.message);
  }

  return (
    <div className="common-pages page-layout flex-column">
      <span>Forgot password? Don't worry, we can help you recover it.</span>
      <form ref={formRef} className="form" onSubmit={(e) => onSubmit(e)}>
        <input placeholder="Email" type="email" name="email" />
        <input type="submit" />
      </form>
      <Link to="/login">Go back to login</Link>
    </div>
  );
}
