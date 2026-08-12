import { Label, Button, TextInput, Spinner, Alert } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInStart, signInFailure, signInSuccess } from '../redux/user/userslice'
import { useDispatch, useSelector } from 'react-redux'

const Admin = () => {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error: errorMessage } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill out all the fields'));
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-sm animate-fade-in-up">
        <div className="text-center mb-8">
          <h1 className="font-sans text-3xl font-bold text-editorial-charcoal dark:text-editorial-white tracking-tight">
            Admin Login
          </h1>
          <div className="mt-3 mx-auto w-10 h-0.5 bg-editorial-accent rounded-full" />
        </div>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div>
            <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-editorial-medium dark:text-editorial-light mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="admin@example.com"
              onChange={handleChange}
              className="w-full px-4 py-3 bg-transparent border border-editorial-border dark:border-editorial-dark-border rounded-lg font-sans text-sm text-editorial-dark dark:text-editorial-dark-text placeholder:text-editorial-light focus:outline-none focus:border-editorial-accent focus:ring-1 focus:ring-editorial-accent transition-all duration-300"
            />
          </div>

          <div>
            <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-editorial-medium dark:text-editorial-light mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              onChange={handleChange}
              className="w-full px-4 py-3 bg-transparent border border-editorial-border dark:border-editorial-dark-border rounded-lg font-sans text-sm text-editorial-dark dark:text-editorial-dark-text placeholder:text-editorial-light focus:outline-none focus:border-editorial-accent focus:ring-1 focus:ring-editorial-accent transition-all duration-300"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-2 font-sans text-sm font-semibold uppercase tracking-wider text-white bg-editorial-charcoal dark:bg-editorial-accent rounded-lg hover:bg-editorial-dark dark:hover:bg-editorial-accent-hover transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Spinner size="sm" />
                <span>Loading...</span>
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {errorMessage && (
          <Alert className="mt-5" color="failure">
            {errorMessage}
          </Alert>
        )}
      </div>
    </div>
  );
};

export default Admin;