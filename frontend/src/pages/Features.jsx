const features = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m4 0v2M3 10h12M3 15h12M3 20h12M17 3l4 4-4 4M17 11l4 4-4 4"/></svg>
    ),
    title: 'Multi-Language Translation',
    desc: 'Translate your content into 20+ languages with AI-powered accuracy and natural fluency.'
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z"/></svg>
    ),
    title: 'MultiNative Voice Technology',
    desc: 'Choose from a library of native-sounding voices for every language, ensuring brand consistency.'
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
    ),
    title: 'Automated Dubbing',
    desc: 'AI-powered dubbing with lip-sync and timing for seamless, professional results.'
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 16v-2m8-6h2m-18 0h2m14.485-6.485l1.414-1.414M4.1 19.9l1.414-1.414m12.97-1.414l1.414 1.414M5.515 5.515l-1.414-1.414M12 18a6 6 0 100-12 6 6 0 000 12z"/></svg>
    ),
    title: 'Voice Customization',
    desc: 'Adjust pitch, speed, emphasis, and pronunciation for every segment and language during TTS.'
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
    ),
    title: 'Text to Speech',
  desc: 'Convert text to natural-sounding speech with advanced AI voice synthesis.'
 },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
    ),
    title: 'Export & Integrations',
    desc: 'Export to MP4, MP3, SRT, and more. Integrate with your workflow via API.'
  },
];

function Features() {
  return (
    <div className="bg-base-bg min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-text-main mb-4">
            Unleash Global Potential with <span className="text-primary">Powerful AI Localization</span>
          </h1>
          <p className="text-xl text-text-muted">Explore the features that make GlobalVoice AI the most advanced localization platform.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((f, i) => (
            <div key={f.title} className="bg-white rounded-xl shadow-lg p-8 transform hover:-translate-y-2 transition-transform duration-300">
              <div className={`mb-4 w-16 h-16 flex items-center justify-center rounded-full ${i%2===0 ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'}`}>{f.icon}</div>
              <h3 className="font-bold text-xl text-text-main mb-2">{f.title}</h3>
              <p className="text-text-muted">{f.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-text-main mb-8">GlobalVoice AI vs. Traditional Localization</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-primary/10 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-primary mb-2">GlobalVoice AI</h3>
              <ul className="text-left space-y-2 text-text-main">
                <li className="flex items-start"><span className="text-primary mr-2">✔</span>Automated, instant results</li>
                <li className="flex items-start"><span className="text-primary mr-2">✔</span>Consistent, high-quality voices</li>
                <li className="flex items-start"><span className="text-primary mr-2">✔</span>Significant cost savings</li>
                <li className="flex items-start"><span className="text-primary mr-2">✔</span>Easy project management</li>
              </ul>
            </div>
            <div className="bg-gray-200 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Traditional Methods</h3>
              <ul className="text-left space-y-2 text-text-main">
                <li className="flex items-start"><span className="text-gray-500 mr-2">✖</span>Weeks of manual work</li>
                <li className="flex items-start"><span className="text-gray-500 mr-2">✖</span>Inconsistent voice quality</li>
                <li className="flex items-start"><span className="text-gray-500 mr-2">✖</span>High agency fees</li>
                <li className="flex items-start"><span className="text-gray-500 mr-2">✖</span>Complex coordination</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features; 