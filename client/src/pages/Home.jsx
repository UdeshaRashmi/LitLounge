import React, { useState, useRef, useEffect } from 'react';
import { BookOpenIcon, MagnifyingGlassIcon, UsersIcon, StarIcon, ChevronRightIcon, ArrowTrendingUpIcon, BookmarkIcon } from '@heroicons/react/24/outline';

const AnimatedBookHero = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const bookRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!bookRef.current) return;
      
      const rect = bookRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      setMousePos({
        x: (e.clientX - centerX) / 100,
        y: (e.clientY - centerY) / 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-amber-400/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header */}
        <header className="flex justify-between items-center mb-16 animate-fade-in">
          <div className="flex items-center gap-3">
            <BookOpenIcon className="w-8 h-8 text-amber-400" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              LitLounge
            </h1>
          </div>
          
          <nav className="hidden md:flex gap-8">
            {['Discover', 'Community', 'Library', 'Reviews'].map((item) => (
              <a key={item} href="#" className="hover:text-amber-400 transition-colors duration-300">
                {item}
              </a>
            ))}
          </nav>
          
          <button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-amber-500/30">
            Join Now
          </button>
        </header>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto">
          {/* Hero Text */}
          <div className="text-center mb-20">
              <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-amber-500/10 rounded-full border border-amber-500/20 animate-bounce-gentle">
              <span className="text-amber-400">✨</span>
              <span className="text-amber-300 text-sm font-semibold">10,000+ Books Added This Month</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in-up">
              <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-amber-300 bg-clip-text text-transparent animate-text-glow">
                Dive Into Worlds
              </span>
              <br />
              <span className="text-white">Beyond Imagination</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed animate-text-reveal" style={{ animationDelay: '0.2s' }}>
              Join millions of readers exploring stories, sharing insights, and discovering their next favorite book in our vibrant literary community.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-text-reveal" style={{ animationDelay: '0.4s' }}>
              <button className="group bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold px-8 py-4 rounded-full text-lg transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-amber-500/40 flex items-center gap-3">
                Start Reading Free
                <ChevronRightIcon className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
              
              <button className="group border-2 border-amber-500/30 hover:border-amber-400 text-amber-300 hover:text-amber-200 font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 hover:scale-105 flex items-center gap-3">
                <BookmarkIcon className="w-5 h-5 group-hover:text-amber-400" />
                Explore Premium
              </button>
            </div>
          </div>

          {/* Enhanced 3D Book Display */}
          <div className="flex justify-center mb-16 perspective-2000">
            <div
              ref={bookRef}
              className="relative transition-transform duration-500 ease-out"
              style={{
                transform: `rotateY(${mousePos.x * 1.5}deg) rotateX(${-mousePos.y * 1.5}deg) translateZ(80px)`,
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Main Book with Enhanced Shadow */}
              <div className="relative w-72 h-96 animate-book-float-enhanced">
                {/* Ambient Shadow */}
                <div className="absolute inset-0 bg-black/40 blur-3xl rounded-lg" 
                     style={{ transform: 'translateZ(-80px) scale(1.2)' }} />
                
                {/* Book Cover with Embossed Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-600 via-orange-700 to-amber-900 rounded-r-lg shadow-2xl overflow-hidden"
                     style={{ transform: 'translateZ(35px)' }}>
                  {/* Leather texture overlay */}
                  <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-transparent via-white/10 to-transparent" />
                  
                  {/* Highlight reflection */}
                  <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/30 to-transparent" />
                  
                  <div className="p-8 h-full flex flex-col justify-between relative z-10">
                    <div>
                      <div className="relative inline-block mb-6">
                        <BookOpenIcon className="w-14 h-14 text-amber-100 animate-book-icon" />
                        <div className="absolute inset-0 bg-amber-300 blur-lg opacity-50 animate-pulse" />
                      </div>
                      <h3 className="text-amber-50 font-bold text-2xl mb-3 drop-shadow-lg animate-text-glow">
                        Your Next Adventure
                      </h3>
                      <p className="text-amber-200 text-base drop-shadow-md">Awaits Within</p>
                    </div>
                    
                    {/* Decorative elements */}
                    <div>
                      <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <div 
                            key={i} 
                            className="w-2 h-10 bg-gradient-to-b from-amber-300 to-amber-400 rounded-full shadow-lg animate-bar-wave"
                            style={{ animationDelay: `${i * 0.1}s` }}
                          />
                        ))}
                      </div>
                      <div className="h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
                    </div>
                  </div>
                  
                  {/* Corner decoration */}
                  <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-amber-300 opacity-40" />
                  <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-amber-300 opacity-40" />
                </div>
                
                {/* Enhanced Book Spine */}
                <div className="absolute left-0 top-0 w-10 h-96 bg-gradient-to-b from-amber-800 via-orange-900 to-amber-950 rounded-l-lg shadow-2xl"
                     style={{ 
                       transform: 'translateX(-40px) rotateY(-90deg)', 
                       transformOrigin: 'right',
                       boxShadow: 'inset 2px 0 8px rgba(0,0,0,0.5)'
                     }}>
                  <div className="h-full flex items-center justify-center relative">
                    {/* Spine ridges */}
                    <div className="absolute inset-y-8 left-1/2 w-px bg-amber-600 opacity-30" />
                    <p className="text-amber-100 text-sm font-bold transform rotate-180 writing-mode-vertical drop-shadow-lg">
                      LitLounge
                    </p>
                  </div>
                </div>
                
                {/* Enhanced Book Pages with Realistic Depth */}
                <div className="absolute right-0 top-0 w-72 h-96 bg-amber-50 rounded-r-lg overflow-hidden"
                     style={{ transform: 'translateZ(34px)' }}>
                  {/* Page edge gradient */}
                  <div className="absolute right-0 top-0 h-full w-4 bg-gradient-to-l from-amber-200/50 to-transparent" />
                  
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute right-0 h-full w-full bg-gradient-to-r from-amber-50 to-white border-r border-amber-200/50"
                      style={{
                        transform: `translateZ(-${i * 1.5}px) translateX(-${i * 0.3}px)`,
                        opacity: 1 - i * 0.04,
                        boxShadow: '1px 0 2px rgba(0,0,0,0.1)'
                      }}
                    />
                  ))}
                </div>
                
                {/* Magical particles around book */}
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-amber-400 rounded-full animate-orbit-book shadow-lg"
                    style={{
                      animationDelay: `${i * 0.5}s`,
                      animationDuration: '4s',
                      left: '50%',
                      top: '50%'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20">
            {[
              { icon: <UsersIcon className="w-8 h-8" />, value: '2.5M+', label: 'Active Readers' },
              { icon: <BookOpenIcon className="w-8 h-8" />, value: '500K+', label: 'Books Available' },
              { icon: <StarIcon className="w-8 h-8" />, value: '4.9', label: 'Average Rating' },
              { icon: <ArrowTrendingUpIcon className="w-8 h-8" />, value: '98%', label: 'Satisfaction' }
            ].map((stat, index) => (
              <div 
                key={stat.label} 
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: `${0.6 + index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-full mb-4">
                  <div className="text-amber-400">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in-up" style={{ animationDelay: '1s' }}>
              Why Readers <span className="text-amber-400">Love LitLounge</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: 'Personalized Recommendations',
                  description: 'AI-powered suggestions based on your reading history and preferences',
                  icon: <span className="text-amber-400">✨</span>
                },
                {
                  title: 'Global Book Clubs',
                  description: 'Join discussions with readers from around the world',
                  icon: <UsersIcon className="w-6 h-6" />
                },
                {
                  title: 'Advanced Search',
                  description: 'Find exactly what you\'re looking for with our intelligent filters',
                  icon: <MagnifyingGlassIcon className="w-6 h-6" />
                },
                {
                  title: 'Progress Tracking',
                  description: 'Monitor your reading habits and set personal goals',
                  icon: <ArrowTrendingUpIcon className="w-6 h-6" />
                }
              ].map((feature, index) => (
                <div 
                  key={feature.title}
                  className="group bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-2xl p-6 hover:border-amber-500/30 transition-all duration-300 hover:scale-[1.02] animate-fade-in-up"
                  style={{ animationDelay: `${1.2 + index * 0.1}s` }}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-xl mb-4 group-hover:from-amber-500/30 group-hover:to-orange-500/30">
                    <div className="text-amber-400 group-hover:text-amber-300">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Animated Pages */}
      <div className="absolute bottom-10 right-10 hidden lg:block">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-24 h-32 bg-gradient-to-br from-amber-100 to-amber-50 rounded-lg shadow-2xl ${
              i === 0 ? 'animate-page-flip-enhanced' : 'animate-page-flip-back-enhanced'
            }`}
            style={{
              animationDelay: `${i * 2}s`,
              animationDuration: '8s',
              animationIterationCount: 'infinite',
              transform: `translateY(${i * 20}px) translateX(${i * 40}px) rotate(${i * 5}deg)`,
              zIndex: 3 - i
            }}
          >
            <div className="h-full p-4">
              <div className="space-y-2">
                <div className="h-2 bg-amber-300/30 rounded-full"></div>
                <div className="h-2 bg-amber-300/20 rounded-full w-3/4"></div>
                <div className="h-2 bg-amber-300/20 rounded-full w-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        
        @keyframes book-float-enhanced {
          0%, 100% { transform: translateY(0px) rotateZ(0deg); }
          25% { transform: translateY(-10px) rotateZ(1deg); }
          50% { transform: translateY(-20px) rotateZ(0deg); }
          75% { transform: translateY(-10px) rotateZ(-1deg); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fade-in-up {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-10px) scale(1.05); }
        }
        
        @keyframes page-flip-enhanced {
          0% { 
            transform: rotateY(0deg) translateZ(0px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          }
          25% {
            box-shadow: -10px 10px 30px rgba(0,0,0,0.3);
          }
          50% { 
            transform: rotateY(-90deg) translateZ(50px) translateX(30px);
            box-shadow: -20px 10px 40px rgba(0,0,0,0.4);
          }
          75% {
            box-shadow: -10px 10px 30px rgba(0,0,0,0.3);
          }
          100% { 
            transform: rotateY(-180deg) translateZ(0px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          }
        }
        
        @keyframes page-flip-back-enhanced {
          0% { 
            transform: rotateY(-180deg) translateZ(0px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          }
          25% {
            box-shadow: -10px 10px 30px rgba(0,0,0,0.3);
          }
          50% { 
            transform: rotateY(-90deg) translateZ(50px) translateX(30px);
            box-shadow: -20px 10px 40px rgba(0,0,0,0.4);
          }
          75% {
            box-shadow: -10px 10px 30px rgba(0,0,0,0.3);
          }
          100% { 
            transform: rotateY(0deg) translateZ(0px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          }
        }
        
        @keyframes book-icon {
          0%, 100% { transform: scale(1) rotate(0deg); }
          25% { transform: scale(1.1) rotate(-5deg); }
          75% { transform: scale(1.1) rotate(5deg); }
        }
        
        @keyframes text-glow {
          0%, 100% { text-shadow: 0 0 10px rgba(251,191,36,0.3); }
          50% { text-shadow: 0 0 20px rgba(251,191,36,0.6), 0 0 30px rgba(251,191,36,0.4); }
        }
        
        @keyframes bar-wave {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.3); }
        }
        
        @keyframes orbit-book {
          0% { 
            transform: translate(-50%, -50%) rotate(0deg) translateX(150px) rotate(0deg);
            opacity: 0;
          }
          25% {
            opacity: 1;
          }
          75% {
            opacity: 1;
          }
          100% { 
            transform: translate(-50%, -50%) rotate(360deg) translateX(150px) rotate(-360deg);
            opacity: 0;
          }
        }
        
        @keyframes text-reveal {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-book-float-enhanced {
          animation: book-float-enhanced 6s ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
        
        .animate-bounce-gentle {
          animation: bounce-gentle 3s ease-in-out infinite;
        }
        
        .animate-page-flip-enhanced {
          animation: page-flip-enhanced 8s ease-in-out infinite;
        }
        
        .animate-page-flip-back-enhanced {
          animation: page-flip-back-enhanced 8s ease-in-out infinite;
        }
        
        .animate-book-icon {
          animation: book-icon 2s ease-in-out infinite;
        }
        
        .animate-text-glow {
          animation: text-glow 3s ease-in-out infinite;
        }
        
        .animate-bar-wave {
          animation: bar-wave 1s ease-in-out infinite;
        }
        
        .animate-orbit-book {
          animation: orbit-book 4s linear infinite;
        }
        
        .animate-text-reveal {
          animation: text-reveal 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .perspective-2000 {
          perspective: 2000px;
        }
        
        .writing-mode-vertical {
          writing-mode: vertical-rl;
        }
      `}</style>
    </div>
  );
};

export default AnimatedBookHero;