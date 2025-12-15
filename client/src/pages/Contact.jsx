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
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '💬',
      title: 'Live Chat',
      details: 'Available 24/7',
      description: 'Chat with our support team',
      action: '#chat',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: '📞',
      title: 'Call Us',
      details: '+1 (555) 123-4567',
      description: 'Mon-Fri, 9AM-6PM EST',
      action: 'tel:+15551234567',
      color: 'from-violet-500 to-purple-500'
    },
    {
      icon: '📍',
      title: 'Visit Us',
      details: '123 Book Street, NY',
      description: 'Come say hello in person',
      action: 'https://maps.google.com',
      color: 'from-amber-500 to-orange-500'
    },
  ];

  const faqs = [
    {
      question: 'How long does it take to get a response?',
      answer: 'We typically respond within 4 hours during business hours. For urgent matters, use our live chat feature.'
    },
    {
      question: 'Can I suggest a book to add to the platform?',
      answer: 'Absolutely! We love book suggestions from our community. Use the "Book Suggestion" category when contacting us.'
    },
    {
      question: 'Do you have a partnership program?',
      answer: 'Yes! We work with publishers, authors, and book clubs. Select "Partnership Inquiry" in the form below.'
    },
    {
      question: 'How can I report inappropriate content?',
      answer: 'Please use the "Report Content" category and include specific details. We review all reports within 24 hours.'
    },
  ];

  const categories = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'support', label: 'Technical Support' },
    { value: 'suggestion', label: 'Book Suggestion' },
    { value: 'partnership', label: 'Partnership Inquiry' },
    { value: 'report', label: 'Report Content' },
    { value: 'feedback', label: 'Product Feedback' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '', category: 'general' });
    }, 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50 py-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%239C92AC&quot; fill-opacity=&quot;0.05&quot;%3E%3Cpath d=&quot;M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl mb-8 shadow-xl animate-bounce-gentle">
              <span className="text-white text-2xl">💬</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-700 bg-clip-text text-transparent">
                Get in Touch
              </span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed max-w-3xl mx-auto">
              Have questions, suggestions, or just want to talk books? We're here to help!
              Our team is dedicated to making your reading experience exceptional.
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="text-white">✨</span>
              We're Here to Help
            </div>
          </div>
        </div>
      </div>

      {/* Contact Methods Grid */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Contact Methods</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Choose the most convenient way to reach out to our team
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactMethods.map((method, index) => (
                <a
                  key={method.title}
                  href={method.action}
                  className="group relative bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`absolute top-4 right-4 w-12 h-12 bg-gradient-to-br ${method.color} rounded-xl opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
                  
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${method.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white text-2xl">{method.icon}</div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-800">
                    {method.title}
                  </h3>
                  <p className="text-gray-600 mb-1">{method.details}</p>
                  <p className="text-sm text-gray-500">{method.description}</p>
                  
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <span className="inline-flex items-center gap-2 text-blue-600 font-medium group-hover:text-blue-700">
                      Get in touch
                      <span className="group-hover:translate-x-1 transition-transform inline-block">📤</span>
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 border border-gray-100">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl">
                      <span className="text-white">📤</span>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">Send a Message</h2>
                    <p className="text-gray-600">We'll get back to you as soon as possible</p>
                  </div>
                </div>

                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full mb-6 animate-bounce-gentle">
                       <span className="text-white text-2xl">✅</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Message Sent Successfully!</h3>
                    <p className="text-gray-600 mb-6">Thank you for reaching out. We'll respond within 4 hours.</p>
                    <div className="inline-flex items-center gap-2 text-emerald-600 font-semibold">
                       <span className="animate-pulse">⏰</span>
                      You'll hear from us soon!
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          <div className="flex items-center gap-2">
                            <span>👤</span>
                            Your Name
                          </div>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                          placeholder="John Doe"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          <div className="flex items-center gap-2">
                            <span>✉️</span>
                            Email Address
                          </div>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Category</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white appearance-none"
                      >
                        {categories.map(category => (
                          <option key={category.value} value={category.value}>
                            {category.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Subject</label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                        placeholder="How can we help you?"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="6"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white resize-none"
                        placeholder="Tell us more about your inquiry..."
                      />
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="w-5 h-5 text-blue-500 inline-block">🛡️</span>
                      <span>Your information is secure and will never be shared with third parties.</span>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Sending Message...
                        </>
                      ) : (
                        <>
                          Send Message
                          <span className="inline-block">📤</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* FAQ & Info */}
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 border border-blue-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
                  <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <div 
                        key={faq.question}
                        className="bg-white rounded-2xl p-5 hover:shadow-md transition-shadow duration-300"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-start gap-3">
                          <div className="p-1 bg-blue-100 rounded-lg mt-1">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          </div>
                          {faq.question}
                        </h4>
                        <p className="text-gray-600 text-sm pl-8">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
                      <span className="text-white">🌍</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Global Support</h3>
                      <p className="text-gray-600">We're here for readers worldwide</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <span className="text-gray-700">Response Time</span>
                      <span className="font-semibold text-blue-600">Within 4 hours</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <span className="text-gray-700">Languages</span>
                      <span className="font-semibold text-blue-600">English, Spanish, French</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <span className="text-gray-700">Availability</span>
                      <span className="font-semibold text-blue-600">24/7 via Live Chat</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 border border-amber-100">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl">
                      <span className="text-white">⏰</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Business Hours</h3>
                      <p className="text-gray-600">When you can reach our team</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[
                      { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM EST' },
                      { day: 'Saturday', hours: '10:00 AM - 4:00 PM EST' },
                      { day: 'Sunday', hours: 'Support via email only' },
                    ].map((schedule) => (
                      <div key={schedule.day} className="flex items-center justify-between p-3">
                        <span className="text-gray-700 font-medium">{schedule.day}</span>
                        <span className="text-gray-900 font-semibold">{schedule.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map/Address Section */}
      <div className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
              <div className="grid lg:grid-cols-3">
                {/* Address Card */}
                <div className="p-10 bg-gradient-to-br from-blue-600 to-cyan-700 text-white">
                  <div className="mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-6">
                      <span className="text-white text-2xl">📍</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Visit Our Office</h3>
                    <p className="text-blue-100">Feel free to drop by and discuss books over coffee!</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-blue-200 mb-1">Address</p>
                      <p className="font-semibold">123 Literary Avenue</p>
                      <p className="font-semibold">New York, NY 10001</p>
                    </div>
                    <div>
                      <p className="text-sm text-blue-200 mb-1">Phone</p>
                      <p className="font-semibold">+1 (555) 123-4567</p>
                    </div>
                    <div>
                      <p className="text-sm text-blue-200 mb-1">Email</p>
                      <p className="font-semibold">contact@litlounge.com</p>
                    </div>
                  </div>
                </div>

                {/* Map Placeholder */}
                <div className="lg:col-span-2 bg-gradient-to-br from-gray-100 to-gray-200 p-10 flex items-center justify-center">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-3xl mb-6 animate-pulse">
                      <span className="text-white text-4xl">📍</span>
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-3">Interactive Map Coming Soon</h4>
                    <p className="text-gray-600 max-w-md mx-auto">
                      We're working on integrating a live map to help you find us. In the meantime, use the address provided.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-gradient-to-br from-blue-500 via-cyan-500 to-indigo-600 rounded-3xl p-12 shadow-2xl">
              <h2 className="text-4xl font-bold text-white mb-6">
                Still Have Questions?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Don't hesitate to reach out. Our team is passionate about helping readers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-white text-blue-700 font-bold rounded-full hover:bg-blue-50 transition-all duration-300 hover:scale-105 shadow-lg">
                  Start Live Chat
                </button>
                <button className="px-8 py-4 bg-transparent border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  Schedule a Call
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;