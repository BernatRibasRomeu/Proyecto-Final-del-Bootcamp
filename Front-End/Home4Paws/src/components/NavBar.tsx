import { cn } from "../utils/utils";
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { NavLogo } from './Navigation/NavLogo';
import { DesktopNav } from './Navigation/DesktopNav';
import { UserMenu } from './Navigation/UserMenu';
import { MobileNav } from './Navigation/MobileNav';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle campaign scroll after navigation
  useEffect(() => {
    const state = location.state as { scrollToCampaigns?: boolean } | null;
    if (state?.scrollToCampaigns) {
      const element = document.getElementById('support-campaigns');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      // Clear the state
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
<header
  className={cn(
    "fixed top-0 w-full z-50 transition-all duration-300",
    "bg-white border-b shadow-sm"
  )}
>

      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <NavLogo />
          
          <div className="hidden md:flex items-center space-x-6">
            <DesktopNav />
            <UserMenu />
          </div>

          <div className="md:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;