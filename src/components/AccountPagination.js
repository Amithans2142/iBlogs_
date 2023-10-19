import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import PostContext from "../context/posts/PostContext";
import CardAccount from "./CardAccount";

const AccountPagination = () => {
  let navigate = useNavigate();
  const context = useContext(PostContext);
  const { posts, getAllData, loading, setLoading } = context;
  const [itemsPerPage] = useState(5);

  // Use useSearchParams to get and set the page number query parameter
  const [searchParams, setSearchParams] = useSearchParams();

  // Get the current page number from the URL query parameters
  const currentPage = parseInt(searchParams.get('page'), 10) || 1;

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setLoading(true);
      getAllData();
      setLoading(false);
    } else {
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    // Update the URL query parameter when the currentPage changes
    setSearchParams({ page: currentPage });
  }, [currentPage, setSearchParams]);

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

  // Handle next and previous page actions
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setLoading(true);
      // Update the currentPage to navigate to the next page
      navigate(`?page=${currentPage + 1}`);
      setLoading(false);
      // Scroll to the top of the page if needed
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setLoading(true);
      // Update the currentPage to navigate to the previous page
      navigate(`?page=${currentPage - 1}`);
      setLoading(false);
      // Scroll to the top of the page if needed
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Calculate the total number of pages based on the current number of posts
  const totalPosts = sortedPosts.length;
  const totalPages = Math.max(1, Math.ceil(totalPosts / itemsPerPage));

  // Check if currentPage is greater than totalPages, and if so, redirect to page 1
  useEffect(() => {
    if (currentPage > totalPages) {
      navigate(`?page=1`);
    }
  }, [currentPage, totalPages, navigate]);

  return (
    <div>
      {sortedPosts.length === 0 ? (
        <p style={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: 'larger',
          fontFamily: 'Franklin Gothic Medium, Arial Narrow, Arial, sans-serif',
        }}>

        </p>
      ) : (
        <>
          {getPostsForPage(currentPage).map((post, index) => (
            <CardAccount
              key={post.id}
              post={post}
            />
          ))}
        </>
      )}

      <div className="pagination-container1">
        <div className="pagination">
          {currentPage > 1 && (
            <button className="prev" onClick={handlePrevPage}>
              Previous
            </button>
          )}

          {currentPage < totalPages && (
            <button className="next" onClick={handleNextPage}>
              Next
            </button>
          )}
        </div>
        <div>
          <span>Page {totalPages === 1 ? 1 : currentPage} of {totalPages === 0 ? 1 : totalPages}</span>
        </div>
      </div>
    </div>
  );
};

export default AccountPagination;
