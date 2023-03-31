// Node modules
import {
  useState,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import getLocalStorage from "../scripts/localStorage/getLocalStorage";
import UserReducer from "../state/Reducer";
import CourseReducer from "../state/Reducer";
import ContentsReducer from "../state/Reducer";
import StudentsReducer from "../state/Reducer";

//Properties
const Context = createContext(null);

export function UserProvider({ children }) {
  //State
  const [user, dispatch] = useReducer(
    UserReducer,
    getLocalStorage("user") || null
  );
  const [uid, setUid] = useState(getLocalStorage("uid") || null);

  const [courses, coursesDispatch] = useReducer(CourseReducer, []);
  const [contents, contentsDispatch] = useReducer(ContentsReducer, []);
  const [students, studentsDispatch] = useReducer(StudentsReducer, []);

  function setCurrentUserId(currentUid) {
    setUid(currentUid);
  }

  useEffect(() => {
    const currentUser = getLocalStorage("user");
    if (currentUser) {
      dispatch({ type: "initialise", payload: currentUser });
    }
  }, []);

  //Properties
  const values = {
    uid,
    setCurrentUserId,
    user,
    dispatch,
    courses,
    coursesDispatch,
    contents,
    contentsDispatch,
    students,
    studentsDispatch,
  };

  return <Context.Provider value={values}>{children}</Context.Provider>;
}

export function useUser() {
  const context = useContext(Context);
  if (!context)
    throw new Error(
      "useUser only works if the parent component is wrapped in <UserProvider>"
    );

  return context;
}
