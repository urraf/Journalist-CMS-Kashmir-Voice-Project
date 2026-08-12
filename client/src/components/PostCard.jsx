import React from 'react'
import { Link } from 'react-router-dom'

const PostCard = ({ post }) => {
  return (
    <Link to={`/post/${post.slug}`} className="group block h-full">
      <article className="bg-white dark:bg-editorial-dark-surface rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 h-full border border-editorial-border/50 dark:border-editorial-dark-border/50 hover:border-editorial-border dark:hover:border-editorial-dark-border flex flex-col hover-shimmer">
        {/* Image */}
        <div className="relative overflow-hidden aspect-[16/10]">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          {/* Category Badge */}
          {post.category && (
            <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 dark:bg-editorial-dark-bg/90 backdrop-blur-sm text-[11px] font-sans font-semibold uppercase tracking-widest text-editorial-charcoal dark:text-editorial-dark-text rounded-full">
              {post.category}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-sans text-lg font-semibold text-editorial-charcoal dark:text-editorial-white leading-snug line-clamp-2 group-hover:text-editorial-accent transition-colors duration-300">
            {post.title}
          </h3>
          <div className="mt-auto pt-3 flex items-center gap-3 text-editorial-light dark:text-editorial-light">
            {post.createdAt && (
              <span className="text-xs font-sans uppercase tracking-wider">
                {new Date(post.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            )}
            {post.content && (
              <>
                <span className="w-1 h-1 rounded-full bg-editorial-light" />
                <span className="text-xs font-sans">
                  {(post.content.length / 1000).toFixed(0)} min read
                </span>
              </>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}

export default PostCard