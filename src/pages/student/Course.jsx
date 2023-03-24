import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { readDocuments } from "../../scripts/firestore/readDocuments";
import Loader from "../../components/common/Loader";
import Error from "../common/Error";
import Contents from "../../components/student/Contents";
import { useUser } from "../../state/UserProvider";

export default function Course() {
  const [status, setStatus] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();
  const { contents, contentsDispatch } = useUser();

  const COLLECTION_NAME = `courses/${id}/contents`;

  useEffect(() => {
    loadData(COLLECTION_NAME);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadData(collectionName) {
    const data = await readDocuments(collectionName).catch(onFail);
    onSuccess(data);
  }

  function onSuccess(data) {
    contentsDispatch({ type: "initialise", payload: data });
    setStatus(1);
  }

  function onFail() {
    setStatus(2);
  }

  if (status === 0) return <Loader />;
  if (status === 2) return <Error />;

  return (
    <div className="course page-layout flex-column-center">
      <h1>Course contents</h1>
      <Contents contents={contents} id={id} />
      <button className="back" onClick={() => navigate(-1)}>
        Go back
      </button>
    </div>
  );
}
