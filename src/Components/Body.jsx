import Login from "./Login";
import Browse from "./Browse";
import {createBrowserRouter,RouterProvider } from "react-router";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Utils/firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../Utils/userSlice";
const Body =()=>
{
    const dispatch = useDispatch()
const appRouter = createBrowserRouter([
{
    path:"/",
    element:<Login/>
},
{
    path:"/browse",
    element:<Browse/>
},

]);


useEffect(()=>{

    onAuthStateChanged(auth, (user) => {
  if (user) {
   const{uid,email,displayName,photoURL}=user;
   dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}))
    // ...
  } else {
    // User is signed out
    dispatch(removeUser())
  }
});

},[])

return(
    <div>
    <RouterProvider router={appRouter}/>
    </div>
)
}

export default Body;