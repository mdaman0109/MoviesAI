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
        className="absolute z-0 opacity-75 w-full h-full object-cover"
        src={BGPHOTO}
        alt="Background"
      />
      <Header />
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute z-10 bg-black/80 mx-auto right-0 left-0 mt-72 sm:mt-60 w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 rounded-lg p-6 sm:p-8 backdrop-blur"
      >
        <h1 className="text-white font-bold text-3xl sm:text-4xl my-4 w-full">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (
          <input
            ref={name}
            className="bg-white/10 text-white placeholder-white/70 p-4 rounded-xl w-full my-4 border border-gray-500 focus:ring-2 focus:ring-red-500"
            type="text"
            placeholder="Enter your full name"
          />
        )}

        <input
          ref={email}
          className="bg-white/10 text-white placeholder-white/70 p-4 rounded-xl w-full my-4 border border-gray-500 focus:ring-2 focus:ring-red-500"
          type="text"
          placeholder="Email or mobile number"
        />

        <input
          ref={password}
          className="bg-white/10 text-white placeholder-white/70 p-4 rounded-xl w-full my-4 border border-gray-500 focus:ring-2 focus:ring-red-500"
          type="password"
          placeholder={isSignInForm ? "Enter your password" : "Set your password"}
        />

        {errorMessage && (
          <p className="mt-2 text-sm text-red-500 font-semibold px-4 py-2 rounded-lg shadow-sm animate-pulse">
            {errorMessage}
          </p>
        )}

        <button
          type="submit"
          className="bg-red-700 w-full p-3 sm:p-4 rounded-xl my-2 text-white font-bold hover:bg-red-600 transition duration-300"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <h3
          className="text-white font-bold my-2 w-full p-2 cursor-pointer hover:underline"
          onClick={toggleSignInForm}
        >
          {isSignInForm
            ? "New to MoviesAI? Sign Up Now!"
            : "Already have an account? Sign In!"}
        </h3>
      </form>
    </div>
  );
};

export default Login;
