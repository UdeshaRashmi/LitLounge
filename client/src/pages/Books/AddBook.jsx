import React, { useState, useEffect } from 'react';
import { Upload, X, BookOpen, Sparkles, Image, AlertCircle } from 'lucide-react';
import { capitalizeWords } from '../../utils/validation';

// Floating particles component
function FloatingParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 15
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-indigo-400 opacity-20"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.left}%`,
            animation: `float ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`
          }}
        />
      ))}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(100vh) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.2;
          }
          90% {
            opacity: 0.2;
          }
          50% {
            transform: translateY(-20vh) translateX(${Math.random() * 100 - 50}px);
          }
        }
      `}</style>
    </div>
  );
}

export default function AddBook() {
  const [form, setForm] = useState({ 
    title: '', 
    author: '', 
    year: '', 
    summary: '',
    photo: null,
    photoPreview: null
  });
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [books, setBooks] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [currentBookId, setCurrentBookId] = useState(null);
  const [errors, setErrors] = useState({});

  // Load books from memory
  useEffect(() => {
    // In a real app with routing, this would load from your data layer
    // For demo purposes, we're using component state
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleTitleBlur() {
    setForm(f => ({ ...f, title: capitalizeWords(f.title || '') }));
  }

  function handleAuthorBlur() {
    setForm(f => ({ ...f, author: capitalizeWords(f.author || '') }));
  }

  function validateForm() {
    const newErrors = {};
    if (!form.title || !form.title.trim()) newErrors.title = 'Title is required';
    if (!form.author || !form.author.trim()) newErrors.author = 'Author is required';
    if (form.year) {
      const yearNum = Number(form.year);
      const currentYear = new Date().getFullYear();
      if (isNaN(yearNum) || yearNum < 0) newErrors.year = 'Enter a valid year';
      else if (yearNum > currentYear) newErrors.year = 'Publication year cannot be in the future';
    }
    if (form.summary && form.summary.length > 2000) newErrors.summary = 'Summary must be under 2000 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handlePhotoChange(e) {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  }

  function processFile(file) {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm(f => ({
          ...f,
          photo: file.name,
          photoPreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  }

  function handleDrag(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  }

  function removePhoto() {
    setForm(f => ({
      ...f,
      photo: null,
      photoPreview: null
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    
    const payload = { 
      id: isEdit ? currentBookId : Date.now().toString(),
      title: form.title.trim(), 
      author: form.author.trim(), 
      year: form.year, 
      summary: form.summary.trim(),
      photo: form.photoPreview
    };

    setTimeout(() => {
      let updatedBooks;
      if (isEdit) {
        updatedBooks = books.map(book => 
          book.id === currentBookId ? payload : book
        );
      } else {
        updatedBooks = [...books, payload];
      }
      
      setBooks(updatedBooks);
      
      // Reset form
      setForm({ title: '', author: '', year: '', summary: '', photo: null, photoPreview: null });
      setErrors({});
      setIsEdit(false);
      setCurrentBookId(null);
      setLoading(false);
      
      alert(isEdit ? 'Book updated successfully!' : 'Book added successfully!');
    }, 1000);
  }

  function handleEdit(book) {
    setForm({
      title: book.title,
      author: book.author,
      year: book.year,
      summary: book.summary,
      photo: book.photo ? 'existing' : null,
      photoPreview: book.photo
    });
    setIsEdit(true);
    setCurrentBookId(book.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleDelete(bookId) {
    if (window.confirm('Are you sure you want to delete this book?')) {
      const updatedBooks = books.filter(book => book.id !== bookId);
      setBooks(updatedBooks);
      
      if (currentBookId === bookId) {
        setForm({ title: '', author: '', year: '', summary: '', photo: null, photoPreview: null });
        setIsEdit(false);
        setCurrentBookId(null);
      }
    }
  }

  function cancelEdit() {
    setForm({ title: '', author: '', year: '', summary: '', photo: null, photoPreview: null });
    setIsEdit(false);
    setCurrentBookId(null);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      <FloatingParticles />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <BookOpen className="w-8 h-8 text-indigo-600" />
            <Sparkles className="w-6 h-6 text-purple-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            {isEdit ? 'Edit Book' : 'Add Your Book Collection'}
          </h1>
          <p className="text-gray-600">Share your favorite reads with the world</p>
        </div>

        {/* Form Card */}
        <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-2xl p-8 border border-indigo-100 mb-8">
          <div className="space-y-6">
            {/* Photo Upload Section */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Book Cover Photo
              </label>
              
              {!form.photoPreview ? (
                <div
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                    dragActive 
                      ? 'border-indigo-500 bg-indigo-50' 
                      : 'border-gray-300 hover:border-indigo-400'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Image className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 mb-2">
                    Drag and drop your book cover here, or
                  </p>
                  <label className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg cursor-pointer hover:bg-indigo-700 transition-colors">
                    <Upload className="w-4 h-4" />
                    Browse Files
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                  </label>
                  <p className="text-xs text-gray-500 mt-2">PNG, JPG, GIF up to 10MB</p>
                </div>
              ) : (
                <div className="relative rounded-xl overflow-hidden border-2 border-indigo-200 group">
                  <img
                    src={form.photoPreview}
                    alt="Book cover preview"
                    className="w-full h-64 object-cover"
                  />
                  <button
                    type="button"
                    onClick={removePhoto}
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <label className="px-4 py-2 bg-white text-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                      Change Photo
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Title Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Book Title <span className="text-red-500">*</span>
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                onBlur={handleTitleBlur}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                required
                placeholder="E.g. Atomic Habits"
                disabled={loading}
              />
              {errors.title && (
                <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.title}</span>
                </div>
              )}
            </div>

            {/* Author Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Author <span className="text-red-500">*</span>
              </label>
              <input
                name="author"
                value={form.author}
                onChange={handleChange}
                onBlur={handleAuthorBlur}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                required
                placeholder="E.g. James Clear"
                disabled={loading}
              />
              {errors.author && (
                <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.author}</span>
                </div>
              )}
            </div>

            {/* Year Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Publication Year
              </label>
              <input
                name="year"
                type="number"
                max={new Date().getFullYear()}
                value={form.year}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                placeholder="E.g. 2023"
                disabled={loading}
              />
              {errors.year && (
                <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.year}</span>
                </div>
              )}
            </div>

            {/* Summary Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Summary
              </label>
              <textarea
                name="summary"
                value={form.summary}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-y"
                placeholder="Brief description of the book..."
                disabled={loading}
              />
              {errors.summary && (
                <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.summary}</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-4">
              <button
                onClick={handleSubmit}
                disabled={loading || !form.title || !form.author}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {isEdit ? 'Saving...' : 'Adding...'}
                  </span>
                ) : (
                  isEdit ? 'Save Changes' : 'Add Book'
                )}
              </button>
              
              {isEdit && (
                <button
                  onClick={cancelEdit}
                  className="px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 transition-all"
                  disabled={loading}
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Book List */}
        {books.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Book Collection</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {books.map((book) => (
                <div
                  key={book.id}
                  className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-indigo-100 hover:shadow-xl transition-all transform hover:-translate-y-1"
                >
                  {book.photo && (
                    <img
                      src={book.photo}
                      alt={book.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{book.title}</h3>
                    <p className="text-indigo-600 font-semibold mb-2">{book.author}</p>
                    {book.year && (
                      <p className="text-sm text-gray-500 mb-2">Published: {book.year}</p>
                    )}
                    {book.summary && (
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{book.summary}</p>
                    )}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(book)}
                        className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(book.id)}
                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}