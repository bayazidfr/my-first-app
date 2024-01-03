import React, { useState } from 'react';
import './HomePage.css';

function HomePage() {
  const [isBioExpanded, setIsBioExpanded] = useState(false);

  const projects = [
    {
      title: "Team 9's Robotics Project - LEGO® Mindstorms®",
      description: "This project represents our journey into robotics and programming...",
      link: "https://www.facebook.com/100006011778229/videos/246330347572950/"
    },
    {
      title: "Web Resume Project",
      description: "An interactive web resume showcasing professional and personal information in a sleek, modern design.",
      link: "https://bayazidfr.github.io/WebMobileResume/#Projects"
    },
    {
      title: "Product Listing",
      description: "This web application allows users to browse and search for various products. The project is built using HTML, CSS, and JavaScript.",
      link: "https://bayazidfr.github.io/WebMobileI_Assignment2/"
    }
  ];

  return (
    <div className="home-container">
      <div className="intro-section">
        <h1>Bayazid Alakbarli</h1>
        <p>Junior Penetration Tester | Cybersecurity Enthusiast</p>
        <p>Third Year Student at ADA University</p>
        <div className="bio">
          <p>{isBioExpanded ? "Full bio goes here..." : "Short bio version..."}</p>
          <button onClick={() => setIsBioExpanded(!isBioExpanded)}>
            {isBioExpanded ? "Read Less" : "Read More"}
          </button>
        </div>
      </div>

      <div className="projects-container">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <a href={project.link} className="project-link-btn" target="_blank" rel="noopener noreferrer">
              {project.title === "Team 9's Robotics Project - LEGO® Mindstorms®" ? "Watch Video" : "View Project"}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
