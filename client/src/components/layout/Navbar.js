import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { signout, isAuthenticated } from "../userAuth";

const Navbar = () => {
  return (
    <nav
      className="navbar fixed-top navbar-expand-lg py-3 navbarbg shadow-sm"
      style={{ backgroundColor: "black" }}
    >
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img
            src="https://pbs.twimg.com/profile_images/1315517250267348992/hlx6XidZ_400x400.jpg"
            alt=""
            width="120"
            height="100"
            className="d-inline-block align-middle mr-2"
          />
        </Link>

        <button
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          className="navbar-toggler"
        >
          <span className="navbar-toggler-icon">
            <i
              className="fas fa-bars"
              style={{ color: "#fff", fontSize: "28px" }}
            ></i>
          </span>
        </button>

        <div id="navbarSupportedContent" className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <Link
                to="/"
                style={{
                  color: "white",
                  fontFamily: "Oswald, sans-serif",
                  fontSize: "1.4em",
                  margin: ".5em",
                }}
              >
                home <span className="sr-only"></span>
              </Link>
            </li>

            {/*                                           GUEST LINKS                                        */}
            {!isAuthenticated() && (
              <Fragment>
                <li className="nav-item">
                  <Link
                    to="/user/login"
                    style={{
                      color: "white",
                      fontFamily: "Oswald, sans-serif",
                      fontSize: "1.4em",
                      margin: ".5em",
                    }}
                  >
                    login
                  </Link>
                </li>
              </Fragment>
            )}

            {/*                                           USER LINKS                                        */}
            {isAuthenticated() && (
              <Fragment>
                {isAuthenticated() && isAuthenticated().user.role === 0 && (
                  <li className="nav-item active">
                    <Link
                      to="/user/dashboard"
                      style={{
                        color: "white",
                        fontFamily: "Oswald, sans-serif",
                        fontSize: "1.4em",
                        margin: ".5em",
                      }}
                    >
                      dashboard <span className="sr-only"></span>
                    </Link>
                  </li>
                )}

                {isAuthenticated() && isAuthenticated().user.role === 1 && (
                  <li className="nav-item active">
                    <Link
                      to="/admin/dashboard"
                      style={{
                        color: "white",
                        fontFamily: "Oswald, sans-serif",
                        fontSize: "1.4em",
                        margin: ".5em",
                      }}
                    >
                      admin dashboard <span className="sr-only"></span>
                    </Link>
                  </li>
                )}

                <li className="nav-item active">
                  <Link
                    to="/"
                    style={{
                      color: "white",
                      fontFamily: "Oswald, sans-serif",
                      fontSize: "1.4em",
                      margin: ".5em",
                    }}
                    onClick={signout}
                  >
                    logout
                  </Link>
                </li>
              </Fragment>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
