"use client";

import LandingPage from "../components/Landing Page/LandingPage";
import Posts from "../components/Posts/Posts";
import Image from "next/image";
import { useSelector } from "react-redux";

export default function Home() {
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);

  if (isLoggedIn) {
    return (
      <div className="p-2 overflow-y-auto scrollbar-none h-full ">
        <Posts />
      </div>
    );
  } else {
    return <LandingPage />;
  }
}
