import React, { useContext, useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
import Pagination from './Pagination';
import PostContext from '../context/posts/PostContext';
import jwt_decode from "jwt-decode";

export const Home = () => {
  const context = useContext(PostContext);
  const { addPost, getAllDataHome, loading, setLoading } = context;
  const [post, setPost] = useState({ title: "", body: "" });
  const [validationError, setValidationError] = useState({ title: "", body: "" });
  const [requiredError, setRequiredError] = useState({ title: "", body: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Token is not present, redirect to the login page
      navigate('/login');
    } else {
      try {
        // Decode the token to check expiration (You may need to install a JWT library for this)
        const decodedToken = jwt_decode(token);
        const currentTime = Date.now() / 1000;
        get

        if (decodedToken.exp < currentTime) {
          // Token has expired, redirect to the login page
          navigate('/login');
        }
      } catch (error) {
        // Error decoding token, redirect to the login page
        navigate('/login');
      }
    }
  }, [navigate]);

  const handleClick = async (e) => {
    e.preventDefault();
    setValidationError({ title: "", body: "" }); // Reset validation errors
    setRequiredError({ title: "", body: "" }); // Reset required field errors

    // Validate title and body
    let isValid = true;

    // Check for empty fields and set required field errors
    if (!post.title) {
      setRequiredError((prevState) => ({
        ...prevState,
        title: "Title is required.",
      }));
      isValid = false;
    }
    if (!post.body) {
      setRequiredError((prevState) => ({
        ...prevState,
        body: "Description is required.",
      }));
      isValid = false;
    }

    // Validate length only if the fields are not empty
    if (post.title.length < 5 && post.title) {
      setValidationError((prevState) => ({
        ...prevState,
        title: "Title must be at least 5 characters long.",
      }));
      isValid = false;
    }
    if (post.body.length < 5 && post.body) {
      setValidationError((prevState) => ({
        ...prevState,
        body: "Description must be at least 5 characters long.",
      }));
      isValid = false;
    }

    if (isValid) {
      setLoading(true);
      await addPost(post);
      setPost({ title: "", body: "" });
      await getAllDataHome();
      setLoading(false);
    }
  }

  const onChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
    setValidationError({ ...validationError, [e.target.name]: "" }); // Clear validation errors when the user starts typing
    setRequiredError({ ...requiredError, [e.target.name]: "" }); // Clear required field errors when the user starts typing
  }

  return (
    <div className="wrapper">
      <div className='home'>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Title*</Form.Label>
            <Form.Control
              className="italic-placeholder"
              type="text"
              placeholder="Title"
              name='title'
              value={post.title}
              onChange={onChange}
              required
            />
            {validationError.title && (
              <div className="error-message">{validationError.title}</div>
            )}
            {requiredError.title && (
              <div className="error-message">{requiredError.title}</div>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Description*</Form.Label>
            <Form.Control
              className="italic-placeholder"
              type="text"
              placeholder="Description"
              name='body'
              value={post.body}
              onChange={onChange}
              required
            />
            {validationError.body && (
              <div className="error-message">{validationError.body}</div>
            )}
            {requiredError.body && (
              <div className="error-message">{requiredError.body}</div>
            )}
          </Form.Group>
          <Button className='addBtn' type="submit" onClick={handleClick}>
            Post
          </Button>
        </Form>
      </div>
      {loading ? (<Spinner />) : null}
      <Pagination /> {/* Render Pagination here within the same 'wrapper' */}
    </div>
  );
}

export default Home;
