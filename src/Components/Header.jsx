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
import { toggleAISearch } from "../Utils/AISearchSlice";
import { SUPPORTED_LANGUAGES } from "../Utils/constants";
import { changeLanguage } from "../Utils/configSlice";

const Header = () => {
  const navigate = useNavigate()
  const [logoutError, setLogoutError] = useState(null);
  const user = useSelector((store)=>store.user)
  const showaisearch = useSelector((store)=>store.ai.showGPTSearch)
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

const AISearchToggle = useSelector((store)=>store.ai.showGPTSearch)
const handleAISearch=()=>
{
 dispatch(toggleAISearch());
}

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <>
  {logoutError && <LogoutError message={logoutError} />}

  <div className="absolute z-50 top-0 left-0 w-[100vw]  bg-gradient-to-b from-black">
    <div className="flex items-center justify-between px-6 py-4">
      <AppLogo />

      {user && (
        <div className="flex items-center gap-4">
         {showaisearch && 
         <select className="bg-white/30  backdrop-blur-sm hover:bg-black/30  hover:border-2  hover:border-white cursor-pointer text-white text-sm px-4 py-2 h-10 rounded-md font-extrabold shadow-sm transition duration-200" 
          onChange={handleLanguageChange}>
             {SUPPORTED_LANGUAGES.map((lang) => (
                <option className="text-black backdrop-blur-sm" key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
          </select>} 
           <button
            onClick={handleAISearch}
            className="bg-purple-700 hover:bg-purple-800 hover:border-2 hover:scale-110 hover:border-white cursor-pointer text-white text-sm px-4 py-2 h-10 rounded-md font-bold shadow-sm transition duration-200"
          >
            {!AISearchToggle?"AISearch":"Browse"}
            </button>
          <img
            className="w-10 h-10 rounded-md object-cover hover:scale-130"
            src={user?.photoURL}
            alt="userIcon"
          />
         
          <button
            onClick={handleSignout}
            className="bg-red-600 hover:bg-red-700 hover:border-2 hover:scale-110 hover:border-white cursor-pointer text-white text-sm px-4 py-2 h-10 rounded-md font-bold shadow-sm transition duration-200"
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
