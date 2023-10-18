import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

const Navbar = () => {
  const [loading, setLoading] = useState(false);
  const [isNavOpen, setNavOpen] = useState(false);

  let navigate = useNavigate();

  const handleLogout = () => {
    setLoading(true);
    localStorage.removeItem("token");
    setTimeout(() => {
      setLoading(false);
      navigate("/login");
    }, 1000);
  };

  const toggleNav = () => {
    setNavOpen(!isNavOpen);
  };

  const closeNav = () => {
    setNavOpen(false);
  };

  const linkStyle = {
    padding: "0.5rem",
    fontSize: "1rem",
    marginRight: "150px", // Add margin to links
  };

  return (
    <div className="navbar-container">
      <nav className="navbar navbar-expand-md container">
        <Link to="/home" className="navbar-brand">
          iBlogs
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNav}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`}>
          <ul className="navbar-nav mx-auto"> {/* Center the menu links */}
            <li className="nav-item">
              {loading ? (
                <Spinner />
              ) : (
                <Link
                  to="/home"
                  className="nav-link"
                  onClick={closeNav}
                  style={linkStyle}
                >
                  Home
                </Link>
              )}
            </li>
            <li className="nav-item">
              {loading ? (
                <Spinner />
              ) : (
                <Link
                  to="/account"
                  className="nav-link"
                  onClick={closeNav}
                  style={linkStyle}
                >
                  Account
                </Link>
              )}
            </li>

            {!localStorage.getItem("token") ? (
              <div className="navbar-nav">
                <li className="nav-item">
                  {loading ? (
                    <Spinner />
                  ) : (
                    <Link
                      to="/login"
                      className="nav-link"
                      onClick={closeNav}
                      style={linkStyle}
                    >
                      Login
                    </Link>
                  )}
                </li>
                <li className="nav-item">
                  {loading ? (
                    <Spinner />
                  ) : (
                    <Link
                      to="/signup"
                      className="nav-link"
                      onClick={closeNav}
                      style={linkStyle}
                    >
                      Signup
                    </Link>
                  )}
                </li>
              </div>
            ) : (
              <li className="nav-item">
                <Link
                  to="/login"
                  className="nav-link"
                  onClick={handleLogout}
                  style={linkStyle}
                >
                  Logout
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
