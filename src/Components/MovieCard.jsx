import { CDN_IMG_URL } from "../Utils/constants";
const MovieCard = ({poster_path})=>
{
if (!poster_path || poster_path === "null") return null;
    
return(
    <div className="w-56 px-4 py-4 ">
        <img className="rounded-3xl hover:border-2 cursor-pointer hover:scale-110 hover:border-red-500"alt="Movie Card" src={CDN_IMG_URL+poster_path}/>
    </div>
)
}

export default MovieCard;