import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faFolder, faPlus, faHeadset, faCog, faCreditCard, faQuestionCircle, faBell, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../store/authSlice';

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

  const handleLogout = () => {
    dispatch(logoutUser()).then(() => {
      navigate('/');
    });
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md hidden md:flex flex-col">
        <div className="p-6 text-2xl font-bold text-vibrant-blue border-b">
          <Link to="/dashboard">GlobalVoice AI</Link>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navLinks.map(link => (
             <Link 
              key={link.to}
              to={link.to} 
              className={`flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md ${location.pathname.startsWith(link.to) ? 'bg-gray-200 text-gray-900 font-semibold' : ''}`}
            >
              <span className="w-5 text-center mr-3">{link.icon}</span> {link.text}
            </Link>
          ))}
        </nav>
        <div className="px-4 py-6 border-t flex flex-col gap-3">
           <Link to="/contact" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
            <span className="w-5 text-center mr-3"><FontAwesomeIcon icon={faQuestionCircle} /></span> Help & Support
          </Link>
          <Link to="/" className="flex items-center justify-center mt-4 px-4 py-2 bg-vibrant-blue text-white rounded-md font-semibold shadow hover:bg-vibrant-orange transition-colors">
            ← Back to Website
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex justify-end items-center p-6 bg-white border-b">
          <div className="flex items-center space-x-6">
            <button
              onClick={() => navigate('/new-project')} 
              className="px-5 py-2 text-white bg-vibrant-blue rounded-lg shadow hover:bg-vibrant-orange transition-colors flex items-center font-semibold"
            >
              <FontAwesomeIcon icon={faPlus} className="w-4 h-4 mr-2" /> New Project
            </button>
            <FontAwesomeIcon icon={faBell} className="w-6 h-6 text-gray-500 hover:text-vibrant-blue cursor-pointer" />
            <Link to="/settings">
              <FontAwesomeIcon icon={faUserCircle} className="w-8 h-8 text-gray-500 hover:text-vibrant-blue cursor-pointer" />
            </Link>
            {user && (
              <span className="text-gray-700 font-semibold">{user.userName || user.email}</span>
            )}
            <button onClick={handleLogout} className="border border-secondary text-secondary px-4 py-2 rounded hover:bg-secondary hover:text-white transition">Logout</button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout; 