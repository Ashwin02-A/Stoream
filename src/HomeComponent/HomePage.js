import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css"; // For SCSS styling
import "bootstrap/dist/css/bootstrap.min.css";
import topmov1 from "../images/topmov1.jpg";
import topmov2 from "../images/topmov2.jpg";
import topmov3 from "../images/topmov3.jpg";
import topmov4 from "../images/topmov4.jpg";
import topmov5 from "../images/topmov5.jpg";

import "../images/movhead.jpg";
import roundimg from "../images/homeround.svg";

export default function HomePage() {
  const [trailerUrl, setTrailerUrl] = useState(null); // State for trailer URL
  const [showTrailer, setShowTrailer] = useState(false); // State for modal visibility

  // const LeoMovTrailer = ({ trailerUrl }) => (
  //   <div>
  //     <iframe
  //       width="560"
  //       height="315"
  //       src={trailerUrl}
  //       title="Leo Movie Trailer"
  //       frameborder="0"
  //       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  //       allowfullscreen
  //     ></iframe>
  //   </div>
  // );


  const plans = [
    { name: "Basic", amount: 279 },
    { name: "Pro", amount: 1499 },
    { name: "Enterprise", amount: 1999 },
  ];
  
  const topMovies = [
    {
      id: 1,
      title: "Leo",
      image: topmov1,
      description: "A gripping thriller by Lokesh Kanagaraj.",
      genre: "Action/Thriller",
      rating: "9.7",
      trailerUrl: "https://www.youtube.com/embed/Po3jStA673E", 
    },
    {
      id: 2,
      title: "The Godfather",
      image: topmov2,
      description: "An epic tale of a mafia dynasty.",
      genre: "Crime/Drama",
      rating: "9.2",
      trailerUrl: "https://www.youtube.com/embed/sY1S34973zA",
    },
    {
      id: 3,
      title: "The Dark Knight",
      image: topmov3,
      description: "A superhero film redefining the genre.",
      genre: "Action/Crime",
      rating: "9.0",
      trailerUrl: "https://www.youtube.com/embed/EXeTwQWrcwY",
    },
    {
      id: 4,
      title: "Inception",
      image: topmov4,
      description: "A sci-fi thriller that bends the mind.",
      genre: "Sci-fi/Thriller",
      rating: "8.8",
      trailerUrl: "https://www.youtube.com/embed/8hP9D6kZseM",
    },
    {
      id: 5,
      title: "Fight Club",
      image: topmov5,
      description: "A bold take on consumerism and identity.",
      genre: "Drama",
      rating: "8.8",
      trailerUrl: "https://www.youtube.com/embed/SUXWAEX2jlg",
    },
  ];

  const handleWatchTrailer = (url) => {
    setTrailerUrl(url);
    setShowTrailer(true);
  };

  const closeTrailer = () => {
    setShowTrailer(false);
    setTrailerUrl(null);
  };


  function searchMovie() {
    const movieName = document.getElementById('movieSearchInput').value.trim();
    if(!movieName)
    {
      alert("Enter Valid Movie Name");
      return;
    }
  
        fetch(`http://localhost/stoream_api/search_movie.php?movie=${encodeURIComponent(movieName)}`)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          alert(data.error);
          return;
        }
        displayMoviePopup(data);
      })
      .catch(error => {
        console.error('Error fetching movie:', error);
        alert('An error occurred while searching for the movie.');
      });
      }
  
      function displayMoviePopup(data) {
        const popup = document.getElementById('moviePopup');
        const movieDetails = document.getElementById('movieDetails');
        const relatedMovies = document.getElementById('relatedMovies');
        const movieCategories = document.getElementById('movieCategories');
      
        document.getElementById('movieTitle').textContent = data.movie.title || 'Movie Not Found';
        movieDetails.innerHTML = `
          <p><strong>Release Date:</strong> ${data.movie.release_date || 'N/A'}</p>
          <p><strong>Description:</strong> ${data.movie.description || 'No description available'}</p>
          ${data.movie.poster ? `<img src="${data.movie.poster}" alt="${data.movie.title}">` : ''}
        `;
      
        // ... rest of the function remains the same
  
    relatedMovies.innerHTML = '';
    if (data.relatedMovies && data.relatedMovies.length > 0) {
      data.relatedMovies.forEach(movie => {
        relatedMovies.innerHTML += `<div className="related-movie" onClick="searchMovieDirect('${movie.title}')">${movie.title}</div>`;
      });
    } else {
      relatedMovies.innerHTML = '<p>No related movies found.</p>';
    }
  
    movieCategories.innerHTML = '';
    if (data.categories && data.categories.length > 0) {
      data.categories.forEach(category => {
        movieCategories.innerHTML += `<div className="category-item">${category}</div>`;
      });
    } else {
      movieCategories.innerHTML = '<p>No categories found.</p>';
    }
  
    popup.style.display = 'flex';
  }
  
  function closePopup() {
    document.getElementById('moviePopup').style.display = 'none';
  }
  
  function searchMovieDirect(movieName) {
    document.getElementById('movieSearchInput').value = movieName;
    searchMovie();
  }

  return (
<div className="hp-homepage">
  {/* Header Section */}
  <header className="hp-header text-white py-3">
    <div className="hp-container">
      <div className="hp-brand-name">
        <h1 className="text-white">Stoream</h1>
      </div>
      <div className="ms-auto d-flex">
        <Link to="/login" className="hp-animated-btn">
          <i className="bi bi-person hp-login-icon"></i> Login
        </Link>
        <a href="/about" className="hp-animated-btn">
          <i className="bi bi-info-circle"></i> About Us
        </a>
      </div>
    </div>
  </header>

  {/* Main Content */}
  <main className="hp-main-content text-center">
    <div className="hp-get-started py-5">
      <h2>Get Started with Your Plans</h2>
      <p>Explore the best movies streaming right now!</p>
      <div className="hp-input-group mt-3">
        <input
          type="text"
          className="hp-form-control"
          placeholder="Latest movie here"
          id="movieSearchInput"
        />
        <button className="hp-btn-danger" onClick={searchMovie}>
          Get your Movie <span className="bi bi-chevron-right"></span>
        </button>
      </div>
    </div>

    <div id="moviePopup" className="hp-movie-popup">
      <div className="hp-popup-content">
        <span className="hp-close-btn" onClick={closePopup}>×</span>
        <h3 id="movieTitle">Movie Details</h3>
        <div id="movieDetails"></div>
        <h4>Related Movies</h4>
        <div id="relatedMovies"></div>
        <h4>Categories</h4>
        <div id="movieCategories"></div>
      </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js"></script>

    <h3 className="hp-top-movies-heading text-center mb-4">Top Movies Streaming Now</h3>
    <div className="hp-top-movies-section">
      <div className="hp-movie-showcase">
        {topMovies.slice(0, 5).map((movie, index) => (
          <div className="hp-movie-poster" key={movie.id}>
            <div className="hp-movie-image-container">
              <img
                src={movie.image}
                // alt={movie.title}
                className="hp-movie-poster-img"
              />
              <span className="hp-movie-ranking">#{index + 1}</span>
            </div>
            <div className="hp-movie-overlay"></div>
            <div className="hp-movie-details">
              <p className="hp-movie-description">{movie.description}</p>
              <p className="hp-movie-genre">Genre: {movie.genre}</p>
              <p className="hp-movie-rating rating"><b>Rating: {movie.rating}</b></p>
              <button
                className="hp-trailer-button"
                onClick={() => handleWatchTrailer(movie.trailerUrl)}
              >
                Watch Trailer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </main>

  {/* Trailer Modal */}
  {showTrailer && (
    <div className="hp-trailer-modal">
      <div className="hp-trailer-content">
        <button className="hp-close-btn" onClick={closeTrailer}>
          ×
        </button>
        <iframe
          width="560"
          height="315"
          src={trailerUrl}
          title="Trailer Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  )}

  {/* Plan Model */}
  <div className="hp-homecont">
    <section className="hp-plans-container">
      <div className="hp-plans">
        <div className="hp-plans-hero">
          <h1 className="hp-plans-hero-title">Best Ever Plans for Your Subscription</h1>
          <p className="hp-plans-hero-subtitle">Choose Your Perfect Plan</p>
        </div>
        <div className="hp-plan-item-container">
          <div className="hp-plan-item hp-plan1 hp-plan-item-free" data-aos="fade-up" data-aos-duration="800">
            <div className="hp-card">
              <div className="hp-card-detail">
                <div className="hp-card-header">
                  <h2>Basic</h2>
                </div>
                <div className="hp-card-desc">Simple and Limited plan for cheap and Best</div>
              </div>
            </div>
            <div className="hp-price">₹279<span>/ 35 Days</span></div>
            <ul className="hp-feature-list">
              <li><i className="bi bi-check text-success"></i> Tamil Movies </li>
              <li><i className="bi bi-check text-success"></i> 1GB Free Space</li>
              <li><i className="bi bi-x text-danger"></i> Multi Language Support</li>
              <li><i className="bi bi-x text-danger"></i> Mobile Application</li>
              <li><i className="bi bi-x text-danger"></i> Unlimited Users</li>
            </ul>
            <Link
              to={`/signin?plan=${plans[0].name}&amount=${plans[0].amount}`}
              className="hp-plan-button-link"
              key={`plan-0`}
            >
              <button className="hp-button">Get Started</button>
            </Link>
          </div>

          <div className="hp-plan-item hp-plan2 hp-plan-item-pro" data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">
            <div className="hp-card">
              <div className="hp-card-detail">
                <div className="hp-card-header">
                  <h2>Pro</h2>
                  <div className="hp-card-label">Best Value</div>
                </div>
                <div className="hp-card-desc">Innovative Time Lines for Wonderful Experience.</div>
              </div>
            </div>
            <div className="hp-price">₹1499<span>/ 249 Days</span></div>
            <ul className="hp-feature-list">
              <li><i className="bi bi-check text-success"></i> Top Movies</li>
              <li><i className="bi bi-check text-success"></i> Web Series Available</li>
              <li><i className="bi bi-check text-success"></i> 2GB Free Space</li>
              <li><i className="bi bi-x text-danger"></i> Mobile Application</li>
              <li><i className="bi bi-x text-danger"></i> Unlimited Users</li>
            </ul>
            <Link
              to={`/signin?plan=${plans[1].name}&amount=${plans[1].amount}`}
              className="hp-plan-button-link"
              key={`plan-1`}
            >
              <button className="hp-button hp-button-pink">Get Started</button>
            </Link>
          </div>

          <div className="hp-plan-item hp-plan3 hp-plan-item-entp" data-aos="fade-up" data-aos-duration="800" data-aos-delay="400">
            <div className="hp-card">
              <div className="hp-card-detail">
                <div className="hp-card-header">
                  <h2>Enterprise</h2>
                </div>
                <div className="hp-card-desc">Innovative User Experience for Movies and Entertainment</div>
              </div>
            </div>
            <div className="hp-price">₹1999<span>/ 356 Days</span></div>
            <ul className="hp-feature-list">
              <li><i className="bi bi-check text-success"></i> All Category Movies </li>
              <li><i className="bi bi-check text-success"></i> 5GB Free Space</li>
              <li><i className="bi bi-check text-success"></i> Chat Support</li>
              <li><i className="bi bi-check text-success"></i> Mobile Application</li>
              <li><i className="bi bi-check text-success"></i> Unlimited Users</li>
              <li><i className="bi bi-check text-success"></i> Customizable Panel</li>
            </ul>
            <Link
              to={`/signin?plan=${plans[2].name}&amount=${plans[2].amount}`}
              className="hp-plan-button-link"
              key={`plan-2`}
            >
              <button className="hp-button hp-button-white">Get Started</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  </div>

  <footer className="hp-netflix-footer text-center">
    <p>© 2025 Stoream, Inc. All rights reserved.</p>
    <div>
      questions? call 000-919-1743
      <div className="row">
        <div className="col">
          <ul className="hp-list-unstyled">
            <li>FAQ</li>
            <li>Investor Relations</li>
            <li>Privacy</li>
            <li>Speed Test</li>
          </ul>
        </div>
        <div className="col">
          <ul className="hp-list-unstyled">
            <li>Help Center</li>
            <li>Jobs</li>
            <li>Cookie Preferences</li>
            <li>Legal Notices</li>
          </ul>
        </div>
        <div className="col">
          <ul className="hp-list-unstyled">
            <li>Account</li>
            <li>Ways To Watch</li>
            <li>Corporate Information</li>
            <li>Only on Stoream</li>
          </ul>
        </div>
        <div className="col">
          <ul className="hp-list-unstyled">
            <li>Media Center</li>
            <li>Terms of Use</li>
            <li>Contact Us</li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</div>

  );
}