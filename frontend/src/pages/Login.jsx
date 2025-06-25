// ✅ src/pages/Login.jsx

import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Authcontext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { auth, provider as googleProvider } from "../firebase"; // ✅ import firebase config
import { signInWithPopup } from "firebase/auth";     // ✅ import Google sign-in method

const Login = () => {
  const { setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password || !role) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
        role,
      });

      localStorage.setItem("learnhub-token", res.data.token);
      localStorage.setItem("learnhub-user", JSON.stringify(res.data.user));
      setCurrentUser(res.data.user);
      toast.success("Login successful!");

      setTimeout(() => {
        if (res.data.user.role === "student") navigate("/courses");
        else if (res.data.user.role === "teacher") navigate("/dashboard");
        else navigate("/admin-dashboard");
      }, 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };
const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const gUser = result.user;

    const googleEmail = gUser.email;
    const googleName = gUser.displayName;

    try {
      // Attempt login using dummy password
      const res = await axios.post("http://localhost:5000/api/users/login", {
        email: googleEmail,
        password: "google-oauth", // ✅ This matches the register dummy password
        role: "student",
      });

      localStorage.setItem("learnhub-token", res.data.token);
      localStorage.setItem("learnhub-user", JSON.stringify(res.data.user));
      setCurrentUser(res.data.user);
      toast.success("Google Login successful!");
      navigate("/courses");
    } catch (loginError) {
      // If user not found, try auto-registering
      const res = await axios.post("http://localhost:5000/api/users/register", {
        name: googleName,
        email: googleEmail,
        password: "google-oauth", // same dummy password
        role: "student",
      });

      localStorage.setItem("learnhub-token", res.data.token);
      localStorage.setItem("learnhub-user", JSON.stringify(res.data.user));
      setCurrentUser(res.data.user);
      toast.success("Google account registered!");
      navigate("/courses");
    }
  } catch (err) {
    toast.error("Google authentication failed.");
    console.error("Google Auth Error:", err);
  }
};


  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">Login to LearnHub</h3>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>

          <div className="mb-3">
            <label>Role</label>
            <select
              className="form-control"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">-- Select Role --</option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <hr />

        <button
          className="btn btn-danger mt-2 w-100"
          onClick={handleGoogleLogin}
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
