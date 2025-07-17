import { Link,useLocation,useParams } from "react-router";
import useCastMovies from "../../Hooks/useCastMovies";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../MovieCard"
import Header from "../Header";
import { clearMovieInfo } from "../../Utils/moviesSlice";
import Loader from "../Loader";
import { useEffect } from "react"; 

const MoviesByActor = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const actorName = location?.state?.actorName;

  useCastMovies(id);


  useEffect(() => {
    dispatch(clearMovieInfo());
  }, []); 

  const moviesByActor = useSelector((store) => store.movies.castMovies);

  if (!moviesByActor) return <Loader />;
  
  return (
    <div className="relative">
      <Header />
      <div className="bg-black text-white md:px-16 px-5 min-h-screen">
        <div className="pt-28">
          <h1 className="md:text-4xl text-xl">Discover Movies Starring <b>{actorName}</b></h1>
        </div>
        <div className="mt-8 flex flex-wrap gap-8 justify-center">
          {moviesByActor.map((movie) => (
            <div key={movie.id}> 
              <Link to={"/movieinfo/" + movie?.id}>
                <MovieCard poster_path={movie.poster_path} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoviesByActor;