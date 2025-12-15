import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addBook, getBookById, updateBook, deleteBook } from '../../data/books';

export default function AddBook() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({ title: '', author: '', year: '', summary: '' });

  useEffect(() => {
    if (isEdit) {
      const book = getBookById(id);
      if (book) setForm({ title: book.title || '', author: book.author || '', year: book.year || '', summary: book.summary || '' });
    }
  }, [id, isEdit]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const payload = { title: form.title, author: form.author, year: form.year, summary: form.summary };
    if (isEdit) {
      updateBook(id, payload);
      navigate(`/books/${id}`);
    } else {
      const created = addBook(payload);
      navigate(`/books/${created.id}`);
    }
  }

  function handleDelete() {
    if (!isEdit) return;
    const ok = confirm('Delete this book?');
    if (!ok) return;
    deleteBook(id);
    navigate('/books');
  }

  return (
    <section className="p-6">
      <h1 className="text-2xl font-semibold">{isEdit ? 'Edit Book' : 'Add Book'}</h1>

      <form onSubmit={handleSubmit} className="mt-4 max-w-xl">
        <label className="block">
          <span className="text-sm font-medium">Title</span>
          <input name="title" value={form.title} onChange={handleChange} className="mt-1 block w-full border rounded px-2 py-1" required />
        </label>

        <label className="block mt-3">
          <span className="text-sm font-medium">Author</span>
          <input name="author" value={form.author} onChange={handleChange} className="mt-1 block w-full border rounded px-2 py-1" required />
        </label>

        <label className="block mt-3">
          <span className="text-sm font-medium">Year</span>
          <input name="year" value={form.year} onChange={handleChange} className="mt-1 block w-full border rounded px-2 py-1" />
        </label>

        <label className="block mt-3">
          <span className="text-sm font-medium">Summary</span>
          <textarea name="summary" value={form.summary} onChange={handleChange} className="mt-1 block w-full border rounded px-2 py-1" rows={4} />
        </label>

        <div className="mt-4 flex items-center gap-3">
          <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">{isEdit ? 'Save' : 'Add Book'}</button>
          {isEdit && (
            <button type="button" onClick={handleDelete} className="px-3 py-2 bg-red-600 text-white rounded">Delete</button>
          )}
          <button type="button" onClick={() => navigate(isEdit ? `/books/${id}` : '/books')} className="px-3 py-2 border rounded">Cancel</button>
        </div>
      </form>
    </section>
  );
}
