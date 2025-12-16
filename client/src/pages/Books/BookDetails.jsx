import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getBookById, deleteBook, getReadingList, addToReadingList, removeFromReadingList, subscribeReadingList } from '../../data/books';

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const book = getBookById(id);

  if (!book) {
    return (
      <section className="py-12 flex flex-col items-center px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Book not found</h1>
        <p className="mb-6 text-gray-600">We couldn't find that book.</p>
        <Link
          to="/books"
          className="px-5 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
        >
          &larr; Back to Book List
        </Link>
      </section>
    );
  }

  const [inReading, setInReading] = useState(() => !!getReadingList().find((b) => String(b.id) === String(book?.id)));

  useEffect(() => {
    const unsub = subscribeReadingList((list) => setInReading(list.some((b) => String(b.id) === String(book?.id))));
    return unsub;
  }, [book?.id]);

  const handleToggleReading = () => {
    if (!book) return;
    if (inReading) {
      removeFromReadingList(book.id);
      setInReading(false);
    } else {
      addToReadingList(book.id);
      setInReading(true);
    }
  };

  const handleDelete = () => {
    if (window.confirm('Delete this book?')) {
      // Clean up reading list if present
      try { removeFromReadingList(book.id); } catch (e) {}
      deleteBook(book.id);
      navigate('/books');
    }
  };

  return (
    <section className="max-w-2xl mx-auto px-4 py-10">
      <div className="bg-white shadow-lg border border-gray-100 rounded-xl p-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-indigo-700 mb-2">{book.title}</h1>
        <div className="text-gray-600 mb-6">
          <span className="font-medium">{book.author}</span>
          {book.year && <span className="mx-1">•</span>}
          {book.year && <span>{book.year}</span>}
        </div>
        <p className="text-gray-700 mb-8">{book.summary || <span className="italic text-gray-400">No summary provided.</span>}</p>
        <div className="flex gap-4">
          <Link
            to={`/books/${book.id}/edit`}
            className="px-5 py-2 bg-indigo-50 text-indigo-700 rounded shadow hover:bg-indigo-100 transition font-semibold"
          >
            Edit
          </Link>

          <button
            onClick={handleToggleReading}
            className={`px-5 py-2 rounded shadow transition font-semibold ${inReading ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'}`}
          >
            {inReading ? 'In Reading' : 'Add to Reading List'}
          </button>

          <button
            onClick={handleDelete}
            className="px-5 py-2 bg-red-600 text-white rounded shadow hover:bg-red-700 transition font-semibold"
          >
            Delete
          </button>

          <Link
            to="/books"
            className="px-5 py-2 border border-gray-300 bg-gray-50 text-gray-700 rounded hover:bg-gray-100 transition font-semibold"
          >
            &larr; Back
          </Link>
        </div>
      </div>
    </section>
  );
}