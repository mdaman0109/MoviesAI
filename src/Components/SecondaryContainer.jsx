import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer =()=>
{
 const movies = useSelector((store) => store.movies);

return (
  <div className="bg-black/60 backdrop-blur-sm rounded-4xl mt-[1vh] md:-mt-[10vh] m-auto max-w-full md:px-0 py-3 md:py-3 ">
    <div className="space-y-3 max-w-full">
      <MovieList title="Now Playing" movies={movies.nowPlayingMovies} />
      <MovieList title="Popular Movies" movies={movies.popularMovies} />
      <MovieList title="Top Rated Movies" movies={movies.topRatedMovies} />
      <MovieList title="Upcoming" movies={movies.upcomingMovies} />
    </div>
  </div>
);

}

export default SecondaryContainer;