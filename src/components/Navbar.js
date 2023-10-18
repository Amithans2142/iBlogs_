import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

const Navbar = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setLoading(true);
    localStorage.removeItem("token");
    setTimeout(() => {
      setLoading(false);
      navigate("/login");
    }, 1000);
  };

  const redirectToFirstPage = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/home");
    }, 500);
  };

  const redirectToAccount = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/account");
    }, 500);
  };

  return (
    <div className="navbar-container">
      <nav className="navbar navbar-expand-lg container">
        <div className="nav-items mx-auto">
          {loading ? (
            <Spinner />
          ) : (
            <Link to="/home" className="navbar-brand" onClick={redirectToFirstPage}>
              iBlogs
            </Link>
          )}

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto d-flex">
              <li className="nav-item active">
                <Link className="nav-link" to="/home" onClick={redirectToFirstPage}>
                  Home
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/account" onClick={redirectToAccount}>
                  Account
                </Link>
              </li>

              {!localStorage.getItem("token") ? (
                <div className="navbar-nav ml-auto d-flex">
                  <li className="nav-item">
                    {loading ? (
                      <Spinner />
                    ) : (
                      <Link className="nav-link" to="/login">
                        Login
                      </Link>
                    )}
                  </li>
                  <li className="nav-item">
                    {loading ? (
                      <Spinner />
                    ) : (
                      <Link className="nav-link" to="/signup">
                        Signup
                      </Link>
                    )}
                  </li>
                </div>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to="/login" onClick={handleLogout}>
                    Logout
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
