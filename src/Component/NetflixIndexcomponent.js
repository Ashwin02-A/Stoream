import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NetflixHeadercomponent from "./NetflixHeadercomponent";
import NetflixFootercomponent from "./NetflixFootercomponent";
import Netflixregistercomponent from "./Netflixregistercomponent";
import NetflixLogincomponent from "./NetflixLogincomponent";
import NetflixSignincomponent from "./NetflixSignincomponent";
import NetflixMaincomponent from "./NetflixMaincomponent";
import NetflixSucNavcomponent from "./NetflixSucNavcomponent";
import SampleNew from "../NewComponent/SampleNew";

export default function NetflixIndexcomponent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle login success
  const handleLogin = () => {
    setIsLoggedIn(true); // Set login status to true
  };

  // Protected route for logged-in users
  // const ProtectedRoute = ({ children }) => {
  //   return isLoggedIn ? children : <Navigate to="/login" />;
  // };

  return (
    <Router>
      <div>
        {/* Show header only if not logged in */}
        {!isLoggedIn && <NetflixHeadercomponent />}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<SampleNew />} />
          <Route
            path="/login"
            element={<NetflixLogincomponent onLogin={handleLogin} />}
          />
          <Route path="/signin" element={<NetflixSignincomponent />} />

          {/* Protected Routes */}
          <Route
            path="/logsuc"
            element={
                <>
                  <NetflixSucNavcomponent />
                  <NetflixMaincomponent />
                  <NetflixFootercomponent />
                </>
            }
          />
        </Routes>

        {/* Show footer only if not logged in */}
        {!isLoggedIn && <NetflixFootercomponent />}
      </div>
    </Router>
  );
}
