"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { UserProfile } from "@/lib/definitions";
import { Bookmark, Grid3X3 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const profileTabs = [
  {
    title: "Posts",
    href: "",
    Icon: Grid3X3,
  },

  {
    title: "Saved",
    href: "saved",
    Icon: Bookmark,
  },
];

const ProfileTabs = ({
  profile,
  isCurrentUser,
}: {
  profile: UserProfile;
  isCurrentUser: boolean;
}) => {
  const pathname = usePathname();

  return (
    <Tabs defaultValue="posts" className="pt-14 pb-16">
      <TabsList className="p-px bg-zinc-300 dark:bg-neutral-800 h-px w-full gap-x-10">
        {profileTabs
          .filter((tab) => isCurrentUser || tab.href !== "saved")
          .map((tab) => {
            const profilePage = `/dashboard/${profile.username}`;
            const isActive =
              tab.href === ""
                ? pathname === profilePage
                : pathname === `${profilePage}/${tab.href}`;

            return (
              <TabsTrigger
                key={tab.href}
                value={tab.href}
                className={cn(
                  "flex-col mt-8 gap-4 !p-0 data-[state=active]:text-neutral-400",
                  isActive
                    ? "!text-neutral-700 dark:!text-white"
                    : "text-neutral-400"
                )}
                asChild
              >
                <Link href={`/dashboard/${profile.username}/${tab.href}`}>
                  <Separator
                    className={cn(
                      "!h-px w-16",
                      isActive
                        ? "!bg-neutral-700 dark:!bg-white"
                        : "dark:!bg-neutral-800 bg-zinc-300"
                    )}
                  />
                  <div className="flex items-center gap-x-1">
                    <tab.Icon className="h-3 w-3" />
                    <p className="font-bold text-xs tracking-widest uppercase">
                      {tab.title}
                    </p>
                  </div>
                </Link>
              </TabsTrigger>
            );
          })}
      </TabsList>
    </Tabs>
  );
};

export default ProfileTabs;
