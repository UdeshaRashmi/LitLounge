 import React from "react";
import { NavLink } from "react-router-dom";
import {
  BookOpenIcon,
  PlusCircleIcon,
  HomeIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

const links = [
  
  { name: "Books", path: "/books", icon: <BookOpenIcon className="w-5 h-5 mr-2" /> },
  { name: "Add Book", path: "/books/add", icon: <PlusCircleIcon className="w-5 h-5 mr-2" /> },
  
];

const Sidebar = () => (
  <aside className="w-48 bg-white shadow hidden md:block">
    <nav className="flex flex-col p-4 space-y-2">
      {links.map(({ name, path, icon }) => (
        <NavLink
          key={`${name}-${path}`}
          to={path}
          className={({ isActive }) =>
            `flex items-center px-3 py-2 rounded-lg font-medium transition ${
              isActive
                ? "bg-indigo-100 text-indigo-700"
                : "text-gray-700 hover:bg-indigo-50"
            }`
          }
          end={path === "/"}
        >
          {icon}
          {name}
        </NavLink>
      ))}
    </nav>
  </aside>
);

export default Sidebar;