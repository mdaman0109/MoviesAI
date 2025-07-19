import { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../Utils/validData";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../Utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/userSlice";
import { USERLOGO, BGPHOTO } from "../Utils/constants";

const Login = () => {
  const dispatch = useDispatch();
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const toggleSignInForm = () => setIsSignInForm(!isSignInForm);

  const handleButtonClick = () => {
    const trimmedEmail = email.current.value.trim();
    const trimmedPassword = password.current.value.trim();
    const nameValue = !isSignInForm ? name.current.value.trim() : "";

    const message = checkValidData(trimmedEmail, trimmedPassword, nameValue, isSignInForm);
    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      // Sign up
      createUserWithEmailAndPassword(auth, trimmedEmail, trimmedPassword)
        .then((userCredential) => {
          return updateProfile(auth.currentUser, {
            displayName: name.current.value,
            photoURL: USERLOGO
          });
        })
        .then(() => {
          const { uid, email, displayName, photoURL } = auth.currentUser;
          dispatch(addUser({ uid, email, displayName, photoURL }));
        })
        .catch((error) => {
          if (error.message.includes("auth/email-already-in-use")) {
            setErrorMessage("This email address is already signed up, try with a different one!");
          } else {
            setErrorMessage(error.message);
          }
        });
    } else {
      // Sign in
      signInWithEmailAndPassword(auth, trimmedEmail, trimmedPassword)
        .then((userCredential) => {
          const { uid, email, displayName, photoURL } = userCredential.user;
          dispatch(addUser({ uid, email, displayName, photoURL }));
        })
        .catch((error) => {
          if (error.message.includes("auth/invalid-credential")) {
            setErrorMessage("Invalid credentials, try again!");
          } else {
            setErrorMessage(error.message);
          }
        });
    }
  };
return (
  <div className="min-h-screen relative">
    <img
      className="absolute inset-0 z-0 opacity-75 w-full h-full object-cover"
      src={BGPHOTO}
      alt="Background"
    />
    <Header />
    
    
    <div className="absolute inset-0 z-10 flex items-center justify-center p-4">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full max-w-md bg-black/80 rounded-lg p-6 backdrop-blur-md border border-white/20 shadow-2xl"
      >
       
        <h1 className="text-white font-bold text-3xl mb-6 text-center">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        
        {!isSignInForm && (
          <input
            ref={name}
            className="bg-white/10 text-white placeholder-white/70 
                       p-4 rounded-xl w-full mb-4 border border-gray-500 
                       focus:ring-2 focus:ring-red-500 focus:border-red-500
                       text-base transition-all duration-300"
            type="text"
            placeholder="Enter your full name"
          />
        )}

        
        <input
          ref={email}
          className="bg-white/10 text-white placeholder-white/70 
                     p-4 rounded-xl w-full mb-4 border border-gray-500 
                     focus:ring-2 focus:ring-red-500 focus:border-red-500
                     text-base transition-all duration-300"
          type="text"
          placeholder="Enter your Email Id"
        />

        
        <input
          ref={password}
          className="bg-white/10 text-white placeholder-white/70 
                     p-4 rounded-xl w-full mb-4 border border-gray-500 
                     focus:ring-2 focus:ring-red-500 focus:border-red-500
                     text-base transition-all duration-300"
          type="password"
          placeholder={isSignInForm ? "Enter your password" : "Set your password"}
        />

        
        {errorMessage && (
          <p className="mb-4 text-sm text-red-400 font-semibold px-4 py-2 rounded-lg 
                        bg-red-900/30 border border-red-500/50 animate-pulse">
            {errorMessage}
          </p>
        )}

      
        <button
          type="submit"
          className="bg-red-700 w-full p-4 cursor-pointer rounded-xl mb-4
                     text-white font-bold text-base hover:bg-red-600 
                     transition-all duration-300 shadow-lg"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        
        <h3
          className="text-white font-bold w-full p-2 cursor-pointer text-base
                     hover:underline hover:text-red-400 transition-all duration-300 text-center"
          onClick={toggleSignInForm}
        >
          {isSignInForm
            ? "New to MoviesAI? Sign Up Now!"
            : "Already have an account? Sign In!"}
        </h3>
      </form>
    </div>
  </div>
);
};

export default Login;
