import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Navbar(props) {
  let location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
  }, [location]);
  let nevigate = useNavigate();
  //logout function
  const handleLogOut = () => {
    localStorage.removeItem("token");
    props.showAlert("Logged Out successfully", "success");
    nevigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <span
              style={{
                fontSize: "1.5rem",
                fontWeight: "bolder",
                fontFamily: "sans-serif",
                color: "rgb(216, 87, 255)",
              }}
            >
              iNoteBook
            </span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/notes" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/notes"
                >
                  Notes
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
            {!localStorage.getItem("token") ? (
              <form className="d-flex" role="search">
                <Link
                  className="btn btn-primary mx-2"
                  to="/login"
                  role="button"
                >
                  Login
                </Link>
                <Link
                  className="btn btn-primary mx-2"
                  to="/signup"
                  role="button"
                >
                  SignUp
                </Link>
              </form>
            ) : (
              <button className="btn btn-primary" onClick={handleLogOut}>
                LogOut
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
