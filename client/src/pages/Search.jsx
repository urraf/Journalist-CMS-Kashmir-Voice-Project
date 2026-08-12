import { Select, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';
import { AiOutlineSearch } from 'react-icons/ai';

export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    sort: 'desc',
  });

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const sortFromUrl = urlParams.get('sort');
    if (searchTermFromUrl || sortFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
      });
    }

    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/post/getposts?${searchQuery}`);
      if (!res.ok) {
        setLoading(false);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts);
        setLoading(false);
        if (data.posts.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    };
    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === 'searchTerm') {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }
    if (e.target.id === 'sort') {
      const order = e.target.value || 'desc';
      setSidebarData({ ...sidebarData, sort: order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', sidebarData.searchTerm);
    urlParams.set('sort', sidebarData.sort);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/post/getposts?${searchQuery}`);
    if (!res.ok) {
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setPosts([...posts, ...data.posts]);
      if (data.posts.length === 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-72 lg:w-80 flex-shrink-0 p-6 sm:p-8 border-b md:border-b-0 md:border-r border-editorial-border dark:border-editorial-dark-border bg-editorial-cream/30 dark:bg-editorial-dark-surface/20">
        <h2 className="font-sans text-lg font-semibold text-editorial-charcoal dark:text-editorial-white mb-6 tracking-tight">
          Filter & Search
        </h2>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div>
            <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-editorial-medium dark:text-editorial-light mb-2">
              Search Term
            </label>
            <TextInput
              placeholder="Search..."
              id="searchTerm"
              type="text"
              value={sidebarData.searchTerm}
              onChange={handleChange}
              icon={AiOutlineSearch}
            />
          </div>
          <div>
            <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-editorial-medium dark:text-editorial-light mb-2">
              Sort By
            </label>
            <Select onChange={handleChange} value={sidebarData.sort} id="sort">
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </Select>
          </div>
          <button
            type="submit"
            className="mt-2 px-5 py-2.5 font-sans text-sm font-semibold uppercase tracking-wider text-white bg-editorial-charcoal dark:bg-editorial-accent rounded-lg hover:bg-editorial-dark dark:hover:bg-editorial-accent-hover transition-colors duration-300"
          >
            Apply Filters
          </button>
        </form>
      </aside>

      {/* Results */}
      <div className="flex-1 p-6 sm:p-8">
        <h1 className="font-sans text-2xl font-bold text-editorial-charcoal dark:text-editorial-white tracking-tight mb-6 pb-4 border-b border-editorial-border dark:border-editorial-dark-border">
          Search Results
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {!loading && posts.length === 0 && (
            <p className="text-editorial-medium font-sans col-span-full text-center py-12">
              No posts found.
            </p>
          )}
          {loading && (
            <p className="text-editorial-medium font-sans col-span-full text-center py-12">
              Loading...
            </p>
          )}
          {!loading &&
            posts &&
            posts.map((post) => (
              <div key={post._id} className="animate-fade-in-up">
                <PostCard post={post} />
              </div>
            ))}
        </div>
        {showMore && (
          <div className="text-center mt-8">
            <button
              onClick={handleShowMore}
              className="font-sans text-sm font-semibold text-editorial-accent hover:text-editorial-accent-hover transition-colors"
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}