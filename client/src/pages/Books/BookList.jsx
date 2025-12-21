import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { authFetch } from '../../utils/api';
import { BookOpen, BookmarkPlus, BookmarkCheck, Plus, Search, Filter, Sparkles, Bookmark, Star, ChevronRight } from 'lucide-react';

// Floating books component
function FloatingBooks() {
  const books = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 40 + 20,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 20 + 25,
    rotation: Math.random() * 360,
    color: `hsl(${Math.random() * 60 + 200}, 70%, ${Math.random() * 20 + 70}%)`,
    type: Math.random() > 0.7 ? 'leaf' : 'book'
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {books.map((item) => (
        <div
          key={item.id}
          className="absolute"
          style={{
            left: `${item.left}%`,
            width: `${item.size}px`,
            height: `${item.size}px`,
            animation: `float ${item.duration}s ease-in-out infinite`,
            animationDelay: `${item.delay}s`,
            transform: `rotate(${item.rotation}deg)`
          }}
        >
          {item.type === 'book' ? (
            <div className="relative w-full h-full">
              {/* Book spine */}
              <div 
                className="absolute inset-0 rounded-lg"
                style={{
                  backgroundColor: item.color,
                  boxShadow: '2px 2px 8px rgba(0,0,0,0.1)'
                }}
              />
              {/* Book pages */}
              <div className="absolute top-1 left-1 bottom-1 right-1 bg-gradient-to-r from-white/90 to-white/70 rounded-sm" />
              {/* Book details */}
              <div className="absolute top-2 left-3 right-3 h-1 bg-white/40 rounded-full" />
              <div className="absolute top-4 left-3 right-3 h-1 bg-white/30 rounded-full" />
              <div className="absolute top-6 left-3 right-3 h-1 bg-white/20 rounded-full" />
            </div>
          ) : (
            <div className="relative w-full h-full">
              {/* Leaf shape */}
              <div 
                className="absolute inset-0"
                style={{
                  backgroundColor: '#10b981',
                  clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                  opacity: 0.3
                }}
              />
              {/* Leaf veins */}
              <div className="absolute top-1/2 left-1/2 w-1/3 h-1 bg-white/20 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute top-1/2 left-1/2 w-1/5 h-1 bg-white/20 rounded-full transform -translate-x-1/2 -translate-y-1/2 rotate-45" />
              <div className="absolute top-1/2 left-1/2 w-1/5 h-1 bg-white/20 rounded-full transform -translate-x-1/2 -translate-y-1/2 -rotate-45" />
            </div>
          )}
        </div>
      ))}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(100vh) translateX(0) rotate(var(--start-rotation));
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          50% {
            transform: translateY(-10vh) translateX(${Math.random() * 100 - 50}px) rotate(calc(var(--start-rotation) + 180deg));
          }
        }
      `}</style>
    </div>
  );
}

// Glassmorphism card component
function BookCard({ book, isInReadingList, onToggleReading }) {
  return (
    <div className="group relative">
      {/* Card glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500" />
      
      <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 flex flex-col justify-between h-full transform transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-2xl group-hover:border-indigo-100">
        {/* Top section */}
        <div className="flex-1">
          {/* Book icon and title */}
          <div className="flex items-start gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl">
              <BookOpen className="w-6 h-6 text-indigo-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold text-gray-800 truncate mb-1">{book.title}</h2>
              <p className="text-gray-600 text-sm">
                <span className="font-medium">{book.author}</span>
                {book.year && (
                  <>
                    <span className="mx-2 text-gray-300">•</span>
                    <span>{book.year}</span>
                  </>
                )}
              </p>
            </div>
          </div>

          {/* Summary */}
          <div className="mb-6">
            <p className="text-gray-700 line-clamp-3">
              {book.summary ? (
                book.summary.length > 150 ? `${book.summary.slice(0, 150)}...` : book.summary
              ) : (
                <span className="italic text-gray-400">No summary available.</span>
              )}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {book.genre && (
              <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold">
                {book.genre}
              </span>
            )}
            {book.pages && (
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                {book.pages} pages
              </span>
            )}
          </div>
        </div>

        {/* Bottom section - Actions */}
        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                to={`/books/${book.id}`}
                className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-700 group"
              >
                View Details
                <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to={`/books/${book.id}/edit`}
                className="text-gray-600 hover:text-indigo-600 transition-colors"
                title="Edit Book"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </Link>
            </div>

            <button
              onClick={() => onToggleReading(book.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${
                isInReadingList
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg hover:shadow-xl'
                  : 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 hover:bg-gradient-to-r hover:from-indigo-100 hover:to-purple-100'
              }`}
            >
              {isInReadingList ? (
                <>
                  <BookmarkCheck className="w-4 h-4" />
                  <span className="hidden sm:inline">Reading</span>
                </>
              ) : (
                <>
                  <BookmarkPlus className="w-4 h-4" />
                  <span className="hidden sm:inline">Add</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [readingIds, setReadingIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [stats, setStats] = useState({
    total: 0,
    reading: 0,
    available: 0
  });

  useEffect(() => {
    // load books from backend
    let mounted = true;
    (async () => {
      const res = await authFetch('http://localhost:5000/api/books');
      if (mounted && res.ok) setBooks(res.data || []);
    })();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    setStats({
      total: books.length,
      reading: readingIds.length,
      available: books.length - readingIds.length
    });
  }, [books, readingIds]);

  const toggleReading = (bookId) => {
    // local toggle for reading list (client-side feature)
    setReadingIds(prev => prev.includes(bookId) ? prev.filter(id => id !== bookId) : [...prev, bookId]);
  };

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'reading') return matchesSearch && readingIds.includes(book.id);
    if (filter === 'available') return matchesSearch && !readingIds.includes(book.id);
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      <FloatingBooks />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <Sparkles className="w-6 h-6 text-purple-500" />
            <span className="text-sm font-semibold text-purple-600 uppercase tracking-wide">Your Library</span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-800">Book Collection</h1>
              <p className="text-gray-600 mt-2">Manage and explore your personal library</p>
            </div>
            
            <Link
              to="/books/add"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              Add New Book
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <BookOpen className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Books</p>
                  <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Bookmark className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">In Reading List</p>
                  <p className="text-2xl font-bold text-gray-800">{stats.reading}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Star className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Available</p>
                  <p className="text-2xl font-bold text-gray-800">{stats.available}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search books by title or author..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              {/* Filter */}
              <div className="flex gap-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-3 rounded-xl font-medium transition-all ${
                    filter === 'all'
                      ? 'bg-indigo-600 text-white shadow-lg'
                      : 'bg-white/50 text-gray-700 hover:bg-white'
                  }`}
                >
                  All Books
                </button>
                <button
                  onClick={() => setFilter('reading')}
                  className={`px-4 py-3 rounded-xl font-medium transition-all ${
                    filter === 'reading'
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'bg-white/50 text-gray-700 hover:bg-white'
                  }`}
                >
                  Reading List
                </button>
                <button
                  onClick={() => setFilter('available')}
                  className={`px-4 py-3 rounded-xl font-medium transition-all ${
                    filter === 'available'
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white/50 text-gray-700 hover:bg-white'
                  }`}
                >
                  Available
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Book Grid */}
        {filteredBooks.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-12 text-center">
            <div className="mb-4">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto" />
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No Books Found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm ? `No books match "${searchTerm}"` : 'Start by adding your first book!'}
            </p>
            <Link
              to="/books/add"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <Plus className="w-5 h-5" />
              Add Your First Book
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                isInReadingList={readingIds.includes(book.id)}
                onToggleReading={toggleReading}
              />
            ))}
          </div>
        )}

        {/* Results count */}
        {filteredBooks.length > 0 && (
          <div className="mt-8 text-center text-gray-600">
            Showing {filteredBooks.length} of {books.length} books
          </div>
        )}
      </div>
    </div>
  );
}