import React from 'react';
import AddBook from './Books/AddBook';

const Create = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Add a New Book</h2>
      <p className="text-gray-600 mb-6">Create a cozy listing for your next favorite read.</p>
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <AddBook />
      </div>
    </div>
  );
};

export default Create;
