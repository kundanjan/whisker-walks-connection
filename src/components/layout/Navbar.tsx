
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, Search, User, PawPrint } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <PawPrint className="h-8 w-8 text-brand-teal" />
              <span className="text-xl font-bold text-brand-teal">WhiskerWalks</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/services" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">
              Services
            </Link>
            <Link to="/providers" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">
              Providers
            </Link>
            <Link to="/community" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">
              Community
            </Link>
            <Link to="/resources" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">
              Resources
            </Link>
          </div>

          {/* Search and Auth Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="outline" size="icon" className="rounded-full">
              <Search className="h-4 w-4" />
            </Button>
            <Link to="/login">
              <Button variant="ghost">Log in</Button>
            </Link>
            <Link to="/signup">
              <Button>Sign up</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              to="/services" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link 
              to="/providers" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Providers
            </Link>
            <Link 
              to="/community" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Community
            </Link>
            <Link 
              to="/resources" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Resources
            </Link>
            <div className="border-t pt-2 mt-2">
              <Link 
                to="/login" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Log in
              </Link>
              <Link 
                to="/signup" 
                className="block px-3 py-2 mt-1 rounded-md text-base font-medium bg-brand-teal text-white hover:bg-brand-teal/90"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
