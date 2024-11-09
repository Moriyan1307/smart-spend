"use client";
import { useState, useEffect } from "react";
import { auth } from "../../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  addTransaction,
  updateTransaction,
  deleteTransaction,
  onSnapshotTransactions,
} from "../../utils/firebaseUtils"; // Make sure updateTransaction and deleteTransaction are defined here
import { useSelector } from "react-redux";
import Dashboard from "../../components/Dashboard/Dashboard";

export default function DashboardPage() {
  return <Dashboard />;
}
