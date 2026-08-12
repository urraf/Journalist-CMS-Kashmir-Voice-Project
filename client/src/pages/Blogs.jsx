import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PostCard from '../components/PostCard';
import { Spinner } from 'flowbite-react';
import { FaArrowDown } from 'react-icons/fa';

const Blogs = () => {
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `/api/post/getposts?page=${page}&limit=9&excludeCategory=Article&order=desc`
        );
        if (!res.ok) throw new Error('Failed to fetch posts');

        const data = await res.json();

        setPosts((prevPosts) =>
          page === 1 ? data.posts : [...prevPosts, ...data.posts]
        );

        setShowMore(data.posts.length === 9);
      } catch (error) {
        setError(error.message);
      }

      setLoading(false);
    };

    fetchPosts();
  }, [page]);

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="py-16 sm:py-20 text-center">
        <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-editorial-accent">
          All Posts
        </span>
        <h1 className="mt-3 font-sans text-4xl sm:text-5xl font-bold text-editorial-charcoal dark:text-editorial-white tracking-tight">
          Blogs
        </h1>
        <div className="mt-4 mx-auto w-12 h-0.5 bg-editorial-accent rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        {loading && page === 1 ? (
          <div className="flex justify-center items-center py-20">
            <Spinner size="lg" />
          </div>
        ) : error ? (
          <p className="text-center text-red-500 font-sans">{error}</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-editorial-medium font-sans text-lg py-20">
            No blogs found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {posts.map((post, index) => (
              <div
                key={post._id || index}
                className="animate-fade-in-up"
                style={{ animationDelay: `${(index % 9) * 0.08}s` }}
              >
                <PostCard post={post} />
              </div>
            ))}
          </div>
        )}

        {showMore && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setPage(page + 1)}
              className="inline-flex items-center gap-2 px-6 py-3 font-sans text-sm font-semibold uppercase tracking-wider text-editorial-charcoal dark:text-editorial-white border border-editorial-border dark:border-editorial-dark-border rounded-full hover:bg-editorial-cream dark:hover:bg-editorial-dark-surface hover:border-editorial-accent transition-all duration-300"
            >
              Load More
              <FaArrowDown size={11} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
