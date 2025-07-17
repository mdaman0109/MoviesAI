import { useEffect } from "react";
import { API_OPTIONS } from "../Utils/constants";
import { useDispatch } from "react-redux";
import {addUpcomingMovies} from "../Utils/moviesSlice"
import { useSelector } from "react-redux";
const useUpcomingMovies=()=>
{
    const dispatch = useDispatch()

    const upcomingMovies = useSelector(store => store.movies.upcomingMovies);
    const getUpcomingMovies = async () => {
  try {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addUpcomingMovies(json.results));
  } catch (err) {
    console.error("🔥 Error fetching movies:", err.message);
    alert("Network error. Please check your internet connection.");
  }
};
    useEffect(()=>
    {
       !upcomingMovies && getUpcomingMovies()
    },[])
}
export default useUpcomingMovies;