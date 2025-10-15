import React from 'react';
import { useNavigate } from "react-router-dom";
import './NetflixIndexcomponent.css';

export default function NetflixHeadercomponent() {
  var navigate = useNavigate();

  var handleLogin = () => {
    navigate("/login"); 
  };
  var handleSigin =() => {
    (navigate("/signin"));
  }; 

    return (
        <header className="netflix-header">
          {/* <div className='img-fluid' style="height: 50px; width: auto;">
            
          </div> */}
            <h1> Stoream </h1>
            <div className="header-buttons">
                <button className="btn btn-outline-light" onClick={handleLogin}>
                    Login
                    </button>
                <button className="btn btn-outline-light" onClick={handleSigin}>
                    Sign-In
                    </button>
                </div>
        </header>
    );
}
