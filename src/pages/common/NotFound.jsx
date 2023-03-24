// Node modules
import { Link } from "react-router-dom";
export default function NotFound({ text, routePath }) {
  return (
    <div className="alert-page flex-column-center">
      <h1>
        <span>Sorry we could not find this {text},</span>
      </h1>
      <Link className="back-button" to={routePath}>
        Go back
      </Link>
    </div>
  );
}
