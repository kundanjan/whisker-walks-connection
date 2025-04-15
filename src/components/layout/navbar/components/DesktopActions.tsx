
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Search, User, Settings, LogOut } from 'lucide-react';

interface DesktopActionsProps {
  user: any;
  isAdmin: boolean;
  onSignOut: () => void;
}

export const DesktopActions = ({ user, isAdmin, onSignOut }: DesktopActionsProps) => (
  <div className="hidden md:flex items-center space-x-2">
    <Button variant="outline" size="icon" className="rounded-full">
      <Search className="h-4 w-4" />
    </Button>
    
    {user ? (
      <div className="flex items-center space-x-2">
        <Link to="/profile">
          <Button variant="ghost" className="flex items-center space-x-1">
            <User className="h-4 w-4 mr-1" />
            Profile
          </Button>
        </Link>
        {isAdmin && (
          <Link to="/admin">
            <Button variant="ghost" className="flex items-center">
              <Settings className="h-4 w-4 mr-1" />
              Admin
            </Button>
          </Link>
        )}
        <Button variant="outline" onClick={onSignOut} className="flex items-center">
          <LogOut className="h-4 w-4 mr-1" />
          Sign out
        </Button>
      </div>
    ) : (
      <>
        <Link to="/login">
          <Button variant="ghost">Log in</Button>
        </Link>
        <Link to="/signup">
          <Button>Sign up</Button>
        </Link>
      </>
    )}
  </div>
);

