import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AppLayout from './components/AppLayout';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from './store/authSlice';
import CheckAuth from './components/check-auth';
// Placeholder imports for pages
import Home from './pages/Home';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import Examples from './pages/Examples';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import NewProject from './pages/NewProject';
import ProjectEditor from './pages/ProjectEditor';
import Billing from './pages/Billing';
import Settings from './pages/Settings';
import Projects from './pages/Projects';
import TTSProjectEditor from './pages/TTSProjectEditor';

// Marketing pages layout
function MarketingLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1"><Outlet /></main>
      <Footer />
    </div>
  );
}

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user);
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        {/* Routes with MarketingLayout (Header and Footer) */}
        <Route element={<MarketingLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/examples" element={<Examples />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* Standalone routes with strict auth protection */}
        <Route path="/login" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <Login />
          </CheckAuth>
        } />
        <Route path="/signup" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <Signup />
          </CheckAuth>
        } />
        
        {/* App routes with strict auth protection */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <Dashboard />
            </CheckAuth>
          } />
          <Route path="/projects" element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <Projects />
            </CheckAuth>
          } />
          <Route path="/new-project" element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <NewProject />
            </CheckAuth>
          } />
          <Route path="/project-editor/:jobId" element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ProjectEditor />
            </CheckAuth>
          } />
          <Route path="/billing" element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <Billing />
            </CheckAuth>
          } />
          <Route path="/settings" element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <Settings />
            </CheckAuth>
          } />
          <Route path="/tts-project-editor/:jobId" element={<TTSProjectEditor />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
