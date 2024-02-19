import Link from "next/link";
import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";
import { fetchProfile } from "@/app/actions/fetchUserProfile";

import ProfileTabs from "./_components/profile-tab";
import { buttonVariants } from "@/components/ui/button";
import ProfileAvatarDialog from "./_components/profile-avatar-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  params: {
    username: string;
  };
  children: React.ReactNode;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const username = params.username;

  const profile = await fetchProfile(username);

  return {
    title: `${profile?.name} (@${profile?.username})`,
  };
}

async function ProfileLayout({ children, params: { username } }: Props) {
  const session = await auth();
  const profile = await fetchProfile(username);
  const isCurrentUser = session?.user.id === profile?.id;

  if (!profile) {
    notFound();
  }

  return (
    <>
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center md:flex-row md:items-start gap-4 md:gap-10 px-4">
          <ProfileAvatarDialog user={profile}>
            <Avatar className="w-24 h-24 md:w-36 md:h-36 cursor-pointer">
              <AvatarImage
                src={profile.image ?? "https://github.com/shadcn.png"}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </ProfileAvatarDialog>

          <div className="flex flex-col flex-grow">
            <div className="flex space-x-3 items-center justify-center md:justify-between w-full mb-4">
              <h1 className="font-semibold text-2xl md:text-3xl text-center md:text-left">
                {profile.username}
              </h1>
              {isCurrentUser && (
                <Link
                  href={`/dashboard/edit-profile`}
                  className={buttonVariants({
                    className: "!font-bold",
                    variant: "secondary",
                    size: "sm",
                  })}
                >
                  Edit Profile
                </Link>
              )}
            </div>

            <div className="flex items-center justify-center md:justify-start w-full mb-4">
              <p className="font-medium">
                <span className="font-semibold">{profile.posts.length}</span>{" "}
                posts
              </p>
            </div>

            <div className="text-sm text-center md:text-left">
              <p className="font-semibold">{profile.name}</p>
              <p className="text-gray-600">{profile.bio}</p>
              <Link target="_blank" href={`${profile.website}`}>
                <p className="pt-1 text-blue-500">{profile.website}</p>
              </Link>
            </div>
          </div>
        </div>
        <ProfileTabs profile={profile} isCurrentUser={isCurrentUser} />
        {children}
      </div>
    </>
  );
}

export default ProfileLayout;
