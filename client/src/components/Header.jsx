import { Avatar, Dropdown } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import { FaMoon, FaSun, FaBars, FaTimes } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from '../redux/theme/themeslice'
import { signoutSuccess } from '../redux/user/userslice'

const Header = () => {
  const path = useLocation().pathname;
  const { currentUser } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const { theme } = useSelector(state => state.theme);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
        credentials: 'include',
      });
      const data = res.json();
      if (!res.ok) {
        console.log(data.message);
        return;
      } else {
        dispatch(signoutSuccess());
        navigate('/');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
    setSearchOpen(false);
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/article', label: 'Articles' },
    { path: '/blogs', label: 'Blogs' },
    { path: '/contact', label: 'Email Us' },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-editorial-white/90 dark:bg-editorial-dark-bg/90 backdrop-blur-md shadow-sm'
          : 'bg-editorial-white dark:bg-editorial-dark-bg'
      } border-b border-editorial-border dark:border-editorial-dark-border`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <span className="font-sans text-xl sm:text-2xl font-semibold tracking-tight text-editorial-charcoal dark:text-editorial-white logo-glow transition-all duration-300">
              Fizala Khan
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative font-sans text-[13px] font-medium tracking-wide uppercase transition-colors duration-300
                  ${
                    path === link.path
                      ? 'text-editorial-charcoal dark:text-editorial-white'
                      : 'text-editorial-medium dark:text-editorial-light hover:text-editorial-charcoal dark:hover:text-editorial-white'
                  }
                  after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:bg-editorial-accent after:transition-all after:duration-300
                  ${path === link.path ? 'after:w-full' : 'after:w-0 hover:after:w-full'}
                `}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Desktop Search */}
            <form onSubmit={handleSubmit} className="hidden lg:flex items-center">
              <div
                className={`flex items-center transition-all duration-300 overflow-hidden rounded-full border ${
                  searchOpen
                    ? 'w-48 border-editorial-border dark:border-editorial-dark-border px-3'
                    : 'w-9 border-transparent'
                } bg-editorial-cream/50 dark:bg-editorial-dark-surface/50`}
              >
                <button
                  type={searchOpen ? 'submit' : 'button'}
                  onClick={() => !searchOpen && setSearchOpen(true)}
                  className="flex-shrink-0 p-1.5 text-editorial-medium hover:text-editorial-charcoal dark:hover:text-editorial-white transition-colors"
                >
                  <AiOutlineSearch size={18} />
                </button>
                {searchOpen && (
                  <input
                    type="text"
                    placeholder="Search..."
                    className="bg-transparent border-none outline-none text-sm w-full py-1.5 text-editorial-dark dark:text-editorial-dark-text font-sans placeholder:text-editorial-light focus:ring-0"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoFocus
                    onBlur={() => !searchTerm && setSearchOpen(false)}
                  />
                )}
              </div>
            </form>

            {/* Mobile Search */}
            <button
              onClick={() => navigate('/search')}
              className="lg:hidden p-2 text-editorial-medium hover:text-editorial-charcoal dark:hover:text-editorial-white transition-colors"
            >
              <AiOutlineSearch size={18} />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => dispatch(toggleTheme())}
              className="p-2 rounded-full text-editorial-medium hover:text-editorial-charcoal dark:hover:text-editorial-white hover:bg-editorial-cream dark:hover:bg-editorial-dark-surface transition-all duration-300"
            >
              {theme === 'light' ? <FaMoon size={15} /> : <FaSun size={15} />}
            </button>

            {/* User Menu */}
            {currentUser && (
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <Avatar
                    alt="user"
                    img="https://res.cloudinary.com/dt8fsqka6/image/upload/v1738603951/jfaxfuiizmbj9dk6hqmu.png"
                    rounded
                    className="w-8 h-8"
                  />
                }
              >
                <Dropdown.Header>
                  <span className="block text-sm">@{currentUser.username}</span>
                  <span className="block text-sm font-medium truncate">
                    {currentUser.email}
                  </span>
                </Dropdown.Header>
                <Link to="/dashboard?tab=profile">
                  <Dropdown.Item>Profile</Dropdown.Item>
                </Link>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
              </Dropdown>
            )}

            {/* Mobile Hamburger */}
            <button
              className="md:hidden p-2 text-editorial-medium hover:text-editorial-charcoal dark:hover:text-editorial-white transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pb-6 pt-2 space-y-1 border-t border-editorial-border dark:border-editorial-dark-border bg-editorial-white dark:bg-editorial-dark-bg">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`block py-2.5 px-3 rounded-lg font-sans text-sm font-medium tracking-wide transition-colors duration-200
                ${
                  path === link.path
                    ? 'text-editorial-charcoal dark:text-editorial-white bg-editorial-cream dark:bg-editorial-dark-surface'
                    : 'text-editorial-medium dark:text-editorial-light hover:text-editorial-charcoal dark:hover:text-editorial-white hover:bg-editorial-cream/50 dark:hover:bg-editorial-dark-surface/50'
                }
              `}
            >
              {link.label}
            </Link>
          ))}
          {currentUser ? (
            <>
              <Link
                to="/dashboard?tab=profile"
                onClick={() => setMenuOpen(false)}
                className="block py-2.5 px-3 rounded-lg font-sans text-sm font-medium text-editorial-medium dark:text-editorial-light hover:text-editorial-charcoal dark:hover:text-editorial-white hover:bg-editorial-cream/50 dark:hover:bg-editorial-dark-surface/50 transition-colors"
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  handleSignOut();
                  setMenuOpen(false);
                }}
                className="block w-full text-left py-2.5 px-3 rounded-lg font-sans text-sm font-medium text-editorial-medium hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              to="/admin"
              onClick={() => setMenuOpen(false)}
              className="block py-2.5 px-3 rounded-lg font-sans text-sm font-medium text-editorial-medium hover:text-editorial-charcoal hover:bg-editorial-cream/50 transition-colors"
            >
              Admin
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;