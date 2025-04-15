
import { Menu, X } from 'lucide-react';
import { useNavigation } from './hooks/useNavigation';
import { NavLogo } from './components/NavLogo';
import { DesktopNav } from './components/DesktopNav';
import { DesktopActions } from './components/DesktopActions';
import { MobileMenu } from './components/MobileMenu';

const Navbar = () => {
  const { isMenuOpen, user, isAdmin, handleSignOut, toggleMenu, closeMenu } = useNavigation();

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <NavLogo />
          <DesktopNav isAdmin={isAdmin} />
          <DesktopActions user={user} isAdmin={isAdmin} onSignOut={handleSignOut} />

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <MobileMenu
        isOpen={isMenuOpen}
        user={user}
        isAdmin={isAdmin}
        onSignOut={handleSignOut}
        onClose={closeMenu}
      />
    </nav>
  );
};

export default Navbar;

