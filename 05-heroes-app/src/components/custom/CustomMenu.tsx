import { Link, useLocation } from 'react-router'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '../ui/navigation-menu'
import { cn } from '@/lib/utils';

export const CustomMenu = () => {

    const { pathname } = useLocation();

    const isActive = (path: string) => {

        return pathname === path

    }

    return (
        <NavigationMenu className='py-5'>
            <NavigationMenuList>

                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={cn(isActive('/') && 'bg-slate-200', 'rounded-md-p2')}>
                        <Link to="/">Inicio</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={cn(isActive('/search') && 'bg-slate-200', 'rounded-md-p2')}>
                        <Link to="/search">Buscar Heroes</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>


            </NavigationMenuList>
        </NavigationMenu>
    )
}
