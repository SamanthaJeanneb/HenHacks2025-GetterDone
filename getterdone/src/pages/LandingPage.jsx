import React from 'react';
import { Link } from 'react-router-dom';
import logog from '../../assets/logog.png'; // Import the logo image
import './LandingPage.css'; // Import the CSS file for styling

export default function LandingPage() {
  return (
    <div className="landing-page">
      <div className="landing-card">
        <div className="landing-card-top">
          <img src={logog} alt="Logo" className="landing-logo" />
        </div>
        <div className="landing-card-middle">
          <Link to="/tasks" className="btn landing-button">
            Go to my Tasks
          </Link>
        </div>
        <div className="landing-card-bottom">
          <p>
            The task management powered by Gemini. Includes a Work Timer + Progress Tracking!
          </p>
        </div>
      </div>
    </div>
  );
}