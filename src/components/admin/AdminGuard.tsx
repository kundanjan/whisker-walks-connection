
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { fetchCurrentUser } from '@/services/api';

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const { data: profile } = useQuery({
    queryKey: ['current-user'],
    queryFn: fetchCurrentUser,
    enabled: !!user
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (profile && !profile.is_admin) {
      navigate('/');
    }
  }, [user, profile, navigate]);

  if (!profile?.is_admin) {
    return null;
  }

  return <>{children}</>;
}
