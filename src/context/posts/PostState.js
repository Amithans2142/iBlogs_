import PostContext from "./PostContext";
import { useState} from "react";

const PostState = (props) => {
  const host = "https://iblogs-backend.onrender.com";
  const [posts, setPosts] = useState([]);
  const [userName, setUserName] = useState('')
  const [userId, setUserId] = useState('')
  const [userInfo, setUserInfo] = useState('');
  const [loading, setLoading] = useState(false);
  

  

  //fetch posts
  const getAllData = async () => {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    if (!token) {
      console.error("Token not found in localStorage.");
      return { status: "error", error: "Token not found" };
    }

    try {
      const getPost = await fetch(
        `${host}/api/v1/posts`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
          },
        }
      );

      const res = await getPost.json();
      // console.log(res);

      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  //Home All Posts
  const getAllDataHome = async () => {
    
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    if (!token) {
      console.error("Token not found in localStorage.");
      return { status: "error", error: "Token not found" };
    }

    try {
      const getPost = await fetch(
        `${host}/api/v1/dashboard`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
          },
        }
      );

      const res = await getPost.json();
      // console.log(res);

      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  //Get User Info 
  const getUserInfo = async () => {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    if (!token) {
      console.error("Token not found in localStorage.");
      return { status: "error", error: "Token not found" };
    }

    try {
      const getPost = await fetch(
        `${host}/api/v1/fetch`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
          },
        }
      );

      const res = await getPost.json();
      // console.log(res);

      setUserInfo(res);
      // console.log("info", res);
    } catch (error) {
      console.log(error);
    }

  }
  //Add Post 

  const addPost = async (title, body) => {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    if (!token) {
      console.error("Token not found in localStorage.");
      return { status: "error", error: "Token not found" };
    }

    const response = await fetch(`${host}/api/v1/post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(title, body),
    });

    const data = await response.json();
    // console.log(data);

    if (response.ok) {
      return { status: "success", data };
    } else {
      return { status: "error", error: data.error || "Unknown error" };
    }
  }

  const addComment = async (postId, userName, comment) => {
    // console.log("data", postId, userName, comment)
    try {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      if (!token) {
        console.error("Token not found in localStorage.");
        return { status: "error", error: "Token not found" };
      }

      const response = await fetch(`${host}/api/v1/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ postId, userName, comment }),
      });

      const data = await response.json();
      // console.log("json", data);

      if (response.ok) {
        return { status: "success", data };
      } else {
        return { status: "error", error: data.error || "Unknown error" };
      }
    } catch (error) {
      console.error("An error occurred:", error);
      return { status: "error", error: "An error occurred while making the request" };
    }
  };
  //Delete Post 
  const deletePost = async (id) => {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    if (!token) {
      console.error("Token not found in localStorage.");
      return { status: "error", error: "Token not found" };
    }

    try {
      const response = await fetch(`${host}/api/v1/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = response.json();
      // console.log(json);
      // console.log(`Deleted the post with ID: ${id}`);
      const newPosts = posts.filter((post) => post._id !== id);
      setPosts(newPosts);
    } catch (error) {
      console.error('Error deleting post:', error);
      setPosts((prevPosts) => [...prevPosts, { _id: id, }]);
    }
  };

  const editPost = async (id, title, body) => {
    const response = await fetch(`${host}/api/v1/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, body })
    })
    const json = response.json();
    // console.log(json)

    for (let index = 0; index < posts.length; index++) {
      const element = posts[index];
      if (element._id === id) {
        element.title = title;
        element.body = body;

      }
    }
  };

  const fetchData = async () => {
    try {
      const getData = await fetch(
        `${host}/api/v1/fetch`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const res = await getData.json();
      // console.log(res);

      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <PostContext.Provider value={{ posts, setPosts, userInfo, setUserInfo, getAllData, getAllDataHome, getUserInfo, addPost, deletePost, editPost, fetchData, addComment, userName, setUserName, userId, setUserId ,loading,setLoading }}>
      {props.children}
    </PostContext.Provider>
  )
}
export default PostState;