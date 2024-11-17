"use client";

import "./globals.css";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import FeaturedProfile from "../components/Featured/Featured";
import { Provider, useSelector } from "react-redux";
import { store, persistor } from "../app/redux/store";
import { usePathname } from "next/navigation";
import { PersistGate } from "redux-persist/integration/react";

export default function RootLayout({ children }) {
  const router = usePathname();

  // Check if the current route is '/expense-tracker'
  const isExpenseTrackerRoute = router === "/expense-tracker";
  const isOnboardingRoute = router === "/onboard";

  return (
    <html lang="en">
      <body
        className="h-screen flex "
        style={{ backgroundColor: "var(--theme-color)" }}
      >
        <Provider store={store}>
          <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
            {!isOnboardingRoute && <Sidebar />}

            <div className="flex flex-col flex-grow">
              <Header />

              <div className="flex flex-grow">
                <div className="flex-1 p-4">{children}</div>
                {!isExpenseTrackerRoute ||
                  (isOnboardingRoute && <FeaturedProfile />)}
              </div>
            </div>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
