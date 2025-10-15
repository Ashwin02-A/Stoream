import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "bootstrap/dist/css/bootstrap.min.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  // Show popup when error exists, hide otherwise
  React.useEffect(() => {
    if (error) {
      setShowErrorPopup(true);
    }
  }, [error]);

  const closeErrorPopup = () => {
    setShowErrorPopup(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost/stoream_api/login.php",
        { email: email.trim(), password: password.trim() },
        { headers: { "Content-Type": "application/json" } }
      );

      let data = response.data;
      console.log("Raw login response:", data);
      if (typeof data === "string") {
        const jsonStart = data.indexOf("{");
        if (jsonStart !== -1) {
          data = JSON.parse(data.substring(jsonStart));
        }
      }
      console.log("Parsed login data:", data);

      if (data.redirect_url === "http://localhost/stoream_api/login-success") {
        localStorage.setItem("user", JSON.stringify(data.user));
        console.log("Stored in localStorage:", JSON.parse(localStorage.getItem("user")));
        alert("Login Successful");
        navigate("/main");
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid Credintials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

    <div className="container">
      <div className="screen">
        <div className="screen__content">
          <form className="login" onSubmit={handleSubmit}>
            <h2 className="text-center mb-4">Welcome Back!</h2>
            {/* {error && <div className="alert alert-danger">{error}</div>} */}
            <div className="login__field">
              <i className="login__icon fas fa-user"></i>
              <input
                className="login__input"
                type="email"
                id="email"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="login__field">
              <i className="login__icon fas fa-lock"></i>
              <input
                className="login__input"
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              className="button login__submit"
              disabled={loading}
            >
              <span className="button__text">
                {loading ? "Logging in..." : "Login"}
              </span>
              <i className="button__icon fas fa-chevron-right"></i>
            </button>
          </form>
          <div className="home-link" style={{ textAlign: 'center', marginTop: '20px', textDecoration: 'none' }}>
            <a href="/" className="home-link">
            <i className="bi bi-arrow-left"> 
            Back to Home
            </i>

             
            </a>
          </div>

          
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>




      {/* <div className="login-container">
        <div className="login-form">
          <h2 className="text-center mb-4">Welcome Back!</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
            <div class="login__field">
					<i class="login__icon fas fa-user"></i>
					<input class="login__input" 
          type="email"
                id="email"
                className="form-control"
                placeholder="User name / Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}

          />
				  </div>
            </div>
            <div className="form-group mb-4">
              
              <div class="login__field">
					  <i class="login__icon fas fa-lock"></i>
					  <input class="login__input"
            
                type="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
            
            />
				    </div>
            </div>
            <button type="submit" class="button login__submit" disabled={loading}>
        <span class="button__text"> {loading ? "Logging in..." : "Login"}
				</span>
					<i class="button__icon fas fa-chevron-right"></i>
				</button>
          </form>
        </div>
      </div> */}



      {/* <div class="container">
	<div class="screen">
		<div class="screen__content">
    <h2 className="text-center mb-4">Welcome Back!</h2>
    {error && <div className="alert alert-danger">{error}</div>}
			<form class="login">
				<div class="login__field">
					<i class="login__icon fas fa-user"></i>
					<input  class="login__input"
                type="email"
                id="email"
                className="form-control"
                placeholder="User name / Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}

          />
				</div>
				<div class="login__field">
					<i class="login__icon fas fa-lock"></i>
					<input  class="login__input"
          
                type="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
          
          />
				</div>
        <button type="submit" class="button login__submit" disabled={loading}>
        <span class="button__text"> {loading ? "Logging in..." : "Login"}
				</span>
					<i class="button__icon fas fa-chevron-right"></i>
				</button>				
			</form>
			<div class="social-login">
				<h3>log in via</h3>
				<div class="social-icons">
					<a href="#" class="social-login__icon fab fa-instagram"></a>
					<a href="#" class="social-login__icon fab fa-facebook"></a>
					<a href="#" class="social-login__icon fab fa-twitter"></a>
				</div>
			</div>
		</div>
		<div class="screen__background">
			<span class="screen__background__shape screen__background__shape4"></span>
			<span class="screen__background__shape screen__background__shape3"></span>		
			<span class="screen__background__shape screen__background__shape2"></span>
			<span class="screen__background__shape screen__background__shape1"></span>
		</div>		
	</div>
</div> */}


{showErrorPopup && error && (
        <div className="error-popup-overlay">
          <div className="error-popup-card">
            <h3 className="error-popup-title">Login Error</h3>
            <p className="error-popup-message">{error}</p>
            <button
              className="error-popup-close-btn"
              onClick={closeErrorPopup}
            >
              OK
            </button>
          </div>
        </div>
      )}


    </div>

// sample design

  );
};

export default LoginPage;


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./LoginPage.css";
// import "bootstrap/dist/css/bootstrap.min.css";

// const LoginPage = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     if (!email.trim() || !password.trim()) {
//       setError("Please enter both email and password.");
//       setLoading(false);
//       return;
//     }

//     try {
//       console.log("Sending login request with:", { email, password });
//       const response = await axios.post(
//         "http://localhost/stoream_api/login.php",
//         { email: email.trim(), password: password.trim() },
//         { headers: { "Content-Type": "application/json" } }
//       );

//       // Handle stray output in response.data
//       let data = response.data;
//       if (typeof data === "string") {
//         const jsonStart = data.indexOf("{");
//         if (jsonStart !== -1) {
//           data = JSON.parse(data.substring(jsonStart));
//         }
//       }

//       console.log("Parsed response data:", data);

//       if (data.redirect_url === "http://localhost/stoream_api/login-success") {
//         alert("Login Successful!");
//         localStorage.setItem("user", JSON.stringify(data.user));
//         navigate("/main");
//       } else {
//         setError(data.message || "Login failed. Please try again.");
//       }
//     } catch (error) {
//       console.error("Login error:", error.response?.data || error);
//       setError("Login failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="login-page">
//       <div className="login-container">
//         <div className="login-form">
//           <h2 className="text-center mb-4">Welcome Back!</h2>
//           {error && <div className="alert alert-danger">{error}</div>}
//           <form onSubmit={handleSubmit}>
//             <div className="form-group mb-3">
//               <label htmlFor="email" className="form-label">Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 className="form-control"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 disabled={loading}
//               />
//             </div>
//             <div className="form-group mb-4">
//               <label htmlFor="password" className="form-label">Password</label>
//               <input
//                 type="password"
//                 id="password"
//                 className="form-control"
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 disabled={loading}
//               />
//             </div>
//             <button type="submit" className="btn btn-primary w-100" disabled={loading}>
//               {loading ? "Logging in..." : "Login"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./LoginPage.css";
// import "bootstrap/dist/css/bootstrap.min.css";

// const LoginPage = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     if (!email.trim() || !password.trim()) {
//       setError("Please enter both email and password.");
//       setLoading(false);
//       return;
//     }

//     try {
//       console.log("Sending login request with:", { email, password });
//       const response = await axios.post(
//         "http://localhost/stoream_api/login.php",
//         { email: email.trim(), password: password.trim() },
//         { headers: { "Content-Type": "application/json" } }
//       );

//       console.log("Full response:", response);
//       console.log("Response data (raw):", response.data);

//       // If response.data is a string, parse it manually
//       let data = response.data;
//       if (typeof data === "string") {
//         try {
//           const jsonStart = data.indexOf("{");
//           if (jsonStart !== -1) {
//             data = JSON.parse(data.substring(jsonStart));
//           }
//         } catch (parseError) {
//           console.error("Failed to parse response data:", parseError);
//         }
//       }

//       console.log("Parsed data:", data);

//       if (data && data.redirect_url === "http://localhost/stoream_api/login-success") {
//         console.log("Login success detected via URL!");
//         alert("Login Successful!");
//         localStorage.setItem("user", JSON.stringify(data.user || {}));
//         navigate("/main");
//       } else {
//         console.log("Login failed - URL:", data?.redirect_url || "undefined");
//         setError(data?.message || "Login failed. Please try again.");
//       }
//     } catch (error) {
//       console.error("Login error details:", error.response?.data || error);
//       if (error.response) {
//         setError(error.response.data?.message || "Login failed. Please try again.");
//       } else if (error.request) {
//         setError("Server is not responding. Please check if the backend is running.");
//       } else {
//         setError("An unexpected error occurred. Please try again.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="login-page">
//       <div className="login-container">
//         <div className="login-form">
//           <h2 className="text-center mb-4">Welcome Back!</h2>
//           {error && <div className="alert alert-danger">{error}</div>}
//           <form onSubmit={handleSubmit}>
//             <div className="form-group mb-3">
//               <label htmlFor="email" className="form-label">Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 className="form-control"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 disabled={loading}
//               />
//             </div>
//             <div className="form-group mb-4">
//               <label htmlFor="password" className="form-label">Password</label>
//               <input
//                 type="password"
//                 id="password"
//                 className="form-control"
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 disabled={loading}
//               />
//             </div>
//             <button type="submit" className="btn btn-primary w-100" disabled={loading}>
//               {loading ? "Logging in..." : "Login"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./LoginPage.css";
// import "bootstrap/dist/css/bootstrap.min.css";

// const LoginPage = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     if (!email.trim() || !password.trim()) {
//       setError("Please enter both email and password.");
//       setLoading(false);
//       return;
//     }

//     try {
//       console.log("Sending login request with:", { email, password });
//       const response = await axios.post(
//         "http://localhost/stoream_api/login.php",
//         { email: email.trim(), password: password.trim() },
//         { headers: { "Content-Type": "application/json" } }
//       );

//       console.log("Login response:", response.data);

//       if (response.status === 200 && response.data.success === true) {
//         alert("Login Successful!");
//         localStorage.setItem("user", JSON.stringify(response.data.user));
//         navigate("/main");
//       } else {
//         setError(response.data.message || "Login failed. Please try again.");
//       }
//     } catch (error) {
//       console.error("Login error details:", error.response?.data || error);
//       if (error.response) {
//         const debug = error.response.data.debug || {};
//         let errorMsg = error.response.data.message;
//         if (debug.user_found === false) {
//           errorMsg += " (User not found)";
//         } else if (debug.user_found && !debug.password_match) {
//           errorMsg += " (Incorrect password)";
//         }
//         setError(errorMsg);
//       } else if (error.request) {
//         setError("Server is not responding. Please check if the backend is running.");
//       } else {
//         setError("An unexpected error occurred. Please try again.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="login-page">
//       <div className="login-container">
//         <div className="login-form">
//           <h2 className="text-center mb-4">Welcome Back!</h2>
//           {error && <div className="alert alert-danger">{error}</div>}
//           <form onSubmit={handleSubmit}>
//             <div className="form-group mb-3">
//               <label htmlFor="email" className="form-label">Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 className="form-control"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 disabled={loading}
//               />
//             </div>
//             <div className="form-group mb-4">
//               <label htmlFor="password" className="form-label">Password</label>
//               <input
//                 type="password"
//                 id="password"
//                 className="form-control"
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 disabled={loading}
//               />
//             </div>
//             <button type="submit" className="btn btn-primary w-100" disabled={loading}>
//               {loading ? "Logging in..." : "Login"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;





// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./LoginPage.css";
// import "bootstrap/dist/css/bootstrap.min.css";

// const LoginPage = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     if (!email || !password) {
//       setError("Please enter your email and password.");
//       setLoading(false);
//       return;
//     }

//     try {
//       console.log("Sending login request with:", { email, password });

//       const response = await axios.post(
//         "http://localhost/stoream_api/login.php",
//         { email: email.trim(), password: password.trim() },
//         { headers: { "Content-Type": "application/json" } }
//       );

//       console.log("Login response:", response.data);

//       if (response.data.success) {
//         alert("Login Successful!");

//         // Store user details in localStorage
//         localStorage.setItem("user", JSON.stringify(response.data.user));

//         // Navigate to MainPage
//         navigate("/main", { state: response.data.user });
//       } else {
//         setError(response.data.message || "Invalid email or password.");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       setError("Server is not responding. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="login-page">
//       <div className="login-container">
//         <div className="login-form">
//           <h2 className="text-center mb-4">Welcome Back!</h2>
//           {error && <div className="alert alert-danger">{error}</div>}
//           <form onSubmit={handleSubmit}>
//             <div className="form-group mb-3">
//               <label htmlFor="email" className="form-label">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 className="form-control"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="form-group mb-4">
//               <label htmlFor="password" className="form-label">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 className="form-control"
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>
//             <button type="submit" className="btn btn-primary w-100" disabled={loading}>
//               {loading ? "Logging in..." : "Login"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;



// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import axios from "axios";
// // import "./LoginPage.css";
// // import "bootstrap/dist/css/bootstrap.min.css";

// // const LoginPage = () => {
// //   const navigate = useNavigate();
// //   const [email, setEmail] = useState(""); // Using email instead of "username"
// //   const [password, setPassword] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");

// //   const handleBackClick = () => {
// //     navigate("/"); // Redirect to Home
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError(""); // Clear previous errors
// //     setLoading(true); // Show loading state

// //     if (!email || !password) {
// //       setError("Please enter your email and password.");
// //       setLoading(false);
// //       return;
// //     }

// //     try {
// //       const response = await axios.post(
// //         "http://localhost/stoream_api/login.php", // Send email and password to backend
// //         { email, password }
// //       );

// //       console.log("Login response:", response.data);

// //       if (response.data.success) {
// //         alert("Login Successful!");
// //         navigate("/main"); // Redirect to Main Page
// //       } else {
// //         setError(response.data.message || "Invalid email or password.");
// //       }
// //     } catch (error) {
// //       console.error("Login error:", error);
// //       setError(
// //         error.response?.data?.message ||
// //           "Server is not responding. Please try again later."
// //       );
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="login-page">
// //       <div className="login-container">
// //         <div className="login-form">
// //           <h2 className="text-center mb-4">Welcome Back!</h2>
// //           {error && <div className="alert alert-danger">{error}</div>}
// //           <form onSubmit={handleSubmit}>
// //             <div className="form-group mb-3">
// //               <label htmlFor="email" className="form-label">
// //                 Email
// //               </label>
// //               <input
// //                 type="email"
// //                 id="email"
// //                 className="form-control"
// //                 placeholder="Enter your email"
// //                 value={email}
// //                 onChange={(e) => setEmail(e.target.value)}
// //                 required
// //               />
// //             </div>

// //             <div className="form-group mb-4">
// //               <label htmlFor="password" className="form-label">
// //                 Password
// //               </label>
// //               <input
// //                 type="password"
// //                 id="password"
// //                 className="form-control"
// //                 placeholder="Enter your password"
// //                 value={password}
// //                 onChange={(e) => setPassword(e.target.value)}
// //                 required
// //               />
// //             </div>

// //             <button type="submit" className="btn btn-primary w-100" disabled={loading}>
// //               {loading ? "Logging in..." : "Login"}
// //             </button>

// //             <div className="text-center mt-3 d-flex justify-content-between align-items-center">
// //               <a href="#" className="forgot-password">
// //                 Forgot Password?
// //               </a>
// //               <button className="btn btn-link p-0" onClick={handleBackClick} style={{ textDecoration: "none" }}>
// //                 <i className="bi bi-arrow-left"></i> Back
// //               </button>
// //             </div>
// //           </form>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default LoginPage;

// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import axios from "axios";
// // import "./LoginPage.css";
// // import "bootstrap/dist/css/bootstrap.min.css";

// // const LoginPage = () => {
// //   const navigate = useNavigate();
// //   const [email, setEmail] = useState(""); 
// //   const [password, setPassword] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");

// //   const handleBackClick = () => {
// //     navigate("/"); 
// //   };



// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError(""); // Clear previous errors
// //     setLoading(true); // Show loading state
  
// //     if (!email || !password) {
// //       setError("Please enter your email and password.");
// //       setLoading(false);
// //       return;
// //     }
  
// //     try {
// //       const response = await axios.post(
// //         "http://localhost/stoream_api/login.php",
// //         { email, password }
// //       );
  
// //       console.log("Backend response:", response.data); // Log the entire response to inspect data
  
// //       if (response.data.success) {
// //         alert("Login Successful!");
// //         navigate("/main"); // Redirect to Main Page
// //       } else {
// //         setError(response.data.message || "Invalid email or password.");
// //       }
// //     } catch (error) {
// //       console.error("Login error:", error);
// //       setError(
// //         error.response?.data?.message ||
// //           "Server is not responding. Please try again later."
// //       );
// //     } finally {
// //       setLoading(false);
// //     }
// //   };
  

// //   return (
// //     <div className="login-page">
// //       <div className="login-container">
// //         <div className="login-form">
// //           <h2 className="text-center mb-4">Welcome Back!</h2>
// //           {error && <div className="alert alert-danger">{error}</div>}
// //           <form onSubmit={handleSubmit}>
// //             <div className="form-group mb-3">
// //               <label htmlFor="email" className="form-label">
// //                 Email
// //               </label>
// //               <input
// //                 type="email"
// //                 id="email"
// //                 className="form-control"
// //                 placeholder="Enter your email"
// //                 value={email}
// //                 onChange={(e) => setEmail(e.target.value)}
// //                 required
// //               />
// //             </div>

// //             <div className="form-group mb-4">
// //               <label htmlFor="password" className="form-label">
// //                 Password
// //               </label>
// //               <input
// //                 type="password"
// //                 id="password"
// //                 className="form-control"
// //                 placeholder="Enter your password"
// //                 value={password}
// //                 onChange={(e) => setPassword(e.target.value)}
// //                 required
// //               />
// //             </div>

// //             <button type="submit" className="btn btn-primary w-100" disabled={loading}>
// //               {loading ? "Logging in..." : "Login"}
// //             </button>

// //             <div className="text-center mt-3 d-flex justify-content-between align-items-center">
// //               <a href="#" className="forgot-password">
// //                 Forgot Password?
// //               </a>
// //               <button className="btn btn-link p-0" onClick={handleBackClick} style={{ textDecoration: "none" }}>
// //                 <i className="bi bi-arrow-left"></i> Back
// //               </button>
// //             </div>
// //           </form>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default LoginPage;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./LoginPage.css";
// import "bootstrap/dist/css/bootstrap.min.css";

// const LoginPage = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleBackClick = () => {
//     navigate("/");
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   setError("");
//   //   setLoading(true);

//   //   if (!email || !password) {
//   //     setError("Please enter your email and password.");
//   //     setLoading(false);
//   //     return;
//   //   }

//   //   try {
//   //     const response = await axios.post("http://localhost/stoream_api/login.php", {
//   //       email,
//   //       password,
//   //     });

//   //     console.log("Login response:", response.data);



//   //     if (response.data.success) {
//   //       const { first_name, profile_image, plan_name, plan_amount } = response.data;
      
//   //       navigate("/main", { 
//   //         state: { first_name, profile_image, plan_name, plan_amount } 
//   //       });
//   //     }




//   //     if (response.data.success) {
//   //       const { user, plan } = response.data;
//   //       alert("Login Successful!");

//   //       navigate("/main", {
//   //         state: {
//   //           email,
//   //           password,
//   //           firstName: user.first_name,
//   //           profileImage: user.profile_image,
//   //           planDetails: plan,
//   //         },
//   //       });
//   //     } else {
//   //       setError(response.data.message || "Invalid email or password.");
//   //     }
//   //   } catch (error) {
//   //     console.error("Login error:", error);
//   //     setError(
//   //       error.response?.data?.message ||
//   //         "Server is not responding. Please try again later."
//   //     );
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };



//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);
  
//     if (!email || !password) {
//       setError("Please enter your email and password.");
//       setLoading(false);
//       return;
//     }
  
//     try {
//       const response = await axios.post(
//         "http://localhost/stoream_api/login.php",
//         { email, password }
//       );
  

//       if(response.data === true)
//       {
//         alert("Login Successful!");
//         navigate("/main", { 
//           state: { 
//             first_name: response.data.first_name, 
//             profile_image: response.data.profile_image, 
//             plan_name: response.data.plan_name, 
//             plan_amount: response.data.plan_amount 
//           } 
//         });
//       }

//       console.log("Login response:", response.data); // Debugging
//       alert("Login Successful!");
//         navigate("/main"
//         //   , { 
//         //   state: { 
//         //     first_name: response.data.first_name, 
//         //     profile_image: response.data.profile_image, 
//         //     plan_name: response.data.plan_name, 
//         //     plan_amount: response.data.plan_amount 
//         //   } 
//         // }
//       );
  
//       // if (response.data.success) {
//       //   alert("Login Successful!");
//       //   navigate("/main", { 
//       //     state: { 
//       //       first_name: response.data.first_name, 
//       //       profile_image: response.data.profile_image, 
//       //       plan_name: response.data.plan_name, 
//       //       plan_amount: response.data.plan_amount 
//       //     } 
//       //   });
//       // } else {
//       //   setError(response.data.message || "Invalid email or password.");
//       // }
//     } catch (error) {
//       console.error("Login error:", error);
//       setError("Server is not responding. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   return (
//     <div className="login-page">
//       <div className="login-container">
//         <div className="login-form">
//           <h2 className="text-center mb-4">Welcome Back!</h2>
//           {error && <div className="alert alert-danger">{error}</div>}
//           <form onSubmit={handleSubmit}>
//             <div className="form-group mb-3">
//               <label htmlFor="email" className="form-label">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 className="form-control"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>

//             <div className="form-group mb-4">
//               <label htmlFor="password" className="form-label">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 className="form-control"
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>

//             <button type="submit" className="btn btn-primary w-100" disabled={loading}>
//               {loading ? "Logging in..." : "Login"}
//             </button>

//             <div className="text-center mt-3 d-flex justify-content-between align-items-center">
//               <a href="#" className="forgot-password">
//                 Forgot Password?
//               </a>
//               <button
//                 className="btn btn-link p-0"
//                 onClick={handleBackClick}
//                 style={{ textDecoration: "none" }}
//               >
//                 <i className="bi bi-arrow-left"></i> Back
//               </button>
//             </div>
//           </form>
//         </div>

//         {/* Decorative Animation */}
//         <div className="login-decoration">
//           <div className="circle circle-1"></div>
//           <div className="circle circle-2"></div>
//           <div className="circle circle-3"></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;


// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import axios from "axios";
// // import "./LoginPage.css";
// // import "bootstrap/dist/css/bootstrap.min.css";

// // const LoginPage = () => {
// //   const navigate = useNavigate();
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");

// //   const handleBackClick = () => {
// //     navigate("/");
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError("");
// //     setLoading(true);

// //     if (!email || !password) {
// //       setError("Please enter your email and password.");
// //       setLoading(false);
// //       return;
// //     }

// //     try {
// //       const response = await axios.post("http://localhost:5000/api/login", {
// //         email,
// //         password,
// //       });

// //       console.log("Login response:", response.data); // Debugging

// //       if (response.data.success) {
// //         alert("Login Successful!");
// //         navigate("/main", {
// //           state: {
// //             first_name: response.data.firstName,
// //             plan_name: response.data.planName,
// //             plan_amount: response.data.amount,
// //           },
// //         });
// //       } else {
// //         setError(response.data.message || "Invalid email or password.");
// //       }
// //     } catch (error) {
// //       console.error("Login error:", error);
// //       setError("Server is not responding. Please try again later.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="login-page">
// //       <div className="login-container">
// //         <div className="login-form">
// //           <h2 className="text-center mb-4">Welcome Back!</h2>
// //           {error && <div className="alert alert-danger">{error}</div>}
// //           <form onSubmit={handleSubmit}>
// //             <div className="form-group mb-3">
// //               <label htmlFor="email" className="form-label">
// //                 Email
// //               </label>
// //               <input
// //                 type="email"
// //                 id="email"
// //                 className="form-control"
// //                 placeholder="Enter your email"
// //                 value={email}
// //                 onChange={(e) => setEmail(e.target.value)}
// //                 required
// //               />
// //             </div>

// //             <div className="form-group mb-4">
// //               <label htmlFor="password" className="form-label">
// //                 Password
// //               </label>
// //               <input
// //                 type="password"
// //                 id="password"
// //                 className="form-control"
// //                 placeholder="Enter your password"
// //                 value={password}
// //                 onChange={(e) => setPassword(e.target.value)}
// //                 required
// //               />
// //             </div>

// //             <button
// //               type="submit"
// //               className="btn btn-primary w-100"
// //               disabled={loading}
// //             >
// //               {loading ? "Logging in..." : "Login"}
// //             </button>

// //             <div className="text-center mt-3 d-flex justify-content-between align-items-center">
// //               <a href="#" className="forgot-password">
// //                 Forgot Password?
// //               </a>
// //               <button
// //                 className="btn btn-link p-0"
// //                 onClick={handleBackClick}
// //                 style={{ textDecoration: "none" }}
// //               >
// //                 <i className="bi bi-arrow-left"></i> Back
// //               </button>
// //             </div>
// //           </form>
// //         </div>

// //         {/* Decorative Animation */}
// //         <div className="login-decoration">
// //           <div className="circle circle-1"></div>
// //           <div className="circle circle-2"></div>
// //           <div className="circle circle-3"></div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default LoginPage;

