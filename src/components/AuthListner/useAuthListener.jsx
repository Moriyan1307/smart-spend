// hooks/useAuthListener.js
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth } from "../../../firebase"; // Adjust path as necessary
import { setSignIn, setSignOut } from "../../app/redux/slices/authSlice";
import { useRouter } from "next/navigation";

export const useAuthListener = () => {
  const dispatch = useDispatch();

  const getCurrentMonth = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Pad with '0' if needed
    return `${year}-${month}`;
  };

  const month = getCurrentMonth();

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is authenticated, update Redux state

        dispatch(
          setSignIn({
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            month: month,
          })
        );
        router.push("/dashboard");
      } else {
        // User is not authenticated, clear Redux state
        dispatch(setSignOut());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);
};
