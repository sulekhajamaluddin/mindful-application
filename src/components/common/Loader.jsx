//Node Modules
import MoonLoader from "react-spinners/MoonLoader";

export default function Loader() {
  return (
    <div className="loader flex-center">
      <MoonLoader
        color={"#466D1D"}
        loading={true}
        size={50}
        aria-label="Ring Loader"
      />
    </div>
  );
}
