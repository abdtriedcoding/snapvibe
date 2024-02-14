"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { User } from "next-auth";
import { usePathname } from "next/navigation";
import { Avatar } from "@/components/ui/avatar";
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
        className: "md:!justify-start space-x-2 md:!my-1.5 !px-3 w-full",
        size: "lg",
      })}
    >
      <Avatar className={`h-6 w-6 ${isActive && "border-2 border-white"}`}>
        <Image
          src={
            user?.image ||
            "https://instagram.fpnq13-1.fna.fbcdn.net/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=instagram.fpnq13-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=3yECqrWF0dkAX-1fQPX&edm=ALlQn9MBAAAA&ccb=7-5&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2-ccb7-5&oh=00_AfC4YI9GjTczPKHhpu6gUJwwPYXUTESZ1WNE1OrYzfSCZQ&oe=656D360F&_nc_sid=e7f676"
          }
          fill
          alt={`${user?.name}'s profile picture`}
          className="rounded-full object-cover"
        />
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
