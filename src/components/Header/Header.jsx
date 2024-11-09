"use client";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { setSignOut } from "../../app/redux/slices/authSlice";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";

export default function Header() {
  const [user, setUser] = useState([]);

  const router = useRouter();

  const state = useSelector((state) => state.auth);
  const isLoggedIn = state.isAuthenticated;

  useEffect(() => {
    if (state.user) {
      setUser(state.user);
    }
  }, [state]);

  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(setSignOut());
      router.push("/");
    } catch (error) {
      console.error("Error during sign-out", error);
    }
  };

  return (
    <header
      className="h-20 flex items-center px-6 "
      style={{
        backgroundColor: "var(--theme-color)",
        color: "var(--text-color)",
      }}
    >
      <div className="flex items-center space-x-4 w-full justify-between">
        {/* Search Bar */}

        {isLoggedIn ? (
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            style={{
              backgroundColor: "var(--element-bg-color)",
              color: "var(--text-color)",
            }}
          />
        ) : (
          <div>
            <span
              className="text-3xl font-extrabold"
              style={{ color: "var(--text-color)" }}
            >
              SmartSpend
            </span>
          </div>
        )}

        {isLoggedIn ? (
          <div className="flex items-center space-x-6">
            <NotificationsIcon
              sx={{ fontSize: 28, color: "var(--text-color)" }}
            />
            <img
              src={user.photoURL}
              alt=""
              style={{ height: "30px", width: "30px", borderRadius: "50%" }}
            />
            {/* <PersonIcon sx={{ fontSize: 28, color: "var(--text-color)" }} /> */}
            <span className=" sm:inline-block text-white">
              {user.displayName}
            </span>
            <button
              className="px-4 py-2 rounded-md hover:bg-gray-600 transition-colors duration-200"
              onClick={handleLogout}
              style={{
                backgroundColor: "var(--element-bg-color)",
                color: "var(--text-color)",
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Link href="/signup">
              <button
                className="px-4 py-2 rounded-md hover:bg-gray-600 transition-colors duration-200"
                style={{
                  backgroundColor: "var(--element-bg-color)",
                  color: "var(--text-color)",
                }}
              >
                Signup
              </button>
            </Link>
            <Link href="/login">
              <button
                className="px-4 py-2 rounded-md hover:bg-gray-600 transition-colors duration-200"
                style={{
                  backgroundColor: "var(--element-bg-color)",
                  color: "var(--text-color)",
                }}
              >
                Login
              </button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
