
import { Link } from 'react-router-dom';

interface DesktopNavProps {
  isAdmin: boolean;
}

export const DesktopNav = ({ isAdmin }: DesktopNavProps) => (
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
    {isAdmin && (
      <Link to="/admin" className="px-3 py-2 rounded-md text-sm font-medium text-brand-teal hover:bg-gray-100">
        Admin
      </Link>
    )}
  </div>
);

