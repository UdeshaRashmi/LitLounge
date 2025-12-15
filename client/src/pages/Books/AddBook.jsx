 import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addBook, getBookById, updateBook, deleteBook } from '../../data/books';

export default function AddBook() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({ title: '', author: '', year: '', summary: '' });
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (isEdit) {
      setLoading(true);
      const book = getBookById(id);
      if (book) {
        setForm({
          title: book.title || '',
          author: book.author || '',
          year: book.year || '',
          summary: book.summary || ''
        });
        setNotFound(false);
      } else {
        setNotFound(true);
      }
      setLoading(false);
    }
  }, [id, isEdit]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const payload = { 
      title: form.title.trim(), 
      author: form.author.trim(), 
      year: form.year, 
      summary: form.summary.trim() 
    };
    try {
      if (isEdit) {
        updateBook(id, payload);
        navigate(`/books/${id}`);
      } else {
        const created = addBook(payload);
        navigate(`/books/${created.id}`);
      }
    } finally {
      setLoading(false);
    }
  }

  function handleDelete() {
    if (!isEdit) return;
    const ok = window.confirm('Are you sure you want to delete this book?');
    if (!ok) return;
    deleteBook(id);
    navigate('/books');
  }

  if (loading) {
    return (
      <section className="py-10 flex justify-center text-lg text-gray-500">Loading...</section>
    );
  }

  if (notFound) {
    return (
      <section className="py-12 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Book Not Found</h1>
        <p className="mb-4 text-gray-600">Sorry, the requested book does not exist.</p>
        <button
          className="px-6 py-2 bg-indigo-600 text-white rounded shadow hover:bg-indigo-700"
          onClick={() => navigate('/books')}
        >Back to Book List</button>
      </section>
    );
  }

  return (
    <section className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-xl p-8 border">
        <h1 className="text-2xl font-extrabold tracking-tight text-indigo-700 mb-6">
          {isEdit ? 'Edit Book' : 'Add a New Book'}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="title">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 bg-gray-50"
              required
              autoFocus
              placeholder="E.g. Atomic Habits"
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="author">
              Author <span className="text-red-500">*</span>
            </label>
            <input
              id="author"
              name="author"
              value={form.author}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 bg-gray-50"
              required
              placeholder="E.g. James Clear"
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="year">
              Year
            </label>
            <input
              id="year"
              name="year"
              type="number"
              max={new Date().getFullYear()}
              value={form.year}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 bg-gray-50"
              placeholder="E.g. 2023"
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="summary">
              Summary
            </label>
            <textarea
              id="summary"
              name="summary"
              value={form.summary}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 bg-gray-50 resize-y"
              placeholder="Brief description of the book..."
              disabled={loading}
            />
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-lg shadow hover:bg-indigo-700 transition"
              disabled={loading}
            >
              {loading ? (isEdit ? 'Saving...' : 'Adding...') : isEdit ? 'Save Changes' : 'Add Book'}
            </button>
            {isEdit && (
              <button
                type="button"
                onClick={handleDelete}
                className="px-5 py-2 bg-red-600 text-white rounded-lg font-semibold transition hover:bg-red-700"
                disabled={loading}
              >
                Delete
              </button>
            )}
            <button
              type="button"
              onClick={() => navigate(isEdit ? `/books/${id}` : '/books')}
              className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 bg-gray-50 hover:bg-gray-100 transition"
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}