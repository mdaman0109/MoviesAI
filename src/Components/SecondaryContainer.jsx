import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer =()=>
{
 const movies =  useSelector((store)=>store.movies);
 return(<div className=" bg-black/60 backdrop-blur-sm rounded-4xl">
    <div className="-mt-44">
<MovieList title={"Now Playing"} movies={movies.nowPlayingMovies}/>
<MovieList title={"Popluar Movies"} movies={movies.popularMovies}/>
<MovieList title={"Top Rated Movies"} movies={movies.topRatedMovies}/>
<MovieList title={"Upcoming"} movies={movies.upcomingMovies}/>

 </div></div>
 )

}

export default SecondaryContainer;