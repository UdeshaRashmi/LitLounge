 import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);
  const firstNavItemRef = useRef(null);
  const lastNavItemRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  // Close mobile menu on ESC key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && mobileOpen) {
        setMobileOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [mobileOpen]);

  // Trap focus in mobile menu
  useEffect(() => {
    if (mobileOpen && firstNavItemRef.current) {
      firstNavItemRef.current.focus();
    }
  }, [mobileOpen]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileOpen &&
        navRef.current &&
        !navRef.current.contains(event.target) &&
        !event.target.closest("button[aria-label*='menu']")
      ) {
        setMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen]);

  const handleKeyDown = (e) => {
    if (e.key === "Tab" && mobileOpen) {
      if (e.shiftKey && document.activeElement === firstNavItemRef.current) {
        e.preventDefault();
        lastNavItemRef.current?.focus();
      } else if (!e.shiftKey && document.activeElement === lastNavItemRef.current) {
        e.preventDefault();
        firstNavItemRef.current?.focus();
      }
    }
  };

  const handleHamburgerKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setMobileOpen(!mobileOpen);
    }
  };

  return (
    <nav
      ref={navRef}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-white shadow-md"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2"
            aria-label="LitLounge - Home"
            onClick={() => setMobileOpen(false)}
          >
            <div className="h-8 w-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-700 to-purple-600 bg-clip-text text-transparent">
              LitLounge
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link, index) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? "text-indigo-700"
                      : "text-gray-700 hover:text-indigo-600"
                  }`
                }
                end={link.path === "/"}
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    {isActive && (
                      <span className="absolute inset-x-1 -bottom-1 h-0.5 bg-indigo-600 rounded-full" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
            <button className="ml-4 px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
              Get Started
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className="md:hidden relative p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
            onKeyDown={handleHamburgerKeyDown}
          >
            <div className="relative w-6 h-6">
              <Bars3Icon
                className={`absolute inset-0 w-6 h-6 text-indigo-700 transition-all duration-300 ${
                  mobileOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
                }`}
              />
              <XMarkIcon
                className={`absolute inset-0 w-6 h-6 text-indigo-700 transition-all duration-300 ${
                  mobileOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
                }`}
              />
            </div>
          </button>

          {/* Mobile Navigation Overlay */}
          <div
            className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ease-out ${
              mobileOpen
                ? "opacity-100 visible"
                : "opacity-0 invisible delay-300"
            }`}
            aria-hidden={!mobileOpen}
          >
            {/* Backdrop */}
            <div
              className={`absolute inset-0 bg-black transition-opacity duration-300 ${
                mobileOpen ? "opacity-50" : "opacity-0"
              }`}
              onClick={() => setMobileOpen(false)}
            />

            {/* Menu Panel */}
            <div
              className={`absolute top-0 right-0 h-full w-4/5 max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-out ${
                mobileOpen ? "translate-x-0" : "translate-x-full"
              }`}
              onKeyDown={handleKeyDown}
            >
              <div className="flex flex-col h-full pt-20 pb-8">
                <div className="px-6 mb-8">
                  <div className="h-8 w-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-white font-bold text-lg">L</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Navigation</h2>
                </div>

                <nav className="flex-1 px-6 space-y-2">
                  {navLinks.map((link, index) => (
                    <NavLink
                      key={link.path}
                      ref={index === 0 ? firstNavItemRef : index === navLinks.length - 1 ? lastNavItemRef : null}
                      to={link.path}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center px-4 py-3 text-base font-medium rounded-xl transition-all duration-200 ${
                          isActive
                            ? "bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 border-l-4 border-indigo-600"
                            : "text-gray-700 hover:bg-gray-50"
                        }`
                      }
                      end={link.path === "/"}
                      tabIndex={mobileOpen ? 0 : -1}
                    >
                      {link.name}
                    </NavLink>
                  ))}
                </nav>

                <div className="px-6 pt-8 border-t border-gray-100">
                  <button className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300">
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;