import { useNavigate, useLocation } from 'react-router-dom';
import { useCallback } from 'react';
import { useUser } from '../../data/UserContext';
import type { PAGES, SETTINGS } from './Constants';

export const useNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useUser();

  const scrollToCampaigns = useCallback(() => {
    // If not on home page, navigate first
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollToCampaigns: true } });
    } else {
      const element = document.getElementById('support-campaigns');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.pathname, navigate]);

  const handleNavigation = useCallback((page: typeof PAGES[number]) => {
    if (page.isScroll) {
      scrollToCampaigns();
    } else {
      navigate(page.path);
    }
  }, [navigate, scrollToCampaigns]);

  const handleSettingAction = useCallback((setting: typeof SETTINGS[number]) => {
    if (setting.action === 'logout') {
      logout();
      navigate('/login');
    } else {
      navigate(setting.path);
    }
  }, [logout, navigate]);

  const navigateToPath = useCallback((path: string) => {
    navigate(path);
  }, [navigate]);

  return {
    handleNavigation,
    handleSettingAction,
    navigateToPath,
  };
};