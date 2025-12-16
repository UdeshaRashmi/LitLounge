import React, { useState } from 'react';
import { getReadingList, removeFromReadingList } from '../data/books';

const ReadingList = () => {
  const [list, setList] = useState(getReadingList());

  const handleRemove = (id) => {
    removeFromReadingList(id);
    setList(getReadingList());
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-2">Your Reading List</h2>
      <p className="text-gray-600 mb-6">Books you've earmarked to read next.</p>

      {list.length === 0 ? (
        <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
          <p className="text-gray-700">Your reading list is empty. Add some books!</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {list.map((book) => (
            <div key={book.id} className="bg-white rounded-2xl p-4 shadow-sm flex items-start gap-4">
              <div className="text-4xl">📚</div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{book.title}</h3>
                <p className="text-sm text-gray-600">{book.author} • {book.year}</p>
                <p className="text-sm text-gray-700 mt-2">{book.summary}</p>
              </div>
              <div className="flex flex-col gap-2">
                <button onClick={() => handleRemove(book.id)} className="px-3 py-2 bg-red-500 text-white rounded-lg">Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReadingList;
