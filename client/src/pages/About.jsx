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
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl mb-8 shadow-xl animate-bounce-gentle">
              <BookOpenIcon className="w-10 h-10 text-white" />
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