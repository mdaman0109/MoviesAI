
import {useSelector } from "react-redux"
import useMoviesTrailer from "../Hooks/useMoviesTrailer"

const VideoBackground =({movieId})=>
{


  const trailerVideo = useSelector((store)=>store?.movies?.trailerVideo)
  useMoviesTrailer(movieId); //calling our custom Hook


  return(<div><iframe 
    className="w-screen h-screen aspect-video absolute top-0 left-0 -z-10 pointer-events-none"
    src={"https://www.youtube.com/embed/"+trailerVideo?.key} 
    title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin"></iframe></div>)  
}

export default VideoBackground;