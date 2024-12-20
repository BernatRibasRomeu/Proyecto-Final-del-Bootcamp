import { Button } from "../ui/Button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { UserCircle } from 'lucide-react';
import { useUser } from '../../data/UserContext';
import { useNavigation } from './UseNavigation';
import { SETTINGS } from './Constants';

export const UserMenu = () => {
  const { userId } = useUser();
  const { handleSettingAction, navigateToPath } = useNavigation();

  if (!userId) {
    return (
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          onClick={() => navigateToPath('/login')}
          className="text-primary hover:text-primary/90"
        >
          Iniciar sessió
        </Button>
        <Button
          onClick={() => navigateToPath('/register')}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Registrar-se
        </Button>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar>
            <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
            <AvatarFallback>
              <UserCircle className="h-6 w-6" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-white border-none shadow-sm">
        <DropdownMenuLabel>El meu compte</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {SETTINGS.map((setting) => (
          <DropdownMenuItem
            key={setting.name}
            onClick={() => handleSettingAction(setting)}
          >
            {setting.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
  
};