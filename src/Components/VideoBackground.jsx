import { useSelector } from "react-redux";
import useMoviesTrailer from "../Hooks/useMoviesTrailer";

const VideoBackground = ({ movieId }) => {
  const trailerVideo = useSelector((store) => store?.movies?.trailerVideo);
  useMoviesTrailer(movieId);

  if (!trailerVideo) return null;

  return (
  <div className="inset-0 ">
    <iframe
      className="w-full sm:h-full h-[35vh]  aspect-video scale-[1.7] sm:scale-[1.7] transform origin-center"
      src={`https://www.youtube.com/embed/${trailerVideo?.key}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&loop=1&playlist=${trailerVideo?.key}`}
      title="YouTube trailer"
      allow="autoplay; encrypted-media"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    />
  </div>
);
};

export default VideoBackground;
