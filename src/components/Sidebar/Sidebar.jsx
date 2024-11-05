"use client";
import HomeIcon from "@mui/icons-material/Home";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSelector } from "react-redux";
import SettingsIcon from "@mui/icons-material/Settings";
import WalletIcon from "@mui/icons-material/Wallet";
import SavingsIcon from "@mui/icons-material/Savings";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import ScheduleIcon from "@mui/icons-material/Schedule";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import CallIcon from "@mui/icons-material/Call";

const paths = [
  { title: "Dashboard", path: "/dashboard", icon: HomeIcon },
  { title: "Expense Tracker", path: "/expense-tracker", icon: WalletIcon },
  { title: "Savings", path: "/savings", icon: SavingsIcon },
  { title: "Investments", path: "/investments", icon: LeaderboardIcon },
  {
    title: "Miscellaneous",
    path: "/miscellaneous",
    icon: MiscellaneousServicesIcon,
  },
  { title: "Dues", path: "/dues", icon: ScheduleIcon },
  { title: "Overview", path: "/overview", icon: ZoomInIcon },
  { title: "Settings", path: "/settings", icon: SettingsIcon },
  { title: "Contact Us", path: "/contact", icon: CallIcon },
];

export default function Sidebar() {
  const pathname = usePathname();
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);

  if (isLoggedIn) {
    return (
      <nav
        className="w-64 h-full p-8 border-r border-gray-800"
        style={{
          backgroundColor: "var(--theme-color)",
          color: "var(--text-color)",
        }}
      >
        <div
          className={`flex flex-col items-center ${
            isLoggedIn ? "h-5/6" : "h-2/6"
          } justify-between`}
        >
          <div className="w-full h-32 flex justify-center items-center">
            <span
              className="text-3xl font-extrabold"
              style={{ color: "var(--text-color)" }}
            >
              SmartSpend
            </span>
          </div>

          <div className="flex flex-col w-full space-y-4">
            {paths.map((item) => {
              const IconComponent = item.icon;
              const isActive = pathname === item.path;
              const shouldRender =
                isLoggedIn ||
                item.title === "Dashboard" ||
                item.title === "Contact Us";

              return shouldRender ? (
                <Link href={item.path} key={item.title} passHref>
                  <div
                    className={`flex items-center p-2 h-10 w-full ${
                      isActive
                        ? "bg-gray-300 text-white rounded-lg"
                        : "text-white"
                    }`}
                    style={{
                      backgroundColor: isActive
                        ? "var(--element-bg-color)"
                        : "transparent",
                    }}
                  >
                    <IconComponent
                      sx={{
                        fontSize: 28,
                        color: isActive ? "white" : "var(--text-color)",
                      }}
                    />
                    <p className="ml-2">{item.title}</p>
                  </div>
                </Link>
              ) : null;
            })}
          </div>
        </div>
      </nav>
    );
  }
}
