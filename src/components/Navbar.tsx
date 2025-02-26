import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Rooms', path: '/rooms' },
    { name: 'Amenities', path: '/amenities' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <div className="transition-transform duration-300 group-hover:scale-110">
                <img 
                  src={logo}
                  alt="Othara Lodge"
                  className="h-20 sm:h-20 w-auto object-contain"
                />
              </div>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="relative text-gray-700 px-3 py-2 text-sm font-medium transition-colors duration-200 hover:text-indigo-600 group"
              >
                {item.name}
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-indigo-600 transform scale-x-0 origin-left transition-transform duration-200 group-hover:scale-x-100" />
              </Link>
            ))}
            <Link
              to="/booking"
              className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 transform hover:-translate-y-0.5"
            >
              Book Now
            </Link>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-full bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors duration-200 focus:outline-none"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={`absolute top-full left-0 right-0 md:hidden transform transition-all duration-300 ease-in-out ${
          isOpen 
            ? 'translate-y-0 opacity-100 visible'
            : '-translate-y-full opacity-0 invisible'
        }`}
      >
        <div className="bg-white/95 backdrop-blur-sm shadow-lg">
          <div className="px-4 py-2 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="block px-3 py-2 text-gray-700 rounded-lg text-base font-medium transition-all duration-200 hover:bg-indigo-50 hover:text-indigo-600 hover:translate-x-1"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/booking"
              className="block w-full mt-2 px-3 py-2 bg-indigo-600 text-center text-white rounded-lg text-base font-medium transition-all duration-200 hover:bg-indigo-700 hover:shadow-md transform hover:-translate-y-0.5"
              onClick={() => setIsOpen(false)}
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;