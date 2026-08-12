"use client";
import React from "react";
import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram, BsTwitter, BsLinkedin } from "react-icons/bs";

export function FooterComponent() {
  return (
    <footer className="bg-editorial-charcoal dark:bg-editorial-dark-bg border-t border-editorial-dark-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block">
              <span className="font-sans text-xl font-semibold text-white tracking-tight">
                Fizala Khan
              </span>
            </Link>
            <p className="mt-3 text-sm text-gray-400 leading-relaxed font-serif max-w-xs">
              Writer, researcher, journalist & advocate — chasing justice, stories, and truth.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-sans text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
              Quick Links
            </h4>
            <div className="flex flex-col gap-2.5">
              <Link
                to="/"
                className="text-sm text-gray-300 hover:text-white transition-colors duration-300 font-sans"
              >
                Home
              </Link>
              <Link
                to="/article"
                className="text-sm text-gray-300 hover:text-white transition-colors duration-300 font-sans"
              >
                Articles
              </Link>
              <Link
                to="/blogs"
                className="text-sm text-gray-300 hover:text-white transition-colors duration-300 font-sans"
              >
                Blogs
              </Link>
              <Link
                to="/contact"
                className="text-sm text-gray-300 hover:text-white transition-colors duration-300 font-sans"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-sans text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
              Connect
            </h4>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/fizala.khan.9"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-300"
              >
                <BsFacebook size={16} />
              </a>
              <a
                href="https://www.instagram.com/fizalalalala"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-300"
              >
                <BsInstagram size={16} />
              </a>
              <a
                href="#"
                className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-300"
              >
                <BsTwitter size={16} />
              </a>
              <a
                href="#"
                className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-300"
              >
                <BsLinkedin size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="mt-10 pt-6 border-t border-white/10">
          <p className="text-xs text-gray-500 font-sans text-center">
            © {new Date().getFullYear()} Fizala Khan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
