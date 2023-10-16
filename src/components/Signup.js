import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import PostContext from "../context/posts/PostContext";
import Spinner from "./Spinner";

const Signup = () => {
    const context = useContext(PostContext);
    const { loading, setLoading } = context;
    const host = "https://iblogs-backend.onrender.com";
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState(""); // State for error message
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(""); // Reset error message before making a new request

        // Check for empty fields
        if (!credentials.name || !credentials.email || !credentials.password) {
            setError("Name, email, and password are required fields.");
            setLoading(false);
            return;
        }

        const response = await fetch(`${host}/api/v1/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
        });

        const json = await response.json();
        setLoading(false);

        if (json.success) {
            navigate("/");
        } else {
            setError(json.message || "Signup failed"); // Display the server error message if available
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
        setError(""); // Clear the error message when the user starts typing
    }

    return (
        <div className="container">
            <div className="signup">
                <h1 className="heading-signup">Signup</h1>
                {loading ? (<Spinner />) : (
                    <div className="signup-form">
                        {error && <div className="error-message">{error}</div>} {/* Display the error message */}
                        <form onSubmit={handleSubmit}>
                            <div className="form-name">
                                <label htmlFor="name">Name</label>
                                <input type="text" className="form-control" id="name" name="name" placeholder="Enter Your Name" onChange={onChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email address</label>
                                <input type="email" className="form-control" id="email" name="email" placeholder="Enter email" onChange={onChange} />
                            </div>
                            <div className="form-password">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" id="password" name="password" placeholder="Password" onChange={onChange} />
                            </div>
                            <button type="submit" className="addBtn">Signup</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Signup;
