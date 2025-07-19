import MovieCard from "./MovieCard";
import { Link } from "react-router";

const MovieList = ({ title, movies }) => {
  if (!movies.length || !movies[0]?.poster_path) return null;

  return (
    <div className="pr-4 sm:pr-6 md:pr-8">
      <h1 className="text-xl sm:text-2xl text-center md:text-3xl text-white sm:text-left font-bold my-4 pl-4 sm:pl-6 md:pl-8">
        {title}
      </h1>

      <div className="overflow-x-auto scroll-container w-full">
        <div className="flex gap-4 pl-0 sm:pl-6 md:pl-8 pr-2 sm:pr-4 md:pr-6 min-w-full">
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