 import React, { useState, useEffect } from 'react';
 import { useParams, useNavigate } from 'react-router-dom';
import { BookOpen, Edit, Trash2, ArrowLeft, BookmarkPlus, BookmarkCheck, Calendar, User, Sparkles, Heart, Share2 } from 'lucide-react';

// Floating particles component
function FloatingParticles() {
  const particles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    size: Math.random() * 5 + 2,
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

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inReading, setInReading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleted, setDeleted] = useState(false);
  
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await (await import('../../utils/api')).authFetch('http://localhost:5000/api/books');
        if (!mounted) return;
        if (res.ok) {
          const found = (res.data || []).find(b => b._id === id || b.id === id);
          setBook(found || null);
        } else {
          setBook(null);
        }
      } catch (err) {
        console.error(err);
        setBook(null);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [id]);

  

  const handleToggleReading = () => {
    setInReading(!inReading);
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    (async () => {
      try {
        const res = await (await import('../../utils/api')).authFetch(`http://localhost:5000/api/books/${id}`, { method: 'DELETE' });
        if (res.ok) {
          setDeleted(true);
          setTimeout(() => navigate('/books'), 500);
        } else {
          alert(res.data?.message || 'Failed to delete');
        }
      } catch (err) {
        console.error(err);
        alert('Error deleting book');
      }
    })();
  };

  const handleShare = () => {
    alert('Share functionality! In a real app, this would open a share dialog.');
  };

  const handleEdit = () => {
    alert('Edit functionality! In a real app, this would navigate to the edit page.');
  };

  const handleBack = () => {
    alert('Back functionality! In a real app, this would navigate to the book list.');
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  if (deleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden flex items-center justify-center p-4">
        <FloatingParticles />
        <div className="relative z-10 max-w-md w-full bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl text-center border border-red-200">
          <div className="mb-4 flex justify-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center animate-pulse">
              <Trash2 className="w-10 h-10 text-red-600" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Book Deleted</h2>
          <p className="text-gray-600 mb-4">The book has been removed from your collection.</p>
          <button
            onClick={handleBack}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
          >
            Back to Library
          </button>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">No book found.</div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      <FloatingParticles />
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Library
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Book Cover Section */}
          <div className="lg:col-span-1">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-indigo-100 sticky top-8">
              {book.photo ? (
                <img
                  src={book.photo}
                  alt={book.title}
                  className="w-full h-96 object-cover"
                />
              ) : (
                <div className="w-full h-96 bg-gradient-to-br from-indigo-200 to-purple-300 flex items-center justify-center">
                  <BookOpen className="w-24 h-24 text-white/50" />
                </div>
              )}
              
              {/* Quick Actions */}
              <div className="p-6 space-y-3">
                <button
                  onClick={handleToggleReading}
                  className={`w-full py-3 rounded-xl font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2 ${
                    inReading
                      ? 'bg-green-600 text-white hover:bg-green-700 shadow-lg'
                      : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                  }`}
                >
                  {inReading ? (
                    <>
                      <BookmarkCheck className="w-5 h-5" />
                      In Reading List
                    </>
                  ) : (
                    <>
                      <BookmarkPlus className="w-5 h-5" />
                      Add to Reading List
                    </>
                  )}
                </button>

                <button
                  onClick={handleToggleFavorite}
                  className={`w-full py-3 rounded-xl font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2 ${
                    isFavorite
                      ? 'bg-pink-600 text-white hover:bg-pink-700 shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                  {isFavorite ? 'Favorited' : 'Add to Favorites'}
                </button>

                <button
                  onClick={handleShare}
                  className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Share2 className="w-5 h-5" />
                  Share
                </button>
              </div>
            </div>
          </div>

          {/* Book Details Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title Card */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-indigo-100">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 mb-3">
                    <Sparkles className="w-6 h-6 text-purple-500" />
                    <span className="text-sm font-semibold text-purple-600 uppercase tracking-wide">Book Details</span>
                  </div>
                  <h1 className="text-4xl font-bold text-gray-800 mb-3">{book.title}</h1>
                  
                  {/* Author and Year */}
                  <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <User className="w-5 h-5 text-indigo-500" />
                      <span className="font-semibold text-lg">{book.author}</span>
                    </div>
                    {book.year && (
                      <>
                        <span className="text-gray-400">•</span>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-5 h-5 text-indigo-500" />
                          <span className="font-medium">{book.year}</span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {inReading && (
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                        Currently Reading
                      </span>
                    )}
                    {isFavorite && (
                      <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-semibold">
                        ❤️ Favorite
                      </span>
                    )}
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">
                      Self-Help
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Card */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-indigo-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Summary</h2>
              {book.summary ? (
                <p className="text-gray-700 leading-relaxed text-lg">{book.summary}</p>
              ) : (
                <p className="text-gray-400 italic">No summary provided for this book.</p>
              )}
            </div>

            {/* Additional Info Card */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-indigo-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Additional Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-indigo-50 rounded-xl">
                  <p className="text-sm text-indigo-600 font-semibold mb-1">Genre</p>
                  <p className="text-gray-800 font-medium">Self-Help / Psychology</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-xl">
                  <p className="text-sm text-purple-600 font-semibold mb-1">Pages</p>
                  <p className="text-gray-800 font-medium">320 pages</p>
                </div>
                <div className="p-4 bg-pink-50 rounded-xl">
                  <p className="text-sm text-pink-600 font-semibold mb-1">Language</p>
                  <p className="text-gray-800 font-medium">English</p>
                </div>
                <div className="p-4 bg-green-50 rounded-xl">
                  <p className="text-sm text-green-600 font-semibold mb-1">Rating</p>
                  <p className="text-gray-800 font-medium">⭐⭐⭐⭐⭐ (4.8/5)</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-indigo-100">
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleEdit}
                  className="flex-1 min-w-[140px] px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
                >
                  <Edit className="w-5 h-5" />
                  Edit Book
                </button>
                
                <button
                  onClick={handleDelete}
                  className="flex-1 min-w-[140px] px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
                >
                  <Trash2 className="w-5 h-5" />
                  Delete Book
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <Trash2 className="w-8 h-8 text-red-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2 text-center">Delete Book?</h3>
            <p className="text-gray-600 text-center mb-6">
              Are you sure you want to delete "{book.title}"? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}