// app/login/page.js
"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSignIn } from "../../app/redux/slices/authSlice"; // Adjust the path
import { useRouter } from "next/navigation"; // Use for navigation in Next.js app router

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleTogglePassword = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }
    return errors;
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      // Handle predefined user credentials
      if (
        formData.email === "student@uta.com" &&
        formData.password === "password"
      ) {
        router.push("/");
        dispatch(setSignIn("student"));
      } else if (
        formData.email === "professor@uta.com" &&
        formData.password === "password"
      ) {
        router.push("/");
        dispatch(setSignIn("professor"));
      } else if (
        formData.email === "admin@uta.com" &&
        formData.password === "password"
      ) {
        router.push("/");
        dispatch(setSignIn("admin"));
      } else {
        setIsInvalid(true);
      }
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 border border-gray-300 rounded-md">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      <form onSubmit={handleOnSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email*"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
          {formErrors.email && (
            <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
          )}
        </div>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password*"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
          <button
            type="button"
            onClick={handleTogglePassword}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            👁️
          </button>
          {formErrors.password && (
            <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white px-4 py-2 rounded-md"
        >
          Login
        </button>
        {isInvalid && (
          <p className="text-red-500 mt-2">Invalid email or password</p>
        )}
      </form>
    </div>
  );
}
