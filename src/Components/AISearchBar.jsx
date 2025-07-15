import lang from "../Utils/languageConstants";
import { useSelector } from "react-redux";


const AISearchBar = () => {
    const langKey = useSelector((store)=>store.config.lang)
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl shadow-xl p-6 w-[800px] mx-auto"
    >
      <input
        type="text"
        placeholder={lang[langKey].gptSearchPlaceholder}
        className="w-[550px] p-4 bg-white/80 text-black text-lg rounded-lg placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all duration-200 mr-4"
      />

      <button
        type="submit"
        className="bg-red-600 hover:bg-red-800 hover:border-2 hover:border-white font-bold cursor-pointer text-white px-6 py-4 rounded-lg shadow-md transition-all duration-300 active:scale-95"
      >
        {lang[langKey].search}
      </button>
    </form>
  );
};

export default AISearchBar;
