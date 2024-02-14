"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Activity,
  Bookmark,
  LogOut,
  Menu,
  MenuIcon,
  Settings,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

const DropdownMenuSection = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"ghost"}
          size={"lg"}
          className="lg:!justify-start space-x-2 !my-1.5 !px-3 w-full"
        >
          <Menu />
          <div className="hidden lg:block">More</div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end" alignOffset={-40}>
        <DropdownMenuItem
          onClick={(e) => e.preventDefault()}
          className="flex items-center gap-x-2 !px-4 !py-3.5 !m-1.5 !rounded-lg font-medium"
        >
          <div className="flex items-center space-x-2">
            <Switch id="theme-mode" />
            <Label htmlFor="theme-mode">Theme Mode</Label>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem className="!cursor-pointer flex items-center gap-x-2 !px-4 !py-3.5 !m-1.5 !rounded-lg font-medium">
          <Activity className="w-5 h-5" />
          <p>Your activity</p>
        </DropdownMenuItem>
        <DropdownMenuItem className="!cursor-pointer flex items-center gap-x-2 !px-4 !py-3.5 !m-1.5 !rounded-lg font-medium">
          <Bookmark className="w-5 h-5" />
          <p>Saved</p>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => signOut()}
          className="!cursor-pointer flex items-center gap-x-2 !px-4 !py-3.5 !m-1.5 !rounded-lg font-medium"
        >
          <LogOut className="w-5 h-5" />
          <p>Log out</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownMenuSection;
