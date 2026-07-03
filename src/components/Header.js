import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { addUser } from "../utils/userSlice";
import { NETFLIX_LOGO } from "../utils/constant";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUser());
        toast.success("Signed out successfully");
      })
      .catch((error) => {
        toast.error("Failed to sign out");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    // Stop listening to auth(login/logout) changes when Header is removed so that it doesn't listen to changes when other components are mounted
    // This is a good practice to avoid memory leaks and ensure that the subscription is removed when the component unmounts
    return () => unsubscribe(); 
  }, []);

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-50 flex justify-between items-center">
      <img
        className="w-44"
        src={NETFLIX_LOGO}
        alt="logo"
      />
      {user && (
        <div className="flex items-center gap-4">
          <img
            src={user.photoURL}
            alt="user-avatar"
            className="w-12 h-12"
          />
          <button
            onClick={handleSignOut}
            className="text-white text-md font-bold bg-red-600 px-4 py-2 rounded-md"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
