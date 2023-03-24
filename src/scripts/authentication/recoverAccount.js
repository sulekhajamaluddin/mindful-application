//Node Modules
import { sendPasswordResetEmail } from "firebase/auth";

// Project files
import { auth } from "./authSetUp";

export async function recoverAccount(email) {
  let result = { status: false, payload: "", message: "" };

  try {
    await sendPasswordResetEmail(auth, email);

    result = { status: true, payload: "", message: "Link sent" };
  } catch (error) {
    result.message = error.code;
  }

  return result;
}
