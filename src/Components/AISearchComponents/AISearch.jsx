import { BGPHOTO } from "../../Utils/constants";
import AISearchBar from "./AISearchBar";
import AIMovieSuggestion from "./AIMovieSuggestion";

const AISearch = () => {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
     
      <img
        className="absolute inset-0 w-full h-full object-cover opacity-75 z-0"
        src={BGPHOTO}
        alt="Background"
      />

     
      <div className="absolute inset-0 z-20 flex flex-col justify-start items-center mt-40 px-4">
        <AISearchBar />
        <AIMovieSuggestion />
      </div>
    </div>
  );
};

export default AISearch;
