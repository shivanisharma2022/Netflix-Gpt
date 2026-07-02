import Header from "./Header";
import { useState, useRef } from "react";
import { validateLoginData } from "../utils/validate";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const fullNameRef = useRef(null);

  const handleButtonClick = () => {
    // Validate the data
    const message = validateLoginData(
      fullNameRef.current.value,
      emailRef.current.value,
      passwordRef.current.value,
    );
    setErrorMessage(message);
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="background"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-3/12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 bg-black text-white rounded-lg bg-opacity-80"
      >
        <h1 className="text-white text-3xl font-bold mb-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={fullNameRef}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full rounded-md bg-gray-700"
          />
        )}
        <input
          ref={emailRef}
          type="email"
          placeholder="Email Address"
          className="p-4 my-4 w-full rounded-md bg-gray-700"
        />
        <input
          ref={passwordRef}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full rounded-md bg-gray-700"
        />
        <p className="text-red-500 text-md font-bold py-2">{errorMessage}</p>
        <button
          className="bg-red-700 p-2 my-6 w-full rounded-md"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer " onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign up now."
            : "Already have an account? Sign in now."}
        </p>
      </form>
    </div>
  );
};

export default Login;
