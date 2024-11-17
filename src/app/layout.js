"use client";

import "./globals.css";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import FeaturedProfile from "../components/Featured/Featured";
import { Provider } from "react-redux";
import { store, persistor } from "../app/redux/store";
import { usePathname } from "next/navigation";
import { PersistGate } from "redux-persist/integration/react";
import { useState, useEffect } from "react";

export default function RootLayout({ children }) {
  const router = usePathname();
  const [show, setShow] = useState(true);

  // Update `show` based on the current route
  useEffect(() => {
    const isExpenseTrackerRoute = router === "/expense-tracker";
    const isOnboardingRoute = router === "/onboard";

    setShow(!(isExpenseTrackerRoute || isOnboardingRoute)); // Hide `FeaturedProfile` for specific routes
  }, [router]);

  return (
    <html lang="en">
      <body
        className="h-screen flex"
        style={{ backgroundColor: "var(--theme-color)" }}
      >
        <Provider store={store}>
          <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
            {!router.includes("/onboard") && <Sidebar />}
            <div className="flex flex-col flex-grow">
              <Header />
              <div className="flex flex-grow">
                <div className="flex-1 p-4">{children}</div>
                {show && <FeaturedProfile />}
              </div>
            </div>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
