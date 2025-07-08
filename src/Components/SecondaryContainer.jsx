import { useSelector } from "react-redux";
import MovieList from "./movieList";
import { useEffect } from "react";
const SecondaryContainer =()=>
{
 const movies =  useSelector((store)=>store.movies);
 return(<div className="bg-black">
    <div className="-mt-64">
<MovieList title={"Now Playing"} movies={movies.nowPlayingMovies}/>
<MovieList title={"Popluar Movies"} movies={movies.popularMovies}/>
<MovieList title={"Top Rated Movies"} movies={movies.topRatedMovies}/>
<MovieList title={"Upcoming"} movies={movies.upcomingMovies}/>

 </div></div>
 )

}

export default SecondaryContainer;