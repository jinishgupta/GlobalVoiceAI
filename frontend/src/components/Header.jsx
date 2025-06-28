import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../store/authSlice';
import { useState } from 'react';

function Header() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser()).then(() => {
      navigate('/');
    });
  };

  return (
    <header className="bg-white border-b border-divider shadow-sm">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <Link to="/" className="flex items-center gap-2">
          {/* Logo Placeholder */}
          <span className="text-primary font-bold text-2xl tracking-tight">GlobalVoice <span className="text-secondary">AI</span></span>
          {/* Optionally add a wave/globe icon here */}
        </Link>
        {/* Hamburger for mobile */}
        <button
          className="md:hidden flex items-center px-2 py-1 text-2xl text-primary focus:outline-none"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open navigation menu"
        >
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
        <nav className="hidden md:flex gap-8 text-text-main font-medium">
          <Link to="/features" className="hover:text-primary">Features</Link>
          <Link to="/pricing" className="hover:text-primary">Pricing</Link>
          <Link to="/examples" className="hover:text-primary">Examples</Link>
          <Link to="/blog" className="hover:text-primary">Blog</Link>
          <Link to="/contact" className="hover:text-primary">Contact</Link>
        </nav>
        <div className="flex gap-2">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="border border-primary text-white bg-primary px-4 py-2 rounded-lg hover:bg-secondary hover:border-secondary hover:text-white transition">Dashboard</Link>
              <button onClick={handleLogout} className="border border-secondary text-secondary px-4 py-2 rounded-lg hover:bg-secondary hover:text-white transition">Logout</button>
            </>
          ) : (
            <Link to="/login" className="border border-primary text-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition">Login</Link>
          )}
        </div>
      </div>
      {/* Sidebar Drawer for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex">
          {/* Overlay */}
          <div className="fixed inset-0 bg-black bg-opacity-30" onClick={() => setSidebarOpen(false)}></div>
          {/* Sidebar */}
          <div className="relative w-64 bg-white h-full shadow-lg z-50 animate-slideInLeft">
            <button
              className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-primary"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close navigation menu"
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <nav className="flex flex-col gap-6 p-8 text-lg font-medium">
              <Link to="/features" className="hover:text-primary" onClick={() => setSidebarOpen(false)}>Features</Link>
              <Link to="/pricing" className="hover:text-primary" onClick={() => setSidebarOpen(false)}>Pricing</Link>
              <Link to="/examples" className="hover:text-primary" onClick={() => setSidebarOpen(false)}>Examples</Link>
              <Link to="/blog" className="hover:text-primary" onClick={() => setSidebarOpen(false)}>Blog</Link>
              <Link to="/contact" className="hover:text-primary" onClick={() => setSidebarOpen(false)}>Contact</Link>
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="border border-primary text-white bg-primary px-4 py-2 rounded-lg hover:bg-secondary hover:border-secondary hover:text-white transition" onClick={() => setSidebarOpen(false)}>Dashboard</Link>
                  <button onClick={() => { handleLogout(); setSidebarOpen(false); }} className="border border-secondary text-secondary px-4 py-2 rounded-lg hover:bg-secondary hover:text-white transition">Logout</button>
                </>
              ) : (
                <Link to="/login" className="border border-primary text-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition" onClick={() => setSidebarOpen(false)}>Login</Link>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header; 