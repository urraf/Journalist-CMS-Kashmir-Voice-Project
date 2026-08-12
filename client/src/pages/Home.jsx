import React, { useEffect, useState } from 'react';
import { Spinner } from 'flowbite-react';
import PostCard from '../components/PostCard';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import ScrollReveal from '../components/ScrollReveal';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const fetchPosts = async () => {
        setLoading(true);
        const res = await fetch('/api/post/getposts?limit=9&category=Article&order=asc');
        if (!res.ok) {
          setLoading(false);
          return;
        }
        const data = await res.json();
        setPosts(data.posts);
        setLoading(false);
      };
      fetchPosts();
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    try {
      const fetchPosts = async () => {
        setLoading1(true);
        const res = await fetch(`/api/post/getposts?limit=9&excludeCategory=Article`);
        if (!res.ok) {
          setLoading1(false);
          return;
        }
        const data = await res.json();
        setBlogs(data.posts);
        setLoading1(false);
      };
      fetchPosts();
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <>
      {/* Hero / About Section */}
      <section className="relative">
        {/* Decorative top line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent to-editorial-border dark:to-editorial-dark-border" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-24 pb-20">
          <div className="animate-float">
            <div className="animate-fade-in-up">
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-editorial-charcoal dark:text-editorial-white leading-tight italic">
                "Hello! Welcome to my profile."
              </h1>

              {/* Decorative divider */}
              <div className="flex items-center justify-center gap-4 my-10">
                <div className="h-px w-16 bg-editorial-accent" />
                <div className="w-2 h-2 rotate-45 border border-editorial-accent" />
                <div className="h-px w-16 bg-editorial-accent" />
              </div>
            </div>

            <div className="space-y-6 text-lg sm:text-xl text-editorial-dark dark:text-editorial-dark-text leading-relaxed text-left sm:text-justify">
              <p className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                I'm Fizala Khan—a writer, researcher, journalist, and advocate. With over nine years of experience across journalism, legal research, and content creation, I've dabbled in everything from investigative reporting to academic writing and creating content for brands.
              </p>

              <p className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                I've worked as a sub-editor and journalist at The Kashmiriyat, contributed to research papers at Mumbai University, and crafted compelling content for companies like Woovly and Novus Digital.
              </p>

              <p className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                Justice, stories, and truth are three things I chase with equal passion, and that is why my background in Intellectual Property and Criminal Law gives my writing an analytical edge. But at heart, I love making information accessible and engaging—whether through articles, essays, or visuals.
              </p>

              <p className="animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                When I'm not buried in research or crafting the perfect sentence, you'll probably find me immersed in reading or chasing down the next great story.
              </p>

              <p className="animate-fade-in-up" style={{ animationDelay: '1.0s' }}>
                If you're curious to see where my words have taken me,{' '}
                <a
                  href="https://linktr.ee/fizalakhan"
                  className="text-editorial-accent hover:text-editorial-accent-hover border-b border-editorial-accent/30 hover:border-editorial-accent transition-all duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  explore my work here.
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles Section */}
      <ScrollReveal direction="up" delay={100}>
      <section className="py-16 sm:py-20 bg-editorial-cream/50 dark:bg-editorial-dark-surface/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-editorial-accent">
              Latest Work
            </span>
            <h2 className="mt-3 font-sans text-3xl sm:text-4xl font-bold text-editorial-charcoal dark:text-editorial-white tracking-tight">
              Latest Articles
            </h2>
            <div className="mt-4 mx-auto w-12 h-0.5 bg-editorial-accent rounded-full" />
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 gap-2">
              <Spinner size="lg" />
              <span className="text-editorial-medium font-sans text-sm">Loading Articles...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {posts.map((post, index) => (
                <div
                  key={index}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <PostCard post={post} />
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <button
              onClick={() => navigate('/article')}
              className="inline-flex items-center gap-2 font-sans text-sm font-semibold uppercase tracking-wider text-editorial-accent hover:text-editorial-accent-hover transition-colors duration-300 group btn-shiny px-6 py-3 rounded-full border border-editorial-accent/30 hover:border-editorial-accent/60"
            >
              See More Articles
              <FaArrowRight
                size={12}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* Latest Blogs Section */}
      <ScrollReveal direction="up" delay={100}>
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-editorial-accent">
              From the Blog
            </span>
            <h2 className="mt-3 font-sans text-3xl sm:text-4xl font-bold text-editorial-charcoal dark:text-editorial-white tracking-tight">
              Latest Blogs
            </h2>
            <div className="mt-4 mx-auto w-12 h-0.5 bg-editorial-accent rounded-full" />
          </div>

          {loading1 ? (
            <div className="flex flex-col items-center justify-center py-12 gap-2">
              <Spinner size="lg" />
              <span className="text-editorial-medium font-sans text-sm">Loading Blogs...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {blogs.map((post, index) => (
                <div
                  key={index}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <PostCard post={post} />
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <button
              onClick={() => navigate('/blogs')}
              className="inline-flex items-center gap-2 font-sans text-sm font-semibold uppercase tracking-wider text-editorial-accent hover:text-editorial-accent-hover transition-colors duration-300 group btn-shiny px-6 py-3 rounded-full border border-editorial-accent/30 hover:border-editorial-accent/60"
            >
              See More Blogs
              <FaArrowRight
                size={12}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </div>
        </div>
      </section>
      </ScrollReveal>
    </>
  );
};

export default Home;
