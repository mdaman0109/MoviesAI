import { useEffect } from "react";
import { API_OPTIONS } from "../Utils/constants";
import { useDispatch } from "react-redux";
import {addPopularMovies} from "../Utils/moviesSlice"
import { useSelector } from "react-redux";
const usePopularMovies=()=>
{
    const dispatch = useDispatch()
    const popularMovies = useSelector(
    (store) => store.movies.popularMovies
  );
    const getPopularMovies = async () => {
  try {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addPopularMovies(json.results));
  } catch (err) {
    console.error("🔥 Error fetching movies:", err.message);
    alert("Network error. Please check your internet connection.");
  }
};
    useEffect(()=>
    {
        !popularMovies && getPopularMovies();
    },[])
}
export default usePopularMovies;