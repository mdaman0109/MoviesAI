import { useEffect } from "react";
import { API_OPTIONS } from "../Utils/constants";
import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../Utils/moviesSlice";
import { useSelector } from "react-redux";
const useMoviesTrailer = (movieId) => {
  const dispatch = useDispatch();
  
const movieTrailer = useSelector(store => store.movies.trailerVideos);
  // Fetch trailer video and update Redux store
  const getMoviesVideo = async () => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        API_OPTIONS
      );
      const json = await data.json();

      const filterData = json.results.filter((video) => video.type === "Trailer");
      const trailer = filterData?.[1] || json.results?.[0];

      dispatch(addTrailerVideo(trailer));
    } catch (error) {
      console.error("Failed to fetch trailer:", error);
    }
  };

  useEffect(() => {
    if (movieId && !movieTrailer) getMoviesVideo();
  }, [movieId]); 
};

export default useMoviesTrailer;
