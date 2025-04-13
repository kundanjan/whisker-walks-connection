
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, PawPrint } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <PawPrint className="h-8 w-8 text-brand-teal" />
              <span className="text-xl font-bold text-brand-teal">WhiskerWalks</span>
            </Link>
            <p className="text-gray-600 text-sm">
              Connecting pet owners with trusted care providers since 2025.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-brand-teal">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-teal">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-teal">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-teal">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Services
            </h3>
            <div className="space-y-3">
              <p><Link to="/services/walking" className="text-gray-600 hover:text-brand-teal">Dog Walking</Link></p>
              <p><Link to="/services/grooming" className="text-gray-600 hover:text-brand-teal">Pet Grooming</Link></p>
              <p><Link to="/services/boarding" className="text-gray-600 hover:text-brand-teal">Pet Boarding</Link></p>
              <p><Link to="/services/training" className="text-gray-600 hover:text-brand-teal">Pet Training</Link></p>
              <p><Link to="/services/veterinary" className="text-gray-600 hover:text-brand-teal">Veterinary Services</Link></p>
            </div>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Resources
            </h3>
            <div className="space-y-3">
              <p><Link to="/resources/blog" className="text-gray-600 hover:text-brand-teal">Blog</Link></p>
              <p><Link to="/resources/guides" className="text-gray-600 hover:text-brand-teal">Pet Care Guides</Link></p>
              <p><Link to="/community/forums" className="text-gray-600 hover:text-brand-teal">Community Forums</Link></p>
              <p><Link to="/community/events" className="text-gray-600 hover:text-brand-teal">Pet Events</Link></p>
              <p><Link to="/resources/faq" className="text-gray-600 hover:text-brand-teal">FAQ</Link></p>
            </div>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Company
            </h3>
            <div className="space-y-3">
              <p><Link to="/about" className="text-gray-600 hover:text-brand-teal">About Us</Link></p>
              <p><Link to="/providers/apply" className="text-gray-600 hover:text-brand-teal">Become a Provider</Link></p>
              <p><Link to="/contact" className="text-gray-600 hover:text-brand-teal">Contact Us</Link></p>
              <p><Link to="/privacy" className="text-gray-600 hover:text-brand-teal">Privacy Policy</Link></p>
              <p><Link to="/terms" className="text-gray-600 hover:text-brand-teal">Terms of Service</Link></p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8">
          <p className="text-gray-500 text-sm text-center">
            &copy; {new Date().getFullYear()} WhiskerWalks. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
