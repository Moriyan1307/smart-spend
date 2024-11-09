"use client";

import LandingPage from "../components/Landing Page/LandingPage";

import { useSelector } from "react-redux";

import { useAuthListener } from "../components/AuthListner/useAuthListener";
import DashboardPage from "./dashboard/page";

export default function Home() {
  useAuthListener();

  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);

  if (isLoggedIn) {
    return <DashboardPage />;
  } else {
    return <LandingPage />;
  }
}
