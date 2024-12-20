import { Button } from "../ui/Button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/Sheet";
import { Menu } from 'lucide-react';
import { PAGES, SETTINGS } from './Constants';
import { useNavigation } from './UseNavigation';
import { useUser } from '../../data/UserContext';

export const MobileNav = () => {
  const { userId } = useUser();
  const { handleNavigation, handleSettingAction, navigateToPath } = useNavigation();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="bg-background text-white" id="card">
        <div className="flex flex-col space-y-4 mt-8">
          {PAGES.map((page) => (
            <Button
              key={page.name}
              variant="ghost"
              className="w-full justify-start text-white text-lg hover:text-accent hover:underline"
              onClick={() => handleNavigation(page)}
            >
              {page.name}
            </Button>
          ))}
          <div className="border-t border-gray-600 pt-4">
            {userId ? (
              <>
                {SETTINGS.map((setting) => (
                  <Button
                    key={setting.name}
                    variant="ghost"
                    className="w-full justify-start text-white text-lg hover:text-accent hover:underline"
                    onClick={() => handleSettingAction(setting)}
                  >
                    {setting.name}
                  </Button>
                ))}
              </>
            ) : (
              <div className="flex flex-col space-y-2">
                <Button
                  variant="ghost"
                  className="w-full text-white text-lg hover:text-accent hover:underline"
                  onClick={() => navigateToPath('/login')}
                >
                  Iniciar sessió
                </Button>
                <Button
                  className="w-full bg-accent text-white text-lg hover:bg-accent-dark"
                  onClick={() => navigateToPath('/register')}
                >
                  Registrar-se
                </Button>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
