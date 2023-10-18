import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import PostContext from "../context/posts/PostContext";
import Card from "./Card";

const Pagination = () => {
  let navigate = useNavigate();
  const context = useContext(PostContext);
  const { posts, getAllDataHome, loading, setLoading } = context;
  const [itemsPerPage] = useState(5);

  // Use useSearchParams to get and set the page number query parameter
  const [searchParams, setSearchParams] = useSearchParams();

  // Get the current page number from the URL query parameters
  const currentPage = parseInt(searchParams.get('page'), 10) || 1;

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setLoading(true);
      getAllDataHome();
      setLoading(false);
    } else {
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    // Update the URL query parameter when the currentPage changes
    setSearchParams({ page: currentPage });
  }, [currentPage, setSearchParams]);

  // Calculate the total number of pages
  const totalPosts = posts.length;
  const totalPages = Math.ceil(totalPosts / itemsPerPage);

  // Sorting and pagination logic
  const sortedPosts = [...posts].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB - dateA;
  }).reverse();

  const getPostsForPage = (page) => {
    const startIdx = (page - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    return sortedPosts.slice(startIdx, endIdx);
  };

  const hasPostsForNextPage = () => {
    const startIdx = currentPage * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    return sortedPosts.slice(startIdx, endIdx).length > 0;
  };

  // Handle next and previous page actions
  const handleNextPage = () => {
    if (currentPage < totalPages && hasPostsForNextPage()) {
      setLoading(true);
      // Update the currentPage to navigate to the next page
      navigate(`?page=${currentPage + 1}`);
      setLoading(false);
      // Scroll to the top of the page
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      // Update the currentPage to navigate to the previous page
      navigate(`?page=${currentPage - 1}`);
      // Scroll to the top of the page
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Get the posts for the current page
  const slicedPosts = getPostsForPage(currentPage);

  return (
    <div>
      {slicedPosts.length > 0 ? (
        slicedPosts.map((post) => (
          <Card
            key={post.id}
            post={post}
          />
        ))
      ) : (
        <div className="not-posted1">
          <p>Not Available</p>
        </div>
      )}

      <div className="pagination-container">
        <div className="pagination">
          {currentPage > 1 && (
            <button className="prev" onClick={handlePrevPage}>
              Previous
            </button>
          )}

          {currentPage < totalPages && hasPostsForNextPage() && (
            <button className="next" onClick={handleNextPage}>
              Next
            </button>
          )}
        </div>
        <div>
          <span>Page {currentPage} of {totalPages}</span>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
