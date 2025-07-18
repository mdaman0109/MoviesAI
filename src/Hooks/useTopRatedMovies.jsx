import { useEffect } from "react";
import { API_OPTIONS } from "../Utils/constants";
import { useDispatch } from "react-redux";
import {addTopRatedMovies} from "../Utils/moviesSlice"
import { useSelector } from "react-redux";
const useTopRatedMovies=()=>
{
    const dispatch = useDispatch()

      const topRatedMovies = useSelector(store => store.movies.topRatedMovies);
    const getTopRatedMovies = async () => {
  try {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addTopRatedMovies(json.results));
  } catch (err) {
    console.error("🔥 Error fetching movies:", err.message);
    alert("Network error. Please check your internet connection.");
  }
};
    useEffect(()=>
    {
       !topRatedMovies && getTopRatedMovies();
    },[])
}
export default useTopRatedMovies;