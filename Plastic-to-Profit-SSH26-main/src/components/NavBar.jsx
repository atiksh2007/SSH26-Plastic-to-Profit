import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HashLink } from "react-router-hash-link";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const user = localStorage.getItem('plasticProfitUser');
    setIsLoggedIn(!!user);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('plasticProfitUser');
    setIsLoggedIn(false);
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/marketplace', label: 'Explore Marketplace' },
    ...(isLoggedIn ? [{ path: '/dashboard', label: 'Dashboard' }] : []),
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 group"
            onClick={closeMenu}
          >
            <div className="w-10 h-10 bg-olive-600 rounded-full flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
              <span className="text-white text-xl font-bold">♻</span>
            </div>
            <span className="text-2xl font-bold text-black">
              Plastic<span className="text-olive-600">Profit</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-base font-medium transition-colors duration-200 relative group ${
                  location.pathname === link.path
                    ? 'text-olive-600'
                    : 'text-gray-700 hover:text-olive-600'
                }`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-olive-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
            
<HashLink smooth to="/#support" className="btn-primary !py-2 !px-6 text-sm">
  Support
</HashLink>

            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="btn-secondary !py-2 !px-6 text-sm"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="btn-primary !py-2 !px-6 text-sm">
                Login
              </Link>
            )}
            {isLoggedIn &&  <Link to="/ListPlastics" className="btn-primary !py-2 !px-6 text-sm">
                  Publish
              </Link>}

          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`w-full h-0.5 bg-black transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              ></span>
              <span
                className={`w-full h-0.5 bg-black transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : ''
                }`}
              ></span>
              <span
                className={`w-full h-0.5 bg-black transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              ></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-3 bg-white border-t border-gray-100">
          {navLinks.map((link, index) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={closeMenu}
              className={`block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                location.pathname === link.path
                  ? 'bg-olive-600 text-white'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {link.label}
            </Link>
          ))}
          
   <HashLink
  smooth
  to="/#support"
  onClick={closeMenu}
  className="block px-4 py-3 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200"
>
  Support
</HashLink>

          {isLoggedIn ? (
            <button
              onClick={() => {
                handleLogout();
                closeMenu();
              }}
              className="w-full text-left px-4 py-3 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              onClick={closeMenu}
              className="block px-4 py-3 rounded-lg bg-olive-600 text-white text-center font-medium hover:bg-olive-700 transition-colors duration-200"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;