import React, { useEffect, useMemo, useState } from 'react';
import {
  Mail,
  User,
  Save,
  Bell,
  Shield,
  Palette,
  Send,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const DEFAULT_SETTINGS = {
  name: 'Alex Johnson',
  email: 'alex@example.com',
  phone: '+1 (555) 123-4567',
  emailNotifications: true,
  marketingEmails: false,
  twoFactor: false
};

const Settings = () => {
  const [formData, setFormData] = useState(DEFAULT_SETTINGS);
  const [saveStatus, setSaveStatus] = useState('');
  const [error, setError] = useState('');

  const [emailContent, setEmailContent] = useState({
    subject: '',
    message: '',
    to: 'contact@litlounge.com'
  });

  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  /* ---------------- Load saved settings ---------------- */
  useEffect(() => {
    const saved = localStorage.getItem('userSettings');
    if (saved) setFormData(JSON.parse(saved));
  }, []);

  /* ---------------- Detect unsaved changes ---------------- */
  const hasChanges = useMemo(() => {
    const saved = localStorage.getItem('userSettings');
    if (!saved) return true;
    return JSON.stringify(JSON.parse(saved)) !== JSON.stringify(formData);
  }, [formData]);

  /* ---------------- Handlers ---------------- */
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveSettings = () => {
    setSaveStatus('Saving...');
    setTimeout(() => {
      localStorage.setItem('userSettings', JSON.stringify(formData));
      setSaveStatus('Saved');
      setTimeout(() => setSaveStatus(''), 2000);
    }, 600);
  };

  const handleSendEmail = async () => {
    if (!emailContent.subject || !emailContent.message) {
      setError('Subject and message are required.');
      return;
    }

    setError('');
    setIsSending(true);

    await new Promise(res => setTimeout(res, 1500));

    setIsSending(false);
    setIsSent(true);

    setTimeout(() => {
      setIsSent(false);
      setEmailContent({
        subject: '',
        message: '',
        to: 'contact@litlounge.com'
      });
    }, 3000);
  };

  /* ---------------- Toggles ---------------- */
  const toggleItems = [
    {
      id: 'emailNotifications',
      label: 'Email Notifications',
      description: 'Receive updates via email',
      icon: Bell
    },
    {
      id: 'marketingEmails',
      label: 'Marketing Emails',
      description: 'Receive promotional emails',
      icon: Mail
    },
    {
      id: 'twoFactor',
      label: 'Two-Factor Authentication',
      description: 'Extra security for your account',
      icon: Shield
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 text-gray-900">
      <div className="max-w-4xl mx-auto p-4 md:p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-gray-600">Manage your preferences and support</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left */}
          <div className="space-y-6">
            {/* Personal Info */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center">
                  <User className="text-white w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold">Personal Information</h2>
              </div>

              {['name', 'email', 'phone'].map(field => (
                <div key={field} className="mb-4">
                  <label className="block text-sm font-medium mb-2 capitalize">
                    {field}
                  </label>
                  <input
                    type="text"
                    value={formData[field]}
                    onChange={e => handleInputChange(field, e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              ))}
            </div>

            {/* Preferences */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center">
                  <Palette className="text-white w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold">Preferences</h2>
              </div>

              {toggleItems.map(item => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-gray-50 mb-3"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-amber-600" />
                    <div>
                      <p className="font-medium">{item.label}</p>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      handleInputChange(item.id, !formData[item.id])
                    }
                    className={`w-11 h-6 rounded-full relative transition ${
                      formData[item.id]
                        ? 'bg-amber-500'
                        : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`absolute w-4 h-4 bg-white rounded-full top-1 transition ${
                        formData[item.id] ? 'left-6' : 'left-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="space-y-6">
            {/* Contact Support */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Mail /> Contact Support
              </h2>

              {error && (
                <p className="text-red-600 text-sm mb-3">{error}</p>
              )}

              {isSent ? (
                <div className="text-center py-6">
                  <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                  <p className="font-bold">Message Sent</p>
                </div>
              ) : (
                <>
                  <input
                    type="text"
                    placeholder="Subject"
                    value={emailContent.subject}
                    onChange={e =>
                      setEmailContent(p => ({
                        ...p,
                        subject: e.target.value
                      }))
                    }
                    className="w-full mb-3 px-4 py-3 rounded-xl bg-gray-50 border"
                  />

                  <textarea
                    rows="4"
                    placeholder="Message"
                    value={emailContent.message}
                    onChange={e =>
                      setEmailContent(p => ({
                        ...p,
                        message: e.target.value
                      }))
                    }
                    className="w-full mb-4 px-4 py-3 rounded-xl bg-gray-50 border"
                  />

                  <button
                    onClick={handleSendEmail}
                    disabled={isSending}
                    className="w-full py-3 rounded-xl bg-emerald-500 text-white font-medium flex justify-center gap-2"
                  >
                    {isSending ? 'Sending…' : <><Send /> Send</>}
                  </button>
                </>
              )}
            </div>

            {/* Save */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <button
                onClick={handleSaveSettings}
                disabled={!hasChanges}
                className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 ${
                  hasChanges
                    ? 'bg-amber-500 text-white'
                    : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                }`}
              >
                <Save /> Save Settings
              </button>

              {saveStatus && (
                <p className="text-center text-sm mt-3 text-emerald-600">
                  {saveStatus}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
