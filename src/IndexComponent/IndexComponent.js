import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../HomeComponent/HomePage";
import LoginComponent from "../LoginComponent/LoginIndex";
import SigninComponent from '../SigninComponent/SigninIndex';
import PaymentPage from "../PaymentComponent/PagementPage";
import MainPage from "../MainComponent/MainPage";
import MainComponent from "../MainComponent/MainIndex";
import AdminComponent from "../AdminComponent/AdminIndex";
import AboutComponent from "../AboutComponent/AboutIndex";

const IndexComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/signin" element={<SigninComponent />} />
        <Route path="/payment" element={<PaymentPage />} /> {/* Add Payment Page Route */}
        <Route path="/main" element={<MainComponent />} />
        <Route path="/admin" element={<AdminComponent />} />
        <Route path="/about" element={<AboutComponent />} />

      </Routes>
    </Router>
  );
};

export default IndexComponent;