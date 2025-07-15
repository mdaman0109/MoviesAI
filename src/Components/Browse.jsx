import useNowPlayingMovies from "../Hooks/useNowPlayingMovies";
import Header from "./Header";
import AISearch from "./AISearch";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../Hooks/usePopularMovies";
import useTopRatedMovies from "../Hooks/useTopRatedMovies";
import useUpcomingMovies from "../Hooks/useUpcomingMovies";
import { useSelector } from "react-redux";
const Browse = ()=>
{
    useNowPlayingMovies();
    usePopularMovies();
    useTopRatedMovies();
    useUpcomingMovies();

    const AISearchToggle = useSelector((store)=>store.ai.showGPTSearch)

    return(<div>
        
        
        <Header/>

        {AISearchToggle
        ?<AISearch/>
        :<>
        <MainContainer/>
       <SecondaryContainer/>
       </>
       
       }
        
       
         
        
       
        
    
</div>)

}

export default Browse;