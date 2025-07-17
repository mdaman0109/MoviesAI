import { useSelector } from "react-redux";
import { Link } from "react-router";
const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500";

const AIMovieSuggestion = () => {
  const { movieResults, movieNames } = useSelector((store) => store.ai);

  if (!movieNames || !movieResults || movieResults.length === 0) return null;

  return (




   
    <div className="m-6 p-6 bg-black/60 backdrop-blur-sm rounded-4xl text-white shadow-xl w-full  overflow-hidden">
      <div className="overflow-y-scroll max-h-[80vh] scroll-smooth pr-3">
        <h1 className="text-2xl font-bold mb-4">
          🎬 Movies based on your search. Sit back, relax, and enjoy the show! 🍿✨
        </h1>

        {movieNames.map((movieName, index) => (
          <div key={movieName} className="mb-10">
            <h2 className="text-xl font-semibold mb-4">{movieName}</h2>

            <div className="flex flex-wrap cursor-pointer gap-6 justify-start">
              {movieResults[index]
  ?.filter((movie) => movie.poster_path)
  .map((movie) => (
    <div
      key={movie.id}
      className="w-[150px] flex flex-col items-center"
    >
      <Link to={"/movieinfo/" + movie.id}>
      <img
        className="w-full h-[225px] object-cover mb-2 rounded-2xl hover:scale-105 transition-transform duration-300 hover:border-2 hover:border-red-500"
        src={IMG_CDN_URL + movie.poster_path}
        alt={movie.title}
      />
      <p className="text-center text-sm font-medium">{movie.title}</p>
    </Link>
    </div>
))}
            </div>
          </div>
        ))}

        <div className="h-16" />
      </div>
    </div>
  );
};

export default AIMovieSuggestion;
