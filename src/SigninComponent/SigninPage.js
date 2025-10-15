// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import "./SigninPage.css";
// import "bootstrap/dist/css/bootstrap.min.css";

// const SigninPage = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     phoneNumber: "",
//     profileImage: null,
//     planName: queryParams.get("plan") || "",
//     amount: queryParams.get("amount") || "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value, type, files } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: type === "file" ? files[0] : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }

//     setLoading(true);

//     const data = new FormData();
//     Object.keys(formData).forEach((key) => {
//       data.append(key, formData[key]);
//     });

//     try {
//       const response = await axios.post("http://localhost/stoream_api/signin.php", data, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       console.log("Response Data:", response.data); // Debugging
//       navigate("/login");
//       alert("Signup successful!");
//       // } else {
//       //     console.error("Error Message:", response.data.message);
//       //     alert(response.data.message || "An error occurred during signup.");
//       // }
//     }finally {
//       // setLoading(false);
//     }
//   };


//   return (
//             <div class="signup-container">
//           <div class="signup-card">
//             <h2 class="title">Create Your Account</h2>
//             <form onSubmit={handleSubmit} encType="multipart/form-data" class="signup-form">
//               <div class="input-group">
//                 <label class="input-label">First Name</label>
//                 <input 
//                   type="text" 
//                   class="form-input" 
//                   name="firstName" 
//                   value={formData.firstName} 
//                   onChange={handleChange} 
//                   required 
//                 />
//               </div>

//               <div class="input-group">
//                 <label class="input-label">Last Name</label>
//                 <input 
//                   type="text" 
//                   class="form-input" 
//                   name="lastName" 
//                   value={formData.lastName} 
//                   onChange={handleChange} 
//                   required 
//                 />
//               </div>

//               <div class="input-group">
//                 <label class="input-label">Email</label>
//                 <input 
//                   type="email" 
//                   class="form-input" 
//                   name="email" 
//                   value={formData.email} 
//                   onChange={handleChange} 
//                   required 
//                 />
//               </div>

//               <div class="input-group">
//                 <label class="input-label">Password</label>
//                 <input 
//                   type="password" 
//                   class="form-input" 
//                   name="password" 
//                   value={formData.password} 
//                   onChange={handleChange} 
//                   required 
//                 />
//               </div>

//               <div class="input-group">
//                 <label class="input-label">Confirm Password</label>
//                 <input 
//                   type="password" 
//                   class="form-input" 
//                   name="confirmPassword" 
//                   value={formData.confirmPassword} 
//                   onChange={handleChange} 
//                   required 
//                 />
//               </div>

//               <div class="input-group">
//                 <label class="input-label">Phone Number</label>
//                 <input 
//                   type="text" 
//                   class="form-input" 
//                   name="phoneNumber" 
//                   value={formData.phoneNumber} 
//                   onChange={handleChange} 
//                   required 
//                 />
//               </div>

//               {/* <div class="input-group">
//                 <label class="input-label">Profile Image</label>
//                 <input 
//                   type="file" 
//                   class="form-input file-input" 
//                   name="profileImage" 
//                   onChange={handleChange} 
//                   required 
//                 />
//               </div> */}

//               <div class="input-group readonly">
//                 <label class="input-label">Plan Name</label>
//                 <input 
//                   type="text" 
//                   class="form-input" 
//                   name="planName" 
//                   value={formData.planName} 
//                   readOnly 
//                 />
//               </div>

//               <div class="input-group readonly">
//                 <label class="input-label">Amount</label>
//                 <input 
//                   type="text" 
//                   class="form-input" 
//                   name="amount" 
//                   value={formData.amount} 
//                   readOnly 
//                 />
//               </div>
            
//               <button 
//                 type="submit" 
//                 class="submit-btn" 
//                 disabled={loading}
//               >
//                 {loading ? "Signing Up..." : "Sign Up"}
//               </button>
//               <div className="home-link" style={{ textAlign: 'center', marginTop: '20px', textDecoration: 'none' }}>
//                 <a href="/" className="home-link">
//                 <i className="bi bi-arrow-left"> 
//                 Back to Home
//                 </i>
//                 </a>
//               </div>   
//             </form>
//           </div>
//         </div>
//   );
// };

// export default SigninPage;


import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./SigninPage.css";
import "bootstrap/dist/css/bootstrap.min.css";

const SigninPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    profileImage: null,
    planName: queryParams.get("plan") || "",
    amount: queryParams.get("amount") || "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [razorpayInstance, setRazorpayInstance] = useState(null);

  const RAZORPAY_KEY_ID = "rzp_test_epUHxtRjQtXs0T"; // Replace with your actual test Key ID

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setRazorpayLoaded(true);
    script.onerror = () => setError("Failed to load Razorpay SDK");
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handlePaymentAndSignup = () => {
    setLoading(true);
    setError("");

    try {
      if (formData.password !== formData.confirmPassword) {
        throw new Error("Passwords do not match!");
      }

      if (!razorpayLoaded) {
        throw new Error("Razorpay SDK not loaded");
      }

      const options = {
        key: "rzp_test_epUHxtRjQtXs0T",
        amount: formData.amount * 100,
        currency: "INR",
        name: "Stoream",
        description: `Payment for ${formData.planName} Plan (Test Mode)`,
        handler: async (response) => {
          console.log("Razorpay Payment Response:", response);
          navigate("/login");
          alert("Signup successful with payment!");
          alert(
            `Payment Successful! Payment ID: ${response.razorpay_payment_id} (Test Mode)`
          );

          const data = new FormData();
          Object.keys(formData).forEach((key) => {
            data.append(key, formData[key]);
          });

          try {
            const signinResponse = await axios.post(
              "http://localhost/stoream_api/signin.php",
              data,
              {
                headers: { "Content-Type": "multipart/form-data" },
              }
            );

            console.log("Signin Response:", signinResponse.data);
            if (signinResponse.data.success) {
              navigate("/login");
              alert("Signup successful with payment!");
            } else {
              throw new Error(
                signinResponse.data.message || "An error occurred during signup."
              );
            }
          }
           catch (axiosErr) {
            // console.error("Axios Error:", axiosErr);
            // throw new Error(
            //   axiosErr.response?.data?.message ||
            //     "Network error during signup"
            // );
          }
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phoneNumber,
        },
        theme: {
          color: "#1f3a5f",
        },
        modal: {
          onopen: () => {
            setTimeout(() => {
              if (razorpayInstance) {
                razorpayInstance.close();
                const mockResponse = {
                  razorpay_payment_id: "test_payment_" + Date.now(),
                  razorpay_order_id: "test_order_" + Date.now(),
                  razorpay_signature: "test_signature",
                };
                options.handler(mockResponse);
              }
            }); 
          },
          ondismiss: () => {
            alert("Payment cancelled (Test Mode)");
            setLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      setRazorpayInstance(rzp);
      rzp.open();
    } catch (err) {
      console.error("Razorpay Error:", err);
      setError(err.message || "An error occurred during payment or sign-up");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handlePaymentAndSignup();
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="title">Create Your Account</h2>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="signup-form"
        >
          <div className="input-group">
            <label className="input-label">First Name</label>
            <input
              type="text"
              className="form-input"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Last Name</label>
            <input
              type="text"
              className="form-input"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Email</label>
            <input
              type="email"
              className="form-input"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Password</label>
            <input
              type="password"
              className="form-input"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Confirm Password</label>
            <input
              type="password"
              className="form-input"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Phone Number</label>
            <input
              type="text"
              className="form-input"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>

          {/* <div className="input-group">
           <label className="input-label">Profile Image</label>
            <input
              type="file"
              className="form-input file-input"
              name="profileImage"
              onChange={handleChange}
              required
            />
          </div> */}

          <div className="input-group readonly">
            <label className="input-label">Plan Name</label>
            <input
              type="text"
              className="form-input"
              name="planName"
              value={formData.planName}
              readOnly
            />
          </div>

          <div className="input-group readonly">
            <label className="input-label">Amount</label>
            <input
              type="text"
              className="form-input"
              name="amount"
              value={formData.amount}
              readOnly
            />
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading ? "Signing Up & Paying..." : "Sign Up & Pay"}
          </button>
          <div
            className="home-link"
            style={{ textAlign: "center", marginTop: "20px", textDecoration: "none" }}
          >
            <a href="/" className="home-link">
              <i className="bi bi-arrow-left"> Back to Home</i>
            </a>
          </div>
          {error && <p className="text-danger">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default SigninPage;