import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MainPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const [firstName, setFirstName] = useState(null);
  const [planName, setPlanName] = useState(null);
  const [movies, setMovies] = useState([]);
  const [userMovies, setUserMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUploads, setShowUploads] = useState(false);
  const [availableSpace, setAvailableSpace] = useState(0);
  const [file, setFile] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const fetchMovies = async (plan) => {
    try {
      const response = await axios.get(`http://localhost/stoream_api/movies.php?planName=${encodeURIComponent(plan)}`);
      setMovies(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]);
    }
  };

  const fetchUserUploads = async (userId, plan) => {
    try {
      const response = await axios.get(`http://localhost/stoream_api/uploads.php?user_id=${userId}`);
      setUserMovies(response.data.movies);
      setAvailableSpace(response.data.available_space);
    } catch (error) {
      console.error("Error fetching user uploads:", error);
      setUserMovies([]);
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
  
    // Frontend validation: Check file size (1GB limit)
    const maxFileSize = 2000 * 2048 * 2048; // 1000MB in bytes
    if (file.size > maxFileSize) {
      alert("File size exceeds the maximum allowed limit of 1000MB.");
      return;
    }
  
    const formData = new FormData();
    formData.append("movie", file);
    formData.append("user_id", userId);
  
    try {
      const response = await axios.post("http://localhost/stoream_api/uploads.php", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      fetchUserUploads(userId, planName);
      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file. Please try again.");
    }
  };

  const handleDeleteMovie = async (movieId) => {
    try {
      await axios.delete("http://localhost/stoream_api/uploads.php", {
        data: { id: movieId, user_id: userId }
      });
      fetchUserUploads(userId, planName);
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.email) {
      axios
        .get(`http://localhost/stoream_api/get_user_details.php?email=${storedUser.email}`)
        .then((response) => {
          let data = response.data;
          if (typeof data === "string") {
            const jsonStart = data.indexOf("{");
            if (jsonStart !== -1) data = JSON.parse(data.substring(jsonStart));
          }
          if (data.success && data.user) {
            setFirstName(data.user.first_name || "Unknown");
            const id = data.user.id;
            setUserId(id);

            if (id) {
              axios
                .get(`http://localhost/stoream_api/get_user_plan.php?user_id=${id}`)
                .then((planResponse) => {
                  let planData = planResponse.data;
                  if (typeof planData === "string") {
                    const planJsonStart = planData.indexOf("{");
                    if (planJsonStart !== -1) planData = JSON.parse(planData.substring(planJsonStart));
                  }
                  if (planData.success && planData.plan) {
                    setPlanName(planData.plan.plan_name);
                    fetchMovies(planData.plan.plan_name);
                    fetchUserUploads(id, planData.plan.plan_name);
                  }
                });
            }
          }
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  return (
    // <div className="main-content text-white">
    //   <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ height: "100px" }}>
    //     <div className="container-fluid">
    //       <a className="navbar-brand" href="#">Stoream</a>
    //       <div className="navbar-nav ms-auto">
    //         {loading ? (
    //           <span className="navbar-text loading">Loading...</span>
    //         ) : firstName ? (
    //           <>
    //             <span className="navbar-text welcome me-3">
    //               Welcome, {firstName} {planName ? `| Plan: ${planName}` : ""}
    //             </span>
    //             {planName && (
    //               <button
    //                 type="button"
    //                 className="btn btn-outline-light me-3"
    //                 onClick={() => setShowUploads(!showUploads)}
    //               >
    //                 Uploads
    //               </button>
    //             )}
    //           </>
    //         ) : (
    //           <span className="navbar-text">No user logged in</span>
    //         )}
    //         <button
    //           type="button"
    //           className="btn btn-outline-light ms-3"
    //           onClick={handleLogout}
    //         >
    //           Logout
    //         </button>
    //       </div>
    //     </div>
    //   </nav>

    //   {showUploads && planName && (
    //     <div className="container mt-4">
    //       <h2>User Uploads</h2>
    //       <p>Available Space: {(availableSpace / (1024 * 1024)).toFixed(2)} MB</p>
    //       <form onSubmit={handleFileUpload} className="mb-3">
    //         <input
    //           type="file"
    //           onChange={(e) => setFile(e.target.files[0])}
    //           className="form-control d-inline-block w-auto"
    //         />
    //         <button type="submit" className="btn btn-primary ms-2">Upload</button>
    //       </form>
    //       {userMovies.length > 0 ? (
    //         <table className="table table-striped table-bordered table-hover text-white">
    //           <thead>
    //             <tr>
    //               <th>ID</th>
    //               <th>File Name</th>
    //               <th>Size (MB)</th>
    //               <th>Action</th>
    //             </tr>
    //           </thead>
    //           <tbody>
    //             {userMovies.map((movie) => (
    //               <tr key={movie.id}>
    //                 <td>{movie.id}</td>
    //                 <td>{movie.file_name}</td>
    //                 <td>{(movie.file_size / (1024 * 1024)).toFixed(2)}</td>
    //                 <td>
    //                   <button
    //                     className="btn btn-danger"
    //                     onClick={() => handleDeleteMovie(movie.id)}
    //                   >
    //                     Delete
    //                   </button>
    //                 </td>
    //               </tr>
    //             ))}
    //           </tbody>
    //         </table>
    //       ) : (
    //         <p>No uploaded movies yet.</p>
    //       )}
    //     </div>
    //   )}

    //   <div className="movies-container">
    //     <h2 className="movies-section-title">Movies Available for Your Plan</h2>
    //     {loading ? (
    //       <div className="movies-loading-spinner">
    //         <div className="movies-spinner"></div>
    //         <p>Loading movies...</p>
    //       </div>
    //     ) : movies.length > 0 ? (
    //       <div className="movies-grid">
    //         {movies.map((movie) => (
    //           <div key={movie.id} className="movies-card">
    //             <div className="movies-poster">
    //               {movie.poster_path ? (
    //                 <img
    //                   src={`http://localhost/stoream_api/${movie.poster_path}`}
    //                   alt={movie.title}
    //                 />
    //               ) : (
    //                 <div className="movies-no-poster">No Poster Available</div>
    //               )}
    //             </div>
    //             <div className="movies-details">
    //               <h3>{movie.title}</h3>
    //               <div className="movies-rating">★ {movie.rating || "N/A"}/10</div>
    //               <p>{movie.description || "No description available"}</p>
    //               <div className="movies-meta">
    //                 <span className="movies-category">{movie.category}</span>
    //                 <span className="movies-run-time">Run Time: {movie.run_time || "N/A"}</span>
    //                 <span className="movies-release-date">
    //                   Release: {new Date(movie.release_date).toLocaleDateString()}
    //                 </span>
    //               </div>
    //               <div className="movies-credits">
    //                 <span>Director: {movie.director || "N/A"}</span>
    //                 <span>Stars: {movie.stars || "N/A"}</span>
    //               </div>
    //               {movie.movie_path && (
    //                 <a
    //                   href={`http://localhost/stoream_api/${movie.movie_path}`}
    //                   target="_blank"
    //                   rel="noopener noreferrer"
    //                   className="movies-watch-button"
    //                 >
    //                   Watch Now
    //                 </a>
    //               )}
    //             </div>
    //           </div>
    //         ))}
    //       </div>
    //     ) : (
    //       <p className="movies-no-movies">No movies available for your plan.</p>
    //     )}
    //   </div>
    // </div>


<div className="main-content text-white">
  <nav className="main-nav dark-gradient" style={{ height: "100px" }}>
    <div className="main-container">
      <div className="hp-brand-name">
        <h1 className="text-white">Stoream</h1>
      </div>
      <div className="main-nav-actions ms-auto">
        {loading ? (
          <span className="main-loading-text">Loading...</span>
        ) : firstName ? (
          <>
            <span className="main-welcome-text me-3">
              Welcome, {firstName} {planName ? `| Plan: ${planName}` : ""}
            </span>
            {planName && (
              <button
                type="button"
                className="main-upload-btn outline-light me-3"
                onClick={() => setShowUploads(!showUploads)}
              >
                Uploads
              </button>
            )}
          </>
        ) : (
          <span className="main-no-user-text">No user logged in</span>
        )}
        <button
          type="button"
          className="main-logout-btn outline-light ms-3"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  </nav> 
  <br />
  <br />
  <br />
  {showUploads && planName && (
    <div className="main-container main-uploads-section mt-4">
      <h2 className="main-section-title">{firstName} Uploads</h2>
      <p className="main-space-info">Available Space: {(availableSpace / (1024 * 1024)).toFixed(2)} MB</p>
      <form onSubmit={handleFileUpload} className="main-upload-form mb-3">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="main-file-input d-inline-block w-auto"
        />
        <button type="submit" className="main-upload-btn primary ms-2">Upload</button>
      </form>
      {userMovies.length > 0 ? (
        <table className="main-table striped bordered hover text-white">
          <thead>
            <tr>
              <th>ID</th>
              <th>File Name</th>
              <th>Size (MB)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userMovies.map((movie) => (
              <tr key={movie.id}>
                <td>{movie.id}</td>
                <td>{movie.file_name}</td>
                <td>{(movie.file_size / (1024 * 1024)).toFixed(2)}</td>
                <td>
                <button
                    className="btn-primary">
                    View
                  </button>
                  <br />
                  <button
                    className="main-delete-btn danger"
                    onClick={() => handleDeleteMovie(movie.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="main-no-uploads-text">No uploaded movies yet.</p>
      )}
    </div>
  )}

  <div className="main-movies-container">
    <h2 className="main-movies-title">Movies Available for Your Plan</h2>
    {loading ? (
      <div className="main-loading-spinner">
        <div className="main-spinner"></div>
        <p className="main-loading-text">Loading movies...</p>
      </div>
    ) : movies.length > 0 ? (
      <div className="main-movies-grid">
        {movies.map((movie) => (
          <div key={movie.id} className="main-movie-card">
            <div className="main-poster">
              {movie.poster_path ? (
                <img
                  src={`http://localhost/stoream_api/${movie.poster_path}`}
                  alt={movie.title}
                />
              ) : (
                <div className="main-no-poster">No Poster Available</div>
              )}
            </div>
            <div className="main-movie-details">
              <h3 className="main-movie-title">{movie.title}</h3>
              <div className="main-rating">★ {movie.rating || "N/A"}/10</div>
              <p className="main-description">{movie.description || "No description available"}</p>
              <div className="main-meta">
                <span className="main-category">{movie.category}</span>
                <span className="main-run-time">Run Time: {movie.run_time || "N/A"}</span>
                <span className="main-release-date">
                  Release: {new Date(movie.release_date).toLocaleDateString()}
                </span>
              </div>
              <div className="main-credits">
                <span>Director: {movie.director || "N/A"}</span>
                <span>Stars: {movie.stars || "N/A"}</span>
              </div>
              {movie.movie_path && (
                <a
                  href={`http://localhost/stoream_api/${movie.movie_path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="main-watch-btn"
                >
                  Watch Now
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p className="main-no-movies-text">No movies available for your plan.</p>
    )}
  </div>
</div>



  );
}






// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./MainPage.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { useNavigate } from "react-router-dom";

// export default function MainPage() {
//   const [firstName, setFirstName] = useState(null);
//   const [planName, setPlanName] = useState(null);
//   const [movies, setMovies] = useState([]);
//   const [userMovies, setUserMovies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showUploads, setShowUploads] = useState(false);
//   const [availableSpace, setAvailableSpace] = useState(0);
//   const [file, setFile] = useState(null);
//   const [userId, setUserId] = useState(null);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     navigate("/");
//   };

//   const fetchMovies = async (plan) => {
//     try {
//       const response = await axios.get(`http://localhost/stoream_api/movies.php?planName=${encodeURIComponent(plan)}`);
//       setMovies(response.data);
//     } catch (error) {
//       console.error("Error fetching movies:", error);
//       setMovies([]);
//     }
//   };

//   const fetchUserUploads = async (userId, plan) => {
//     try {
//       const response = await axios.get(`http://localhost/stoream_api/uploads.php?user_id=${userId}`);
//       setUserMovies(response.data.movies);
//       setAvailableSpace(response.data.available_space);
//     } catch (error) {
//       console.error("Error fetching user uploads:", error);
//       setUserMovies([]);
//     }
//   };

//   const handleFileUpload = async (e) => {
//     e.preventDefault();
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("movie", file);
//     formData.append("user_id", userId);

//     try {
//       const response = await axios.post("http://localhost/stoream_api/uploads.php", formData);
//       fetchUserUploads(userId, planName);
//     } catch (error) {
//       console.error("Error uploading file:", error);
//     }
//   };

//   const handleDeleteMovie = async (movieId) => {
//     try {
//       await axios.delete("http://localhost/stoream_api/uploads.php", {
//         data: { id: movieId, user_id: userId }
//       });
//       fetchUserUploads(userId, planName);
//     } catch (error) {
//       console.error("Error deleting movie:", error);
//     }
//   };

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser && storedUser.email) {
//       axios
//         .get(`http://localhost/stoream_api/get_user_details.php?email=${storedUser.email}`)
//         .then((response) => {
//           let data = response.data;
//           if (typeof data === "string") {
//             const jsonStart = data.indexOf("{");
//             if (jsonStart !== -1) data = JSON.parse(data.substring(jsonStart));
//           }
//           if (data.success && data.user) {
//             setFirstName(data.user.first_name || "Unknown");
//             const id = data.user.id;
//             setUserId(id);

//             if (id) {
//               axios
//                 .get(`http://localhost/stoream_api/get_user_plan.php?user_id=${id}`)
//                 .then((planResponse) => {
//                   let planData = planResponse.data;
//                   if (typeof planData === "string") {
//                     const planJsonStart = planData.indexOf("{");
//                     if (planJsonStart !== -1) planData = JSON.parse(planData.substring(planJsonStart));
//                   }
//                   if (planData.success && planData.plan) {
//                     setPlanName(planData.plan.plan_name); // planName is set here
//                     fetchMovies(planData.plan.plan_name);
//                     fetchUserUploads(id, planData.plan.plan_name);
//                   }
//                 });
//             }
//           }
//         })
//         .finally(() => setLoading(false));
//     } else {
//       setLoading(false);
//     }
//   }, []);

//   return (
//     <div className="main-content text-white">
//       <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ height: "100px" }}>
//         <div className="container-fluid">
//           <a className="navbar-brand" href="#">Stoream</a>
//           <div className="navbar-nav ms-auto">
//             {loading ? (
//               <span className="navbar-text loading">Loading...</span>
//             ) : firstName ? (
//               <>
//                 <span className="navbar-text welcome me-3">
//                   Welcome, {firstName} {planName ? `| Plan: ${planName}` : ""}
//                 </span>
//                 {planName && (
//                   <button
//                     type="button"
//                     className="btn btn-outline-light me-3"
//                     onClick={() => setShowUploads(!showUploads)}
//                   >
//                     Uploads
//                   </button>
//                 )}
//               </>
//             ) : (
//               <span className="navbar-text">No user logged in</span>
//             )}
//             <button
//               type="button"
//               className="btn btn-outline-light ms-3"
//               onClick={handleLogout}
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </nav>

//       {showUploads && planName && (
//         <div className="container mt-4">
//           <h2>User Uploads</h2>
//           <p>Available Space: {(availableSpace / (1024 * 1024)).toFixed(2)} MB</p>
//           <form onSubmit={handleFileUpload} className="mb-3">
//             <input
//               type="file"
//               onChange={(e) => setFile(e.target.files[0])}
//               className="form-control d-inline-block w-auto"
//             />
//             <button type="submit" className="btn btn-primary ms-2">Upload</button>
//           </form>
//           {userMovies.length > 0 ? (
//             <table className="table table-striped table-bordered table-hover text-white">
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>File Name</th>
//                   <th>Size (MB)</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {userMovies.map((movie) => (
//                   <tr key={movie.id}>
//                     <td>{movie.id}</td>
//                     <td>{movie.file_name}</td>
//                     <td>{(movie.file_size / (1024 * 1024)).toFixed(2)}</td>
//                     <td>
//                       <button
//                         className="btn btn-danger"
//                         onClick={() => handleDeleteMovie(movie.id)}
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           ) : (
//             <p>No uploaded movies yet.</p>
//           )}
//         </div>
//       )}

//       {/* Movies Section */}
//       <div className="movies-container">
//         <h2 className="movies-section-title">Movies Available for Your Plan</h2>
//         {loading ? (
//           <div className="movies-loading-spinner">
//             <div className="movies-spinner"></div>
//             <p>Loading movies...</p>
//           </div>
//         ) : movies.length > 0 ? (
//           <div className="movies-grid">
//             {movies.map((movie) => (
//               <div key={movie.id} className="movies-card">
//                 <div className="movies-poster">
//                   {movie.poster_path ? (
//                     <img
//                       src={`http://localhost/stoream_api/${movie.poster_path}`}
//                       alt={movie.title}
//                     />
//                   ) : (
//                     <div className="movies-no-poster">No Poster Available</div>
//                   )}
//                 </div>
//                 <div className="movies-details">
//                   <h3>{movie.title}</h3>
//                   <p>{movie.description || "No description available"}</p>
//                   <div className="movies-meta">
//                     <span className="movies-category">{movie.category}</span>
//                     <span className="movies-release-date">
//                       {new Date(movie.release_date).toLocaleDateString()}
//                     </span>
//                   </div>
//                   {movie.movie_path && (
//                     <a
//                       href={`http://localhost/stoream_api/${movie.movie_path}`}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="movies-watch-button"
//                     >
//                       Watch Now
//                     </a>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="movies-no-movies">No movies available for your plan.</p>
//         )}
//       </div>
//     </div>
//   );
// }



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./MainPage.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { useNavigate } from "react-router-dom";

// export default function MainPage() {
//   const [firstName, setFirstName] = useState(null);
//   const [planName, setPlanName] = useState(null);
//   const [movies, setMovies] = useState([]);
//   const [userMovies, setUserMovies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showUploads, setShowUploads] = useState(false);
//   const [availableSpace, setAvailableSpace] = useState(0);
//   const [file, setFile] = useState(null);
//   const [userId, setUserId] = useState(null);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     navigate("/");
//   };

//   const fetchMovies = async (plan) => {
//     try {
//       const response = await axios.get(`http://localhost/stoream_api/movies.php?planName=${encodeURIComponent(plan)}`);
//       setMovies(response.data);
//     } catch (error) {
//       console.error("Error fetching movies:", error);
//       setMovies([]);
//     }
//   };

//   const fetchUserUploads = async (userId, plan) => {
//     try {
//       const response = await axios.get(`http://localhost/stoream_api/uploads.php?user_id=${userId}`);
//       setUserMovies(response.data.movies);
//       setAvailableSpace(response.data.available_space);
//     } catch (error) {
//       console.error("Error fetching user uploads:", error);
//       setUserMovies([]);
//     }
//   };

//   const handleFileUpload = async (e) => {
//     e.preventDefault();
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("movie", file);
//     formData.append("user_id", userId);

//     try {
//       const response = await axios.post("http://localhost/stoream_api/uploads.php", formData);
//       fetchUserUploads(userId, planName);
//     } catch (error) {
//       console.error("Error uploading file:", error);
//     }
//   };

//   const handleDeleteMovie = async (movieId) => {
//     try {
//       await axios.delete("http://localhost/stoream_api/uploads.php", {
//         data: { id: movieId, user_id: userId }
//       });
//       fetchUserUploads(userId, planName);
//     } catch (error) {
//       console.error("Error deleting movie:", error);
//     }
//   };

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser && storedUser.email) {
//       axios
//         .get(`http://localhost/stoream_api/get_user_details.php?email=${storedUser.email}`)
//         .then((response) => {
//           let data = response.data;
//           if (typeof data === "string") {
//             const jsonStart = data.indexOf("{");
//             if (jsonStart !== -1) data = JSON.parse(data.substring(jsonStart));
//           }
//           if (data.success && data.user) {
//             setFirstName(data.user.first_name || "Unknown");
//             const id = data.user.id;
//             setUserId(id);

//             if (id) {
//               axios
//                 .get(`http://localhost/stoream_api/get_user_plan.php?user_id=${id}`)
//                 .then((planResponse) => {
//                   let planData = planResponse.data;
//                   if (typeof planData === "string") {
//                     const planJsonStart = planData.indexOf("{");
//                     if (planJsonStart !== -1) planData = JSON.parse(planData.substring(planJsonStart));
//                   }
//                   if (planData.success && planData.plan) {
//                     setPlanName(planData.plan.plan_name); // planName is set here
//                     fetchMovies(planData.plan.plan_name);
//                     fetchUserUploads(id, planData.plan.plan_name);
//                   }
//                 });
//             }
//           }
//         })
//         .finally(() => setLoading(false));
//     } else {
//       setLoading(false);
//     }
//   }, []);

//   return (
//     <div className="main-content text-white">
//       <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ height: "100px" }}>
//         <div className="container-fluid">
//           <a className="navbar-brand" href="#">Stoream</a>
//           <div className="navbar-nav ms-auto">
//             {loading ? (
//               <span className="navbar-text loading">Loading...</span>
//             ) : firstName ? (
//               <>
//                 <span className="navbar-text welcome me-3">
//                   Welcome, {firstName} {planName ? `| Plan: ${planName}` : ""}
//                 </span>
//                 {planName && (
//                   <button
//                     type="button"
//                     className="btn btn-outline-light me-3"
//                     onClick={() => setShowUploads(!showUploads)}
//                   >
//                     Uploads
//                   </button>
//                 )}
//               </>
//             ) : (
//               <span className="navbar-text">No user logged in</span>
//             )}
//             <button
//               type="button"
//               className="btn btn-outline-light ms-3"
//               onClick={handleLogout}
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </nav>

//       {showUploads && planName && (
//         <div className="container mt-4">
//           <h2>User Uploads</h2>
//           <p>Available Space: {(availableSpace / (1024 * 1024)).toFixed(2)} MB</p>
//           <form onSubmit={handleFileUpload} className="mb-3">
//             <input
//               type="file"
//               onChange={(e) => setFile(e.target.files[0])}
//               className="form-control d-inline-block w-auto"
//             />
//             <button type="submit" className="btn btn-primary ms-2">Upload</button>
//           </form>
//           {userMovies.length > 0 ? (
//             <table className="table table-striped table-bordered table-hover text-white">
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>File Name</th>
//                   <th>Size (MB)</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {userMovies.map((movie) => (
//                   <tr key={movie.id}>
//                     <td>{movie.id}</td>
//                     <td>{movie.file_name}</td>
//                     <td>{(movie.file_size / (1024 * 1024)).toFixed(2)}</td>
//                     <td>
//                       <button
//                         className="btn btn-danger"
//                         onClick={() => handleDeleteMovie(movie.id)}
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           ) : (
//             <p>No uploaded movies yet.</p>
//           )}
//         </div>
//       )}

// {/* Movies Section */}
// <div className="movies-container">
//         <h2 className="movies-section-title">Movies Available for Your Plan</h2>
//         {loading ? (
//           <div className="movies-loading-spinner">
//             <div className="movies-spinner"></div>
//             <p>Loading movies...</p>
//           </div>
//         ) : movies.length > 0 ? (
//           <div className="movies-grid">
//             {movies.map((movie) => (
//               <div key={movie.id} className="movies-card">
//                 <div className="movies-poster">
//                   {movie.poster_path ? (
//                     <img
//                       src={`http://localhost/stoream_api/${movie.poster_path}`}
//                       alt={movie.title}
//                     />
//                   ) : (
//                     <div className="movies-no-poster">No Poster Available</div>
//                   )}
//                 </div>
//                 <div className="movies-details">
//                   <h3>{movie.title}</h3>
//                   <p>{movie.description || "No description available"}</p>
//                   <div className="movies-meta">
//                     <span className="movies-category">{movie.category}</span>
//                     <span className="movies-release-date">
//                       {new Date(movie.release_date).toLocaleDateString()}
//                     </span>
//                   </div>
//                   {movie.movie_path && (
//                     <a
//                       href={`http://localhost/stoream_api/${movie.movie_path}`}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="movies-watch-button"
//                     >
//                       Watch Now
//                     </a>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="movies-no-movies">No movies available for your plan.</p>
//         )}
//       </div>
//     </div>
//   );
// }



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./MainPage.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { useNavigate } from "react-router-dom";

// export default function MainPage() {
//   const [firstName, setFirstName] = useState(null);
//   const [planName, setPlanName] = useState(null);
//   const [movies, setMovies] = useState([]); // State to hold movies
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     console.log("User logged out, navigating to home...");
//     navigate("/");
//   };

//   const fetchMovies = async (plan) => {
//     try {
//       const response = await axios.get(`http://localhost/stoream_api/movies.php?planName=${encodeURIComponent(plan)}`);
//       setMovies(response.data);
//     } catch (error) {
//       console.error("Error fetching movies:", error);
//       setMovies([]); // Clear movies on error
//     }
//   };

//   useEffect(() => {
//     console.log("Starting useEffect...");
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     console.log("1. Stored user:", storedUser);

//     if (storedUser && storedUser.email) {
//       console.log("2. Fetching with email:", storedUser.email);
//       axios
//         .get(`http://localhost/stoream_api/get_user_details.php?email=${storedUser.email}`)
//         .then((response) => {
//           let data = response.data;
//           console.log("3. Raw user API response:", data);
//           if (typeof data === "string") {
//             const jsonStart = data.indexOf("{");
//             if (jsonStart !== -1) {
//               data = JSON.parse(data.substring(jsonStart));
//             }
//           }
//           console.log("4. Parsed user API response:", data);

//           if (data.success && data.user) {
//             setFirstName(data.user.first_name || "Unknown");
//             const userId = data.user.id;
//             console.log("5. User ID for plan:", userId);

//             if (userId) {
//               axios
//                 .get(`http://localhost/stoream_api/get_user_plan.php?user_id=${userId}`)
//                 .then((planResponse) => {
//                   let planData = planResponse.data;
//                   console.log("6. Raw plan API response:", planData);
//                   if (typeof planData === "string") {
//                     const planJsonStart = planData.indexOf("{");
//                     if (planJsonStart !== -1) {
//                       planData = JSON.parse(planData.substring(planJsonStart));
//                     }
//                   }
//                   console.log("7. Parsed plan API response:", planData);

//                   if (planData.success && planData.plan) {
//                     setPlanName(planData.plan.plan_name);
//                     console.log("8. Set planName:", planData.plan.plan_name);
//                     // Fetch movies based on plan
//                     fetchMovies(planData.plan.plan_name);
//                   } else {
//                     console.log("8.5. No plan found:", planData.message);
//                     setMovies([]); // No movies if no plan
//                   }
//                 })
//                 .catch((planError) => {
//                   console.error("8.5. Plan fetch error:", planError);
//                   setMovies([]);
//                 });
//             }
//           } else {
//             console.log("4.5. User fetch failed:", data.message);
//             setMovies([]);
//           }
//         })
//         .catch((error) => {
//           console.error("4.5. User fetch error:", error);
//           setMovies([]);
//         })
//         .finally(() => {
//           console.log("9. Loading complete, firstName:", firstName, "planName:", planName);
//           setLoading(false);
//         });
//     } else {
//       console.log("2. No user or email in localStorage");
//       setMovies([]);
//       setLoading(false);
//     }
//   }, []);

//   console.log("10. Rendering with firstName:", firstName, "planName:", planName, "movies:", movies);

//   return (
//     <div className="main-content text-white">
//       <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ height: "100px" }}>
//         <div className="container-fluid">
//           <a className="navbar-brand" href="#">Stoream</a>
//           <div className="navbar-nav ms-auto">
//             {loading ? (
//               <span className="navbar-text loading">Loading...</span>
//             ) : firstName ? (
//               <span className="navbar-text welcome me-3">
//                 Welcome, {firstName} {planName ? `| Plan: ${planName}` : ""}
//               </span>
//             ) : (
//               <span className="navbar-text">No user logged in</span>
//             )}
//             <button
//               type="button"
//               className="btn btn-outline-light ms-3"
//               onClick={handleLogout}
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </nav>

//       <div className="container mt-4">
//         <h2 className="text-white">Movies Available for Your Plan</h2>
//         {movies.length > 0 ? (
//           <table className="table table-striped table-bordered table-hover text-white">
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>Title</th>
//                 <th>Description</th>
//                 <th>Category</th>
//                 <th>Poster</th>
//                 <th>Movie</th>
//                 <th>Release Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {movies.map((movie) => (
//                 <tr key={movie.id}>
//                   <td>{movie.id}</td>
//                   <td>{movie.title}</td>
//                   <td>{movie.description || "No description"}</td>
//                   <td>{movie.category}</td>
//                   <td>
//                     {movie.poster_path ? (
//                       <img
//                         src={`http://localhost/stoream_api/${movie.poster_path}`}
//                         alt={movie.title}
//                         style={{ width: "100px" }}
//                       />
//                     ) : (
//                       "No poster"
//                     )}
//                   </td>
//                   <td>
//                     {movie.movie_path ? (
//                       <a
//                         href={`http://localhost/stoream_api/${movie.movie_path}`}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         View Movie
//                       </a>
//                     ) : (
//                       "No movie"
//                     )}
//                   </td>
//                   <td>{new Date(movie.release_date).toLocaleDateString()}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <p className="text-white">No movies available for your plan.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./MainPage.css";
// import "bootstrap/dist/css/bootstrap.min.css";

// export default function MainPage() {
//   const [userDetails, setUserDetails] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Get user data from localStorage
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser && storedUser.email) {
//       console.log("User from localStorage:", storedUser);

//       // Fetch additional details using email
//       axios
//         .get(`http://localhost/stoream_api/get_user_details.php?email=${storedUser.email}`)
//         .then((response) => {
//           console.log("Fetched user details:", response.data);
//           if (response.data.success) {
//             setUserDetails({
//               id: response.data.user.id,
//               email: storedUser.email,
//               first_name: response.data.user.first_name,
//               profile_image: response.data.user.profile_image,
//               plan_name: response.data.user.plan_name
//             });
//           } else {
//             console.log("Failed to fetch details:", response.data.message);
//             setUserDetails({
//               id: storedUser.id || null,
//               email: storedUser.email
//             }); // Fallback to email only
//           }
//         })
//         .catch((error) => {
//           console.error("Error fetching details:", error);
//           setUserDetails({
//             id: storedUser.id || null,
//             email: storedUser.email
//           }); // Fallback to email only
//         })
//         .finally(() => setLoading(false));
//     } else {
//       console.log("No user in localStorage or email missing");
//       setLoading(false);
//     }
//   }, []);

//   const product = {
//     Name: "Amazon",
//     Price: 45000,
//     Stock: "Available",
//   };

//   return (
//     <div className="netflix-background main-content text-white">
//       {/* Navigation Bar */}
//       <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
//         <div className="container-fluid">
//           <a className="navbar-brand" href="#">Stoream</a>
//           <div className="navbar-nav ms-auto">
//             {loading ? (
//               <span className="navbar-text">Loading...</span>
//             ) : userDetails ? (
//               <>
//                 <span className="navbar-text me-3">
//                   Welcome, {userDetails.first_name || userDetails.email}
//                 </span>
//                 {userDetails.plan_name && (
//                   <span className="navbar-text me-3">
//                     Plan: {userDetails.plan_name}
//                   </span>
//                 )}
//                 {userDetails.profile_image && (
//                   <img
//                     src={userDetails.profile_image}
//                     alt="Profile"
//                     className="rounded-circle"
//                     style={{ width: "40px", height: "40px", objectFit: "cover" }}
//                   />
//                 )}
//               </>
//             ) : (
//               <span className="navbar-text">No user logged in</span>
//             )}
//           </div>
//         </div>
//       </nav>

//       {/* Product Details */}
//       <div className="container mt-5 text-center">
//         <div className="bg-black text-white p-4 rounded w-50 mx-auto">
//           <h2>Product Details</h2>
//           <dl>
//             <dt>Name</dt>
//             <dd>{product.Name}</dd>
//           </dl>
//           <dl>
//             <dt>Price</dt>
//             <dd>{product.Price}</dd>
//           </dl>
//           <dl>
//             <dt>Stock</dt>
//             <dd>{product.Stock}</dd>
//           </dl>
//         </div>
//       </div>
//     </div>
//   );
// }