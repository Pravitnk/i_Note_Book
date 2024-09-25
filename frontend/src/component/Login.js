import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const host = "https://i-note-book-backend.onrender.com";
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let history = useNavigate();

  // Function to submit the form
 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    // Check if response status is OK (status code 200-299)
    if (!response.ok) {
      throw new Error("Failed to login, please check your credentials.");
    }

    const json = await response.json();

    // If login is successful
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      localStorage.setItem("userName", json.user.name);
      props.showAlert("Logged in successfully", "success");
      history("/notes");
    } else {
      // Show error alert if credentials are incorrect
      props.showAlert("Invalid Credentials", "danger");
    }
  } catch (error) {
    // Catch network or unexpected errors and handle gracefully
    console.error("Error:", error.message);
    props.showAlert(error.message, "danger");
  }
};


  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="card shadow p-4"
        style={{
          maxWidth: "800px",
          width: "100%",
          position: "relative",
          top: "-20%",
        }}
      >
        <div className="card-body">
          <h3 className="card-title text-center mb-4">Login</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={credentials.email}
                id="email"
                onChange={onChange}
                placeholder="Enter your Email"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputPassword" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={credentials.password}
                id="inputPassword"
                onChange={onChange}
                placeholder="Enter your Password"
                required
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
