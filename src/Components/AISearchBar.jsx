import { useRef } from "react";
import lang from "../Utils/languageConstants";
import { useSelector } from "react-redux";
import openai from "../Utils/openAI";
import { API_OPTIONS } from "../Utils/constants";
import { useDispatch } from "react-redux";
import { addGptMovieResult } from "../Utils/AISearchSlice";

const AISearchBar = () => {
  const dispatch = useDispatch()
    const langKey = useSelector((store)=>store.config.lang)
    const searchText = useRef(null)
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
  }catch (err) {
    console.error("🔥 Error fetching movies:", err.message);
    alert("Network error. Please check your internet connection.");
  }};
    const handleAISearchClick= async()=>
    {
      console.log(searchText.current.value)
      
    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query : " +
      searchText.current.value +
      ". only give me names of 10 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });

    if (!gptResults.choices) {
      <div>OpenAI API Not working</div>
    }

    console.log(gptResults.choices?.[0]?.message?.content);
    const gptMovies = gptResults.choices?.[0]?.message?.content.split(","); //csv to array
    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    // [Promise, Promise, Promise, Promise, Promise]

    const tmdbResults = await Promise.all(promiseArray);
    console.log(tmdbResults);
     dispatch(
      addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
    );
    }
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl shadow-xl p-6 w-[800px] mx-auto"
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
  );
};

export default AISearchBar;
