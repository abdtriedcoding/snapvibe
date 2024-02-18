import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";
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
  const profile = await fetchProfile(username);

  if (!profile) {
    notFound();
  }
  return (
    <>
      <p>TODO</p>
    </>
  );
}

export default ProfileLayout;
