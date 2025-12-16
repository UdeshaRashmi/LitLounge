import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import {
  BookOpenIcon,
  PlusCircleIcon,
  HomeIcon,
  InformationCircleIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  DocumentTextIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";
import {
  BookOpenIcon as BookOpenIconSolid,
  HomeIcon as HomeIconSolid,
  DocumentTextIcon as DocumentTextIconSolid,
} from "@heroicons/react/24/solid";
import { getBooks, getReadingList, subscribeReadingList, subscribeBooks } from '../data/books';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeHover, setActiveHover] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [booksCount, setBooksCount] = useState(getBooks().length);
  const [readingCount, setReadingCount] = useState(getReadingList().length);
  const location = useLocation();
  const params = useParams();

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Rotate a short list of book quotes in the header
  useEffect(() => {
    const quotes = [
      { text: 'A room without books is like a body without a soul.', author: '— Cicero' },
      { text: 'So many books, so little time.', author: '— Frank Zappa' },
      { text: "There is no friend as loyal as a book.", author: '— Ernest Hemingway' },
    ];
    const interval = setInterval(() => {
      setQuoteIndex((i) => (i + 1) % quotes.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // subscribe to book/reading list changes so badges update reactively
  useEffect(() => {
    const unsubBooks = subscribeBooks((list) => setBooksCount(list.length));
    const unsubReading = subscribeReadingList((list) => setReadingCount(list.length));
    return () => {
      unsubBooks && unsubBooks();
      unsubReading && unsubReading();
    };
  }, []);

  const navigationLinks = [
    {
      name: "Home",
      path: "/",
      icon: collapsed ? (
        location.pathname === "/" ? (
          <HomeIconSolid className="w-5 h-5" />
        ) : (
          <HomeIcon className="w-5 h-5" />
        )
      ) : location.pathname === "/" ? (
        <HomeIconSolid className="w-5 h-5 mr-3" />
      ) : (
        <HomeIcon className="w-5 h-5 mr-3" />
      ),
      description: "Overview of your library",
      badge: null,
    },
    {
      name: "Book List",
      path: "/books",
      icon: collapsed ? (
        location.pathname.startsWith("/books") && 
        !location.pathname.includes("/books/add") && 
        !location.pathname.match(/\/books\/\d+/) ? (
          <BookOpenIconSolid className="w-5 h-5" />
        ) : (
          <BookOpenIcon className="w-5 h-5" />
        )
      ) : location.pathname.startsWith("/books") && 
         !location.pathname.includes("/books/add") && 
         !location.pathname.match(/\/books\/\d+/) ? (
        <BookOpenIconSolid className="w-5 h-5 mr-3" />
      ) : (
        <BookOpenIcon className="w-5 h-5 mr-3" />
      ),
      description: "Browse all books",
      badge: String(booksCount),
    },
    {
      name: "Add Book",
      path: "/books/add",
      icon: <PlusCircleIcon className={`w-5 h-5 ${collapsed ? "" : "mr-3"}`} />,
      description: "Add a new book to collection",
      badge: null,
    },
    {
      name: "Book Details",
      path: `/books/${params.id || "1"}`,
      icon: collapsed ? (
        location.pathname.match(/\/books\/\d+/) ? (
          <DocumentTextIconSolid className="w-5 h-5" />
        ) : (
          <DocumentTextIcon className="w-5 h-5" />
        )
      ) : location.pathname.match(/\/books\/\d+/) ? (
        <DocumentTextIconSolid className="w-5 h-5 mr-3" />
      ) : (
        <DocumentTextIcon className="w-5 h-5 mr-3" />
      ),
      description: "View book details",
      badge: null,
    },
    {
      name: "Reading List",
      path: "/reading-list",
      icon: <BookmarkIcon className={`w-5 h-5 ${collapsed ? "" : "mr-3"}`} />,
      description: "Books you plan to read",
      badge: String(readingCount),
    },
  ];

  const secondaryLinks = [
    {
      name: "Profile",
      path: "/profile",
      icon: <UserCircleIcon className={`w-5 h-5 ${collapsed ? "" : "mr-3"}`} />,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <Cog6ToothIcon className={`w-5 h-5 ${collapsed ? "" : "mr-3"}`} />,
    },
    {
      name: "About",
      path: "/about",
      icon: (
        <InformationCircleIcon className={`w-5 h-5 ${collapsed ? "" : "mr-3"}`} />
      ),
    },
  ];

  // Don't collapse on mobile - instead use a drawer
  if (isMobile) {
    return (
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200">
        <nav className="flex justify-around items-center py-2">
          {navigationLinks.slice(0, 4).map((link) => (
            <NavLink
              key={link.path}
              to={link.path === `/books/${params.id || "1"}` ? 
                (params.id ? `/books/${params.id}` : "/books/1") : 
                link.path}
              className={({ isActive }) =>
                `flex flex-col items-center p-2 rounded-lg transition-all ${
                  isActive
                    ? "text-indigo-600"
                    : "text-gray-600 hover:text-indigo-500"
                }`
              }
            >
              <div className="relative">
                {React.cloneElement(link.icon, {
                  className: `w-5 h-5 ${link.name === "Book Details" && params.id ? "text-indigo-600" : ""}`
                })}
                {link.badge && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {link.badge}
                  </span>
                )}
              </div>
              <span className="text-xs mt-1 font-medium">{link.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    );
  }

  return (
    <>
      <aside
        className={`hidden md:flex flex-col bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 transition-all duration-300 ease-in-out sticky top-0 h-screen ${
          collapsed ? "w-16" : "w-64"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {!collapsed && (
            <div className="flex flex-col">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <BookOpenIconSolid className="w-5 h-5 text-white" />
                </div>
                <div className="max-w-[12rem]">
                  <p className="text-sm text-gray-700 italic leading-snug" title="Book quote">
                    {[
                      'A room without books is like a body without a soul.',
                      'So many books, so little time.',
                      'There is no friend as loyal as a book.'
                    ][quoteIndex]}
                  </p>
                </div>
              </div>
            </div>
          )}
          {collapsed && (
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center mx-auto">
              <BookOpenIconSolid className="w-5 h-5 text-white" />
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              collapsed ? "ml-auto" : ""
            }`}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <ChevronDoubleRightIcon className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronDoubleLeftIcon className="w-4 h-4 text-gray-600" />
            )}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navigationLinks.map((link) => {
            // Special handling for Book Details link
            const isBookDetails = link.name === "Book Details";
            const currentBookId = params.id || "1";
            const bookDetailsPath = `/books/${currentBookId}`;
            
            return (
              <NavLink
                key={link.path}
                to={isBookDetails ? bookDetailsPath : link.path}
                onMouseEnter={() => setActiveHover(link.name)}
                onMouseLeave={() => setActiveHover(null)}
                className={({ isActive }) => {
                  // Special active check for Book Details
                  const isBookDetailsActive = isBookDetails && 
                    location.pathname.match(/\/books\/\d+/);
                  
                  const active = isBookDetails ? isBookDetailsActive : isActive;
                  
                  return `flex items-center px-3 py-3 rounded-xl transition-all duration-200 group ${
                    active
                      ? "bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 font-semibold shadow-sm border border-indigo-100"
                      : "text-gray-700 hover:bg-gray-50 hover:shadow-sm"
                  }`;
                }}
                end={link.path === "/"}
              >
                <div className="relative">
                  {isBookDetails && params.id ? (
                    // If we have a book ID, show the filled icon
                    <DocumentTextIconSolid className={`w-5 h-5 ${collapsed ? "" : "mr-3"}`} />
                  ) : (
                    link.icon
                  )}
                  {link.badge && !collapsed && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {link.badge}
                    </span>
                  )}
                </div>
                {!collapsed && (
                  <div className="flex items-center justify-between flex-1">
                    <span>
                      {link.name}
                      {isBookDetails && params.id && (
                        <span className="ml-2 text-xs text-gray-500 font-normal">
                          (#{params.id})
                        </span>
                      )}
                    </span>
                    {link.badge && (
                      <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded-full">
                        {link.badge}
                      </span>
                    )}
                  </div>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Secondary Links */}
        <div className="p-4 border-t border-gray-200">
          {!collapsed && (
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">
              Account
            </h3>
          )}
          <div className="space-y-1">
            {secondaryLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "text-indigo-600 bg-indigo-50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`
                }
              >
                {link.icon}
                {!collapsed && <span>{link.name}</span>}
              </NavLink>
            ))}
          </div>

          {/* User Profile */}
          {!collapsed && (
            <div className="mt-6 p-3 bg-gradient-to-r from-gray-50 to-indigo-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">JS</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    John Smith
                  </p>
                  <p className="text-xs text-gray-500 truncate">Book Lover</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Tooltip for collapsed items */}
      {collapsed && activeHover && (
        <div className="fixed left-16 ml-2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg shadow-lg z-50">
          {navigationLinks.find((l) => l.name === activeHover)?.description ||
            activeHover}
          {activeHover === "Book Details" && params.id && ` (#${params.id})`}
        </div>
      )}
    </>
  );
};

export default Sidebar;