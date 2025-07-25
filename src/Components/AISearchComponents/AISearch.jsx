import { BGPHOTO } from "../../Utils/constants";
import AISearchBar from "./AISearchBar";
import AIMovieSuggestion from "./AIMovieSuggestion";
import { useSelector } from "react-redux";
import lang from "../../Utils/languageConstants";

const AISearch = () => {

  const langKey = useSelector((store) => store.config.lang);
  return (
    <div className="relative w-full min-h-screen">
      <img
        className="fixed inset-0 w-full h-full object-cover -z-20"
        src={BGPHOTO}
        alt="Background"
      />

      <div className="relative z-30 flex flex-col justify-start items-center pt-30 sm:pt-38 md:pt-32 lg:pt-40 xl:pt-44 px-2 sm:px-4 md:px-6 lg:px-8">
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl p-4 rounded-4xl bg-black/20 backdrop-blur-sm border border-white/20 xl:text-5xl text-shadow-red-900 text-shadow-xs font-semibold text-center text-white  mb-4 sm:mb-5 md:mb-6 px-2 sm:px-4 leading-tight sm:leading-snug w-[100vw] max-w-4xl">
          {lang[langKey].welcomeTo} <span className="text-red-700 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-shadow-gray-500 text-shadow-xs ring-red-700 ring-1  sm:ring-2 p-1 inline-block">&nbsp;{lang[langKey].AISearch}&nbsp;</span>
          <br className="hidden sm:block" />
          <span className="block sm:inline text-white text-shadow-red-900 text-lg sm:text-xl md:text-2xl lg:text-3xl text-shadow-xs mt-2 sm:mt-0">
            {lang[langKey].searchMessage}
          </span>
        </h1>

        <AISearchBar />
        <AIMovieSuggestion />
      </div>
    </div>
  );
};

export default AISearch;