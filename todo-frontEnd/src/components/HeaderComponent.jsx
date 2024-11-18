import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { isUserLoggedIn, logout } from "../services/AuthService";

const HeaderComponent = () => {
  const isAuth = isUserLoggedIn();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);


  const handleToggle = () => setIsExpanded(!isExpanded);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="/">
          Todo Management
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          onClick={handleToggle}
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={isExpanded}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isExpanded ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav">
            {isAuth && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/todos">
                  Todos
                </NavLink>
              </li>
            )}
          </ul>
          <ul className="navbar-nav ms-auto">
            {!isAuth && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/register">
                  Register
                </NavLink>
              </li>
            )}

            {!isAuth && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </li>
            )}

            {isAuth && (
              <li className="nav-item">
                <NavLink className="nav-link" onClick={handleLogout}>
                  Logout
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default HeaderComponent;
