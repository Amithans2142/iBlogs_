import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import PostContext from "../context/posts/PostContext";
import Spinner from "./Spinner";

const Login = () => {
    const context = useContext(PostContext);
    const { setUserId, setUserName, loading, setLoading } = context;
    const host = "https://iblogs-backend.onrender.com";

    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [error, setError] = useState(""); // State for error message
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(""); // Reset error message before making a new request

        // Check for empty fields
        if (!credentials.email || !credentials.password) {
            setError("Email and password are required fields.");
            setLoading(false);
            return;
        }

        const response = await fetch(`${host}/api/v1/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });

        const json = await response.json();
        setLoading(false);

        if (json.success) {
            localStorage.setItem('token', json.jwtToken);
            navigate("/home");
        } else {
            setError("Invalid email or password"); // Set the error message here
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
        setError(""); // Clear the error message when the user starts typing
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Token exists, navigate to the home page or another authenticated route.
            navigate("/home");
        }
    }, [navigate]);

    return (
        <div className="container">
            <div className="login">
                <h1 className=" heading-signup">Login</h1>
                {loading ? (
                    <Spinner />
                ) : (
                    <div className="login-form">
                        {error && <div className="error-message">{error}</div>} {/* Display the error message */}
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email address</label>
                                <input type="email" className="form-control" id="email" name="email" value={credentials.email} aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange} />
                            </div>
                            <div className="form-password">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input type="password" className="form-control" id="password" name="password" value={credentials.password} placeholder="Password" onChange={onChange} />
                            </div>
                            <button type="submit" className="addBtn">Login</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Login;
