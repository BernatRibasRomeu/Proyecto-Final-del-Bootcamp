import { PawPrint } from 'lucide-react';
import { Link } from "react-router-dom";

export const NavLogo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2 no-underline">
      <img
        src="/src/assets/logo_h4p_sense_fondo.png"
        alt="Home4Paws Logo"
        className="h-12 w-12 object-contain"
      />
      <span className="fot-bold text-xl text-primary">Home4Paws</span>
    </Link>
  );
};
