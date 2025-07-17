import Login from "./Login";
import Browse from "./Browse";
import MovieInfo from "./MovieInfoComponents/MovieInfo";
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

]);




return(
    <div>
    <RouterProvider router={appRouter}/>
    </div>
)
}

export default Body;