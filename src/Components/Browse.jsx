import useNowPlayingMovies from "../Hooks/useNowPlayingMovies";
import Header from "./Header";
import AISearch from "./AISearchComponents/AISearch";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../Hooks/usePopularMovies";
import useTopRatedMovies from "../Hooks/useTopRatedMovies";
import useUpcomingMovies from "../Hooks/useUpcomingMovies";
import NoMovies from "./NoMovies";
import { useSelector } from "react-redux";
const Browse = ()=>
{
    useNowPlayingMovies();
    usePopularMovies();
    useTopRatedMovies();
    useUpcomingMovies();
    
    const movies = useSelector((store) => store.movies?.nowPlayingMovies);
    const AISearchToggle = useSelector((store)=>store.ai.showGPTSearch)

    return(<div>
        
        
        <Header/>

        {AISearchToggle ? (
  <AISearch />
) : movies ? (
  <>
    <MainContainer />
    <SecondaryContainer />
  </>
) : (
  <NoMovies/>
)}
        
       
         
        
       
        
    
</div>)

}

export default Browse;