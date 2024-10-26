import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Login.css'
const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://127.0.0.1:8000/api/login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: username, password: password }),
            });
            const responseData = await response.json();
            console.log(responseData)
            if (!responseData.access_token) {
                alert("Login Failed");
            } else {
                localStorage.setItem("access_token", responseData.access_token);
                localStorage.setItem("refresh_token", responseData.refresh_token);
                localStorage.setItem("id", responseData.id);
                localStorage.setItem("username", responseData.username);
                navigate("/");
            }
        } catch (error) {
            console.error("Error logging in:", error);
        }
    };

    return (
        <>
<div  id="login-container">
<div

     id="form-container"
     className="container d-flex justify-content-center  vh-100"
     style={{ maxWidth: "450px" }}>
       
     <form className="p-5  w-100 mt-5 mb-5" id="form-cont" onSubmit={handleLogin}>
     <h4>Hello</h4>
        <h2>Welcome Back</h2>
         <div className="mb-3">
             <label htmlFor="email" className="form-label">
                 UserName:
             </label>
             <input
                 type="text"
                 id="email"
                 className="form-control"
                 value={username}
                 onChange={(e) => setUsername(e.target.value)}
             />
         </div>
         <div className="mb-3">
             <label htmlFor="password" className="form-label">
                 Password:
             </label>
             <input
                 type="password"
                 id="password"
                 className="form-control"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
             />
         </div>
        
         <div className="d-flex justify-content-between mt-2">

         <p style={{ color: '#74929f' }}>
            <input type="checkbox"/>
            Rember Password</p>
            <p style={{ color: '#74929f' }}>Forget Password</p>
         </div>

         <div className="login-btn">
         <button type="submit" className="btn custom-btn">
             Login
         </button>

         </div>
        
         <p> Don't have account? <Link to={'/signup'}>SignUp now</Link></p>
     </form>
 </div>
 </div>
        </>
    );
};

export default Login;
