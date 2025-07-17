import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../Utils/constants";
import { addMovieInfo } from "../Utils/moviesSlice";

const useMovieInfo = (id) => {
    const dispatch = useDispatch();

    const fetchMovie = async () => {
        const data = await fetch("https://api.themoviedb.org/3/movie/"+id, API_OPTIONS);
        const json = await data.json();
        dispatch(addMovieInfo(json));
    }

    useEffect(() => {
        fetchMovie();
    }, []);
}

export default useMovieInfo;