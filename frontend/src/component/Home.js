import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css"; // Import external CSS for styling

export default function Home() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login"); // Navigate to the login page when the button is clicked
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to iNoteBook</h1>
        <button className="get-started-btn" onClick={handleGetStarted}>
          Get Started
        </button>
      </div>
    </div>
  );
}
