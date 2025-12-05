 import React from 'react';
// Assuming you have react-icons installed for the icons
// import { FaTelegram, FaLinkedinIn } from 'react-icons/fa'; 
// Since I can't add imports for you, I'll use placeholders for the icons.

const ContactSection = () => {
  return (
    <section id="contact" className="container mx-auto px-4 py-12 md:py-20 pt-10 bg-gray-50">
      
      <h1 className="text-4xl font-extrabold text-blue-900 text-center mb-4">
        Get In Touch With Us
      </h1>
      
      <p className="text-xl text-gray-600 text-center mb-12">
        We're here to help you start your learning journey.
      </p>
      
      <div className="max-w-3xl mx-auto bg-white p-8 shadow-xl rounded-xl text-center">
        
        {/* Contact Details Section */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">Support & Inquiries</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="text-left md:border-r md:pr-6">
            <p className="text-lg text-gray-700 mb-4">
              Email Support: <a href="mailto:support@nsdaportal.com" className="text-blue-900 hover:text-yellow-400 font-medium transition">support@nsdaportal.com</a>
            </p>
            
            <p className="text-lg text-gray-700">
              Phone: +1 (555) 123-4567
            </p>
          </div>

          {/* Social Media Section */}
          <div className="text-left md:pl-6">
            <p className="text-xl font-semibold text-gray-800 mb-4">Connect With Our Community</p>
            
            <div className="flex flex-col space-y-3">
              <a href="https://t.me/nsda_community" target="_blank" rel="noopener noreferrer" className="flex items-center text-lg text-blue-900 hover:text-yellow-500 transition">
                {/* Replace with <FaTelegram className="w-6 h-6 mr-2" /> */}
                <span className="w-6 h-6 mr-2">🔗</span> Telegram Channel: @nsda_community
              </a>
              
              <a href="https://www.linkedin.com/company/nsda-community/" target="_blank" rel="noopener noreferrer" className="flex items-center text-lg text-blue-900 hover:text-yellow-500 transition">
                {/* Replace with <FaLinkedinIn className="w-6 h-6 mr-2" /> */}
                <span className="w-6 h-6 mr-2">💼</span> LinkedIn: NSDA Community
              </a>

              <a href="https://t.me/NejmAskBot" target="_blank" rel="noopener noreferrer" className="flex items-center text-lg text-blue-900 hover:text-yellow-500 transition">
                {/* Replace with <FaTelegram className="w-6 h-6 mr-2" /> */}
                <span className="w-6 h-6 mr-2">🤖</span> Telegram Bot: @NejmAskBot
              </a>
            </div>
          </div>
        </div>

        {/* Call to Action for Form */}
        <button className="mt-4 bg-yellow-400 text-blue-900 font-bold px-8 py-3 text-lg rounded-xl hover:bg-yellow-500 transition shadow-md">
          Send a Message (Form Placeholder)
        </button>
      </div>
      
    </section>
  )
}

export default ContactSection;