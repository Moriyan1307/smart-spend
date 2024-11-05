"use client";

import LandingPage from "../components/Landing Page/LandingPage";

import Image from "next/image";
import { useSelector } from "react-redux";
import Dashboard from "./dashboard/page";

export default function Home() {
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);

  if (isLoggedIn) {
    return <Dashboard />;
  } else {
    return <LandingPage />;
  }
}
