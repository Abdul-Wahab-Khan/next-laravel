import React from "react";
import Link from "next/link";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand mx-3" href="/">
        User Management
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" href="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="/users">
              Users
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="/users/create">
              Create a User
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
