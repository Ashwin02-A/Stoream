import React from 'react';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <section className="stoream-about-container">
      <div className="stoream-about-floating-orb"></div>
      <div className="stoream-about-content-wrapper">
        <h1 className="stoream-about-title-glitch" data-text="About Stoream">
          About Stoream
        </h1>
        <p className="stoream-about-intro-text">
          Welcome to <span className="stoream-about-highlight">Stoream</span> - Where innovation meets imagination.
        </p>
        <div className="stoream-about-info-grid">
          <div className="stoream-about-info-card" data-hover="mission">
            <h2>Our Mission</h2>
            <p>Revolutionizing the way you experience digital storage and streaming with cutting-edge technology.</p>
          </div>
          <div className="stoream-about-info-card" data-hover="vision">
            <h2>Our Vision</h2>
            <p>A world where data flows seamlessly, securely, and sustainably for everyone.</p>
          </div>
          <div className="stoream-about-info-card" data-hover="team">
            <h2>Our Team</h2>
            <p>A collective of dreamers, coders, and creators pushing the boundaries of what's possible.</p>
          </div>
        </div>
        <button className="stoream-about-explore-btn">Explore More</button>
      </div>
    </section>
  );
};

export default AboutPage;