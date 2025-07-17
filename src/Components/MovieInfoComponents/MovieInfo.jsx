import { useParams } from "react-router";
import useMovieInfo from "../../Hooks/useMovieInfo";
import Header from "../Header"
import { CDN_IMG_URL } from "../../Utils/constants";
import { useDispatch, useSelector } from "react-redux";
import MovieInfoContainer from "../MovieInfoComponents/MovieInfoContainer"
import MovieCast from "../MovieInfoComponents/MovieCast"
import MovieVideos from "../MovieInfoComponents/MovieVideos"
import Loader from "../Loader"


const MovieInfo = () => {

  const { id } = useParams();

  useMovieInfo(id);

  const info = useSelector(store => store.movies.movieInfo);
  if(!info) return <Loader />;



  return (
    <div>
      <Header />
      <div className="w-full min-h-[110vh] md:min-h-screen top-0 absolute -z-10 overflow-hidden bg-black">
        <img className="h-[110vh] md:h-auto object-cover mx-auto brightness-[.3]" src={CDN_IMG_URL + info.backdrop_path} alt="moviebg" />
      </div>
      <MovieInfoContainer info={info}/>
      
      <MovieCast id={info?.id} />
      <MovieVideos id={info?.id} />
    </div>
  );
};

export default MovieInfo;