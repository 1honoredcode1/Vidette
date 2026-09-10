import { useTheme } from "next-themes";

import {
  useKindeBrowserClient,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs";

import Logo from "@/components/logo";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { LogInIcon, Moon, Sun } from "lucide-react";

import { cn } from "cn";

const Header = () => {
  const { user } = useKindeBrowserClient();

  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <header className="w-fll sticky top-0 bg-background z-50">
      <div className="max-w-7xl w-full mx-auto lg:px-0">
        <div className="flex justify-between items-center h-16">
          <div>
            <Logo />
          </div>
          <div className="flex items-center gap-4">
            <Button
              className="relative rounded-full"
              variant="outline"
              size="icon"
              onClick={() => setTheme(isDark ? "light" : "dark")}
            >
              <Sun
                className={cn(
                  "absolute h-5 w-5",
                  isDark ? "scale-0" : "scale-100",
                )}
              />
              <Moon
                className={cn(
                  "absolute h-5 w-5",
                  isDark ? "scale-100" : "scale-0",
                )}
              />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 h-16">
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarImage
                    src={user?.picture || ""}
                    alt={user?.given_name || ""}
                  />
                  <AvatarFallback className="rounded-lg">
                    {user?.given_name?.charAt(0)}
                    {user?.family_name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex items-center gap-2">
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {user?.given_name} {user?.family_name}
                      <p className="truncate block w-full max-w-27.5 text-sm text-muted-foreground">
                        {user?.email}
                      </p>
                    </span>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem>
                    <LogoutLink className="flex items-center gap-1">
                      <LogInIcon className="h-4 w-4" />
                      Log Out
                    </LogoutLink>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
