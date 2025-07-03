import AppLogo from "./AppLogo";
import { auth } from "../Utils/firebase";
import {signOut } from "firebase/auth";
import { useNavigate } from "react-router";
import LogoutError from "./LogoutError";
import { useState } from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate()
  const [logoutError, setLogoutError] = useState(null);
  const user = useSelector((store)=>store.user)
  const handleSignout =()=>
{
signOut(auth).then(() => {
  navigate("/");
}).catch((error) => {
  setLogoutError(error.message);
});
}
  return (
    <>
    {logoutError && <LogoutError message={logoutError} />}
    <div className="flex justify-between">
      <div > <AppLogo/></div>
      {user && (<div className="flex m-3"> <img className="w-12 h-12 m-4" src={user?.photoURL} alt="userIcon"/>
      <button onClick={handleSignout} className="bg-red-700 text-white m-4 p-2 rounded-2xl font-bold shadow-2xl cursor-pointer z-20">Sign Out</button>
      </div>  )}
    </div>
     
        
        
     </>
  );
};

export default Header;
