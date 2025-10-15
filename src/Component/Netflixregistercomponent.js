import React from 'react';


export default function Netflixregistercomponent() {
  return (
    <div
      className="netflix-background" >
      <div className="bg-black text-white p-4 rounded w-50">
        <h2>Register Now</h2>
        <div className="input-group mt-3">
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email"
          />
          <button className="btn btn-danger">
            Get Started <span className="bi bi-chevron-right"></span>
          </button>
        </div>
      </div>
    </div>
  );
}

