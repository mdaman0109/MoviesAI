import { useRef, useState } from "react";
import lang from "../../Utils/languageConstants";
import { useSelector, useDispatch } from "react-redux";
import openai from "../../Utils/openAI";
import { API_OPTIONS } from "../../Utils/constants";
import { addGptMovieResult } from "../../Utils/AISearchSlice";

const AISearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const { movieResults, movieNames } = useSelector((store) => store.ai);

  const searchMovieTMDB = async (movie) => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/search/movie?query=" +
          movie +
          "&include_adult=false&language=en-US&page=1",
        API_OPTIONS
      );
      const json = await data.json();

      return json.results;
      
      
    } catch (err) {
      console.error("🔥 Error fetching movies:", err.message);
      alert("Network error. Please check your internet connection.");
    }
  };

  const handleAISearchClick = async () => {
    const query = searchText.current.value;
    if (!query) return;

    setIsLoading(true); 

    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query : " +
      query +
      ". only give me names of 10 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    try {
      const gptResults = await openai.chat.completions.create({
        messages: [{ role: "user", content: gptQuery }],
        model: "gpt-3.5-turbo",
      });

      const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");
      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
      const tmdbResults = await Promise.all(promiseArray);
  
      

      dispatch(
        addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
      );
    } catch (err) {
      console.error("🔥 GPT or TMDB error:", err.message);
    } finally {
      setIsLoading(false); 
    }
  };

  const MovieCardShimmer = () => (
    <div className="w-[120px] sm:w-[140px] md:w-[150px] lg:w-[160px] flex flex-col items-center animate-pulse">
      <div className="w-full h-[180px] sm:h-[200px] md:h-[225px] lg:h-[240px] bg-gray-800 rounded-lg sm:rounded-xl md:rounded-2xl mb-2" />
      <div className="w-3/4 h-3 sm:h-4 bg-gray-700 rounded" />
    </div>
  );

  return (
    <>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col sm:flex-row items-center justify-center mt-[20px] bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg sm:rounded-xl shadow-xl p-3 sm:p-4 md:p-6 w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-auto gap-3 sm:gap-4"
      >
        <input
          ref={searchText}
          type="text"
          placeholder={lang[langKey].gptSearchPlaceholder}
          className="w-full sm:flex-1 p-3 sm:p-4 bg-white/80 text-black text-sm sm:text-base md:text-lg rounded-lg placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all duration-200"
        />

        <button
          onClick={handleAISearchClick}
          type="submit"
          className="bg-red-600 hover:bg-red-800 hover:border-2 hover:border-white font-bold cursor-pointer text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg shadow-md transition-all duration-300 active:scale-95 text-sm sm:text-base w-full sm:w-auto"
        >
          {lang[langKey].search}
        </button>
      </form>

      {isLoading && movieResults === null && (
        <div className="mt-6 sm:mt-8 md:mt-10 p-3 sm:p-4 md:p-6 bg-black/60 backdrop-blur-sm rounded-2xl sm:rounded-3xl md:rounded-4xl text-white shadow-xl w-full max-w-7xl mx-auto relative overflow-hidden">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-5 md:mb-6 text-center sm:text-left px-2">
            🎬 Movies are loading... Grab some popcorn to enjoy the show! 🍿✨
          </h1>

          <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-6 justify-center sm:justify-start px-2 sm:px-0">
            {Array(window.innerWidth < 640 ? 8 : window.innerWidth < 768 ? 12 : window.innerWidth < 1024 ? 16 : 20)
              .fill(0)
              .map((_, i) => (
                <MovieCardShimmer key={i} />
              ))}
          </div>

          <div className="h-8 sm:h-12 md:h-16" />
        </div>
      )}
    </>
  );
};

export default AISearchBar;