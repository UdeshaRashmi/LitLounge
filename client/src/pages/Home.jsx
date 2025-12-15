 import React, { useState, useRef, useEffect } from 'react';

const Home = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState(null); // 'next' | 'prev' | null
  const bookRef = useRef(null);

  // Cartoon book content
  const bookPages = [
    {
      left: {
        title: "Adventure Awaits",
        illustration: (
          <div className="text-9xl md:text-[6rem] animate-character-bounce drop-shadow-2xl">
            <div className="transform-gpu rotate-3">🦊</div>
            <div className="-mt-4 text-4xl opacity-80">📚✨</div>
          </div>
        ),
        description: "Join Felix the Fox on magical reading journeys through enchanted libraries.",
        color: "from-purple-500 to-pink-500"
      },
      right: {
        title: "Mystery Unfolds",
        illustration: (
          <div className="text-9xl md:text-[6rem] animate-character-bounce drop-shadow-2xl">
            <div className="transform-gpu -rotate-3">🕵️‍♂️</div>
            <div className="-mt-4 text-4xl opacity-80">🔎📖</div>
          </div>
        ),
        description: "Detective Whiskers solves puzzling cases with the help of ancient books.",
        color: "from-blue-500 to-cyan-500"
      }
    },
    {
      left: {
        title: "Fantasy Realms",
        illustration: (
          <div className="text-9xl md:text-[6rem] animate-character-bounce drop-shadow-2xl">
            <div className="transform-gpu rotate-6">🐉</div>
            <div className="-mt-4 text-4xl opacity-80">🏰🌟</div>
          </div>
        ),
        description: "Dragons and castles come alive in stories of brave knights and magic.",
        color: "from-red-500 to-orange-500"
      },
      right: {
        title: "Space Explorers",
        illustration: (
          <div className="text-9xl md:text-[6rem] animate-character-bounce drop-shadow-2xl">
            <div className="transform-gpu -rotate-6">👩‍🚀</div>
            <div className="-mt-4 text-4xl opacity-80">🚀🌌</div>
          </div>
        ),
        description: "Blast off to distant galaxies with Captain Comet and the Star Squad.",
        color: "from-indigo-500 to-purple-500"
      }
    },
    {
      left: {
        title: "Ocean Tales",
        illustration: (
          <div className="text-9xl md:text-[6rem] animate-character-bounce drop-shadow-2xl">
            <div className="transform-gpu rotate-2">🐙</div>
            <div className="-mt-4 text-4xl opacity-80">🌊🐠</div>
          </div>
        ),
        description: "Dive deep with Marina the Mermaid discovering underwater wonders.",
        color: "from-teal-500 to-blue-500"
      },
      right: {
        title: "Jungle Safari",
        illustration: (
          <div className="text-9xl md:text-[6rem] animate-character-bounce drop-shadow-2xl">
            <div className="transform-gpu -rotate-2">🦁</div>
            <div className="-mt-4 text-4xl opacity-80">🌴🦜</div>
          </div>
        ),
        description: "Explore wild adventures with Leo the Lion and tropical friends.",
        color: "from-green-500 to-emerald-500"
      }
    }
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!bookRef.current) return;
      const rect = bookRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      setMousePos({
        x: (e.clientX - centerX) / 80,
        y: (e.clientY - centerY) / 80
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const nextPage = () => {
    if (currentPage < bookPages.length - 1 && !isFlipping) {
      setFlipDirection('next');
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage((p) => p + 1);
        setIsFlipping(false);
        setFlipDirection(null);
      }, 1200);
    }
  };
  const prevPage = () => {
    if (currentPage > 0 && !isFlipping) {
      setFlipDirection('prev');
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage((p) => p - 1);
        setIsFlipping(false);
        setFlipDirection(null);
      }, 1200);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-blue-50 text-gray-900 overflow-hidden relative">
      {/* Floating book particles (animated) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(16)].map((_, i) => (
          <div
            key={i}
            className="absolute text-2xl opacity-10 animate-float-random"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 20}s`
            }}
          >
            📚
          </div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 text-amber-600 inline-block">📚</span>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              LitLounge
            </h1>
          </div>
          {/* Fake nav */}
          <nav className="hidden md:flex gap-8">
            {['Discover', 'Community', 'Library', 'Reviews'].map((item) => (
              <button key={item} className="text-gray-600 hover:text-amber-600 transition-colors duration-300 relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}
          </nav>
          <button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 shadow-md">
            Join Now
          </button>
        </header>
        {/* Hero Text */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-amber-100 rounded-full border border-amber-200">
            <span className="w-4 h-4 text-amber-600 inline-block">✨</span>
            <span className="text-amber-700 text-sm font-semibold">10,000+ Books Added This Month</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600 bg-clip-text text-transparent">
              Dive Into Worlds
            </span>
            <br />
            <span className="text-gray-800">Beyond Imagination</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            Join millions of readers exploring stories, sharing insights, and discovering their next favorite book.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold px-8 py-3 rounded-full text-lg transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-3">
              Start Reading Free
              <span className="w-5 h-5 group-hover:translate-x-2 transition-transform inline-block">›</span>
            </button>
            <button className="group border-2 border-amber-400 hover:border-amber-500 text-amber-600 hover:text-amber-700 font-semibold px-8 py-3 rounded-full text-lg transition-all duration-300 hover:scale-105 flex items-center gap-3">
              <span className="w-5 h-5 group-hover:text-amber-600 inline-block">🔖</span>
              Explore Premium
            </button>
          </div>
        </div>

        {/* Animated 3D Book with Pages */}
        <div className="flex justify-center mb-16">
          <div className="relative" style={{ width: 'min(900px, 90vw)', height: 'min(550px, 60vh)' }}>
            {/* Main Book Container */}
            <div
              ref={bookRef}
              className="absolute inset-0 flex items-center justify-center select-none"
              style={{
                transform: `rotateY(${mousePos.x}deg) rotateX(${-mousePos.y}deg)`,
                transformStyle: 'preserve-3d',
                transition: 'transform 0.3s ease-out'
              }}
            >
              {/* Book Base */}
              <div className="relative" style={{ width: 'min(800px, 85vw)', height: 'min(480px, 55vh)', transformStyle: 'preserve-3d' }}>
                {/* Shadow under book */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-4/5 h-16 bg-gray-300/40 blur-2xl rounded-full" />
                {/* Book Cover/Pages Container */}
                <div className="relative w-full h-full bg-gradient-to-br from-amber-100 via-orange-50 to-amber-100 rounded-2xl shadow-xl p-4"
                     style={{ 
                       transform: 'translateZ(0px)',
                       boxShadow: '0 25px 50px rgba(0,0,0,0.1)'
                     }}>
                  {/* Inner Pages Display */}
                  <div className="relative w-full h-full flex">
                    {/* Left Page */}
                    <div className="w-1/2 bg-gradient-to-br from-amber-50 to-orange-50 rounded-l-xl p-6 shadow-lg border-r-2 border-amber-300 relative overflow-hidden"
                         style={{ 
                           transform: 'translateZ(10px)',
                           boxShadow: 'inset -8px 0 16px rgba(0,0,0,0.05)'
                         }}>
                      {/* Paper texture */}
                      <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-amber-100 to-transparent" />
                      {/* Margin line */}
                      <div className="absolute left-10 top-6 bottom-6 w-px bg-red-200" />
                      <div className="relative z-10 h-full flex flex-col">
                        <div className={`inline-block self-start px-3 py-1.5 rounded-full bg-gradient-to-r ${bookPages[currentPage].left.color} text-white text-xs font-bold mb-3`}>
                          Chapter {currentPage * 2 + 1}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">
                          {bookPages[currentPage].left.title}
                        </h3>
                        <div className="text-6xl md:text-7xl mb-4 text-center">
                          {bookPages[currentPage].left.illustration}
                        </div>
                        <p className="text-base text-gray-700 leading-relaxed">
                          {bookPages[currentPage].left.description}
                        </p>
                        <div className="mt-auto pt-3 text-center text-amber-600 font-semibold">
                          {currentPage * 2 + 1}
                        </div>
                      </div>
                    </div>
                    {/* Right Page */}
                    <div className="w-1/2 relative" style={{ transformStyle: 'preserve-3d' }}>
                      <div
                        className={`absolute inset-0 rounded-r-xl overflow-hidden
                          ${isFlipping ? 'animate-page-turn' : ''}`}
                        style={{ 
                          transformStyle: 'preserve-3d',
                          transformOrigin: 'left center',
                          willChange: 'transform'
                        }}
                      >
                        {/* Front of page */}
                        <div className="absolute inset-0 bg-gradient-to-bl from-amber-50 to-orange-50 p-6 shadow-lg border-l-2 border-amber-300 page-front"
                             style={{ 
                               transform: 'translateZ(10px) rotateY(0deg)',
                               backfaceVisibility: 'hidden',
                               WebkitBackfaceVisibility: 'hidden',
                               boxShadow: 'inset 8px 0 16px rgba(0,0,0,0.05), 0 8px 25px rgba(0,0,0,0.1)',
                               zIndex: 30
                             }}>
                          <div className="absolute inset-0 opacity-30 bg-gradient-to-bl from-amber-100 to-transparent" />
                          <div className="absolute right-10 top-6 bottom-6 w-px bg-red-200" />
                          <div className="relative z-10 h-full flex flex-col">
                            <div className={`inline-block self-start px-3 py-1.5 rounded-full bg-gradient-to-r ${bookPages[currentPage].right.color} text-white text-xs font-bold mb-3`}>
                              Chapter {currentPage * 2 + 2}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">
                              {bookPages[currentPage].right.title}
                            </h3>
                            <div className="text-6xl md:text-7xl mb-4 text-center">
                              {bookPages[currentPage].right.illustration}
                            </div>
                            <p className="text-base text-gray-700 leading-relaxed">
                              {bookPages[currentPage].right.description}
                            </p>
                            <div className="mt-auto pt-3 text-center text-amber-600 font-semibold">
                              {currentPage * 2 + 2}
                            </div>
                          </div>
                        </div>
                        {/* Back of page (visible during flip) */}
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-orange-50 p-6 page-back"
                             style={{ 
                               transform: 'translateZ(10px) rotateY(180deg)',
                               backfaceVisibility: 'hidden',
                               WebkitBackfaceVisibility: 'hidden',
                               zIndex: 20
                             }}>
                          <div className="h-full flex flex-col items-center justify-center text-center">
                            {
                              (() => {
                                // determine which page to preview on the back face
                                let back = bookPages[currentPage].right;
                                if (flipDirection === 'next' && currentPage < bookPages.length - 1) {
                                  back = bookPages[currentPage + 1].right;
                                } else if (flipDirection === 'prev' && currentPage > 0) {
                                  back = bookPages[currentPage - 1].right;
                                }
                                return (
                                  <>
                                    <div className="text-6xl md:text-7xl mb-4">{back.illustration}</div>
                                    <h4 className="text-xl font-bold text-amber-600 mb-2">{back.title}</h4>
                                    <p className="text-sm text-gray-700 max-w-xs">{back.description}</p>
                                  </>
                                );
                              })()
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Book Spine in Center */}
                    <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-2 bg-gradient-to-b from-amber-300 via-orange-300 to-amber-300 rounded-full shadow-lg"
                         style={{ transform: 'translateZ(15px)' }} />
                  </div>
                  {/* Book depth pages */}
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute inset-4 bg-amber-50 rounded-lg border border-amber-200"
                      style={{
                        transform: `translateZ(-${i * 1.5}px)`,
                        opacity: 1 - i * 0.1
                      }}
                    />
                  ))}
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-8 -right-8 text-5xl text-amber-200">🦋</div>
                <div className="absolute -top-10 -left-10 text-4xl text-amber-200">⭐</div>
              </div>
            </div>
            {/* Navigation Buttons */}
            <button
              onClick={prevPage}
              disabled={currentPage === 0 || isFlipping}
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-gradient-to-r from-amber-500 to-orange-500 text-white p-3 rounded-full shadow-lg transition-all duration-300
                ${currentPage === 0 || isFlipping ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110 hover:shadow-amber-500/50 active:scale-95'}`}
            >
              <span className="w-6 h-6 inline-block">‹</span>
            </button>
            <button
              onClick={nextPage}
              disabled={currentPage === bookPages.length - 1 || isFlipping}
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-gradient-to-r from-amber-500 to-orange-500 text-white p-3 rounded-full shadow-lg transition-all duration-300
                ${currentPage === bookPages.length - 1 || isFlipping ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110 hover:shadow-amber-500/50 active:scale-95'}`}
            >
              <span className="w-6 h-6 inline-block">›</span>
            </button>
            {/* Page indicator */}
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white/80 backdrop-blur-sm px-5 py-2.5 rounded-full border border-amber-200 shadow-md">
              <span className="text-amber-700 font-semibold">Page {currentPage + 1} of {bookPages.length}</span>
              <div className="flex gap-2">
                {bookPages.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      idx === currentPage ? 'bg-amber-500 scale-125' : 'bg-amber-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section (optional: remove if not needed) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            { icon: <span className="w-7 h-7 inline-block">👥</span>, value: '2.5M+', label: 'Active Readers', color: 'from-blue-400 to-cyan-400' },
            { icon: <span className="w-7 h-7 inline-block">📚</span>, value: '500K+', label: 'Books Available', color: 'from-purple-400 to-pink-400' },
            { icon: <span className="w-7 h-7 inline-block">⭐</span>, value: '4.9', label: 'Average Rating', color: 'from-yellow-400 to-orange-400' },
            { icon: <span className="w-7 h-7 inline-block">📈</span>, value: '98%', label: 'Satisfaction', color: 'from-green-400 to-emerald-400' }
          ].map((stat, index) => (
            <div 
              key={stat.label} 
              className="group bg-white border border-gray-200 rounded-xl p-5 text-center hover:bg-amber-50 transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md"
            >
              <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${stat.color} rounded-full mb-4 group-hover:scale-110 transition-transform`}>
                <div className="text-white">
                  {stat.icon}
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10 text-gray-800">
            Why Readers <span className="text-amber-600">Love LitLounge</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Personalized Recommendations',
                description: 'AI-powered suggestions based on your reading history and preferences',
                emoji: '🎯',
                color: 'from-purple-50 to-pink-50'
              },
              {
                title: 'Global Book Clubs',
                description: 'Join discussions with readers from around the world',
                emoji: '🌍',
                color: 'from-blue-50 to-cyan-50'
              },
              {
                title: 'Advanced Search',
                description: 'Find exactly what you\'re looking for with intelligent filters',
                emoji: '🔍',
                color: 'from-orange-50 to-red-50'
              },
              {
                title: 'Progress Tracking',
                description: 'Monitor your reading habits and set personal goals',
                emoji: '📊',
                color: 'from-green-50 to-emerald-50'
              }
            ].map((feature) => (
              <div 
                key={feature.title}
                className={`group bg-gradient-to-br ${feature.color} border border-gray-200 rounded-xl p-5 hover:border-amber-300 transition-all duration-300 hover:scale-[1.02]`}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform inline-block">
                  {feature.emoji}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl p-8 border border-amber-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to start your reading journey?</h3>
            <p className="text-gray-600 mb-6">Join our community of passionate readers today.</p>
            <button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold px-8 py-3 rounded-full text-lg transition-all duration-300 hover:scale-105 shadow-lg">
              Get Started For Free
            </button>
          </div>
        </div>
      </div>
      {/* Inline styles and keyframes */}
      <style>{`
        @keyframes page-turn {
          0% { 
            transform: translateZ(10px) rotateY(0deg);
            filter: brightness(1);
          }
          50% { 
            transform: translateZ(50px) rotateY(-90deg);
            filter: brightness(0.9);
          }
          100% { 
            transform: translateZ(10px) rotateY(-180deg);
            filter: brightness(1);
          }
        }
        .animate-page-turn {
          animation: page-turn 1.2s cubic-bezier(0.4, 0.0, 0.2, 1) forwards;
        }
        @keyframes float-random {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 0.1; }
          25% { transform: translate(50px, -50px) rotate(90deg); opacity: 0.2; }
          50% { transform: translate(100px, 20px) rotate(180deg); opacity: 0.1; }
          75% { transform: translate(30px, -80px) rotate(270deg); opacity: 0.2; }
          100% { transform: translate(0, 0) rotate(360deg); opacity: 0.1; }
        }
        .animate-float-random {
          animation: float-random infinite linear;
        }
      `}</style>
    </div>
  );
};

export default Home;