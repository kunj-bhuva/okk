import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/white.png";
import "./Login.css";
import axios from "axios";

// API URLs
// const DONOR_LOGIN_API_URL = "https://ektafund-backend.onrender.com/api/donors/login";
const NGO_LOGIN_API_URL = "https://ektafund-backend.onrender.com/api/ngos/login";
// const ADMIN_LOGIN_API_URL = "https://ektafund-backend.onrender.com/api/admin/login"; // Admin login API

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("donor"); // 'donor' by default
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    // Inside the handleSubmit function, after setting the token:
    localStorage.setItem("userType", userType); // Save user type in localStorage

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // Determine API URL based on user type
      let apiUrl = "";
      if (userType === "ngo") {
        apiUrl = NGO_LOGIN_API_URL;
      } 

      // Make the login request
      const response = await axios.post(apiUrl, { email, password });

      // Handle success
      const { token } = response.data;
      localStorage.setItem("authToken", token);
      localStorage.setItem("loggedInEmail", email);
      setLoading(false);

      // Navigate based on user type
     
       if (userType === "ngo") {
        navigate("/NGODash");
      } 
    } catch (error) {
      setLoading(false);

      // Handle errors
      const errorMsg =
        error.response?.data?.message || "Invalid email or password.";
      setError(errorMsg);
      console.error("Login error:", error);
    }
  };

  return (
    <section className="vh-1000" style={{ backgroundColor: "#73e0cc" }}>
      <div className="container py-3 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                    alt="login form"
                    className="img-fluid"
                    style={{ borderRadius: "1rem 0 0 1rem" }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5xx text-black">
                    <form onSubmit={handleSubmit}>
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <span className="h1 fw-bold mb-0">
                          <img src={logo} alt="Logo" />
                        </span>
                      </div>

                      <h5
                        className="fw-normal mb-3 pb-3"
                        style={{ letterSpacing: "1px" }}
                      >
                        Sign into your account
                      </h5>

                      {error && (
                        <div className="alert alert-danger">{error}</div>
                      )}

                      {/* User Type Selection */}
                      <div className="form-outline mb-4">
                        <label htmlFor="userType" className="form-label">
                          Select User Type
                        </label>
                        <select
                          id="userType"
                          className="form-control"
                          value={userType}
                          onChange={(e) => setUserType(e.target.value)}
                        >
                          <option value="ngo">NGO</option>
                          {/* Added Admin option */}
                        </select>
                      </div>

                      <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form2Example17">
                          Email address
                        </label>
                        <input
                          type="email"
                          id="form2Example17"
                          className="form-control form-control-lg"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                        
                      </div>

                      <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form2Example27">
                          Password
                        </label>
                        <input
                          type="password"
                          id="form2Example27"
                          className="form-control form-control-lg"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        
                      </div>

                      <div className="pt-1 mb-4">
                        <button
                          type="submit"
                          className="btn btn-dark btn-lg btn-block"
                          disabled={loading}
                        >
                          {loading ? "Logging in..." : "Login"}
                        </button>
                      </div>

                      <a
                        className="small text-muted"
                        href="#!"
                        onClick={() => navigate("/forgot-password")}
                      >
                        Forgot password?
                      </a>
                      <p
                        className="mb-5x pb-lg-2x"
                        style={{ color: "#393f81" }}
                      >
                        Don't have an account?{" "}
                        <a
                          href="#!"
                          style={{ color: "#393f81" }}
                          onClick={() => navigate("/NGOregistration")}
                        >
                          Register here
                        </a>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
