import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { addUser } from "../utils/userSlice";
import { NETFLIX_LOGO, SUPPORTED_LANGUAGES } from "../utils/constant";
import { toggleGptSearch, resetGptState } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const lang = useSelector((store) => store.config.lang);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      dispatch(removeUser());
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          }),
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        dispatch(resetGptState());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearch());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute w-full max-w-[100vw] px-3 sm:px-6 md:px-8 py-2 bg-gradient-to-b from-black z-50 flex justify-between items-center">
      <img
        className="w-20 sm:w-28 md:w-36 lg:w-44"
        src={NETFLIX_LOGO}
        alt="logo"
      />
      {user && (
        <div className="flex items-center gap-1.5 sm:gap-3 md:gap-4">
          {showGptSearch && (
            <select
              value={lang}
              onChange={handleLanguageChange}
              className="text-white text-xs sm:text-sm font-medium bg-zinc-900/80 border border-zinc-500 px-2 py-1.5 sm:px-4 sm:py-2 rounded-md cursor-pointer hover:border-white transition-colors outline-none max-w-[5.5rem] sm:max-w-none"
            >
              {SUPPORTED_LANGUAGES.map((language) => (
                <option key={language.identifier} value={language.identifier}>
                  {language.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="text-white text-xs sm:text-sm md:text-base font-bold bg-purple-600 px-2 py-1.5 sm:px-4 sm:py-2 rounded-md whitespace-nowrap"
            onClick={handleGptSearchClick}
          >
            <span className="hidden sm:inline">
              {showGptSearch ? "Homepage" : "Gpt Search"}
            </span>
            <span className="sm:hidden">
              {showGptSearch ? "Home" : "GPT"}
            </span>
          </button>
          <img
            src={user.photoURL}
            alt="user-avatar"
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded"
          />
          <button
            onClick={handleSignOut}
            className="text-white text-xs sm:text-sm md:text-base font-bold bg-red-600 px-2 py-1.5 sm:px-4 sm:py-2 rounded-md whitespace-nowrap"
          >
            <span className="hidden sm:inline">Sign Out</span>
            <span className="sm:hidden">Out</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
