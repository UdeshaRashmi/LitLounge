 import React, { useState, useMemo, useCallback } from 'react';
 import { useTheme } from '../context/ThemeContext';
import { Send, Loader, CheckCircle, AlertCircle } from 'lucide-react';
import { capitalizeWords, isValidEmail } from '../utils/validation';

// Extract reusable components
const ContactMethodCard = ({ method }) => (
  <a
    href={method.action}
    aria-label={`Contact via ${method.title}`}
    className="group relative bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-md border-2 border-amber-100 hover:border-amber-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-amber-400"
    tabIndex={0}
  >
    <div className="relative h-32 md:h-40 overflow-hidden">
      <img 
        src={method.image} 
        alt={`Illustration for ${method.title} contact method`}
        loading="lazy"
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
      />
      <div className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-60`}></div>
    </div>
    
    <div className="p-5 md:p-6">
      <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 flex items-center gap-3">
        <span className="material-icons text-amber-600 text-lg md:text-xl" aria-hidden="true">{method.icon}</span>
        <span>{method.title}</span>
      </h3>
      <p className="text-gray-700 font-medium mb-1 text-sm md:text-base">{method.details}</p>
      <p className="text-xs md:text-sm text-gray-500">{method.description}</p>
      
      <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-amber-100">
        <span className="inline-flex items-center gap-2 text-amber-600 font-medium group-hover:text-amber-700 text-sm md:text-base">
          Connect now
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </span>
      </div>
    </div>
  </a>
);

const FAQItem = ({ faq, index }) => (
  <div 
    className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-5 hover:shadow-md transition-all duration-300 hover:scale-[1.01] border border-amber-100"
    tabIndex={0}
    aria-label={`FAQ: ${faq.question}`}
  >
    <h4 className="font-bold text-gray-900 mb-2 flex items-start gap-2 text-sm md:text-base">
      <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
        <img 
          src={faq.image} 
          alt={`Visual for ${faq.question}`}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>
      <span className="flex-1">{faq.question}</span>
    </h4>
    <p className="text-gray-600 text-xs md:text-sm leading-relaxed pl-10">{faq.answer}</p>
  </div>
);

const InfoItem = ({ item }) => (
  <div className="flex items-center justify-between p-3 md:p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-100">
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-lg overflow-hidden">
        <img 
          src={item.image} 
          alt={item.label}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>
      <span className="text-gray-700 font-medium text-sm md:text-base">{item.label}</span>
    </div>
    <span className="font-bold text-amber-600 text-xs md:text-sm text-right">{item.value}</span>
  </div>
);

const ScheduleItem = ({ schedule }) => (
  <div className="flex items-center justify-between p-3 bg-white/60 rounded-xl">
    <span className="text-gray-700 font-semibold text-sm md:text-base">{schedule.day}</span>
    <span className="text-gray-900 font-bold text-xs md:text-sm">{schedule.hours}</span>
  </div>
);

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
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');

  // Memoize static data arrays
  const contactMethods = useMemo(() => [
    {
      image: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=400&q=80',
      icon: 'email',
      title: 'Email Us',
      details: 'contact@litlounge.com',
      description: 'We typically reply within 4 hours',
      action: 'mailto:contact@litlounge.com',
      color: 'from-amber-400 to-orange-400'
    },
    {
      image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=400&q=80',
      icon: 'chat',
      title: 'Live Chat',
      details: 'Available 24/7',
      description: 'Chat with our support team',
      action: '#chat',
      color: 'from-emerald-400 to-teal-400'
    },
    {
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80',
      icon: 'call',
      title: 'Call Us',
      details: '+1 (555) 123-4567',
      description: 'Mon-Fri, 9AM-6PM EST',
      action: 'tel:+15551234567',
      color: 'from-rose-400 to-pink-400'
    },
    {
      image: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=400&q=80',
      icon: 'place',
      title: 'Visit Us',
      details: '123 Book Street, NY',
      description: 'Come say hello in person',
      action: 'https://maps.google.com',
      color: 'from-blue-400 to-cyan-400'
    },
  ], []);

  const faqs = useMemo(() => [
    {
      question: 'How long does it take to get a response?',
      answer: 'We typically respond within 4 hours during business hours. For urgent matters, use our live chat feature.',
      image: 'https://images.unsplash.com/photo-1501139083538-0139583c060f?w=200&q=80'
    },
    {
      question: 'Can I suggest a book to add to the platform?',
      answer: 'Absolutely! We love book suggestions from our community. Use the "Book Suggestion" category when contacting us.',
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&q=80'
    },
    {
      question: 'Do you have a partnership program?',
      answer: 'Yes! We work with publishers, authors, and book clubs. Select "Partnership Inquiry" in the form below.',
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=200&q=80'
    },
    {
      question: 'How can I report inappropriate content?',
      answer: 'Please use the "Report Content" category and include specific details. We review all reports within 24 hours.',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=200&q=80'
    },
  ], []);

  const categories = useMemo(() => [
    { value: 'general', label: 'General Inquiry' },
    { value: 'support', label: 'Technical Support' },
    { value: 'suggestion', label: 'Book Suggestion' },
    { value: 'partnership', label: 'Partnership Inquiry' },
    { value: 'report', label: 'Report Content' },
    { value: 'feedback', label: 'Product Feedback' },
  ], []);

  const infoItems = useMemo(() => [
    { label: 'Response Time', value: 'Within 4 hours', image: 'https://images.unsplash.com/photo-1501139083538-0139583c060f?w=100&q=80' },
    { label: 'Languages', value: 'English, Spanish, French', image: 'https://images.unsplash.com/photo-1523301343968-6a6ebf63c672?w=100&q=80' },
    { label: 'Availability', value: '24/7 via Live Chat', image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=100&q=80' },
  ], []);

  const businessHours = useMemo(() => [
    { day: 'Mon - Fri', hours: '9AM - 6PM EST' },
    { day: 'Saturday', hours: '10AM - 4PM EST' },
    { day: 'Sunday', hours: 'Email only' },
  ], []);

  // Validation function
  const validateForm = useCallback(() => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // Real form submission function
  const handleSubmit = useCallback(async () => {
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Save form data to localStorage before submission
      localStorage.setItem('contactFormDraft', JSON.stringify(formData));
      
      // Simulate API call - replace with actual API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-CSRF-Token': 'your-csrf-token-here' // In real app, get from meta tag
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        setIsSubmitted(true);
        // Clear localStorage on successful submission
        localStorage.removeItem('contactFormDraft');
        // Reset form
        setFormData({ name: '', email: '', subject: '', message: '', category: 'general' });
        setErrors({});
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError(error.message || 'Failed to send message. Please try again.');
      
      // Show error for 5 seconds
      setTimeout(() => {
        setSubmitError('');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm]);

  const handleChange = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  }, [errors]);

  const handleNameBlur = useCallback(() => {
    setFormData(prev => ({ ...prev, name: capitalizeWords(prev.name || '') }));
  }, []);

  const handleSubjectBlur = useCallback(() => {
    setFormData(prev => ({ ...prev, subject: capitalizeWords(prev.subject || '') }));
  }, []);

  // Load saved form data from localStorage on mount
  React.useEffect(() => {
    const savedData = localStorage.getItem('contactFormDraft');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
      } catch (e) {
        console.error('Error loading saved form data:', e);
      }
    }
  }, []);

  // Auto-save form data when it changes
  React.useEffect(() => {
    const hasData = formData.name || formData.email || formData.subject || formData.message;
    if (hasData) {
      const saveTimer = setTimeout(() => {
        localStorage.setItem('contactFormDraft', JSON.stringify(formData));
      }, 1000);
      
      return () => clearTimeout(saveTimer);
    }
  }, [formData]);

  // Handle Enter key press in form
  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit();
    }
  }, [handleSubmit]);

  const { theme } = useTheme();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden py-16 md:py-24">
        {/* Hero Background Image (full-cover background with overlay) */}
        <div
          className="absolute inset-0 z-0 bg-fixed bg-center bg-cover"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1600&q=80')" }}
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50/80 via-orange-50/80 to-rose-50/80"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-28 h-28 md:w-32 md:h-32 rounded-3xl mb-6 md:mb-8 shadow-2xl overflow-hidden animate-bounce-slow border-4 border-white">
              <img
                src="data:image/jpeg;base64,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"
                alt="Contact small"
                loading="eager"
                className="w-full h-full object-cover"
              />
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
              <div className="w-6 h-6 rounded-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=100&q=80" 
                  alt="Coffee cup" 
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
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
                <ContactMethodCard key={method.title} method={method} />
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
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl shadow-md overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=200&q=80" 
                      alt="Person writing" 
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Send a Message</h2>
                    <p className="text-sm md:text-base text-gray-600">We'll get back to you soon</p>
                  </div>
                </div>

                {isSubmitted ? (
                  <div className="text-center py-8 md:py-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full mb-4 md:mb-6 shadow-lg overflow-hidden animate-bounce-slow border-4 border-emerald-200">
                      <img 
                        src="https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?w=200&q=80" 
                        alt="Success celebration" 
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-emerald-500/40"></div>
                      <CheckCircle className="absolute w-12 h-12 text-white z-10" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-3">Message Sent!</h3>
                    <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">Thank you for reaching out. We'll respond within 4 hours.</p>
                    <div className="inline-flex items-center gap-2 text-emerald-600 font-semibold">
                      <div className="w-6 h-6 rounded-full overflow-hidden animate-pulse">
                        <img 
                          src="https://images.unsplash.com/photo-1501139083538-0139583c060f?w=100&q=80" 
                          alt="Clock icon" 
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      You'll hear from us soon!
                    </div>
                  </div>
                ) : (
                  <div className="space-y-5 md:space-y-6" onKeyDown={handleKeyPress}>
                    <div className="grid md:grid-cols-2 gap-5 md:gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full overflow-hidden">
                              <img 
                                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80" 
                                alt="User icon" 
                                loading="lazy"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            Your Name *
                          </div>
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          onBlur={handleNameBlur}
                          className={`w-full px-4 py-3 border-2 ${errors.name ? 'border-red-300' : 'border-amber-100'} rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-300 bg-amber-50/30 focus:bg-white`}
                          placeholder="John Doe"
                          aria-required="true"
                          aria-invalid={!!errors.name}
                          aria-describedby={errors.name ? 'name-error' : undefined}
                        />
                        {errors.name && (
                          <p id="name-error" className="text-red-500 text-xs flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full overflow-hidden">
                              <img 
                                src="https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=100&q=80" 
                                alt="Email icon" 
                                loading="lazy"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            Email Address *
                          </div>
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          className={`w-full px-4 py-3 border-2 ${errors.email ? 'border-red-300' : 'border-amber-100'} rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-300 bg-amber-50/30 focus:bg-white`}
                          placeholder="john@example.com"
                          aria-required="true"
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? 'email-error' : undefined}
                        />
                        {errors.email && (
                          <p id="email-error" className="text-red-500 text-xs flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full overflow-hidden">
                            <img 
                              src="https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=100&q=80" 
                              alt="Category icon" 
                              loading="lazy"
                              className="w-full h-full object-cover"
                            />
                          </div>
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
                            {category.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full overflow-hidden">
                            <img 
                              src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=100&q=80" 
                              alt="Subject icon" 
                              loading="lazy"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          Subject
                        </div>
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => handleChange('subject', e.target.value)}
                        onBlur={handleSubjectBlur}
                        className="w-full px-4 py-3 border-2 border-amber-100 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-300 bg-amber-50/30 focus:bg-white"
                        placeholder="How can we help you?"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full overflow-hidden">
                            <img 
                              src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=100&q=80" 
                              alt="Message icon" 
                              loading="lazy"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          Message *
                        </div>
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        rows="5"
                        className={`w-full px-4 py-3 border-2 ${errors.message ? 'border-red-300' : 'border-amber-100'} rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-300 bg-amber-50/30 focus:bg-white resize-none`}
                        placeholder="Tell us more about your inquiry..."
                        aria-required="true"
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? 'message-error' : undefined}
                      />
                      {errors.message && (
                        <p id="message-error" className="text-red-500 text-xs flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.message}
                        </p>
                      )}
                      <div className="text-xs text-gray-500 text-right">
                        {formData.message.length}/1000 characters
                      </div>
                    </div>

                    {/* File Upload Section (Optional) */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full overflow-hidden">
                            <img 
                              src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=100&q=80" 
                              alt="Attachment icon" 
                              loading="lazy"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          Attachments (Optional)
                        </div>
                      </label>
                      <div className="border-2 border-dashed border-amber-100 rounded-xl p-4 text-center">
                        <input
                          type="file"
                          className="hidden"
                          id="file-upload"
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          multiple
                        />
                        <label
                          htmlFor="file-upload"
                          className="cursor-pointer inline-flex items-center gap-2 text-amber-600 hover:text-amber-700"
                        >
                          <span className="text-sm">Click to upload or drag and drop</span>
                        </label>
                        <p className="text-xs text-gray-500 mt-2">
                          PDF, DOC, JPG, PNG up to 10MB each
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl border border-amber-100">
                      <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 mt-0.5">
                        <img 
                          src="https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=100&q=80" 
                          alt="Security shield" 
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-xs md:text-sm text-gray-700">Your information is secure and will never be shared with third parties.</span>
                    </div>

                    {submitError && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                        <p className="text-red-600 text-sm flex items-center gap-2">
                          <AlertCircle className="w-4 h-4" />
                          {submitError}
                        </p>
                      </div>
                    )}

                    <button
                      onClick={handleSubmit}
                      onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                      disabled={isSubmitting}
                      aria-label={isSubmitting ? "Sending message..." : "Send message"}
                      className="w-full py-3 md:py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader className="w-5 h-5 animate-spin" />
                          Sending Message...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </button>

                    <p className="text-xs text-gray-500 text-center">
                      Press Ctrl+Enter to submit
                    </p>
                  </div>
                )}
              </div>

              {/* FAQ & Info */}
              <div className="space-y-6 md:space-y-8">
                {/* FAQs */}
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-6 md:p-8 border-2 border-amber-100 shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=100&q=80" 
                        alt="FAQ icon" 
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900">Quick Answers</h3>
                  </div>
                  <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <FAQItem key={index} faq={faq} index={index} />
                    ))}
                  </div>
                </div>

                {/* Support Info */}
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-lg border-2 border-amber-100">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl shadow-md overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=200&q=80" 
                        alt="Global support" 
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900">Global Support</h3>
                      <p className="text-sm md:text-base text-gray-600">Here for readers worldwide</p>
                    </div>
                  </div>

                  <div className="space-y-3 md:space-y-4">
                    {infoItems.map((item, index) => (
                      <InfoItem key={index} item={item} />
                    ))}
                  </div>
                </div>

                {/* Business Hours */}
                <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-3xl p-6 md:p-8 border-2 border-rose-100 shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl shadow-md overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1501139083538-0139583c060f?w=200&q=80" 
                        alt="Clock icon" 
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900">Business Hours</h3>
                      <p className="text-sm md:text-base text-gray-600">When we're available</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {businessHours.map((schedule, index) => (
                      <ScheduleItem key={index} schedule={schedule} />
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
                <div className="p-8 md:p-10 bg-gradient-to-br from-amber-500 to-orange-600 text-white relative overflow-hidden">
                  {/* Background image overlay */}
                  <div className="absolute inset-0 opacity-20">
                    <img 
                      src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80" 
                      alt="Office interior" 
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="relative z-10">
                    <div className="mb-6 md:mb-8">
                      <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-4 md:mb-6 shadow-lg overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=200&q=80" 
                          alt="Location pin" 
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Visit Our Office</h3>
                      <p className="text-amber-100">Drop by and discuss books over coffee!</p>
                    </div>

                    <div className="space-y-4 md:space-y-5">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 mt-1">
                          <img 
                            src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=100&q=80" 
                            alt="Map icon" 
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-xs md:text-sm text-amber-100">123 Book Street</p>
                          <p className="text-xs md:text-sm text-amber-100">New York, NY 10001</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 mt-1">
                          <img 
                            src="https://images.unsplash.com/photo-1501139083538-0139583c060f?w=100&q=80" 
                            alt="Clock icon" 
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-xs md:text-sm text-amber-100">Mon-Fri: 9AM - 6PM</p>
                          <p className="text-xs md:text-sm text-amber-100">Sat: 10AM - 4PM</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div className="lg:col-span-2 h-64 md:h-80 lg:h-full bg-gray-100 relative">
                  {/* Google Maps Embed */}
                  <div className="absolute inset-0">
                    <iframe
                      title="Office Location Map"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.177858804427!2d-73.98784468459416!3d40.70556597933211!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a315cdf4c9b%3A0x8b934de5cae6f7a!2s123%20Book%20St%2C%20New%20York%2C%20NY%2010001%2C%20USA!5e0!3m2!1sen!2s!4v1622547748225"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="pb-12 md:pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-sm text-gray-600">
              Need immediate assistance? Call us at{' '}
              <a href="tel:+15551234567" className="text-amber-600 hover:text-amber-700 font-semibold">
                +1 (555) 123-4567
              </a>
              {' '}or use our{' '}
              <a href="#chat" className="text-amber-600 hover:text-amber-700 font-semibold">
                24/7 Live Chat
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;