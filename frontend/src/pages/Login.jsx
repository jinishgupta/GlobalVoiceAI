import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faApple } from '@fortawesome/free-brands-svg-icons';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../store/authSlice.js';
import { useState } from 'react';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser(form))
      .then(response => {
        if (response.payload && response.payload.success) {
          navigate('/dashboard');
        } else {
          alert('Login failed. Please check your credentials.');
        }
      })
      .catch(error => {
        console.error('Login error:', error);
        alert('An error occurred during login. Please try again.');
      });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-6xl mx-auto lg:grid lg:grid-cols-2 shadow-2xl rounded-3xl overflow-hidden">
        
        {/* Left Side: Branding and Image */}
        <div className="relative hidden lg:block">
          <img 
            src="https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
            alt="Content creation workspace" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-vibrant-blue via-vibrant-blue/80 to-transparent"></div>
          <div className="relative p-12 text-white flex flex-col justify-end h-full">
            <h1 className="text-5xl font-extrabold leading-tight">Welcome Back to GlobalVoice AI</h1>
            <p className="mt-4 text-xl text-blue-100">The world's most powerful AI localization platform. Continue creating amazing content.</p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="p-8 md:p-16 bg-white bg-opacity-80 backdrop-blur-sm">
          <div className="w-full max-w-md mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h2>
            <p className="text-gray-600 mb-8">
              Don't have an account? <Link to="/signup" className="font-semibold text-vibrant-blue hover:text-vibrant-orange transition-colors">Create one</Link>
            </p>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-vibrant-blue focus:border-vibrant-blue sm:text-sm"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password"className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={form.password}
                    onChange={handleChange}
                    className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-vibrant-blue focus:border-vibrant-blue sm:text-sm"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <a href="#" className="font-medium text-vibrant-blue hover:text-vibrant-orange transition-colors">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-lg font-semibold text-white bg-gradient-to-r from-vibrant-blue to-teal-500 hover:from-vibrant-orange hover:to-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vibrant-blue transition-all transform hover:scale-105`}
                >
                  Sign In
                </button>
              </div>
            </form>

            <div className="mt-8 relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white bg-opacity-80 text-gray-500">Or continue with</span>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-2 gap-4">
              <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors group">
                <FontAwesomeIcon icon={faGoogle} className="w-5 h-5 mr-2 text-red-500 group-hover:text-red-600" />
                Google
              </button>
              <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors group">
                <FontAwesomeIcon icon={faApple} className="w-5 h-5 mr-2 text-black group-hover:text-gray-800" />
                Apple
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login; 