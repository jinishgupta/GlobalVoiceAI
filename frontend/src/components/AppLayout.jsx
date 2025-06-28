import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faFolder, faPlus, faHeadset, faCog, faCreditCard, faQuestionCircle, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../store/authSlice';
import { useState } from 'react';

const navLinks = [
  { to: '/dashboard', icon: <FontAwesomeIcon icon={faTachometerAlt} />, text: 'Dashboard' },
  { to: '/projects', icon: <FontAwesomeIcon icon={faFolder} />, text: 'My Projects' },
  { to: '/billing', icon: <FontAwesomeIcon icon={faCreditCard} />, text: 'Billing' },
  { to: '/settings', icon: <FontAwesomeIcon icon={faCog} />, text: 'Settings' },
];

function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser()).then(() => {
      navigate('/');
    });
  };

  return (
    <div className="flex h-screen font-sans bg-blue-50">
      {/* Sidebar for desktop */}
      <aside className="w-64 hidden md:flex flex-col bg-white border-r border-gray-200 shadow-sm">
        <div className="p-6 text-2xl font-bold text-indigo-600 border-b border-gray-100">
          <Link to="/dashboard">GlobalVoice AI</Link>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navLinks.map(link => (
             <Link 
              key={link.to}
              to={link.to} 
              className={`flex items-center px-4 py-2 rounded-lg transition-all font-medium text-gray-600 hover:bg-indigo-50 hover:text-indigo-700 ${location.pathname.startsWith(link.to) ? 'bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow' : ''}`}
            >
              <span className="w-5 text-center mr-3">{link.icon}</span> {link.text}
            </Link>
          ))}
        </nav>
        <div className="px-4 py-6 border-t border-gray-100 flex flex-col gap-3">
           <Link to="/contact" className="flex items-center px-4 py-2 text-gray-500 hover:bg-indigo-50 rounded-lg">
            <span className="w-5 text-center mr-3"><FontAwesomeIcon icon={faQuestionCircle} /></span> Help & Support
          </Link>
          <Link to="/" className="flex items-center justify-center mt-4 px-4 py-2 bg-gray-100 text-indigo-600 rounded-lg font-semibold shadow hover:bg-indigo-50 hover:text-indigo-700 transition-colors">
            ← Back to Website
          </Link>
        </div>
      </aside>
      {/* Sidebar Drawer for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          {/* Overlay */}
          <div className="fixed inset-0 bg-black bg-opacity-30" onClick={() => setSidebarOpen(false)}></div>
          {/* Sidebar */}
          <div className="relative w-64 bg-white h-full shadow-lg z-50 animate-slideInLeft">
            <button
              className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-indigo-600"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="p-6 text-2xl font-bold text-indigo-600 border-b border-gray-100">
              <Link to="/dashboard" onClick={() => setSidebarOpen(false)}>GlobalVoice AI</Link>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-2">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center px-4 py-2 rounded-lg transition-all font-medium text-gray-600 hover:bg-indigo-50 hover:text-indigo-700 ${location.pathname.startsWith(link.to) ? 'bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow' : ''}`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="w-5 text-center mr-3">{link.icon}</span> {link.text}
                </Link>
              ))}
            </nav>
            <div className="px-4 py-6 border-t border-gray-100 flex flex-col gap-3">
              <Link to="/contact" className="flex items-center px-4 py-2 text-gray-500 hover:bg-indigo-50 rounded-lg" onClick={() => setSidebarOpen(false)}>
                <span className="w-5 text-center mr-3"><FontAwesomeIcon icon={faQuestionCircle} /></span> Help & Support
              </Link>
              <Link to="/" className="flex items-center justify-center mt-4 px-4 py-2 bg-gray-100 text-indigo-600 rounded-lg font-semibold shadow hover:bg-indigo-50 hover:text-indigo-700 transition-colors" onClick={() => setSidebarOpen(false)}>
                ← Back to Website
              </Link>
            </div>
          </div>
        </div>
      )}
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between p-6 bg-white border-b border-gray-100 shadow-sm">
          {/* Hamburger for mobile (left) */}
          <button
            className="md:hidden flex items-center px-2 py-1 text-2xl text-indigo-600 focus:outline-none"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          {/* Right section: actions and user info */}
          <div className="flex items-center space-x-6 ml-auto">
            <button
              onClick={() => navigate('/new-project')} 
              className="px-5 py-2 text-white bg-gradient-to-r from-indigo-500 to-violet-600 rounded-lg shadow hover:from-violet-600 hover:to-indigo-500 transition-colors flex items-center font-semibold"
            >
              <FontAwesomeIcon icon={faPlus} className="w-4 h-4 mr-2" /> New Project
            </button>
            <Link to="/settings">
              {user && user.profilePicture ? (
                <img src={user.profilePicture} alt="avatar" className="w-9 h-9 rounded-full border-2 border-indigo-500 object-cover" />
              ) : (
                <FontAwesomeIcon icon={faUserCircle} className="w-9 h-9 text-indigo-400 bg-white rounded-full border-2 border-indigo-200" />
              )}
            </Link>
            {user && (
              <span className="text-gray-700 font-semibold">{user.userName || user.email}</span>
            )}
            <button onClick={handleLogout} className="border border-gray-300 text-gray-500 px-4 py-2 rounded hover:bg-gray-100 hover:text-indigo-600 transition">Logout</button>
          </div>
        </header>
        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout; 