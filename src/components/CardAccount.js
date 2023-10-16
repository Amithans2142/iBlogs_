import React, { useContext, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import PostContext from "../context/posts/PostContext";
import Form from 'react-bootstrap/Form';
import Spinner from './Spinner';

import { BsReplyFill } from "react-icons/bs";
import { AiTwotoneDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";

const CardAccount = ({ post }) => {
  let navigate = useNavigate();

  const context = useContext(PostContext);
  const { deletePost, getAllData, addComment, userId,editPost,userName, getUserInfo, userInfo, loading, setLoading } = context;
  const [comment, setComment] = useState({ comment: "" });

  const host = "http://localhost:4000";

  // Create a separate state for each post being edited
  const [editedPosts, setEditedPosts] = useState({});
  
  // Create a separate ref for each modal
  const ref = useRef(null);
  const refClose = useRef(null);

  const handleComment = async (postId, userName) => {
    console.log("button clicked");
    console.log(comment);
    if (localStorage.getItem('token')) {
      setLoading(true);
      const b = await addComment(postId, userId, comment);
      console.log(b);
      await getAllData();
      setLoading(false);
    } else {
      navigate('/login');
    }
  };

  // Update a specific post
  const updatePost = (currentPost) => {
    ref.current.click();
    setEditedPosts({
      ...editedPosts,
      [currentPost._id]: { id: currentPost._id, etitle: currentPost.title, ebody: currentPost.body }
    });
  };

  const onChange = (e, postId) => {
    setEditedPosts({
      ...editedPosts,
      [postId]: {
        ...editedPosts[postId],
        [e.target.name]: e.target.value
      }
    });
    setComment(e.target.value);
  };

  const handleClick = async (e, postId) => {
    e.preventDefault();
    console.log('Updating Post', editedPosts[postId]);
    const editedPost = editedPosts[postId];
    await editPost(editedPost.id, editedPost.etitle, editedPost.ebody);
    refClose.current.click();
    await getAllData();
  };

  const handleDeletePost = async (postId) => {
    setLoading(true);
    await deletePost(postId);
    await getAllData();
    setLoading(false);
  };

  return (
    <div className="account-item" key={post._id}>
      <div className="account-body">
        <p className="card-title">{post.title}</p>
        <p className="postedby">Posted On: {post?.CreatedAt}</p>
        <p className="body">{post.body}</p>
        
        {/* Display the comment form */}
        <Form>
          <Form.Group className="mb-3 d-flex" controlId="formBasicEmail">
            <Form.Control type="text" className="italic-placeholder" placeholder="reply" name='comment' value={comment.comment} onChange={onChange} />
            <BsReplyFill variant="primary" type="submit" onClick={(e) => {
              e.preventDefault();
              handleComment(post._id, post.user._id);
              setComment({ comment: "" });
            }} style={{ fontSize: '150px', width: '25px', height: '25px' }}>
              Reply
            </BsReplyFill>
          </Form.Group>
        </Form>
        
        <div className="btnGap">
          {loading ? (
            <Spinner />
          ) : (
            <>
              <AiTwotoneDelete
                type="submit"
                onClick={() => { handleDeletePost(post._id) }}
                style={{ fontSize: '150px', width: '25px', height: '25px', marginRight: '10px' }}
              >
                Delete
              </AiTwotoneDelete>
              <AiFillEdit
                onClick={() => { updatePost(post) }}
                style={{ fontSize: '150px', width: '25px', height: '25px' }}
              >
                Edit
              </AiFillEdit>
            </>
          )}
        </div>
      </div>
      
      {/* Modal for editing the post */}
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target={`#exampleModal-${post._id}`}>
        Launch demo modal
      </button>
      <div className="modal fade" id={`exampleModal-${post._id}`} tabIndex="-1" aria-labelledby={`exampleModalLabel-${post._id}`} aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id={`exampleModalLabel-${post._id}`}>Edit Post</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Title</Form.Label>
                  <Form.Control type="text" placeholder="Title" name='etitle' value={editedPosts[post._id]?.etitle} onChange={(e) => onChange(e, post._id)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Description</Form.Label>
                  <Form.Control type="text" placeholder="Description" name='ebody' value={editedPosts[post._id]?.ebody} onChange={(e) => onChange(e, post._id)} />
                </Form.Group>
              </Form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="addBtnU" data-bs-dismiss="modal">Close</button>
              <button disabled={!editedPosts[post._id]?.etitle || !editedPosts[post._id]?.ebody || editedPosts[post._id]?.etitle.length < 5 || editedPosts[post._id]?.ebody.length < 5} type="button" className="addBtnU" onClick={(e) => handleClick(e, post._id)}>Update Post</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardAccount;
