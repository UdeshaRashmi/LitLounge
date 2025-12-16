import React from 'react';

const Settings = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      <p className="text-gray-600 mb-6">Manage your account preferences and application settings.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold mb-2">Account</h3>
          <label className="block text-sm text-gray-700 mb-1">Display name</label>
          <input className="w-full px-3 py-2 border rounded-lg mb-3" placeholder="Your name" />
          <label className="block text-sm text-gray-700 mb-1">Email</label>
          <input className="w-full px-3 py-2 border rounded-lg mb-3" placeholder="you@example.com" />
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold mb-2">Preferences</h3>
          <div className="space-y-3">
            <label className="flex items-center gap-3">
              <input type="checkbox" />
              <span className="text-sm">Dark mode</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" />
              <span className="text-sm">Email notifications</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" />
              <span className="text-sm">Show book recommendations</span>
            </label>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <button className="px-6 py-2 bg-amber-500 text-white rounded-lg">Save settings</button>
      </div>
    </div>
  );
};

export default Settings;
