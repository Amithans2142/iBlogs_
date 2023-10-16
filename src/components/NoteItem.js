import React, { useContext, useEffect, useState, useRef } from "react";
import { Pagination } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import PostContext from "../context/posts/PostContext";
import Card from "./Card";

const NoteItem = (props) => {
  let navigate = useNavigate();
  const context = useContext(PostContext);
  const { posts, getAllDataHome,setLoading,loading } = context;
  
  

  useEffect(() => {
    setLoading(true)
    if (localStorage.getItem('token')) {
      getAllDataHome();
      setLoading(false)
   
    } else {
      navigate('/login');
    }
  }, []);

 
  return (
    <div>
<div className="container">
       
      </div>
    <div className="note">
          <Pagination />
     </div>
      </div>
  );
};

export default NoteItem;
