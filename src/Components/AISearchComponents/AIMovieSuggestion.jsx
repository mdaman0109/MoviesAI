import { useSelector } from "react-redux";
import { Link } from "react-router";
const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500";

const AIMovieSuggestion = () => {
  const { movieResults, movieNames } = useSelector((store) => store.ai);

  if (!movieNames || !movieResults || movieResults.length === 0) return null;

  return (
    <div className="mt-4 sm:mt-6 md:mt-8 lg:mt-10 mx-2 sm:mx-4 md:mx-6 lg:mx-8 p-3 sm:p-4 md:p-6 lg:p-8 bg-black/60 backdrop-blur-sm rounded-2xl sm:rounded-3xl md:rounded-4xl text-white shadow-xl w-full max-w-7xl">
      <div className="w-full overflow-x-hidden">
        <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-3 sm:mb-4 md:mb-5 lg:mb-6 text-center sm:text-left px-2 sm:px-0 leading-tight">
          🎬 Movies based on your search. Sit back, relax, and enjoy the show! 🍿✨
        </h1>

        {movieNames.map((movieName, index) => (
          <div key={movieName} className="mb-6 sm:mb-8 md:mb-10 lg:mb-12">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white text-shadow-red-900 text-shadow-sm font-semibold mb-3 sm:mb-4 md:mb-5 text-center sm:text-left px-2 sm:px-0 break-words">
              {movieName}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6 justify-items-center px-2 sm:px-0">
              {movieResults[index]
                ?.filter((movie) => movie.poster_path)
                .map((movie) => (
                  <div
                    key={movie.id}
                    className="w-full max-w-[140px] sm:max-w-[150px] md:max-w-[160px] lg:max-w-[170px] flex flex-col items-center group cursor-pointer"
                  >
                    <Link to={"/movieinfo/" + movie.id} className="w-full">
                      <img
                        className="w-full h-[180px] sm:h-[200px] md:h-[220px] lg:h-[240px] xl:h-[255px] object-cover mb-2 rounded-lg sm:rounded-xl md:rounded-2xl group-hover:scale-105 transition-transform duration-300 group-hover:border-2 group-hover:border-red-500 shadow-lg"
                        src={IMG_CDN_URL + movie.poster_path}
                        alt={movie.title}
                        loading="lazy"
                      />
                      <p className="text-center text-xs sm:text-sm md:text-base font-medium line-clamp-2 px-1 leading-tight group-hover:text-red-400 transition-colors duration-200">
                        {movie.title}
                      </p>
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        ))}

        <div className="h-8 sm:h-12 md:h-16 lg:h-20" />
      </div>
    </div>
  );
};

export default AIMovieSuggestion;