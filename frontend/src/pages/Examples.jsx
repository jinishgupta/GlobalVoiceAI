import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faBookOpen, faBullhorn, faBriefcase, faPodcast } from '@fortawesome/free-solid-svg-icons';

const industryIcons = {
  'E-Learning': <FontAwesomeIcon icon={faBookOpen} className="w-8 h-8" />,
  'Marketing': <FontAwesomeIcon icon={faBullhorn} className="w-8 h-8" />,
  'Corporate': <FontAwesomeIcon icon={faBriefcase} className="w-8 h-8" />,
  'Media': <FontAwesomeIcon icon={faPodcast} className="w-8 h-8" />,
};

const samples = [
  {
    title: 'E-Learning Module: Global Onboarding',
    industry: 'E-Learning',
    desc: 'An employee onboarding course localized into three languages using our "Aria" and "Sofia" voices to maintain a consistent, welcoming tone.',
    imageUrl: 'https://images.unsplash.com/photo-1542744095-291d1f67b221?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    title: 'Product Launch Ad Campaign',
    industry: 'Marketing',
    desc: 'A high-energy video ad for a new tech gadget, dubbed into Japanese and German with our "Kenji" and "Leo" voices for maximum impact.',
    imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
  },
  {
    title: 'Internal Corporate Training',
    industry: 'Corporate',
    desc: 'A mandatory compliance training module for a multinational corporation, made accessible to teams in Brazil and India using our platform.',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    title: 'Podcast Expansion Project',
    industry: 'Media',
    desc: 'An English-language true crime podcast dubbed into Spanish to reach the fast-growing Latin American listener market.',
    imageUrl: 'https://images.unsplash.com/photo-1590602847923-44d039755b44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
];

const caseStudies = [
  {
    quote: 'With GlobalVoice AI, we launched our online courses in four new languages in just a matter of days. The process was seamless, affordable, and the quality was outstanding.',
    name: 'Maria Gonzalez',
    title: 'CEO, LearnX',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    quote: 'Our marketing team can now create authentic, localized ad campaigns for every target region without the logistical nightmare of hiring local voice actors. It\'s been a complete game-changer for our global strategy.',
    name: 'James Lee',
    title: 'CMO, AdVantage Global',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
];

const examples = [
  {
    title: 'E-Learning Course Localization',
    category: 'Education',
    description: 'An engaging e-learning module about renewable energy, originally in English, has been seamlessly translated and dubbed into Spanish and Mandarin. The AI voice maintains a professional and educational tone, making complex topics accessible to a global audience.',
    imageUrl: 'https://picsum.photos/seed/example1/800/600',
    tags: ['E-Learning', 'Spanish', 'Mandarin', 'Voice Cloning'],
  },
  {
    title: 'Marketing Video for a Global Brand',
    category: 'Marketing',
    description: 'This promotional video for a new tech gadget was adapted for the French and Japanese markets. GlobalVoice AI not only translated the script but also adjusted the timing to match on-screen graphics and action, using a high-energy, persuasive voice style.',
    imageUrl: 'https://picsum.photos/seed/example2/800/600',
    tags: ['Advertising', 'French', 'Japanese', 'Video Dubbing'],
  },
  {
    title: 'Corporate Training Video Translation',
    category: 'Corporate',
    description: 'A mandatory compliance training video was localized for a multinational corporation\'s offices in Germany and Brazil. The AI-generated voiceover is clear, authoritative, and perfectly synchronized, ensuring a consistent training experience for all employees.',
    imageUrl: 'https://picsum.photos/seed/example3/800/600',
    tags: ['Training', 'German', 'Portuguese', 'Synchronization'],
  },
  {
    title: 'Indie Game Character Dialogue',
    category: 'Entertainment',
    description: 'We generated unique and emotive voices for five different characters in an independent RPG, translating the dialogue from English to Korean. Each character has a distinct personality, bringing the game\'s story to life for a new market.',
    imageUrl: 'https://picsum.photos/seed/example4/800/600',
    tags: ['Gaming', 'Korean', 'Multi-Voice', 'Creative'],
  }
]

function Examples() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="text-center py-20 px-4 bg-gray-50">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4">
          See What's Possible
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          From global marketing campaigns to internal training modules, discover how creators and businesses are using GlobalVoice AI to speak to the world.
        </p>
      </div>

      {/* Samples Showcase */}
      <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-16 text-center">Our Work in Action</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {samples.map((sample) => (
            <div key={sample.title} className="rounded-2xl shadow-lg overflow-hidden group">
              <div className="relative">
                <img className="h-64 w-full object-cover" src={sample.imageUrl} alt={sample.title} />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <button className="w-24 h-24 rounded-full bg-vibrant-blue text-white flex items-center justify-center opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                    <FontAwesomeIcon icon={faPlay} className="w-10 h-10 ml-1" />
                  </button>
                </div>
              </div>
              <div className="p-8 bg-white">
                <div className="flex items-center gap-4 mb-4">
                   <div className="w-16 h-16 bg-vibrant-blue/10 text-vibrant-blue rounded-lg flex items-center justify-center">
                    {industryIcons[sample.industry]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-vibrant-blue">{sample.industry}</p>
                    <h3 className="text-2xl font-bold text-gray-900">{sample.title}</h3>
                  </div>
                </div>
                <p className="text-gray-600">{sample.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Case Studies Section */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-16 text-center">Loved by Leading Brands</h2>
          <div className="space-y-16">
            {caseStudies.map((study) => (
              <div key={study.name} className="text-center">
                <img className="w-24 h-24 mx-auto rounded-full shadow-lg mb-4" src={study.imageUrl} alt={study.name} />
                <blockquote className="text-2xl text-gray-800 italic leading-relaxed">
                  <p>&ldquo;{study.quote}&rdquo;</p>
                </blockquote>
                <figcaption className="mt-6">
                  <div className="font-bold text-gray-900 text-xl">{study.name}</div>
                  <div className="text-gray-600">{study.title}</div>
                </figcaption>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Examples; 