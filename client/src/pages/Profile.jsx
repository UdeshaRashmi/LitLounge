import React from 'react';

const Profile = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm flex items-center gap-6">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">JS</div>
        <div>
          <h2 className="text-2xl font-bold">John Smith</h2>
          <p className="text-sm text-gray-600">Avid reader • Book Lover</p>
          <div className="mt-3 flex items-center gap-3">
            <button className="px-4 py-2 bg-amber-500 text-white rounded-lg">Edit Profile</button>
            <button className="px-4 py-2 border rounded-lg">View Activity</button>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-semibold mb-2">About</h3>
          <p className="text-sm text-gray-700">Loves historical fiction, cozy mysteries, and long evenings with a good cup of tea.</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-semibold mb-2">Stats</h3>
          <div className="flex gap-4">
            <div>
              <div className="text-lg font-bold">120</div>
              <div className="text-xs text-gray-500">Books read</div>
            </div>
            <div>
              <div className="text-lg font-bold">24</div>
              <div className="text-xs text-gray-500">Reading list</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
