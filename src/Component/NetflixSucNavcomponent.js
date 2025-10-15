import React from "react";
import { useNavigate } from "react-router-dom";
import './NetflixIndexcomponent.css';
export default function NetflixSucNavcomponent() {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark"
      style={{ marginBottom: "0", padding: "0", }}
    >
      <div className="container-fluid">
        {/* Brand Logo */}
        <a className="navbar-brand" href="/main">
          Stoream
        </a>

        {/* Toggle button for mobile view */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link active" href="/main">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/movies">
                Movies
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact">
                Contact us
              </a>
            </li>
            {/* Categories Dropdown
            <p>Select category</p>
            <select className="navbar">
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select> */}
          </ul>

          {/* Search Box */}
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search movies..."
              aria-label="Search"
            />
            <button className="btn btn-danger" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
