"use client";
import LoginForm from "../../components/Login/Login";
import React from "react";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center h-full ">
      <div
        className="w-full max-w-md p-8  rounded-lg"
        style={{
          backgroundColor: "var(--gray-900)",
          borderRadius: "10px",
        }}
      >
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
