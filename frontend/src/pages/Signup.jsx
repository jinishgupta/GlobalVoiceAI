import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {registerUser} from '../store/authSlice.js'
import { useState } from 'react';
import GoogleLoginButton from '../components/GoogleLoginButton.jsx';

function Signup() {
  const [form, setForm] = useState({userName: '', email: '', password: ''});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    dispatch(registerUser(form))
      .then(response => {
        if (response.payload && response.payload.success) {
          setSuccessMessage(response.payload.message || 'Verification email sent. Please check your inbox.');
        } else {
          setErrorMessage(response.payload?.message || 'Registration failed. Please try again.');
        }
      })
      .catch(error => {
        console.error('Registration error:', error);
        setErrorMessage('An error occurred during registration. Please try again.');
      });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-6xl mx-auto lg:grid lg:grid-cols-2 shadow-2xl rounded-3xl overflow-hidden">
        
        {/* Left Side: Branding and Image */}
        <div className="relative hidden lg:block">
          <img 
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
            alt="Team collaborating" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-vibrant-orange via-vibrant-orange/80 to-transparent"></div>
          <div className="relative p-12 text-white flex flex-col justify-end h-full">
            <h1 className="text-5xl font-extrabold leading-tight">Join GlobalVoice AI Today</h1>
            <p className="mt-4 text-xl text-orange-100">Start localizing your content in minutes. The future of global reach is here.</p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="p-8 md:p-16 bg-white bg-opacity-80 backdrop-blur-sm">
          <div className="w-full max-w-md mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create an Account</h2>
            <p className="text-gray-600 mb-8">
              Already have an account? <Link to="/login" className="font-semibold text-vibrant-blue hover:text-vibrant-orange transition-colors">Sign in</Link>
            </p>

            {successMessage ? (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 text-center">
                {successMessage}
                <div className="mt-4">
                  <button
                    className="bg-vibrant-blue text-white px-4 py-2 rounded hover:bg-vibrant-orange transition-colors"
                    onClick={() => navigate('/login')}
                  >
                    Go to Login
                  </button>
                </div>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                {errorMessage && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-center">
                    {errorMessage}
                  </div>
                )}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <div className="mt-1">
                    <input
                      id="userName"
                      name="userName"
                      type="text"
                      autoComplete="name"
                      required
                      className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-vibrant-blue focus:border-vibrant-blue sm:text-sm"
                      placeholder="AlexDoe17"
                      onChange={(e) => setForm({...form, userName: e.target.value})}
                    />
                  </div>
                </div>
                
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
                      className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-vibrant-blue focus:border-vibrant-blue sm:text-sm"
                      placeholder="you@example.com"
                      onChange={(e) => setForm({...form, email: e.target.value})}
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
                      autoComplete="new-password"
                      required
                      className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-vibrant-blue focus:border-vibrant-blue sm:text-sm"
                      placeholder="Minimum 8 characters"
                      onChange={(e) => setForm({...form, password: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-lg font-semibold text-white bg-gradient-to-r from-vibrant-blue to-teal-500 hover:from-vibrant-orange hover:to-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vibrant-blue transition-all transform hover:scale-105"
                  >
                    Create Account
                  </button>
                </div>
              </form>
            )}
            <div className="mt-8 relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white bg-opacity-80 text-gray-500">OR</span>
              </div>
            </div>
            
            <div className="mt-6 flex justify-center gap-4">
              <GoogleLoginButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup; 