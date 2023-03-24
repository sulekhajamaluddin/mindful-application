//Node Modules
import { signInWithEmailAndPassword } from "firebase/auth";

// Project files
import { auth } from "./authSetUp";

export async function loginUser(email, password) {
  let result = { status: false, payload: "", message: "" };

  try {
    const data = await signInWithEmailAndPassword(auth, email, password);

    result = { status: true, payload: data.user.uid, message: "Logged in!" };
  } catch (error) {
    result.message = error.code;
  }

  return result;
}
