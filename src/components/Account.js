import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import PostContext from "../context/posts/PostContext";
import AccountPagination from "./AccountPagination";
import jwt_decode from "jwt-decode";

const Account = () => {
  let navigate = useNavigate();
  const context = useContext(PostContext);
  const { posts, getAllData, editPost, addComment, userId, getUserInfo, userInfo, loading, setLoading } = context;
  const host = "https://iblogs-backend.onrender.com";


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwt_decode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          // Token has expired, redirect to the login page
          navigate('/login');
        } else {
          // Token is valid, fetch data and user info
          setLoading(true);
          getAllData();
          getUserInfo();
          setLoading(false);
        }
      } catch (error) {
        // Error decoding token, redirect to the login page
        navigate('/login');
      }
    } else {
      // Token is not present, redirect to the login page
      navigate('/login');
    }
  }, [navigate]);

  
  return (

    <div className="account-height">
      <div className="">
        <div className="user">
          {userInfo && (
            <div className="user-wrapper">
              <div className="user-card">
                <div className="userinfo">
                  <p className="card-text"></p>
                  <p>{userInfo.name}</p>
                  <p>Email_{userInfo.email}</p>
                </div>
              </div>
            </div>
          )}
        </div>
        <h1 className="heading">Posts</h1>
        {posts.length === 0 ? (
          <p style={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 'larger',
            fontFamily: 'Franklin Gothic Medium, Arial Narrow, Arial, sans-serif',
            height: '304px',
            margin: '0',
          }}>
            Not Posted Yet
          </p>
        ) : null}

      </div>
      <AccountPagination />
    </div>
  );
}

export default Account;
