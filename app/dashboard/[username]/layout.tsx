import Link from "next/link";
import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";

import { buttonVariants } from "@/components/ui/button";
import ProfileAvatarDialog from "./_components/profile-avatar-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fetchProfile } from "@/app/actions/fetchUserProfile";

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
        <div className="flex gap-x-5 md:gap-x-10 px-4">
          <ProfileAvatarDialog user={profile}>
            <Avatar className="w-20 h-20 md:w-36 md:h-36 cursor-pointer">
              <AvatarImage
                src={profile.image ?? "https://github.com/shadcn.png"}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </ProfileAvatarDialog>

          <div className="md:px-10 space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 items-center gap-3">
              <p className="font-semibold text-xl">{profile.username}</p>
              {isCurrentUser && (
                <Link
                  href={`/dashboard/edit-profile`}
                  className={buttonVariants({
                    className: "!font-bold",
                    variant: "secondary",
                    size: "sm",
                  })}
                >
                  Edit profile
                </Link>
              )}
            </div>

            <div className="flex items-center gap-x-7">
              <p className="font-medium">
                <strong>{profile.posts.length} posts</strong>
              </p>
            </div>

            <div className="text-sm">
              <div className="font-bold">{profile.name}</div>
              <p>{profile.bio}</p>
            </div>
          </div>
        </div>

        {children}
      </div>
    </>
  );
}

export default ProfileLayout;
