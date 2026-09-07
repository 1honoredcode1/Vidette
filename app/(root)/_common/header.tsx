import { useTheme } from "next-themes";

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

import { cn } from "@/lib/utils";

const Header = () => {
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
                  <AvatarImage src="" alt="User" />
                  <AvatarFallback className="rounded-lg">HC</AvatarFallback>
                </Avatar>
                <div className="flex items-center gap-2">
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      Klevis
                      <p className="truncate block w-full max-w-27.5 text-sm text-muted-foreground">
                        klevis25sfj@gmail.com
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
                    <LogInIcon className="h-4 w-4" />
                    Log Out
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
