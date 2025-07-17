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

  // Shimmer card component
  const MovieCardShimmer = () => (
    <div className="w-[150px] flex flex-col items-center  animate-pulse">
      <div className="w-full h-[225px] bg-gray-800 rounded-2xl mb-2" />
      <div className="w-3/4 h-4 bg-gray-700 rounded" />
    </div>
  );

  return (
    <>
      <form
        onSubmit={(e) => e.preventDefault()}
        className=" flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl shadow-xl p-6 w-[800px] mx-auto"
      >
        <input
          ref={searchText}
          type="text"
          placeholder={lang[langKey].gptSearchPlaceholder}
          className="w-[550px] p-4 bg-white/80 text-black text-lg rounded-lg placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all duration-200 mr-4"
        />

        <button
          onClick={handleAISearchClick}
          type="submit"
          className="bg-red-600 hover:bg-red-800 hover:border-2 hover:border-white font-bold cursor-pointer text-white px-6 py-4 rounded-lg shadow-md transition-all duration-300 active:scale-95"
        >
          {lang[langKey].search}
        </button>
      </form>

      {isLoading && movieResults=== null && (
  <div className="mt-10 p-6 bg-black/60 backdrop-blur-sm rounded-4xl text-white shadow-xl w-full  relative overflow-hidden">
    <h1 className="text-2xl font-bold mb-6">
      🎬 Movies are loading... Grab some popcorn to enjoy the show! 🍿✨
    </h1>

    <div className="flex flex-wrap gap-6 justify-start">
      {Array(20)
        .fill(0)
        .map((_, i) => (
          <MovieCardShimmer key={i} />
        ))}
    </div>

    <div className="h-16" />
  </div>
)}

    </>
  );
};

export default AISearchBar;
