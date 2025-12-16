import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBooks, getReadingList, addToReadingList, removeFromReadingList, subscribeReadingList } from '../../data/books';

export default function BookList() {
  const books = getBooks();
  const [readingIds, setReadingIds] = useState(() => getReadingList().map((b) => b.id));

  useEffect(() => {
    const unsub = subscribeReadingList((list) => setReadingIds(list.map((b) => b.id)));
    return unsub;
  }, []);

  const toggleReading = (bookId) => {
    if (readingIds.includes(bookId)) {
      removeFromReadingList(bookId);
    } else {
      addToReadingList(bookId);
    }
    // optimistic update; subscription will also update
    setReadingIds(getReadingList().map((b) => b.id));
  };

  return (
    <section className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-indigo-700">Book List</h1>
        <Link
          to="/books/add"
          className="mt-4 md:mt-0 px-5 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transition"
        >
          + Add Book
        </Link>
      </div>
      {books.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-xl text-yellow-800 shadow text-center">
          No books found! Start by adding a new book.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <article
              key={book.id}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex flex-col justify-between hover:-translate-y-1 hover:shadow-2xl transition-all duration-200"
            >
              <div>
                <h2 className="text-xl font-bold text-indigo-700 mb-1">{book.title}</h2>
                <p className="text-gray-600 text-sm mb-2">
                  <span className="font-medium">{book.author}</span>
                  {book.year && <span className="mx-1">•</span>}
                  {book.year && <span>{book.year}</span>}
                </p>
                <p className="text-gray-700">
                  {book.summary
                    ? book.summary.length > 110
                      ? book.summary.slice(0, 110) + '...'
                      : book.summary
                    : <span className="italic text-gray-400">No summary.</span>
                  }
                </p>
              </div>
              <div className="pt-4 flex justify-between items-end">
                <div className="flex items-center gap-3">
                  <Link
                    to={`/books/${book.id}`}
                    className="inline-flex items-center text-indigo-600 font-semibold hover:underline group"
                  >
                    View Details
                    <svg
                      className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>

                  <button
                    onClick={() => toggleReading(book.id)}
                    className={`px-3 py-1 text-xs rounded transition font-semibold ${readingIds.includes(book.id) ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'}`}
                  >
                    {readingIds.includes(book.id) ? 'In Reading' : 'Add to List'}
                  </button>

                  <Link
                    to={`/books/${book.id}/edit`}
                    className="inline-block px-3 py-1 text-xs bg-indigo-50 text-indigo-700 rounded hover:bg-indigo-100 transition"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}