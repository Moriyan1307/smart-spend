"use client";

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSignIn } from "../../app/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { fetchCurrencyFromFirebase } from "../../utils/firebaseUtils";
import { setCurrency } from "../../app/redux/slices/currencySlice";

export default function LoginForm() {
  const [user, setUserState] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const router = useRouter();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const getCurrentMonth = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${year}-${month}`;
  };

  const month = getCurrentMonth();

  const checkFirstTimeLogin = async (user) => {
    try {
      // Get user metadata
      const metadata = user.metadata;

      // Check if creation time equals last sign in time
      const isFirstLogin = metadata.creationTime === metadata.lastSignInTime;

      // Alternative method using timestamp comparison
      const timeDifference = Math.abs(
        new Date(metadata.creationTime).getTime() -
          new Date(metadata.lastSignInTime).getTime()
      );

      // Consider it first login if time difference is less than 1 minute
      const isFirstLoginByTime = timeDifference < 60000;

      // You can also check if this is the first sign in since account creation
      const signInCount = user.metadata.signInCount; // Only available in some Firebase plans

      return {
        isFirstLogin,
        isFirstLoginByTime,
        signInCount,
        creationTime: metadata.creationTime,
        lastSignInTime: metadata.lastSignInTime,
      };
    } catch (error) {
      console.error("Error checking first time login:", error);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          setUserState(user);
          dispatch(
            setSignIn({
              uid: user.uid,
              displayName: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
              month: month,
            })
          );

          // Fetch currency data
          const currency = await fetchCurrencyFromFirebase(user.uid, month);
          dispatch(setCurrency(currency));

          const loginInfo = await checkFirstTimeLogin(user);

          if (loginInfo.isFirstLogin) {
            router.push("/onboard");
          } else {
            router.push("/dashboard");
          }
        } catch (error) {
          console.error("Error processing user login:", error);
          setError("Failed to process login. Please try again.");
        }
      } else {
        setUserState(null);
        dispatch(setSignIn(null));
        dispatch(setCurrency(null));
      }
    });

    return () => unsubscribe();
  }, [dispatch, router, auth, month]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      // Store token securely if needed
      console.log("Login successful");
    } catch (error) {
      console.error("Error during sign-in:", error);
      setError(
        error.code === "auth/popup-closed-by-user"
          ? "Login was cancelled. Please try again."
          : "Failed to login. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Error during sign-out:", error);
      setError("Failed to logout. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="max-w-lg mx-auto p-8   rounded-md shadow-md"
      style={{
        backgroundColor: "var(--gray-800)",
        borderRadius: "10px",
      }}
    >
      <h2 className="text-2xl text-white font-bold mb-6 text-center">
        {user ? "Loading" : "Login"}
      </h2>
      <form className="space-y-4" onSubmit={handleLogin}>
        {!user && (
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? "Loading..." : "Login with Google"}
          </button>
        )}

        {error && (
          <p className="text-red-500 text-center mt-2" role="alert">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}
