import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Spinner, Button } from 'flowbite-react'
import PostCard from '../components/PostCard'
import '../index.css'

const PostPage = () => {
  const { postSlug } = useParams()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    }
    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch('/api/post/getposts?limit=6');
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      };
      fetchRecentPosts();
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    )
  }

  return (
    <main className="min-h-screen animate-fade-in">
      {/* Article Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-8 text-center">
        {/* Category */}
        <Link
          to={`/search?category=${post && post.category}`}
          className="inline-block"
        >
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-editorial-accent hover:text-editorial-accent-hover transition-colors">
            {post && post.category}
          </span>
        </Link>

        {/* Title */}
        <h1 className="mt-4 font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-editorial-charcoal dark:text-editorial-white leading-tight">
          {post && post.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center justify-center gap-3 mt-6 text-editorial-light">
          <span className="font-sans text-xs uppercase tracking-wider">
            {post &&
              new Date(post.createdAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
          </span>
          <span className="w-1 h-1 rounded-full bg-editorial-light" />
          <span className="font-sans text-xs uppercase tracking-wider">
            {post && (post.content.length / 1000).toFixed(0)} min read
          </span>
        </div>
      </div>

      {/* Hero Image */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="rounded-xl overflow-hidden">
          <img
            src={post && post.image}
            alt={post && post.title}
            className="w-full max-h-[550px] object-cover"
          />
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="h-px w-full bg-editorial-border dark:bg-editorial-dark-border mb-10" />
        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post && post.content }}
        />
      </div>

      {/* Recent Posts */}
      <section className="py-16 sm:py-20 bg-editorial-cream/50 dark:bg-editorial-dark-surface/30 border-t border-editorial-border dark:border-editorial-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-editorial-accent">
              Keep Reading
            </span>
            <h2 className="mt-3 font-sans text-2xl sm:text-3xl font-bold text-editorial-charcoal dark:text-editorial-white tracking-tight">
              Recent Posts
            </h2>
            <div className="mt-4 mx-auto w-12 h-0.5 bg-editorial-accent rounded-full" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {recentPosts &&
              recentPosts.map((post) => (
                <div key={post._id} className="animate-fade-in-up">
                  <PostCard post={post} />
                </div>
              ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default PostPage