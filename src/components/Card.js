import React, { useContext, useState } from "react";
import { BiCommentAdd } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import PostContext from "../context/posts/PostContext";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Card = ({ post }) => {
    let navigate = useNavigate();
    const context = useContext(PostContext);
    const { deletePost, posts, getAllData, getAllDataHome, editPost, addComment, userId, userName, loading, setLoading } = context;
    const [comment, setComment] = useState({ comment: "" })
    const host = "http://localhost:4000";



    const handleComment = async (postId, userName) => {

        console.log("button clicked")
        console.log(comment)
        if (localStorage.getItem('token')) {

            const b = await addComment(postId, userId, comment);
            console.log(b);

            await getAllDataHome();

        } else {

            navigate('/login');
        }
    }

    const onChange = (e) => {
        setComment(e.target.value)
    }

    return (
        <div className="noteitem">
            <div className="card my-3" key={post._id}>
                <div className="card-body ">
                    <p className="card-title">{post.title}</p>
                    <div>
                        <p className="card-text"></p>
                        <p className="postedby">Posted By: {post?.user?.name}</p>
                    </div>
                    <div>
                        <p className="card-text"></p>
                        <p className="postedby">Posted On: {post?.CreatedAt}</p>
                    </div>

                    {/* <p className="card-text">Id: {post._id}</p> */}
                    <p className="body">{post.body}</p>
                    {/* <p className="card-text">Likes: {post.likes}</p> */}



                    <div>
                        <p className="card-text">Comments:</p>
                        {post.comments.length === 0 ? <span style={{ color: 'grey', fontStyle: 'italic' }}>Not Available</span> : null}
                        {post.comments?.slice().reverse().map((comment) => (
                            <div key={comment._id}>
                                <p><span className="spanUser">{comment.user}</span>__{comment.comment}</p>
                                <p></p>
                            </div>
                        ))}
                    </div>
                    <Form>
                        <Form.Group className="mb-3 d-flex" controlId="formBasicEmail">
                            <Form.Label></Form.Label>

                            <Form.Control className="italic-placeholder" type="text" placeholder="comment" name='comment' value={comment.comment} onChange={onChange} />


                            <BiCommentAdd id="commentIcon" variant="primary" type="submit" onClick={(e) => {
                                e.preventDefault()
                                handleComment(post._id, post.user._id)
                                setComment({ comment: "" })
                            }}
                                style={{ fontSize: '150px', width: '44px', height: '40px' }}>

                            </BiCommentAdd>
                        </Form.Group>
                    </Form>



                </div>
            </div>
        </div>
    )
}
export default Card;

