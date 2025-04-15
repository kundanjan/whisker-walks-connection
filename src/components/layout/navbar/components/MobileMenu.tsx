
import { Link } from 'react-router-dom';
import { User, Settings, LogOut } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  user: any;
  isAdmin: boolean;
  onSignOut: () => void;
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, user, isAdmin, onSignOut, onClose }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-white shadow-lg">
      <div className="px-2 pt-2 pb-3 space-y-1">
        <Link 
          to="/services" 
          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
          onClick={onClose}
        >
          Services
        </Link>
        <Link 
          to="/providers" 
          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
          onClick={onClose}
        >
          Providers
        </Link>
        <Link 
          to="/community" 
          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
          onClick={onClose}
        >
          Community
        </Link>
        <Link 
          to="/resources" 
          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
          onClick={onClose}
        >
          Resources
        </Link>
        {isAdmin && (
          <Link 
            to="/admin" 
            className="block px-3 py-2 rounded-md text-base font-medium text-brand-teal hover:bg-gray-100"
            onClick={onClose}
          >
            Admin
          </Link>
        )}
        <div className="border-t pt-2 mt-2">
          {user ? (
            <>
              <Link 
                to="/profile" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                onClick={onClose}
              >
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </div>
              </Link>
              {isAdmin && (
                <Link 
                  to="/admin" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                  onClick={onClose}
                >
                  <div className="flex items-center">
                    <Settings className="h-4 w-4 mr-2" />
                    Admin
                  </div>
                </Link>
              )}
              <button 
                onClick={() => {
                  onSignOut();
                  onClose();
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              >
                <div className="flex items-center">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign out
                </div>
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                onClick={onClose}
              >
                Log in
              </Link>
              <Link 
                to="/signup" 
                className="block px-3 py-2 mt-1 rounded-md text-base font-medium bg-brand-teal text-white hover:bg-brand-teal/90"
                onClick={onClose}
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

