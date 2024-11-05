// app/login/page.js
"use client";

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSignIn } from "../../app/redux/slices/authSlice"; // Adjust the path
import { useRouter } from "next/navigation"; // Use for navigation in Next.js app router
import {
  auth,
  provider,
  signInWithPopup,
  signOut,
  getRedirectResult,
} from "../../../firebase"; // Ensure all imports are correct

export default function LoginForm() {
  const [user, setUserState] = useState(null);
  const [isInvalid, setIsInvalid] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter(); // Add router for navigation

  const getCurrentMonth = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Pad with '0' if needed
    return `${year}-${month}`;
  };

  const month = getCurrentMonth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
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
        router.push("/dashboard"); // Redirect to the home page upon successful login
      } else {
        setUserState(null);
        dispatch(setSignIn(null));
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [dispatch, router]);

  // New function to handle login
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      await signInWithPopup(auth, provider);
      const userToken = firebase.auth().currentUser;
      const idToken = await userToken.getIdToken();
      console.log(idToken);
    } catch (error) {
      console.error("Error during sign-in", error);
      setIsInvalid(true); // Show error message if sign-in fails
    }
  };

  // New function to handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUserState(null); // Clear user state after logout
    } catch (error) {
      console.error("Error during sign-out", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 border border-gray-300 rounded-md">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      <form className="space-y-4" onSubmit={handleLogin}>
        <button
          type="submit" // Change to type="submit" to trigger form submission
          className="w-full bg-black text-white px-4 py-2 rounded-md"
        >
          Login with Google
        </button>
        <button
          type="button" // Keep as type="button" for logout
          className="w-full bg-black text-white px-4 py-2 rounded-md"
          onClick={handleLogout}
        >
          Logout
        </button>
        {isInvalid && (
          <p className="text-red-500 mt-2">
            Invalid login attempt. Please try again.
          </p>
        )}
      </form>
    </div>
  );
}
