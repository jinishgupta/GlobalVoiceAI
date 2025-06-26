import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

function Contact() {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <div className="relative bg-vibrant-blue text-white py-20">
        <div className="absolute inset-0">
          <img 
            className="w-full h-full object-cover opacity-30" 
            src="https://picsum.photos/seed/contact/1920/1080" 
            alt="Global connections" 
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Get in Touch</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            We're here to help with any questions you may have. Reach out and let us know how we can assist you in your global content journey.
          </p>
        </div>
      </div>

      {/* Contact Form and Info Section */}
      <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Contact Information */}
          <div className="bg-gray-50 rounded-2xl p-8 lg:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Information</h2>
            <p className="text-lg text-gray-600 mb-8">
              Fill out the form and our team will get back to you within 24 hours. For immediate assistance, please use the contact details below.
            </p>
            <div className="space-y-6">
              <div className="flex items-center">
                <FontAwesomeIcon icon={faPhone} className="w-6 h-6 text-vibrant-blue" />
                <span className="ml-4 text-lg text-gray-700">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faEnvelope} className="w-6 h-6 text-vibrant-blue" />
                <span className="ml-4 text-lg text-gray-700">support@globalvoice.ai</span>
              </div>
              <div className="flex items-start">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="w-6 h-6 text-vibrant-blue mt-1" />
                <span className="ml-4 text-lg text-gray-700">123 Innovation Drive, Tech Park, San Francisco, CA 94105, USA</span>
              </div>
            </div>
            {/* Image placeholder for a map */}
            <div className="mt-10 h-64 bg-gray-200 rounded-lg">
               <img 
                src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1631&q=80"
                alt="Map"
                className="w-full h-full object-cover rounded-lg"
               />
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 lg:p-12 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Send us a Message</h2>
            <form action="#" method="POST" className="space-y-6">
              <div>
                <label htmlFor="full-name" className="sr-only">Full Name</label>
                <input
                  type="text"
                  name="full-name"
                  id="full-name"
                  autoComplete="name"
                  className="block w-full px-4 py-3 rounded-md bg-gray-100 border-gray-200 focus:outline-none focus:ring-2 focus:ring-vibrant-blue"
                  placeholder="Full Name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  className="block w-full px-4 py-3 rounded-md bg-gray-100 border-gray-200 focus:outline-none focus:ring-2 focus:ring-vibrant-blue"
                  placeholder="Email Address"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone-number" className="sr-only">Phone Number</label>
                <input
                  type="text"
                  name="phone-number"
                  id="phone-number"
                  autoComplete="tel"
                  className="block w-full px-4 py-3 rounded-md bg-gray-100 border-gray-200 focus:outline-none focus:ring-2 focus:ring-vibrant-blue"
                  placeholder="Phone Number (Optional)"
                />
              </div>
              <div>
                <label htmlFor="message" className="sr-only">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  className="block w-full px-4 py-3 rounded-md bg-gray-100 border-gray-200 focus:outline-none focus:ring-2 focus:ring-vibrant-blue"
                  placeholder="Your Message"
                  required
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-vibrant-blue hover:bg-vibrant-orange focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vibrant-blue transition-colors"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact; 