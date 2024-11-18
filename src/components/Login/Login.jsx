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

  const month = new Date().toISOString().slice(0, 7); // Current month in YYYY-MM format

  const checkFirstTimeLogin = async (user) => {
    try {
      const metadata = user.metadata;
      const isFirstLogin =
        metadata.creationTime === metadata.lastSignInTime ||
        Math.abs(
          new Date(metadata.creationTime).getTime() -
            new Date(metadata.lastSignInTime).getTime()
        ) < 60000;
      return isFirstLogin;
    } catch (error) {
      console.error("Error checking first-time login:", error);
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
              month,
            })
          );

          const currency = await fetchCurrencyFromFirebase(user.uid, month);
          dispatch(setCurrency(currency));

          const isFirstLogin = await checkFirstTimeLogin(user);
          router.push(isFirstLogin ? "/onboard" : "/dashboard");
        } catch (error) {
          console.error("Error processing login:", error);
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

  const handleLogin = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Login successful:", result.user);
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
      className="max-w-md mx-auto mt-16 p-6 shadow-lg rounded-lg text-center"
      style={{ backgroundColor: "var(--gray-900)" }}
    >
      <h2 className="text-3xl font-semibold text-white mb-4">
        {user ? "Welcome Back!" : "Sign In"}
      </h2>
      <p className="text-gray-400 mb-6">
        {user
          ? "Redirecting you to your dashboard..."
          : "Sign in with Google to continue."}
      </p>

      {!user && (
        <button
          onClick={handleLogin}
          disabled={isLoading}
          className={`w-full py-3 px-5 rounded-md text-white font-semibold bg-green-600 hover:bg-green-700 transition duration-300 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Signing in..." : "Sign in with Google"}
        </button>
      )}

      {error && (
        <div className="mt-4 bg-red-600 text-white p-3 rounded-md">{error}</div>
      )}
    </div>
  );
}
