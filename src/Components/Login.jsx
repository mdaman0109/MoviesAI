import { useState,useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../Utils/validData";
const Login = ()=>
{
    const[isSignInForm,setIsSignInForm]=useState(false);
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
       
        const nameValue = isSignInForm?name.current.value:""
        const message = checkValidData(email.current.value,password.current.value,nameValue,isSignInForm)
        
        seterrorMessage(message);
    }

    return(<div>
        <img className="absolute z-auto opacity-75" src="https://assets.nflxext.com/ffe/siteui/vlv3/75b0ed49-75ab-4a63-bd45-37bc2c95cb73/web/IN-en-20250623-TRIFECTA-perspective_ae5833b7-6ce5-4e88-853e-014f38c506f1_large.jpg" alt="background"></img>
        <Header/>
        <form onSubmit={(e)=>{e.preventDefault()}} className="absolute bg-black/80 mx-auto right-0 left-0 my-36 w-3/12 rounded-lg p-8  ">
            <h1 className="text-white font-bold text-4xl my-4 w-full  " >{isSignInForm?"Sign Up":"Sign In"}</h1>
            {isSignInForm && (<input ref={name}className="bg-white/10 text-white  placeholder-white/70 p-4 rounded-xl w-full my-2 border border-gray-500  focus:ring-2 focus:ring-red-500" type="text" placeholder="Enter Your Full Name"/>)}
            <input ref={email}className="bg-white/10 text-white  placeholder-white/70 p-4 rounded-xl w-full my-2 border border-gray-500  focus:ring-2 focus:ring-red-500" type="text" placeholder="Email or mobile number"/>

            <input ref={password} type="password"className="bg-white/10 text-white  placeholder-white/70 p-4 rounded-xl w-full my-2 border border-gray-500 focus:ring-2 focus:ring-red-500" placeholder={isSignInForm?"Set Your Password":"Enter Your Password"}></input>
            <p className="mt-2 text-sm text-red-500 font-semibold  px-4 py-2 rounded-lg shadow-sm animate-pulse">
                {errorMessage}</p>

            <button className= " cursor-pointer bg-red-700 w-full p-4 rounded-xl my-2 text-white font-bold" onClick={()=>
                {
                    handleButtonClick()
                }
            }>{isSignInForm?"Sign Up":"Sign In"}</button>
            <h3 className="text-white font-bold my-2 w-full p-2 cursor-pointer hover:underline" 
            onClick={()=>
                {
                    {toggleSignInForm()}
                }
            }>
            {isSignInForm?"Already have an account? Sign In!":"New to MoviesAI? Sign Up Now!"}</h3>
            

        </form>




    </div>)

}

export default Login;