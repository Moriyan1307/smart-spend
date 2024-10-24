import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { setSignOut } from "../../app/redux/slices/authSlice";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [user, setUser] = useState("");

  const router = useRouter();

  const state = useSelector((state) => state.auth);
  const isLoggedIn = state.isAuthenticated;

  // Set user name based on userRole when the component renders
  useEffect(() => {
    if (state.userRole) {
      setUser(state.userRole); // Assuming 'userRole' is the name of the user or user-related info
    }
  }, [state.userRole]); // Only update when 'userRole' changes

  const dispatch = useDispatch();

  const handleLogout = () => {
    router.push("/");
    dispatch(setSignOut());
  };

  return (
    <header className="text-black h-20 flex items-center px-6">
      <div className="flex items-center space-x-4 w-3/5 ml-auto justify-evenly">
        <input
          type="text"
          placeholder="Search..."
          className="bg-gray-100 text-black px-4 py-2 rounded-md focus:outline-none"
        />

        {isLoggedIn ? (
          <div className="flex justify-around items-center space-x-4 ml-auto">
            <NotificationsIcon sx={{ fontSize: 28 }} />
            <PersonIcon sx={{ fontSize: 28 }} />
            <span className="m-auto">{user}</span> {/* Display the user info */}
            <button
              className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link href="/signup">
              <button className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900">
                Signup
              </button>
            </Link>
            <Link href="/login">
              <button className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900">
                Login
              </button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
