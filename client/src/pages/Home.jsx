import React, { useState, useEffect } from 'react';

const Home = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  // Cozy book content
  const bookPages = [
    {
      left: {
        title: "Adventure Awaits",
        illustration: "🦊",
        icons: "📚✨",
        description: "Join Felix the Fox on magical reading journeys through enchanted libraries and discover stories that warm your heart.",
        color: "from-purple-400 to-pink-400"
      },
      right: {
        title: "Mystery Unfolds",
        illustration: "🕵️‍♂️",
        icons: "🔎📖",
        description: "Detective Whiskers solves puzzling cases with the help of ancient books in cozy reading nooks.",
        color: "from-blue-400 to-cyan-400"
      }
    },
    {
      left: {
        title: "Fantasy Realms",
        illustration: "🐉",
        icons: "🏰🌟",
        description: "Dragons and castles come alive in stories of brave knights and magic that transport you to faraway lands.",
        color: "from-red-400 to-orange-400"
      },
      right: {
        title: "Space Explorers",
        illustration: "👩‍🚀",
        icons: "🚀🌌",
        description: "Blast off to distant galaxies with Captain Comet and the Star Squad on interstellar adventures.",
        color: "from-indigo-400 to-purple-400"
      }
    },
    {
      left: {
        title: "Ocean Tales",
        illustration: "🐙",
        icons: "🌊🐠",
        description: "Dive deep with Marina the Mermaid discovering underwater wonders and hidden treasures beneath the waves.",
        color: "from-teal-400 to-blue-400"
      },
      right: {
        title: "Jungle Safari",
        illustration: "🦁",
        icons: "🌴🦜",
        description: "Explore wild adventures with Leo the Lion and tropical friends in lush, vibrant rainforests.",
        color: "from-green-400 to-emerald-400"
      }
    }
  ];

  const nextPage = () => {
    if (currentPage < bookPages.length - 1 && !isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage((p) => p + 1);
        setIsFlipping(false);
      }, 600);
    }
  };
  
  const prevPage = () => {
    if (currentPage > 0 && !isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage((p) => p - 1);
        setIsFlipping(false);
      }, 600);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 text-gray-900 overflow-hidden relative">
      {/* Cozy floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute text-3xl opacity-5 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          >
            {['📚', '☕', '🕯️', '🍂'][Math.floor(Math.random() * 4)]}
          </div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <header className="flex justify-between items-center mb-8 md:mb-12">
          <div className="flex items-center gap-3">
            <span className="text-3xl">📖</span>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              LitLounge
            </h1>
          </div>
          <nav className="hidden md:flex gap-8">
            {['Discover', 'Community', 'Library', 'Reviews'].map((item) => (
              <button key={item} className="text-gray-600 hover:text-amber-600 transition-colors duration-300 relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}
          </nav>
          <button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold px-4 md:px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 shadow-lg text-sm md:text-base">
            Join Now
          </button>
        </header>

        {/* Hero Text */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 md:gap-3 mb-4 md:mb-6 px-3 md:px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full border border-amber-200 shadow-sm">
            <span className="text-amber-600">✨</span>
            <span className="text-amber-700 text-xs md:text-sm font-semibold">10,000+ Books Added This Month</span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
            <span className="bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600 bg-clip-text text-transparent">
              Dive Into Worlds
            </span>
            <br />
            <span className="text-gray-800">Beyond Imagination</span>
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto mb-6 md:mb-10 leading-relaxed px-4">
            Join millions of readers exploring stories, sharing insights, and discovering their next favorite book in our cozy reading community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
            <button className="group bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold px-6 md:px-8 py-3 rounded-full text-base md:text-lg transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-3 w-full sm:w-auto justify-center">
              Start Reading Free
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
            <button className="group border-2 border-amber-400 hover:border-amber-500 hover:bg-amber-50 text-amber-600 hover:text-amber-700 font-semibold px-6 md:px-8 py-3 rounded-full text-base md:text-lg transition-all duration-300 hover:scale-105 flex items-center gap-3 w-full sm:w-auto justify-center">
              <span>🔖</span>
              Explore Premium
            </button>
          </div>
        </div>

        {/* Beautiful Cozy Book */}
        <div className="flex justify-center mb-12 md:mb-16 px-4">
          <div className="relative w-full max-w-4xl">
            {/* Soft shadow under book */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-amber-300/20 blur-3xl rounded-full" />
            
            {/* Book container */}
            <div className="relative bg-gradient-to-br from-amber-100 via-orange-50 to-amber-100 rounded-2xl shadow-2xl p-2 md:p-4 mx-auto" style={{ maxWidth: '800px' }}>
              {/* Decorative corner elements */}
              <div className="absolute -top-3 -left-3 text-2xl md:text-3xl opacity-70 animate-bounce-slow">🌟</div>
              <div className="absolute -top-3 -right-3 text-2xl md:text-3xl opacity-70 animate-bounce-slow" style={{ animationDelay: '0.5s' }}>🦋</div>
              
              {/* Book pages container */}
              <div className="relative bg-white rounded-xl overflow-hidden shadow-inner">
                <div className="flex min-h-[400px] md:min-h-[500px]">
                  {/* Left Page */}
                  <div className="w-1/2 relative bg-gradient-to-br from-amber-50 to-orange-50 p-4 md:p-8 border-r-2 border-amber-200">
                    {/* Paper texture */}
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(251, 191, 36, 0.1) 2px, rgba(251, 191, 36, 0.1) 4px)' }} />
                    
                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col">
                      <div className={`inline-block self-start px-2 md:px-3 py-1 md:py-1.5 rounded-full bg-gradient-to-r ${bookPages[currentPage].left.color} text-white text-xs font-bold mb-2 md:mb-4`}>
                        Chapter {currentPage * 2 + 1}
                      </div>
                      <h3 className="text-lg md:text-2xl font-bold text-gray-800 mb-2 md:mb-4">
                        {bookPages[currentPage].left.title}
                      </h3>
                      <div className="flex flex-col items-center justify-center flex-1 mb-2 md:mb-4">
                        <div className="text-5xl md:text-7xl mb-2 animate-float-gentle">
                          {bookPages[currentPage].left.illustration}
                        </div>
                        <div className="text-2xl md:text-3xl opacity-70">
                          {bookPages[currentPage].left.icons}
                        </div>
                      </div>
                      <p className="text-xs md:text-sm text-gray-700 leading-relaxed mb-2 md:mb-4">
                        {bookPages[currentPage].left.description}
                      </p>
                      <div className="mt-auto text-center text-amber-600 font-semibold text-sm">
                        {currentPage * 2 + 1}
                      </div>
                    </div>
                  </div>

                  {/* Right Page with flip animation */}
                  <div className="w-1/2 relative overflow-hidden">
                    <div 
                      className={`absolute inset-0 transition-all duration-600 ease-in-out ${isFlipping ? 'animate-page-flip' : ''}`}
                      style={{ transformOrigin: 'left center' }}
                    >
                      <div className="relative bg-gradient-to-bl from-amber-50 to-orange-50 p-4 md:p-8 h-full">
                        {/* Paper texture */}
                        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(251, 191, 36, 0.1) 2px, rgba(251, 191, 36, 0.1) 4px)' }} />
                        
                        {/* Content */}
                        <div className="relative z-10 h-full flex flex-col">
                          <div className={`inline-block self-start px-2 md:px-3 py-1 md:py-1.5 rounded-full bg-gradient-to-r ${bookPages[currentPage].right.color} text-white text-xs font-bold mb-2 md:mb-4`}>
                            Chapter {currentPage * 2 + 2}
                          </div>
                          <h3 className="text-lg md:text-2xl font-bold text-gray-800 mb-2 md:mb-4">
                            {bookPages[currentPage].right.title}
                          </h3>
                          <div className="flex flex-col items-center justify-center flex-1 mb-2 md:mb-4">
                            <div className="text-5xl md:text-7xl mb-2 animate-float-gentle" style={{ animationDelay: '0.3s' }}>
                              {bookPages[currentPage].right.illustration}
                            </div>
                            <div className="text-2xl md:text-3xl opacity-70">
                              {bookPages[currentPage].right.icons}
                            </div>
                          </div>
                          <p className="text-xs md:text-sm text-gray-700 leading-relaxed mb-2 md:mb-4">
                            {bookPages[currentPage].right.description}
                          </p>
                          <div className="mt-auto text-center text-amber-600 font-semibold text-sm">
                            {currentPage * 2 + 2}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Book spine */}
                <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-amber-300 via-orange-300 to-amber-300 shadow-md z-10" />
              </div>

              {/* Page depth effect */}
              <div className="absolute inset-2 md:inset-4 bg-amber-200/30 rounded-xl -z-10" style={{ transform: 'translateY(3px)' }} />
              <div className="absolute inset-2 md:inset-4 bg-amber-200/20 rounded-xl -z-20" style={{ transform: 'translateY(6px)' }} />
            </div>

            {/* Navigation buttons */}
            <button
              onClick={prevPage}
              disabled={currentPage === 0 || isFlipping}
              className={`absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 z-20 bg-gradient-to-r from-amber-500 to-orange-500 text-white p-2 md:p-3 rounded-full shadow-lg transition-all duration-300 ${
                currentPage === 0 || isFlipping ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110 hover:shadow-xl active:scale-95'
              }`}
            >
              <span className="text-xl md:text-2xl">‹</span>
            </button>
            <button
              onClick={nextPage}
              disabled={currentPage === bookPages.length - 1 || isFlipping}
              className={`absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 z-20 bg-gradient-to-r from-amber-500 to-orange-500 text-white p-2 md:p-3 rounded-full shadow-lg transition-all duration-300 ${
                currentPage === bookPages.length - 1 || isFlipping ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110 hover:shadow-xl active:scale-95'
              }`}
            >
              <span className="text-xl md:text-2xl">›</span>
            </button>

            {/* Page indicator */}
            <div className="absolute -bottom-8 md:-bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 md:gap-4 bg-white/90 backdrop-blur-sm px-4 md:px-6 py-2 md:py-2.5 rounded-full border border-amber-200 shadow-lg">
              <span className="text-amber-700 font-semibold text-xs md:text-sm">Page {currentPage + 1} of {bookPages.length}</span>
              <div className="flex gap-1.5 md:gap-2">
                {bookPages.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      idx === currentPage ? 'bg-amber-500 scale-125' : 'bg-amber-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16 px-4">
          {[
            { icon: '👥', value: '2.5M+', label: 'Active Readers', color: 'from-blue-400 to-cyan-400' },
            { icon: '📚', value: '500K+', label: 'Books Available', color: 'from-purple-400 to-pink-400' },
            { icon: '⭐', value: '4.9', label: 'Average Rating', color: 'from-yellow-400 to-orange-400' },
            { icon: '📈', value: '98%', label: 'Satisfaction', color: 'from-green-400 to-emerald-400' }
          ].map((stat) => (
            <div 
              key={stat.label} 
              className="group bg-white/80 backdrop-blur-sm border border-amber-200 rounded-xl p-4 md:p-6 text-center hover:bg-white transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-lg"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br ${stat.color} rounded-full mb-3 md:mb-4 group-hover:scale-110 transition-transform text-2xl md:text-3xl`}>
                {stat.icon}
              </div>
              <div className="text-xl md:text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
              <div className="text-xs md:text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="max-w-4xl mx-auto mb-12 md:mb-16 px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-10 text-gray-800">
            Why Readers <span className="text-amber-600">Love LitLounge</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
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
                className={`group bg-gradient-to-br ${feature.color} border border-amber-200 rounded-xl p-5 md:p-6 hover:border-amber-300 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}
              >
                <div className="text-3xl md:text-4xl mb-3 md:mb-4 group-hover:scale-110 transition-transform inline-block">
                  {feature.emoji}
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center px-4">
          <div className="bg-gradient-to-r from-amber-100 via-orange-100 to-amber-100 rounded-2xl p-6 md:p-10 border-2 border-amber-200 shadow-xl max-w-3xl mx-auto">
            <div className="text-4xl md:text-5xl mb-4">☕📖</div>
            <h3 className="text-xl md:text-3xl font-bold text-gray-800 mb-3 md:mb-4">Ready to start your reading journey?</h3>
            <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8">Join our community of passionate readers today and discover your next favorite book.</p>
            <button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold px-6 md:px-10 py-3 md:py-4 rounded-full text-base md:text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
              Get Started For Free
            </button>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .animate-float {
          animation: float infinite ease-in-out;
        }
        
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float-gentle {
          animation: float-gentle 3s infinite ease-in-out;
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s infinite ease-in-out;
        }
        
        @keyframes page-flip {
          0% { 
            transform: perspective(1000px) rotateY(0deg);
            opacity: 1;
          }
          50% { 
            transform: perspective(1000px) rotateY(-90deg);
            opacity: 0.5;
          }
          100% { 
            transform: perspective(1000px) rotateY(0deg);
            opacity: 1;
          }
        }
        .animate-page-flip {
          animation: page-flip 0.6s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Home;