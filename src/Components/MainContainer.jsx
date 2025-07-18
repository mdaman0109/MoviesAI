import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  const mainMovie = movies?.[0]; 


  if (!mainMovie) return null;

return (
  <div>
    <VideoTitle title={mainMovie.title} overview={mainMovie.overview} movieId={mainMovie.id} />
    <VideoBackground movieId={mainMovie.id} />
  </div>
);
};

export default MainContainer;
