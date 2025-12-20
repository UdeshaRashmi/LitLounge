import React, { useState, useEffect } from 'react';
import { 
  Moon, 
  Sun, 
  Mail, 
  User, 
  Phone, 
  Save, 
  Bell,
  Shield,
  Palette,
  Send,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

import { useTheme } from '../context/ThemeContext';

const Settings = () => {
  const { theme } = useTheme();

  const [formData, setFormData] = useState({
    name: 'Alex Johnson',
    email: 'alex@example.com',
    phone: '+1 (555) 123-4567',
    emailNotifications: true,
    // darkMode removed - app is always light
    marketingEmails: false,
    twoFactor: false
  });

  const [emailContent, setEmailContent] = useState({
    subject: '',
    message: '',
    to: 'contact@litlounge.com'
  });

  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  // dark mode removed: nothing to sync

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveSettings = () => {
    setSaveStatus('Saving...');
    setTimeout(() => {
      localStorage.setItem('userSettings', JSON.stringify(formData));
      setSaveStatus('Saved successfully!');
      setTimeout(() => setSaveStatus(''), 2000);
    }, 500);
  };

  const handleSendEmail = async () => {
    if (!emailContent.subject || !emailContent.message) {
      alert('Please fill in subject and message');
      return;
    }

    setIsSending(true);
    
    // Simulate email sending
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSending(false);
    setIsSent(true);
    
    // Reset form after success
    setTimeout(() => {
      setIsSent(false);
      setEmailContent({
        subject: '',
        message: '',
        to: 'contact@litlounge.com'
      });
    }, 3000);
  };

  const toggleItems = [
    {
      id: 'emailNotifications',
      label: 'Email Notifications',
      description: 'Receive updates via email',
      icon: Bell,
      value: formData.emailNotifications
    },
    // dark mode removed
    {
      id: 'marketingEmails',
      label: 'Marketing Emails',
      description: 'Receive promotional emails',
      icon: Mail,
      value: formData.marketingEmails
    },
    {
      id: 'twoFactor',
      label: 'Two-Factor Authentication',
      description: 'Extra security for your account',
      icon: Shield,
      value: formData.twoFactor
    }
  ];

  return (
    <div className="min-h-screen transition-colors duration-200 bg-gradient-to-br from-amber-50 to-orange-50 text-gray-900">
      <div className="max-w-4xl mx-auto p-4 md:p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-gray-600">
            Manage your preferences and contact support
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - User Settings */}
          <div className="space-y-6">
            {/* Personal Info Card */}
            <div className="rounded-2xl p-6 shadow-lg bg-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-r from-blue-500 to-cyan-500">
                  <User className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold">Personal Information</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all bg-gray-50 border-gray-200 border"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all bg-gray-50 border-gray-200 border"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all bg-gray-50 border-gray-200 border"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
            </div>

            {/* Preferences Card */}
            <div className="rounded-2xl p-6 shadow-lg bg-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-r from-amber-500 to-orange-500">
                  <Palette className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold">Preferences</h2>
              </div>

              <div className="space-y-4">
                {toggleItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-opacity-50 transition-colors" style={{ backgroundColor: 'rgba(249, 250, 251, 1)' }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-amber-100">
                        <item.icon className="w-4 h-4 text-amber-600" />
                      </div>
                      <div>
                        <p className="font-medium">{item.label}</p>
                        <p className="text-sm text-gray-500">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => item.action ? item.action() : handleInputChange(item.id, !item.value)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        item.value ? 'bg-gradient-to-r from-amber-500 to-orange-500' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          item.value ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Email Support */}
          <div className="space-y-6">
            {/* Send Email Card */}
            <div className="rounded-2xl p-6 shadow-lg bg-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-r from-emerald-500 to-teal-500">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold">Contact Support</h2>
              </div>

              {isSent ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 mb-4">
                    <CheckCircle className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Email Sent!</h3>
                  <p className="text-gray-600 mb-4">
                    We'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSent(false)}
                    className="text-emerald-600 hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      To
                    </label>
                    <input
                      type="text"
                      value={emailContent.to}
                      readOnly
                      className="w-full px-4 py-3 rounded-xl bg-gray-100 border-gray-200 text-gray-600 border cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Subject *
                    </label>
                    <input
                      type="text"
                      value={emailContent.subject}
                      onChange={(e) => setEmailContent(prev => ({ ...prev, subject: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all bg-gray-50 border-gray-200 border"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Message *
                    </label>
                    <textarea
                      value={emailContent.message}
                      onChange={(e) => setEmailContent(prev => ({ ...prev, message: e.target.value }))}
                      rows="5"
                      className="w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all resize-none bg-gray-50 border-gray-200 border"
                      placeholder="Please describe your issue or question..."
                    />
                  </div>

                  <div className="p-4 rounded-xl bg-amber-50">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 mt-0.5 text-amber-600" />
                      <p className="text-sm text-gray-700">
                        Our support team typically responds within 4-6 hours during business days.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleSendEmail}
                    disabled={isSending || !emailContent.subject || !emailContent.message}
                    className={`w-full py-3 font-medium rounded-xl transition-all flex items-center justify-center gap-2 ${
                      isSending || !emailContent.subject || !emailContent.message
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:scale-[1.02] hover:shadow-lg'
                    } bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white`}
                  >
                    {isSending ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Email to Support
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Save Button & Status */}
            <div className="rounded-2xl p-6 shadow-lg bg-white">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold mb-1">Save Settings</h3>
                    <p className="text-sm text-gray-500">
                      Save your preferences to this device
                    </p>
                  </div>
                  
                  {saveStatus && (
                    <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                      saveStatus === 'Saving...' ? 'text-amber-600 bg-amber-100' : 'text-emerald-600 bg-emerald-100'
                    }`}>
                      {saveStatus}
                    </span>
                  )}
                </div>

                <button
                  onClick={handleSaveSettings}
                  className="w-full py-3 font-bold rounded-xl transition-all flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white hover:scale-[1.02] hover:shadow-lg"
                >
                  <Save className="w-5 h-5" />
                  Save All Settings
                </button>

                <div className="text-xs text-center text-gray-400">Settings are saved locally to your browser</div>
              </div>
            </div>

            {/* Quick Support Info */}
            <div className="rounded-2xl p-6 shadow-lg bg-white">
              <h3 className="font-bold mb-4">Need Immediate Help?</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: 'rgba(249, 250, 251, 1)' }}>
                  <span className="font-medium">Live Chat</span>
                  <span className="font-bold text-emerald-600">Available 24/7</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: 'rgba(249, 250, 251, 1)' }}>
                  <span className="font-medium">Phone Support</span>
                  <span className="font-bold text-blue-600">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: 'rgba(249, 250, 251, 1)' }}>
                  <span className="font-medium">Response Time</span>
                  <span className="font-bold text-amber-600">Within 4 hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;