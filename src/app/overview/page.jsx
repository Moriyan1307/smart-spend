"use client";

import React, { useEffect, useState } from "react";
import Overview from "../../components/OverView/OverView";
import { useSelector } from "react-redux";
import { onSnapshotTransactions } from "../../utils/firebaseUtils";

function OverviewPage() {
  const [transactions, setTransactions] = useState([]);
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const month = useSelector((state) => state.auth.user.month);

  useEffect(() => {
    if (!isLoggedIn || !user) return;

    // Call the `onSnapshotTransactions` function with the user ID, month, and a callback
    const unsubscribe = onSnapshotTransactions(
      user.uid,
      month,
      setTransactions
    );

    // Cleanup function to unsubscribe from real-time updates when the component unmounts
    return () => {
      unsubscribe();
    };
  }, [user, isLoggedIn, month]);
  return <Overview />;
}

export default OverviewPage;
