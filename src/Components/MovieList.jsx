import MovieCard from "./MovieCard";
import { Link } from "react-router";

const MovieList = ({ title, movies }) => {
  if (!movies.length || !movies[0]?.poster_path) return null;

  return (
    <div className="px-4 sm:px-6 md:px-8">
      <h1 className="text-xl sm:text-2xl md:text-3xl text-white text-center md:text-left font-bold my-4">
        {title}
      </h1>

      <div className="overflow-x-auto scroll-container w-full">
        <div className="flex gap-4 px-2 sm:px-4 md:px-6 min-w-full">
          {movies.map((movie) => (
            <Link to={`/movieinfo/${movie?.id}`} key={movie?.id}>
              <div className="flex-shrink-0 w-32 sm:w-40 md:w-48 lg:w-52">
                <MovieCard poster_path={movie.poster_path} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;