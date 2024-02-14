"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import type { User } from "next-auth";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";

const ProfileLink = ({ user }: { user: User }) => {
  const pathname = usePathname();

  const href = `/dashboard/${user.username}`;
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={buttonVariants({
        variant: isActive ? "secondary" : "ghost",
        className: "lg:!justify-start space-x-2 !my-1.5 !px-3 w-full",
        size: "lg",
      })}
    >
      <Avatar className={`h-6 w-6 ${isActive && "border-2 border-white"}`}>
        <AvatarImage src={user?.image ?? "https://github.com/shadcn.png"} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <p
        className={`${cn("hidden lg:block", {
          "font-extrabold": isActive,
        })}`}
      >
        Profile
      </p>
    </Link>
  );
};

export default ProfileLink;
