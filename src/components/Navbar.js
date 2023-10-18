import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

const Navbar = () => {
  const [loading, setLoading] = useState(false);
  const [isNavOpen, setNavOpen] = useState(false); // New state for mobile navigation

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

  return (
    <div className="navbar-container">
      <nav className="navbar navbar-expand-sm container">
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNav}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              {loading ? (
                <Spinner />
              ) : (
                <Link to="/home" className="nav-link" onClick={closeNav}>
                  Home
                </Link>
              )}
            </li>
            <li className="nav-item">
              {loading ? (
                <Spinner />
              ) : (
                <Link to="/account" className="nav-link" onClick={closeNav}>
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
                    <Link to="/login" className="nav-link" onClick={closeNav}>
                      Login
                    </Link>
                  )}
                </li>
                <li className="nav-item">
                  {loading ? (
                    <Spinner />
                  ) : (
                    <Link to="/signup" className="nav-link" onClick={closeNav}>
                      Signup
                    </Link>
                  )}
                </li>
              </div>
            ) : (
              <li className="nav-item">
                <Link to="/login" className="nav-link" onClick={handleLogout}>
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
