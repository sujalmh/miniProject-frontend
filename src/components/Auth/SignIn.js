import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom"; // Assuming you're using React Router
import axios from "./../../axios";
import Alert from "../Alert";

const SignIn = () => {
  const [useEmail, setUseEmail] = useState(true);
  const [formData, setFormData] = useState({ email: "", phone: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Get the 'next' parameter from the URL
  const [searchParams] = useSearchParams();
  const nextUrl = searchParams.get("next") || "/dashboard"; // Default to dashboard if 'next' is not present

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    try {
      if (useEmail) {
        formData.phone = "";
      } else {
        formData.email = "";
      }

      const response = await axios.post("/api/user/login", formData);
      const { access_token } = response.data;

      // Store the access token in localStorage
      localStorage.setItem("access_token", access_token);

      // Show success message
      setSuccessMessage("Login successful! Redirecting...");
      setErrorMessage("");

      // Redirect to the 'next' URL or default dashboard
      setTimeout(() => {
        window.location.href = nextUrl;
      }, 1500);
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage(
        error.response?.data?.message || "An error occurred during login."
      );
      setSuccessMessage("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100">
      {/* Alert Modals */}
      {successMessage && (
        <Alert
          type="success"
          message={successMessage}
          onClose={() => setSuccessMessage("")}
        />
      )}
      {errorMessage && (
        <Alert
          type="danger"
          message={errorMessage}
          onClose={() => setErrorMessage("")}
        />
      )}

      {/* Sign-In Form */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Login
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor={useEmail ? "email" : "phone"}
              className="block text-sm font-medium text-gray-700"
            >
              {useEmail ? "Email" : "Phone Number"}
            </label>
            <input
              type={useEmail ? "email" : "tel"}
              id={useEmail ? "email" : "phone"}
              name={useEmail ? "email" : "phone"}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder={useEmail ? "Enter your email" : "Enter your phone number"}
              value={useEmail ? formData.email : formData.phone}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            Login
          </button>
        </form>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setUseEmail(!useEmail)}
            className="text-indigo-600 hover:underline text-sm focus:outline-none"
          >
            {useEmail ? "Use Phone Number Instead" : "Use Email Instead"}
          </button>
          <a
            href="/forgot-password"
            className="text-indigo-600 hover:underline text-sm focus:outline-none"
          >
            Forgot Password?
          </a>
        </div>
        <p className="text-sm text-center text-gray-500 mt-4">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-indigo-600 hover:underline focus:outline-none"
          >
            Signup
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;