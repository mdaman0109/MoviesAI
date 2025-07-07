import AppLogo from "./AppLogo";
import { auth } from "../Utils/firebase";
import {signOut } from "firebase/auth";
import { useNavigate } from "react-router";
import LogoutError from "./LogoutError";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser,removeUser } from "../Utils/userSlice";


const Header = () => {
  const navigate = useNavigate()
  const [logoutError, setLogoutError] = useState(null);
  const user = useSelector((store)=>store.user)
  const dispatch = useDispatch()
  const handleSignout =()=>
{
signOut(auth).then(() => {
}).catch((error) => {
  setLogoutError(error.message);
});
}


useEffect(()=>{

    onAuthStateChanged(auth, (user) => {
  if (user) {
   const{uid,email,displayName,photoURL}=user;
   dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}))
    navigate("/browse")
  } else {
    // User is signed out
    dispatch(removeUser())
    navigate("/")
  }
});

},[])
  return (
    <>
  {logoutError && <LogoutError message={logoutError} />}

  <div className="absolute top-0 left-0 w-full z-10 bg-gradient-to-b from-black px-6 py-4">
    <div className="flex items-center justify-between">
      <AppLogo />

      {user && (
        <div className="flex items-center gap-4">
          <img
            className="w-10 h-10 rounded-md object-cover"
            src={user?.photoURL}
            alt="userIcon"
          />
          <button
            onClick={handleSignout}
            className="bg-red-600 hover:bg-red-700 hover:border-2 hover:border-white cursor-pointer text-white text-sm px-4 py-2 h-10 rounded-md font-semibold shadow-sm transition duration-200"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  </div>
</>
  );
};

export default Header;
