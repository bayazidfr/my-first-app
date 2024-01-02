import React from 'react';
import './HomePage.css';

function HomePage() {4
  return (
    <div className="home-container">
      <div className="intro-section">
        <h1>Bayazid Alakbarli</h1>
        <p>Junior Penetration Tester | Cybersecurity Enthusiast</p>
        <p>Third Year Student at ADA University</p>
        <div className="bio">
          <p>I am writing to introduce myself as Bayazid Alakbarli, a third-year Information Technology student at ADA University...</p>
          {/* Include the full bio here */}
        </div>
      </div>

      <div className="projects-container">
        <div className="project-card">
          <h3>Team 9's Robotics Project - LEGO® Mindstorms®</h3>
          <p>This project represents our journey into robotics and programming...</p>
          <a href="https://www.facebook.com/100006011778229/videos/246330347572950/" className="project-link-btn" target="_blank" rel="noopener noreferrer">Watch Video</a>
        </div>

        <div className="project-card">
          <h3>Web Resume Project</h3>
          <p>An interactive web resume showcasing professional and personal information in a sleek, modern design.</p>
          <a href="https://bayazidfr.github.io/WebMobileResume/#Projects" className="project-link-btn" target="_blank" rel="noopener noreferrer">View Project</a>
        </div>

        <div className="project-card">
          <h3>Product Listing</h3>
          <p>This web application allows users to browse and search for various products. The project is built using HTML, CSS, and JavaScript.</p>
          <a href="https://bayazidfr.github.io/WebMobileI_Assignment2/" className="project-link-btn" target="_blank" rel="noopener noreferrer">View Project</a>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

