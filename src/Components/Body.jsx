import Login from "./Login";
import Browse from "./Browse";
import MovieInfo from "./MovieInfoComponents/MovieInfo";
import MoviesByActor from "./MovieInfoComponents/MoviesByActor";
import {createBrowserRouter,RouterProvider } from "react-router";
const Body =()=>
{
const appRouter = createBrowserRouter([
{
    path:"/",
    element:<Login/>
},
{
    path:"/browse",
    element:<Browse/>
},
 {
      path: "/movieinfo/:id",
      element: <MovieInfo />,
    },
     {
      path: "/castmovie/:id",
      element: <MoviesByActor />,
    },

]);




return(
    <div>
    <RouterProvider router={appRouter}/>
    </div>
)
}

export default Body;