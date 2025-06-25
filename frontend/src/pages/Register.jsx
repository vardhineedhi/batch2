// ✅ src/pages/Register.jsx
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Authcontext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const { setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !role) {
      toast.error("Please fill in all fields.");
      return;
    }
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/;
if (!passwordRegex.test(password)) {
  toast.error("Password must be at least 8 characters and include a letter, a number, and a special character.");
  return;
}


    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/users/register", {
        name,
        email,
        password,
        role,
      });

      localStorage.setItem("learnhub-token", res.data.token);
      localStorage.setItem("learnhub-user", JSON.stringify(res.data.user));
      setCurrentUser(res.data.user);
      toast.success("Registration successful!");

      setTimeout(() => {
        if (res.data.user.role === "student") navigate("/courses");
        else if (res.data.user.role === "teacher") navigate("/dashboard");
        else navigate("/admin-dashboard");
      }, 50);
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed.you are already exist in the database.");
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleRegister = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const { displayName, email } = result.user;

    const res = await axios.post("http://localhost:5000/api/users/register", {
      name: displayName,
      email,
      password: "google-oauth", // dummy password
      role: "student", // default
    });

    localStorage.setItem("learnhub-token", res.data.token);
    localStorage.setItem("learnhub-user", JSON.stringify(res.data.user));
    setCurrentUser(res.data.user);
    toast.success("Registered via Google!");

    setTimeout(() => navigate("/courses"), 1000);
  } catch (err) {
    toast.error(err.response?.data?.message || "Google Sign-In failed.");
  }
};


  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">Register on LearnHub</h3>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label>Full Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>

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
              placeholder="Create password"
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
            className="btn btn-success w-100"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
          <button
  type="button"
  className="btn btn-outline-danger w-100 mt-2"
  onClick={handleGoogleRegister}
>
  <i className="bi bi-google me-2"></i> Sign up with Google
</button>

        </form>
      </div>
    </div>
  );
};

export default Register;



