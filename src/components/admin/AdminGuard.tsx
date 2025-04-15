
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { fetchCurrentUser } from '@/services/api';

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const { data: profile, isLoading, isError } = useQuery({
    queryKey: ['current-user'],
    queryFn: fetchCurrentUser,
    enabled: !!user
  });

  useEffect(() => {
    if (!user) {
      console.log('No user found, redirecting to login');
      navigate('/login');
      return;
    }
    
    // Wait until profile data is loaded
    if (!isLoading && !isError) {
      if (!profile || !profile.is_admin) {
        console.log('User is not an admin, redirecting to home');
        navigate('/');
      } else {
        console.log('Admin access granted');
      }
    }
  }, [user, profile, navigate, isLoading, isError]);

  // Show loading state while checking admin status
  if (isLoading) {
    return <div className="flex items-center justify-center h-64">
      <p className="text-lg">Verifying admin access...</p>
    </div>;
  }

  // Don't render children until we confirm admin status
  if (!profile?.is_admin) {
    return null;
  }

  return <>{children}</>;
}
