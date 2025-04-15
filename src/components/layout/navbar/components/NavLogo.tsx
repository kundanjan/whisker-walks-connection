
import { Link } from 'react-router-dom';
import { PawPrint } from 'lucide-react';

export const NavLogo = () => (
  <div className="flex-shrink-0 flex items-center">
    <Link to="/" className="flex items-center space-x-2">
      <PawPrint className="h-8 w-8 text-brand-teal" />
      <span className="text-xl font-bold text-brand-teal">WhiskerWalks</span>
    </Link>
  </div>
);

