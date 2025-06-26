import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Home() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const navigate = useNavigate();

  const handleStart = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/signup');
    }
  };

  return (
    <div className="bg-gradient-to-b from-primary/10 via-base-bg-alt to-secondary/10 min-h-[80vh] flex flex-col items-center justify-center">
      {/* Hero Section */}
      <section className="w-full py-20 px-4 flex flex-col items-center bg-gradient-to-r from-primary/10 via-base-bg to-secondary/10">
        <div className="max-w-3xl text-center">
          <div className="flex justify-center mb-6">
            {/* Logo with subtle global/wave icon */}
            <span className="text-4xl font-extrabold text-primary tracking-tight flex items-center gap-2">
              <svg width="36" height="36" fill="currentColor" viewBox="0 0 36 36" className="inline-block text-primary"><circle cx="18" cy="18" r="18" fill="currentColor" opacity="0.1"/><path d="M10 18c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M10 18c0 4.418 3.582 8 8 8s8-3.582 8-8" stroke="#f97316" strokeWidth="2" strokeLinecap="round"/></svg>
              GlobalVoice <span className="text-secondary">AI</span>
            </span>
          </div>
          <h1 className="text-5xl font-extrabold text-text-main mb-4 leading-tight">
            Go Global, Sound Native.<br />
            <span className="text-primary">AI-Powered Multilingual Content Localization.</span>
          </h1>
          <p className="text-xl text-text-muted mb-8">
            Effortlessly translate, dub, and localize your videos and audio with cutting-edge AI. Maintain your brand voice across every language and market.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <button onClick={handleStart} className="bg-primary text-white px-8 py-3 rounded-lg font-semibold text-lg shadow-lg hover:bg-primary/90 transition">Start Localizing Now</button>
            <button className="border-2 border-primary text-primary px-8 py-3 rounded-lg font-semibold text-lg hover:bg-primary hover:text-white transition">Watch Demo</button>
          </div>
          {/* Animated process illustration placeholder */}
          <div className="w-full h-56 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center text-text-muted text-xl shadow-inner mb-4">
            <span className="flex gap-4 items-center">
              <span className="flex flex-col items-center">
                <span className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold mb-2">1</span>
                <span className="text-text-main font-semibold">Upload</span>
              </span>
              <span className="text-3xl text-primary">→</span>
              <span className="flex flex-col items-center">
                <span className="bg-secondary text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold mb-2">2</span>
                <span className="text-text-main font-semibold">Localize</span>
              </span>
              <span className="text-3xl text-secondary">→</span>
              <span className="flex flex-col items-center">
                <span className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold mb-2">3</span>
                <span className="text-text-main font-semibold">Export</span>
              </span>
            </span>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full max-w-5xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-text-main text-center mb-10">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <div className="bg-primary/10 text-primary rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path d="M4 17V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10" stroke="#008080" strokeWidth="2"/><rect x="8" y="11" width="8" height="6" rx="1" fill="#008080" opacity="0.2"/></svg>
            </div>
            <h3 className="font-semibold text-lg text-text-main mb-2">Upload</h3>
            <p className="text-text-muted text-center">Add your video, audio, or script. We support all major formats.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-secondary/10 text-secondary rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" stroke="#FF7F50" strokeWidth="2"/></svg>
            </div>
            <h3 className="font-semibold text-lg text-text-main mb-2">Localize</h3>
            <p className="text-text-muted text-center">AI translates, dubs, and syncs your content in 20+ languages with natural, native voices.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-primary/10 text-primary rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" stroke="#008080" strokeWidth="2"/></svg>
            </div>
            <h3 className="font-semibold text-lg text-text-main mb-2">Export</h3>
            <p className="text-text-muted text-center">Download your localized media in your preferred format—video, audio, or subtitles.</p>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="w-full max-w-5xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-text-main text-center mb-10">Why Choose GlobalVoice AI?</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center">
            <div className="bg-primary/10 text-primary rounded-full w-14 h-14 flex items-center justify-center mb-4">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M12 21C7.029 21 3 16.971 3 12S7.029 3 12 3s9 4.029 9 9-4.029 9-9 9Z" stroke="#008080" strokeWidth="2"/><path d="M12 7v5l3 3" stroke="#008080" strokeWidth="2"/></svg>
            </div>
            <h4 className="font-semibold text-lg text-text-main mb-2">Time-Saving</h4>
            <p className="text-text-muted text-center">Automate hours of manual translation and dubbing in minutes.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-secondary/10 text-secondary rounded-full w-14 h-14 flex items-center justify-center mb-4">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M4 17V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10" stroke="#FF7F50" strokeWidth="2"/><path d="M8 11h8v6H8z" fill="#FF7F50" opacity="0.2"/></svg>
            </div>
            <h4 className="font-semibold text-lg text-text-main mb-2">Cost-Effective</h4>
            <p className="text-text-muted text-center">Reduce localization costs by up to 80% compared to traditional agencies.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-primary/10 text-primary rounded-full w-14 h-14 flex items-center justify-center mb-4">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M12 3v18M3 12h18" stroke="#008080" strokeWidth="2"/></svg>
            </div>
            <h4 className="font-semibold text-lg text-text-main mb-2">Global Reach</h4>
            <p className="text-text-muted text-center">Expand your audience with support for 20+ languages and dialects.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-secondary/10 text-secondary rounded-full w-14 h-14 flex items-center justify-center mb-4">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M12 3v18M3 12h18" stroke="#FF7F50" strokeWidth="2"/><circle cx="12" cy="12" r="6" stroke="#FF7F50" strokeWidth="2"/></svg>
            </div>
            <h4 className="font-semibold text-lg text-text-main mb-2">Brand Consistency</h4>
            <p className="text-text-muted text-center">Keep your brand voice and message consistent in every language.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full max-w-5xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-text-main text-center mb-10">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center border-t-4 border-primary">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Client" className="w-16 h-16 rounded-full mb-4 border-2 border-primary" />
            <p className="text-text-muted text-center mb-4">“GlobalVoice AI helped us launch our e-learning courses in 5 new markets in weeks, not months. The voice quality is incredible!”</p>
            <span className="font-semibold text-text-main">Carlos Mendez</span>
            <span className="text-xs text-text-muted">Head of Learning, EduPro</span>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center border-t-4 border-secondary">
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Client" className="w-16 h-16 rounded-full mb-4 border-2 border-secondary" />
            <p className="text-text-muted text-center mb-4">“We saved thousands on localization for our marketing videos. The AI voices sound so real, our customers can't tell the difference!”</p>
            <span className="font-semibold text-text-main">Sophie Dubois</span>
            <span className="text-xs text-text-muted">Marketing Director, BrightAds</span>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center border-t-4 border-primary">
            <img src="https://randomuser.me/api/portraits/men/65.jpg" alt="Client" className="w-16 h-16 rounded-full mb-4 border-2 border-primary" />
            <p className="text-text-muted text-center mb-4">“The dashboard is so intuitive. We manage all our projects and languages in one place. Highly recommended!”</p>
            <span className="font-semibold text-text-main">Akira Tanaka</span>
            <span className="text-xs text-text-muted">Product Manager, TechNova</span>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="w-full max-w-5xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-text-main text-center mb-10">Powering Global Content for Every Industry</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center">
            <div className="bg-primary/10 text-primary rounded-full w-14 h-14 flex items-center justify-center mb-4">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M4 17V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10" stroke="#008080" strokeWidth="2"/><rect x="8" y="11" width="8" height="6" rx="1" fill="#008080" opacity="0.2"/></svg>
            </div>
            <h4 className="font-semibold text-lg text-text-main mb-2">E-learning</h4>
            <p className="text-text-muted text-center">Reach students worldwide with localized courses and training modules.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-secondary/10 text-secondary rounded-full w-14 h-14 flex items-center justify-center mb-4">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M12 3v18M3 12h18" stroke="#FF7F50" strokeWidth="2"/></svg>
            </div>
            <h4 className="font-semibold text-lg text-text-main mb-2">Marketing</h4>
            <p className="text-text-muted text-center">Create multilingual ads and campaigns that resonate in every region.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-primary/10 text-primary rounded-full w-14 h-14 flex items-center justify-center mb-4">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M12 3v18M3 12h18" stroke="#008080" strokeWidth="2"/></svg>
            </div>
            <h4 className="font-semibold text-lg text-text-main mb-2">Corporate Comms</h4>
            <p className="text-text-muted text-center">Deliver consistent internal and external communications globally.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-secondary/10 text-secondary rounded-full w-14 h-14 flex items-center justify-center mb-4">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4" stroke="#FF7F50" strokeWidth="2"/></svg>
            </div>
            <h4 className="font-semibold text-lg text-text-main mb-2">Media & Entertainment</h4>
            <p className="text-text-muted text-center">Dub films, shows, and podcasts for a truly global audience.</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full py-16 px-4 bg-gradient-to-r from-primary/10 via-base-bg to-secondary/10 flex flex-col items-center">
        <h2 className="text-3xl font-bold text-text-main text-center mb-6">Ready to Transform Your Global Content Strategy?</h2>
        <button onClick={handleStart} className="bg-secondary text-white px-10 py-4 rounded-lg font-bold text-xl shadow-lg hover:bg-secondary/90 transition">Get Started Free</button>
      </section>
    </div>
  );
}

export default Home; 