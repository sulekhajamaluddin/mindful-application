// Node modules
import { createUserWithEmailAndPassword } from "firebase/auth";

// Project files
import { auth } from "./authSetUp";

export async function createAccount(email, password) {
  let result = { status: false, payload: "", message: "" };

  try {
    const data = await createUserWithEmailAndPassword(auth, email, password);

    result = { status: true, payload: data.user.uid, message: "Created!" };
  } catch (error) {
    result.message = error.code;
  }

  return result;
}
