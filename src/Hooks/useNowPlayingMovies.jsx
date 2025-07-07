import { useEffect } from "react";
import { API_OPTIONS } from "../Utils/constants";
import { useDispatch } from "react-redux";
import {addNowPlayingMovies} from "../Utils/moviesSlice"
const useNowPlayingMovies=()=>
{
    const dispatch = useDispatch()
    const getNowPlayingMovies = async () => {
  try {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addNowPlayingMovies(json.results));
  } catch (err) {
    console.error("🔥 Error fetching movies:", err.message);
    alert("Network error. Please check your internet connection.");
  }
};
    useEffect(()=>
    {
        getNowPlayingMovies()
    },[])
}
export default useNowPlayingMovies;