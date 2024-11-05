"use client";

import "./globals.css";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import FeaturedProfile from "../components/Featured/Featured";
import { Provider, useSelector } from "react-redux";
import { store } from "../app/redux/store";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const router = usePathname();

  // Check if the current route is '/expense-tracker'
  const isExpenseTrackerRoute = router === "/expense-tracker";

  return (
    <html lang="en">
      <body
        className="h-screen flex "
        style={{ backgroundColor: "var(--theme-color)" }}
      >
        <Provider store={store}>
          <Sidebar />

          <div className="flex flex-col flex-grow">
            <Header />

            <div className="flex flex-grow">
              <div className="flex-1 p-4">{children}</div>
              {!isExpenseTrackerRoute && <FeaturedProfile />}
            </div>
          </div>
        </Provider>
      </body>
    </html>
  );
}
