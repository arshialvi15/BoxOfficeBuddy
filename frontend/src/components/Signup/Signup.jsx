import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Signup.css'
const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      
        email: "",
        password: "",
        username: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const apiUrl = "http://127.0.0.1:8000/api/signup/";

        // Make the API call using fetch
        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                console.log(response);
                if (response.status === 201) {
                    navigate("/login");
                } else {
                    alert("Error signing up");
                }
            })
            .catch((error) => {
                console.error("Error signing up:", error);
            });
    };

    return (
     <>
<div className="signup-container">

<div   id="signup-form-container"
            className="container d-flex justify-content-center align-items-center vh-100"
            style={{ maxWidth: "460px" }}>
            <form onSubmit={handleSubmit} className="p-4 w-100 mt-5 mb-5" id="signup-form" >
                <h4>Welcome</h4>
                <h1>To BOLETO</h1>
                <div className="mb-3">
                    <label className="form-label">Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label"> Confirm Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="signup-btn">
                <button type="submit" className="btn custom-signup-btn">
                    Sign Up
                </button>
                </div>
                <p> Already have an  account? <Link to={'/login'}>Login here</Link></p>
            </form>

        </div>
</div>
     
     
     </>
    );
};

export default Signup;
