"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Home, PlusSquare } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

const links = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "Create", href: "/dashboard/create", icon: PlusSquare },
];

const NavLinks = () => {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.name}
            href={link.href}
            className={buttonVariants({
              className: "lg:!justify-start space-x-2 !my-1.5 !px-3 w-full",
              variant: isActive ? "secondary" : "ghost",
              size: "lg",
            })}
          >
            <LinkIcon className="w-6 h-6" />
            <p
              className={`${cn("hidden lg:block", {
                "font-extrabold": isActive,
              })}`}
            >
              {link.name}
            </p>
          </Link>
        );
      })}
    </>
  );
};

export default NavLinks;
