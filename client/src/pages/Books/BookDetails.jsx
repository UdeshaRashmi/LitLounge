import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBookById } from '../../data/books';

export default function BookDetails() {
  const { id } = useParams();
  const book = getBookById(id);

  if (!book) {
    return (
      <section className="p-6">
        <h1 className="text-2xl font-semibold">Book not found</h1>
        <p className="mt-3 text-gray-600">We couldn't find that book.</p>
        <Link to="/books" className="mt-3 inline-block text-indigo-600">Back to list</Link>
      </section>
    );
  }

  return (
    <section className="p-6">
      <h1 className="text-2xl font-semibold">{book.title}</h1>
      <p className="text-sm text-gray-600">{book.author} — {book.year}</p>
      <p className="mt-4 text-gray-700">{book.summary}</p>
      <div className="mt-4">
        <Link to={`/books/${book.id}/edit`} className="text-indigo-600 mr-4">Edit</Link>
        <Link to="/books" className="text-gray-600">Back to list</Link>
      </div>
    </section>
  );
}
