import React from "react";
import { Link, NavLink } from "react-router-dom";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Books", path: "/books" },
  { name: "Add Book", path: "/books/add" },
  { name: "About", path: "/about" },
];

const Navbar = () => (
  <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
    <Link to="/" className="text-2xl font-bold text-indigo-700 tracking-wide">
      LitLounge
    </Link>
    <div className="flex space-x-4">
      {navLinks.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          className={({ isActive }) =>
            `px-3 py-2 rounded-lg text-base font-medium transition ${
              isActive
                ? "bg-indigo-600 text-white"
                : "text-gray-700 hover:bg-indigo-100"
            }`
          }
          end={link.path === "/"}
        >
          {link.name}
        </NavLink>
      ))}
    </div>
  </nav>
);

export default Navbar;