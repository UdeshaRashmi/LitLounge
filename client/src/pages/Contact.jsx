import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactMethods = [
    {
      icon: '✉️',
      title: 'Email Us',
      details: 'contact@litlounge.com',
      description: 'We typically reply within 4 hours',
      action: 'mailto:contact@litlounge.com',
      color: 'from-amber-400 to-orange-400'
    },
    {
      icon: '💬',
      title: 'Live Chat',
      details: 'Available 24/7',
      description: 'Chat with our support team',
      action: '#chat',
      color: 'from-emerald-400 to-teal-400'
    },
    {
      icon: '📞',
      title: 'Call Us',
      details: '+1 (555) 123-4567',
      description: 'Mon-Fri, 9AM-6PM EST',
      action: 'tel:+15551234567',
      color: 'from-rose-400 to-pink-400'
    },
    {
      icon: '📍',
      title: 'Visit Us',
      details: '123 Book Street, NY',
      description: 'Come say hello in person',
      action: 'https://maps.google.com',
      color: 'from-blue-400 to-cyan-400'
    },
  ];

  const faqs = [
    {
      question: 'How long does it take to get a response?',
      answer: 'We typically respond within 4 hours during business hours. For urgent matters, use our live chat feature.',
      icon: '⏰'
    },
    {
      question: 'Can I suggest a book to add to the platform?',
      answer: 'Absolutely! We love book suggestions from our community. Use the "Book Suggestion" category when contacting us.',
      icon: '📚'
    },
    {
      question: 'Do you have a partnership program?',
      answer: 'Yes! We work with publishers, authors, and book clubs. Select "Partnership Inquiry" in the form below.',
      icon: '🤝'
    },
    {
      question: 'How can I report inappropriate content?',
      answer: 'Please use the "Report Content" category and include specific details. We review all reports within 24 hours.',
      icon: '🛡️'
    },
  ];

  const categories = [
    { value: 'general', label: 'General Inquiry', icon: '💭' },
    { value: 'support', label: 'Technical Support', icon: '🔧' },
    { value: 'suggestion', label: 'Book Suggestion', icon: '📖' },
    { value: 'partnership', label: 'Partnership Inquiry', icon: '🤝' },
    { value: 'report', label: 'Report Content', icon: '⚠️' },
    { value: 'feedback', label: 'Product Feedback', icon: '💡' },
  ];

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '', category: 'general' });
    }, 3000);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      {/* Cozy floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute text-2xl opacity-5 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          >
            {['📚', '✉️', '☕', '🕯️', '💌'][Math.floor(Math.random() * 5)]}
          </div>
        ))}
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden py-16 md:py-24">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-amber-500 to-orange-500 rounded-3xl mb-6 md:mb-8 shadow-xl animate-bounce-slow">
              <span className="text-3xl md:text-4xl">💬</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6">
              <span className="bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600 bg-clip-text text-transparent">
                Let's Connect
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-6 md:mb-8 leading-relaxed max-w-3xl mx-auto px-4">
              Have questions, suggestions, or just want to talk books? We're here to help!
              Our cozy community is dedicated to making your reading experience exceptional.
            </p>
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full border-2 border-amber-200 shadow-sm">
              <span className="text-xl">☕</span>
              <span className="text-amber-700 font-semibold">Grab a coffee and chat with us</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Methods Grid */}
      <div className="py-12 md:py-16 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 md:mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">Reach Out Your Way</h2>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
                Choose the most comfortable way to connect with our friendly team
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {contactMethods.map((method, index) => (
                <a
                  key={method.title}
                  href={method.action}
                  className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-5 md:p-6 shadow-md border-2 border-amber-100 hover:border-amber-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br ${method.color} rounded-2xl mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                    <span className="text-2xl md:text-3xl">{method.icon}</span>
                  </div>
                  
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                    {method.title}
                  </h3>
                  <p className="text-gray-700 font-medium mb-1 text-sm md:text-base">{method.details}</p>
                  <p className="text-xs md:text-sm text-gray-500">{method.description}</p>
                  
                  <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-amber-100">
                    <span className="inline-flex items-center gap-2 text-amber-600 font-medium group-hover:text-amber-700 text-sm md:text-base">
                      Connect now
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-12 md:py-16 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
              {/* Contact Form */}
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 md:p-10 border-2 border-amber-100">
                <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                  <div className="p-2 md:p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl shadow-md">
                    <span className="text-xl md:text-2xl">📝</span>
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Send a Message</h2>
                    <p className="text-sm md:text-base text-gray-600">We'll get back to you soon</p>
                  </div>
                </div>

                {isSubmitted ? (
                  <div className="text-center py-8 md:py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full mb-4 md:mb-6 shadow-lg animate-bounce-slow">
                      <span className="text-2xl md:text-3xl">✅</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-3">Message Sent!</h3>
                    <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">Thank you for reaching out. We'll respond within 4 hours.</p>
                    <div className="inline-flex items-center gap-2 text-emerald-600 font-semibold">
                      <span className="animate-pulse">⏰</span>
                      You'll hear from us soon!
                    </div>
                  </div>
                ) : (
                  <div className="space-y-5 md:space-y-6">
                    <div className="grid md:grid-cols-2 gap-5 md:gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          <div className="flex items-center gap-2">
                            <span>👤</span>
                            Your Name
                          </div>
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-amber-100 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-300 bg-amber-50/30 focus:bg-white"
                          placeholder="John Doe"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          <div className="flex items-center gap-2">
                            <span>✉️</span>
                            Email Address
                          </div>
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-amber-100 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-300 bg-amber-50/30 focus:bg-white"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        <div className="flex items-center gap-2">
                          <span>📂</span>
                          Category
                        </div>
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => handleChange('category', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-amber-100 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-300 bg-amber-50/30 focus:bg-white"
                      >
                        {categories.map(category => (
                          <option key={category.value} value={category.value}>
                            {category.icon} {category.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        <div className="flex items-center gap-2">
                          <span>💭</span>
                          Subject
                        </div>
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => handleChange('subject', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-amber-100 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-300 bg-amber-50/30 focus:bg-white"
                        placeholder="How can we help you?"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        <div className="flex items-center gap-2">
                          <span>📄</span>
                          Message
                        </div>
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        rows="5"
                        className="w-full px-4 py-3 border-2 border-amber-100 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-300 bg-amber-50/30 focus:bg-white resize-none"
                        placeholder="Tell us more about your inquiry..."
                      />
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl border border-amber-100">
                      <span className="text-amber-600 text-xl mt-0.5">🔒</span>
                      <span className="text-xs md:text-sm text-gray-700">Your information is secure and will never be shared with third parties.</span>
                    </div>

                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="w-full py-3 md:py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Sending Message...
                        </>
                      ) : (
                        <>
                          Send Message
                          <span>📤</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              {/* FAQ & Info */}
              <div className="space-y-6 md:space-y-8">
                {/* FAQs */}
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-6 md:p-8 border-2 border-amber-100 shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-3xl">❓</span>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900">Quick Answers</h3>
                  </div>
                  <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <div 
                        key={index}
                        className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-5 hover:shadow-md transition-all duration-300 hover:scale-[1.01] border border-amber-100"
                      >
                        <h4 className="font-bold text-gray-900 mb-2 flex items-start gap-2 text-sm md:text-base">
                          <span className="text-lg md:text-xl">{faq.icon}</span>
                          <span className="flex-1">{faq.question}</span>
                        </h4>
                        <p className="text-gray-600 text-xs md:text-sm leading-relaxed pl-7 md:pl-8">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Support Info */}
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-lg border-2 border-amber-100">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 md:p-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl shadow-md">
                      <span className="text-xl md:text-2xl">🌍</span>
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900">Global Support</h3>
                      <p className="text-sm md:text-base text-gray-600">Here for readers worldwide</p>
                    </div>
                  </div>

                  <div className="space-y-3 md:space-y-4">
                    {[
                      { label: 'Response Time', value: 'Within 4 hours', icon: '⚡' },
                      { label: 'Languages', value: 'English, Spanish, French', icon: '🗣️' },
                      { label: 'Availability', value: '24/7 via Live Chat', icon: '🕐' },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between p-3 md:p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-100">
                        <div className="flex items-center gap-2">
                          <span className="text-lg md:text-xl">{item.icon}</span>
                          <span className="text-gray-700 font-medium text-sm md:text-base">{item.label}</span>
                        </div>
                        <span className="font-bold text-amber-600 text-xs md:text-sm text-right">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Business Hours */}
                <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-3xl p-6 md:p-8 border-2 border-rose-100 shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 md:p-3 bg-gradient-to-br from-rose-500 to-pink-500 rounded-xl shadow-md">
                      <span className="text-xl md:text-2xl">⏰</span>
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900">Business Hours</h3>
                      <p className="text-sm md:text-base text-gray-600">When we're available</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[
                      { day: 'Mon - Fri', hours: '9AM - 6PM EST' },
                      { day: 'Saturday', hours: '10AM - 4PM EST' },
                      { day: 'Sunday', hours: 'Email only' },
                    ].map((schedule) => (
                      <div key={schedule.day} className="flex items-center justify-between p-3 bg-white/60 rounded-xl">
                        <span className="text-gray-700 font-semibold text-sm md:text-base">{schedule.day}</span>
                        <span className="text-gray-900 font-bold text-xs md:text-sm">{schedule.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Office Location */}
      <div className="py-12 md:py-16 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border-2 border-amber-100">
              <div className="grid lg:grid-cols-3">
                {/* Address Card */}
                <div className="p-8 md:p-10 bg-gradient-to-br from-amber-500 to-orange-600 text-white">
                  <div className="mb-6 md:mb-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-4 md:mb-6 shadow-lg">
                      <span className="text-2xl md:text-3xl">📍</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Visit Our Office</h3>
                    <p className="text-amber-100">Drop by and discuss books over coffee!</p>
                  </div>

                  <div className="space-y-4 md:space-y-5">
                    <div className="flex items-start gap-3">
                      <span className="text-xl mt-1">🏢</span>
                      <div>
                        <p className="text-xs md:text-sm text-amber-100 mb-1">Address</p>
                        <p className="font-bold text-sm md:text-base">123 Literary Avenue</p>
                        <p className="font-bold text-sm md:text-base">New York, NY 10001</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-xl mt-1">📞</span>
                      <div>
                        <p className="text-xs md:text-sm text-amber-100 mb-1">Phone</p>
                        <p className="font-bold text-sm md:text-base">+1 (555) 123-4567</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-xl mt-1">✉️</span>
                      <div>
                        <p className="text-xs md:text-sm text-amber-100 mb-1">Email</p>
                        <p className="font-bold text-sm md:text-base">contact@litlounge.com</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map Placeholder */}
                <div className="lg:col-span-2 bg-gradient-to-br from-amber-100 to-orange-100 p-8 md:p-10 flex items-center justify-center min-h-[300px] md:min-h-0">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-amber-500 to-orange-500 rounded-3xl mb-4 md:mb-6 shadow-xl animate-bounce-slow">
                      <span className="text-3xl md:text-4xl">🗺️</span>
                    </div>
                    <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-3">Interactive Map Coming Soon</h4>
                    <p className="text-sm md:text-base text-gray-700 max-w-md mx-auto px-4">
                      We're working on integrating a live map. Use the address to find us!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-16 md:py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-amber-300">
              <div className="text-center">
                <span className="text-5xl md:text-6xl mb-4 md:mb-6 inline-block animate-float-gentle">☕📚</span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6">
                  Still Have Questions?
                </h2>
                <p className="text-lg md:text-xl text-amber-100 mb-6 md:mb-8 max-w-2xl mx-auto">
                  Don't hesitate to reach out. Our cozy team is passionate about helping readers.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="px-6 md:px-8 py-3 md:py-4 bg-white text-amber-700 font-bold rounded-full hover:bg-amber-50 transition-all duration-300 hover:scale-105 shadow-lg text-sm md:text-base">
                    💬 Start Live Chat
                  </button>
                  <button className="px-6 md:px-8 py-3 md:py-4 bg-transparent border-2 border-white/50 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300 hover:scale-105 text-sm md:text-base">
                    📞 Schedule a Call
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.05; }
          50% { transform: translateY(-20px) rotate(5deg); opacity: 0.08; }
        }
        .animate-float {
          animation: float infinite ease-in-out;
        }
        
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float-gentle {
          animation: float-gentle 3s infinite ease-in-out;
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}

export default Contact;