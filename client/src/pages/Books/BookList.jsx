import React from 'react';
import { Link } from 'react-router-dom';
import { getBooks } from '../../data/books';

export default function BookList() {
  const books = getBooks();

  return (
    <section className="p-6">
      <h1 className="text-2xl font-semibold">Books</h1>
      <div className="mt-4 grid gap-4">
        {books.map((book) => (
          <article key={book.id} className="p-4 bg-white rounded shadow">
            <h2 className="text-lg font-semibold">{book.title}</h2>
            <p className="text-sm text-gray-600">{book.author} — {book.year}</p>
            <p className="mt-2 text-gray-700">{book.summary}</p>
            <Link to={`/books/${book.id}`} className="mt-3 inline-block text-indigo-600">View details</Link>
          </article>
        ))}
      </div>
    </section>
  );
}
