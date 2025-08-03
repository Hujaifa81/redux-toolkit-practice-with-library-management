'use client'
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, Plus, Clipboard, Menu as MenuIcon, X } from 'lucide-react';

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const menuItems: MenuItem[] = [
  {
    icon: <BookOpen className="h-5 w-5" />,
    label: "All Books",
    href: "/",
  },
  {
    icon: <Plus className="h-5 w-5" />,
    label: "Add Book",
    href: "/create-book",
  },
  {
    icon: <Clipboard className="h-5 w-5" />,
    label: "Borrow Summary",
    href: "/borrow-summary",
  }
];

function MenuBar(): React.JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  return (
    <nav className="relative p-5 bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
      {/* Hamburger Menu Icon for mobile */}
      <div className="sm:hidden absolute top-1 right-4 z-10">
        <button onClick={toggleMenu} className="p-2 rounded-md">
          {isMenuOpen ? <X className="w-6 h-6 text-gray-600" /> : <MenuIcon className="w-6 h-6 text-gray-600" />}
        </button>
      </div>

      {/* Menu for larger screens */}
      <div className="hidden sm:flex sm:gap-4 sm:items-center justify-center">
        {menuItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.href}
            className={({ isActive }) =>
              isActive
                ? "flex items-center gap-2 text-blue-500 dark:text-blue-400" // Active class
                : "flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>

      {/* Mobile Menu */}
      <div className={`sm:hidden ${isMenuOpen ? 'block' : 'hidden'} mt-4`}>
        {menuItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.href}
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 dark:text-blue-400 flex py-2 items-center gap-1" // Active class for mobile
                : "text-gray-600 dark:text-gray-300 flex py-2 items-center gap-1 hover:text-gray-900 dark:hover:text-white"
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default MenuBar;
