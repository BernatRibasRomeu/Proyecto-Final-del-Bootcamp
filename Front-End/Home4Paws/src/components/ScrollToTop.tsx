import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop: React.FC = () => {
  const location = useLocation(); // Obtén la ubicación actual (ruta)

  useEffect(() => {
    // Desplazar hacia el top cada vez que la ubicación cambie
    window.scrollTo(0, 0);
  }, [location]); // Cuando la ruta cambie, el efecto se ejecutará

  return null; // Este componente no renderiza nada
};

export default ScrollToTop;