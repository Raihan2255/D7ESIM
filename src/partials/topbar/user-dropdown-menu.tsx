import { ReactNode, useState } from 'react';
import { useAuth } from '@/auth/context/auth-context';
import {
  BetweenHorizontalStart,
  CircleUser,
  Coffee,
  CreditCard,
  FileText,
  ListRestart,
  Moon,
  Settings,
  Shield,
  UserCircle,
  Users,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { Link } from 'react-router';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';
import ResetPasswordForm from '@/core/components/ResetPasswordForm';
import auth from '@/utils/auth';

export function UserDropdownMenu({ trigger }: { trigger: ReactNode }) {
  const { logout, user } = useAuth();
  const { theme, setTheme } = useTheme();

  const [open, setOpen] = useState<boolean>(false);

  const currentUser = auth.getUserInfo()

  const name = currentUser?.first_name + "" + currentUser?.last_name


  const handleThemeToggle = (checked: boolean) => {
    setTheme(checked ? 'dark' : 'light');
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
        <DropdownMenuContent className="w-64" side="bottom" align="end">
          {/* Header */}
          <div className="flex items-center justify-between p-3">
            <div className="flex items-center gap-2">
              <CircleUser className='cursor-pointer size-5.5!' />
              <div className="flex flex-col">
                {name ?? "User"}
              </div>
            </div>
          </div>

          <DropdownMenuSeparator />


          <DropdownMenuItem asChild>
            <Link
              to="/account/home/user-profile"
              className="flex items-center gap-2"
            >
              <UserCircle />
              My Profile
            </Link>
          </DropdownMenuItem>

          {/* My Account Submenu */}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="flex items-center gap-2">
              <Settings />
              My Account
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="w-48">
              <DropdownMenuItem asChild>
                <li onClick={() => setOpen(true)}>
                  <ListRestart />
                  Rest Password
                </li>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          <DropdownMenuSeparator />

          {/* Footer */}
          <DropdownMenuItem
            className="flex items-center gap-2"
            onSelect={(event) => event.preventDefault()}
          >
            <Moon />
            <div className="flex items-center gap-2 justify-between grow">
              Dark Mode
              <Switch
                size="sm"
                checked={theme === 'dark'}
                onCheckedChange={handleThemeToggle}
              />
            </div>
          </DropdownMenuItem>
          <div className="p-2 mt-1">
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      <ResetPasswordForm open={open} setOpen={setOpen} />
    </>
  );
}
