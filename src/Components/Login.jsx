import { useState,useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../Utils/validData";
import {createUserWithEmailAndPassword ,signInWithEmailAndPassword,updateProfile} from "firebase/auth";
import { auth } from "../Utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/userSlice";
import { USERLOGO } from "../Utils/constants";
import { BGPHOTO } from "../Utils/constants";
const Login = ()=>
{   
    const dispatch=useDispatch()
    const[isSignInForm,setIsSignInForm]=useState(true);
    const[errorMessage, seterrorMessage]=useState(null);
    const toggleSignInForm =()=>
    {
        setIsSignInForm(!isSignInForm)
    }
const email = useRef(null)
const password = useRef(null)
const name = useRef(null)
    const handleButtonClick =()=>
    {
        const nameValue = !isSignInForm?name.current.value:""
        const message = checkValidData(email.current.value,password.current.value,nameValue,isSignInForm)
        
        seterrorMessage(message);

        if(message) return;

        if(!isSignInForm)
        { 
            
            createUserWithEmailAndPassword(auth, email.current.value,password.current.value)
            .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            

            updateProfile(auth.currentUser, {
            displayName: name.current.value, photoURL: USERLOGO
            }).then(() => {
            const{uid,email,displayName,photoURL}=auth.currentUser;
            dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}))
            }).catch((error) => {
                seterrorMessage(error.message)
            });
            

            })
               .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    if (errorMessage === "Firebase: Error (auth/email-already-in-use).")
    {
        seterrorMessage(`This email address is already signed up, Try with different email address!`)
    }
    else
    {
        seterrorMessage(errorMessage)
    }
    
    
  });

        }
        else{
        //sign in logic
        signInWithEmailAndPassword(auth, email.current.value,password.current.value)
        .then((userCredential) => {
    // Signed in 
            const user = userCredential.user;
            })
       .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    if (errorMessage ==="Firebase: Error (auth/invalid-credential).")
    {
     seterrorMessage("Invalid Credentials,Try Again!")
    }
    else{
        seterrorMessage(errorMessage)
    }
  });

        }
    }

    return(<div className="min-h-full">
        <img className="absolute z-auto opacity-75 min-h-full" src={BGPHOTO} alt="background"></img>
        <Header/>
        <form onSubmit={(e)=>{e.preventDefault()}} className="absolute bg-black/80 mx-auto right-0 left-0 my-36 w-3/12 rounded-lg p-8  ">
            <h1 className="text-white font-bold text-4xl my-4 w-full  " >{!isSignInForm?"Sign Up":"Sign In"}</h1>
            {!isSignInForm && (<input ref={name}className="bg-white/10 text-white  placeholder-white/70 p-4 rounded-xl w-full my-2 border border-gray-500  focus:ring-2 focus:ring-red-500" type="text" placeholder="Enter Your Full Name"/>)}
            <input ref={email}className="bg-white/10 text-white  placeholder-white/70 p-4 rounded-xl w-full my-2 border border-gray-500  focus:ring-2 focus:ring-red-500" type="text" placeholder="Email or mobile number"/>

            <input ref={password} type="password"className="bg-white/10 text-white  placeholder-white/70 p-4 rounded-xl w-full my-2 border border-gray-500 focus:ring-2 focus:ring-red-500" placeholder={!isSignInForm?"Set Your Password":"Enter Your Password"}></input>
            <p className="mt-2 text-sm text-red-500 font-semibold  px-4 py-2 rounded-lg shadow-sm animate-pulse">
                {errorMessage}</p>

            <button className= " cursor-pointer bg-red-700 w-full p-4 rounded-xl my-2 text-white font-bold" onClick={()=>
                {
                    handleButtonClick()
                }
            }>{!isSignInForm?"Sign Up":"Sign In"}</button>
            <h3 className="text-white font-bold my-2 w-full p-2 cursor-pointer hover:underline" 
            onClick={()=>
                {
                    {toggleSignInForm()}
                }
            }>
            {!isSignInForm?"Already have an account? Sign In!":"New to MoviesAI? Sign Up Now!"}</h3>
            

        </form>




    </div>)

}

export default Login;