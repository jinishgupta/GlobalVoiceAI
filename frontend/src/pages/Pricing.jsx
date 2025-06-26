import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const pricingTiers = [
  {
    name: 'Starter',
    price: 'Free',
    price_detail: 'forever',
    features: [
      '10 minutes of voice generation per month',
      'Access to 3 core languages',
      'Standard AI voices',
      'MP3 audio downloads',
      'Community support',
    ],
    cta: 'Start for Free',
    main: false,
  },
  {
    name: 'Creator',
    price: '$29',
    price_detail: 'per month',
    features: [
      '300 minutes of voice generation per month',
      'Access to 15 languages',
      'Premium & professional AI voices',
      'High-quality WAV & MP3 downloads',
      'Commercial usage rights',
      'Priority email support',
    ],
    cta: 'Choose Creator',
    main: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    price_detail: 'for your team',
    features: [
      'Unlimited voice generation',
      'Access to all languages & voices',
      'Team collaboration features',
      'Custom voice cloning',
      'Dedicated account manager',
      'Enterprise-grade security & SSO',
    ],
    cta: 'Contact Sales',
    main: false,
  },
];

const faqs = [
  {
    q: 'Can I try GlobalVoice AI before committing?',
    a: 'Absolutely! Our Starter plan is free and gives you 10 minutes of generation time each month to explore our core features and voices.'
  },
  {
    q: 'What is "voice generation time"?',
    a: 'It\'s the total duration of audio you can create. For example, creating a 2-minute voiceover will use 2 minutes from your monthly allowance.'
  },
  {
    q: 'What happens if I need more generation time?',
    a: 'You can easily upgrade to a higher plan at any time through your dashboard to get more minutes and features instantly.'
  },
  {
    q: 'Can I use the generated audio for commercial purposes?',
    a: 'Yes, our Creator and Enterprise plans include full commercial rights, so you can use the audio in your products, marketing, and more.'
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit cards. For Enterprise plans, we also support invoicing and wire transfers.'
  },
  {
    q: 'How do I cancel my subscription?',
    a: 'You can cancel your subscription at any time from your account settings. Your plan will remain active until the end of the current billing cycle.'
  },
];

function Pricing() {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <div className="text-center py-20 px-4 bg-white">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4">
          Find the Perfect Plan
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Start for free and scale as you grow. All plans are flexible, powerful, and designed for content creators of all sizes.
        </p>
      </div>

      {/* Pricing Tiers Section */}
      <div className="py-24 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
          {pricingTiers.map((tier) => (
            <div 
              key={tier.name} 
              className={`rounded-2xl p-8 flex flex-col shadow-lg transition-transform duration-300 ${tier.main ? 'bg-vibrant-blue text-white transform lg:scale-110' : 'bg-white'}`}
            >
              <h3 className={`text-2xl font-bold ${tier.main ? 'text-white' : 'text-gray-900'}`}>{tier.name}</h3>
              <div className="mt-4 mb-6">
                <span className={`text-5xl font-extrabold ${tier.main ? 'text-white' : 'text-gray-900'}`}>{tier.price}</span>
                <span className={`text-lg ml-2 ${tier.main ? 'text-blue-200' : 'text-gray-500'}`}>{tier.price_detail}</span>
              </div>
              <ul className="space-y-4 mb-8 flex-grow">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <FontAwesomeIcon icon={faCheckCircle} className={`w-6 h-6 mr-3 mt-1 flex-shrink-0 ${tier.main ? 'text-white' : 'text-vibrant-blue'}`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button 
                className={`w-full py-3 px-6 rounded-lg font-semibold text-lg transition-transform duration-200 ${tier.main ? 'bg-white text-vibrant-blue hover:bg-gray-100' : 'bg-vibrant-blue text-white hover:bg-vibrant-orange'}`}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            {faqs.map((faq, i) => (
               <div key={i} className="border-b border-gray-200 pb-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing; 