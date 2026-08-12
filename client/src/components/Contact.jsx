import { useState } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');

    const emailParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_name: 'Fizala Khan',
    };

    emailjs
      .send(
        'service_5eccz3s',
        'template_gqmg5zh',
        emailParams,
        '_Alg2UVDl8KQ85xy3'
      )
      .then(
        () => {
          setStatus('success');
          setFormData({ name: '', email: '', message: '' });
        },
        () => {
          setStatus('error');
        }
      );
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-lg animate-fade-in-up">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-editorial-accent">
            Get in Touch
          </span>
          <h1 className="mt-3 font-sans text-3xl sm:text-4xl font-bold text-editorial-charcoal dark:text-editorial-white tracking-tight">
            Contact Me
          </h1>
          <div className="mt-4 mx-auto w-12 h-0.5 bg-editorial-accent rounded-full" />
          <p className="mt-4 text-editorial-medium dark:text-editorial-light font-serif text-lg">
            Have a story idea or want to collaborate? I'd love to hear from you.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-editorial-medium dark:text-editorial-light mb-2">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-transparent border border-editorial-border dark:border-editorial-dark-border rounded-lg font-serif text-editorial-dark dark:text-editorial-dark-text placeholder:text-editorial-light focus:outline-none focus:border-editorial-accent focus:ring-1 focus:ring-editorial-accent transition-all duration-300"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-editorial-medium dark:text-editorial-light mb-2">
              Your Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-transparent border border-editorial-border dark:border-editorial-dark-border rounded-lg font-serif text-editorial-dark dark:text-editorial-dark-text placeholder:text-editorial-light focus:outline-none focus:border-editorial-accent focus:ring-1 focus:ring-editorial-accent transition-all duration-300"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-editorial-medium dark:text-editorial-light mb-2">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-3 bg-transparent border border-editorial-border dark:border-editorial-dark-border rounded-lg font-serif text-editorial-dark dark:text-editorial-dark-text placeholder:text-editorial-light focus:outline-none focus:border-editorial-accent focus:ring-1 focus:ring-editorial-accent transition-all duration-300 resize-none"
              placeholder="What would you like to say?"
            />
          </div>
          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full py-3.5 font-sans text-sm font-semibold uppercase tracking-wider text-white bg-editorial-charcoal dark:bg-editorial-accent rounded-lg hover:bg-editorial-dark dark:hover:bg-editorial-accent-hover transition-all duration-300 disabled:opacity-50"
          >
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>

          {status === 'success' && (
            <div className="text-center py-3 px-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg animate-fade-in">
              <p className="text-green-700 dark:text-green-400 font-sans text-sm font-medium">
                Message sent successfully! I'll get back to you soon.
              </p>
            </div>
          )}
          {status === 'error' && (
            <div className="text-center py-3 px-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg animate-fade-in">
              <p className="text-red-700 dark:text-red-400 font-sans text-sm font-medium">
                Failed to send. Please try again.
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Contact;
