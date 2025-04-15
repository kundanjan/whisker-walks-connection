
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { fetchCurrentUser } from '@/services/api';

export const useNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const { data: profile } = useQuery({
    queryKey: ['current-user'],
    queryFn: fetchCurrentUser,
    enabled: !!user
  });

  const isAdmin = profile?.is_admin || false;

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return {
    isMenuOpen,
    user,
    isAdmin,
    handleSignOut,
    toggleMenu,
    closeMenu
  };
};

