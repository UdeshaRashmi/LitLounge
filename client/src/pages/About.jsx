import React from 'react';
import BookOpenIcon from '@mui/icons-material/MenuBook';
import UsersIcon from '@mui/icons-material/Group';
import HeartIcon from '@mui/icons-material/Favorite';
import GlobeAltIcon from '@mui/icons-material/Public';
import TrophyIcon from '@mui/icons-material/EmojiEvents';
import StarIcon from '@mui/icons-material/Star';
import ArrowTrendingUpIcon from '@mui/icons-material/TrendingUp';

export default function About() {
  const teamMembers = [
    { name: 'Alex Morgan', role: 'Founder & CEO', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex', funFact: 'Reads 100+ books annually' },
    { name: 'Sarah Chen', role: 'Head of Community', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', funFact: 'Former librarian with 15 years experience' },
    { name: 'Marcus Rivera', role: 'Lead Developer', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus', funFact: 'Built first library app at age 16' },
    { name: 'Priya Sharma', role: 'Content Curator', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya', funFact: 'Has visited 50+ literary landmarks worldwide' },
  ];

  const milestones = [
    { year: '2018', event: 'LitLounge founded', description: 'Started as a small book club platform' },
    { year: '2019', event: 'First 100K users', description: 'Community grew to six figures' },
    { year: '2020', event: 'Mobile app launch', description: 'Expanded to iOS and Android' },
    { year: '2021', event: 'AI Recommendations', description: 'Implemented personalized book suggestions' },
    { year: '2022', event: 'Global expansion', description: 'Launched in 50+ countries' },
    { year: '2023', event: '10M+ community', description: 'Reached major milestone of 10 million readers' },
  ];

  const values = [
    { icon: <HeartIcon className="w-8 h-8" />, title: 'Passion for Reading', description: 'We believe every book holds a world waiting to be explored' },
    { icon: <UsersIcon className="w-8 h-8" />, title: 'Inclusive Community', description: 'Creating welcoming spaces for readers of all backgrounds' },
    { icon: <span className="text-amber-400 text-2xl">✨</span>, title: 'Innovation', description: 'Continuously evolving to enhance the reading experience' },
    { icon: <GlobeAltIcon className="w-8 h-8" />, title: 'Global Reach', description: 'Connecting readers across continents and cultures' },
    { icon: <TrophyIcon className="w-8 h-8" />, title: 'Excellence', description: 'Curating only the highest quality content and discussions' },
    { icon: <span className="text-amber-400 text-2xl">🎯</span>, title: 'Accessibility', description: 'Making great literature accessible to everyone' },
  ];

  const stats = [
    { number: '2.5M+', label: 'Active Readers', icon: <UsersIcon className="w-5 h-5" /> },
    { number: '500K+', label: 'Books Catalogued', icon: <BookOpenIcon className="w-5 h-5" /> },
    { number: '150+', label: 'Countries', icon: <GlobeAltIcon className="w-5 h-5" /> },
    { number: '4.9★', label: 'Average Rating', icon: <StarIcon className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 py-20">
        {/* Books-themed background image */}
        <div
          className="absolute inset-0 z-0 bg-fixed bg-center bg-cover"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600&q=80')" }}
          aria-hidden="true"
        />
        {/* subtle pattern/overlay for texture and contrast */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/80 via-orange-50/60 to-amber-100/80"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-28 h-28 md:w-32 md:h-32 rounded-3xl mb-8 shadow-2xl overflow-hidden animate-bounce-gentle border-4 border-white">
              <img
                src="data:image/jpeg;base64,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"
                alt="People connecting"
                loading="eager"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text text-transparent">
                Our Story
              </span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed max-w-3xl mx-auto">
              LitLounge began as a simple idea: create a space where readers could connect, 
              discover amazing books, and share their passion for literature. Today, we're 
              a global community of millions who believe every book opens a door to a new world.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full text-white font-semibold shadow-lg">
              <span className="text-white text-lg">⚡</span>
              Join Our Growing Community
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full opacity-50"></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-amber-300 to-orange-300 rounded-full opacity-30"></div>
                <div className="relative bg-white p-8 rounded-3xl shadow-2xl border border-amber-100">
                  <div className="inline-flex items-center gap-3 mb-6">
                    <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl">
                      <span className="text-white text-lg">🎯</span>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    To empower readers worldwide by creating the most engaging, 
                    inclusive, and innovative platform for discovering, discussing, 
                    and celebrating literature.
                  </p>
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-2xl border-l-4 border-amber-500">
                    <p className="text-gray-800 italic">
                      "We believe that in every book, there's a journey waiting to begin, 
                      and in every reader, a story waiting to be told."
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                {stats.map((stat, index) => (
                  <div 
                    key={stat.label}
                    className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:border-amber-300 transition-all duration-300 hover:scale-[1.02] group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                        <div className="text-gray-600">{stat.label}</div>
                      </div>
                      <div className="p-3 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl group-hover:from-amber-200 group-hover:to-orange-200 transition-colors">
                        <div className="text-amber-600">
                          {stat.icon}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-20 bg-gradient-to-b from-white to-amber-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-4">
                <TrophyIcon className="w-8 h-8 text-amber-600" />
                <h2 className="text-4xl font-bold text-gray-900">Our Core Values</h2>
              </div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                These principles guide everything we do at LitLounge
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div 
                  key={value.title}
                  className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    <div className="text-white">
                      {value.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-700 transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
              <p className="text-lg text-gray-600">From humble beginnings to a global reading community</p>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-amber-500 to-orange-500"></div>
              
              {milestones.map((milestone, index) => (
                <div 
                  key={milestone.year}
                  className={`relative mb-12 ${index % 2 === 0 ? 'pr-12 md:pr-0 md:pl-12' : 'pl-12 md:pl-0 md:pr-12'} ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} animate-fade-in-up`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="md:w-1/2">
                    <div className={`bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:border-amber-300 transition-all duration-300 hover:shadow-xl ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                      <div className="inline-flex items-center gap-3 mb-3">
                        <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg">
                          <span className="text-white font-bold">{milestone.year}</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">{milestone.event}</h3>
                      </div>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-4 border-amber-500 rounded-full shadow-lg"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20 bg-gradient-to-b from-amber-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Passionate book lovers dedicated to building the best reading experience
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div 
                  key={member.name}
                  className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="p-8 text-center">
                        <div className="relative inline-block mb-6">
                          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto">
                            <img 
                              src={member.image} 
                              alt={member.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="absolute -bottom-2 -right-2 p-2 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full">
                            <BookOpenIcon className="w-5 h-5 text-white" />
                          </div>
                        </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-amber-600 font-semibold mb-4">{member.role}</p>
                    
                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-2xl">
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold text-amber-700">Fun Fact:</span> {member.funFact}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-12 shadow-2xl">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-8">
                <span className="text-white text-2xl">✨</span>
              </div>
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Begin Your Reading Journey?
              </h2>
              <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
                Join millions of readers who have found their next favorite book on LitLounge
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-white text-amber-700 font-bold rounded-full hover:bg-amber-50 transition-all duration-300 hover:scale-105 shadow-lg">
                  Start Reading Free
                </button>
                <button className="px-8 py-4 bg-transparent border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  Explore Community
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
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
        
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-10px) scale(1.05); }
        }

        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, rgba(251, 191, 36, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(251, 191, 36, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-bounce-gentle {
          animation: bounce-gentle 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}