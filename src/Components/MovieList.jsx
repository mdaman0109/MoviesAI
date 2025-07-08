import MovieCard from "./movieCard";

const MovieList = ({ title, movies}) => {
  if (!movies.length || !movies[0]?.poster_path) return null;

  return (
    <div className="px-6">
        <h1 className="relative text-3xl text-white px-13">{title}</h1>
    <div className="flex scroll-container overflow-x-scroll  relative">
      
      <div className="flex px-8 ">
        {movies.map((movie)=>
            <MovieCard key={movie.id} poster_path={movie.poster_path} />
        )}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
