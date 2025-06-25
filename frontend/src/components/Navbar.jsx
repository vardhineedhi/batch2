// src/components/Navbar.jsx
import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Authcontext"; // ✅ import context

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark sticky-top shadow-sm"
      style={{ backgroundColor: "#5c5470", minHeight: "70px" }}
    >
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold fs-4 text-white">
          <i className="bi bi-mortarboard-fill me-2"></i>LearnHub
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">

            {/* Always show Home and Contact */}
            <li className="nav-item">
              <Link
                to="/"
                className={`nav-link px-3 ${
                  location.pathname === "/" ? "active fw-bold text-warning" : "text-white"
                }`}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/contact"
                className={`nav-link px-3 ${
                  location.pathname === "/contact" ? "active fw-bold text-warning" : "text-white"
                }`}
              >
                Contact
              </Link>
            </li>

            {currentUser ? (
              <>
                {currentUser.role === "student" && (
                  <li className="nav-item">
                    <Link
                      to="/courses"
                      className={`nav-link px-3 ${
                        location.pathname === "/courses" ? "active fw-bold text-warning" : "text-white"
                      }`}
                    >
                      Courses
                    </Link>
                  </li>
                )}

                {currentUser.role === "teacher" && (
                  <li className="nav-item">
                    <Link
                      to="/dashboard"
                      className={`nav-link px-3 ${
                        location.pathname === "/dashboard" ? "active fw-bold text-warning" : "text-white"
                      }`}
                    >
                      Dashboard
                    </Link>
                  </li>
                )}

                {currentUser.role === "admin" && (
                  <li className="nav-item">
                    <Link
                      to="/admin-dashboard"
                      className={`nav-link px-3 ${
                        location.pathname === "/admin-dashboard" ? "active fw-bold text-warning" : "text-white"
                      }`}
                    >
                      Admin
                    </Link>
                  </li>
                )}

              <li className="nav-item dropdown">
  <a
    className="nav-link dropdown-toggle text-white"
    href="#"
    id="userDropdown"
    role="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    <i className="bi bi-person-circle me-1"></i>
    {currentUser?.name || currentUser?.email?.split("@")[0]}
  </a>
<ul className="dropdown-menu dropdown-menu-end">
  <li>
    <Link className="dropdown-item" to="/profile">
      <i className="bi bi-person-lines-fill me-2"></i>My Profile
    </Link>
  </li>
  <li><hr className="dropdown-divider" /></li>

  {currentUser.role === "student" && (
    <li><Link className="dropdown-item" to="/courses">My Courses</Link></li>
  )}
  {currentUser.role === "teacher" && (
    <li><Link className="dropdown-item" to="/dashboard">Teacher Dashboard</Link></li>
  )}
  {currentUser.role === "admin" && (
    <li><Link className="dropdown-item" to="/admin-dashboard">Admin Panel</Link></li>
  )}

  <li><hr className="dropdown-divider" /></li>
  <li>
    <button className="dropdown-item text-danger" onClick={handleLogout}>
      <i className="bi bi-box-arrow-right me-2"></i> Logout
    </button>
  </li>
</ul>

</li>

              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    to="/login"
                    className={`nav-link px-3 ${
                      location.pathname === "/login" ? "active fw-bold text-warning" : "text-white"
                    }`}
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/register"
                    className={`nav-link px-3 ${
                      location.pathname === "/register" ? "active fw-bold text-warning" : "text-white"
                    }`}
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
