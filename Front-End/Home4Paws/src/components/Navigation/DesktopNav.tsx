import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "../ui/navigation-menu";
import { PAGES } from './Constants';
import { useNavigation } from './UseNavigation';

export const DesktopNav = () => {
  const { handleNavigation } = useNavigation();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {PAGES.map((page) => (
          <NavigationMenuItem key={page.name}>
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              onClick={() => handleNavigation(page)}
            >
              {page.name}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};