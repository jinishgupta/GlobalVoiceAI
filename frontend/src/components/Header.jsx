import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../store/authSlice';

function Header() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
              <Link to="/dashboard" className="border border-primary text-white bg-primary px-4 py-2 rounded hover:bg-secondary hover:border-secondary hover:text-white transition">Dashboard</Link>
              <button onClick={handleLogout} className="border border-secondary text-secondary px-4 py-2 rounded hover:bg-secondary hover:text-white transition">Logout</button>
            </>
          ) : (
            <Link to="/login" className="border border-primary text-primary px-4 py-2 rounded hover:bg-primary hover:text-white transition">Login</Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header; 