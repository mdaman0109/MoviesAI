import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    <div className="bg-black/60 backdrop-blur-sm rounded-4xl mt-[5vh] md:-mt-[5vh] lg:-mt-[2vh] xl:-mt-[10vh] m-0 sm:m-auto max-w-full py-3 md:py-3 relative z-20 ml-0 pl-0">
      <div className="space-y-3 max-w-full">
        <MovieList title="Now Playing" movies={movies.nowPlayingMovies} />
        <MovieList title="Popular Movies" movies={movies.popularMovies} />
        <MovieList title="Top Rated Movies" movies={movies.topRatedMovies} />
        <MovieList title="Upcoming" movies={movies.upcomingMovies} />
      </div>
    </div>
  );
};

export default SecondaryContainer;