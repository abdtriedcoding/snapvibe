import { Metadata } from "next";
import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";
import { fetchProfile } from "@/app/actions/fetchUserProfile";
import ProfileForm from "../_components/profile-form";

export const metadata: Metadata = {
  title: "Edit profile",
  description: "Edit profile",
};

const EditProfile = async () => {
  const session = await auth();
  const profile = await fetchProfile(session?.user.username!);
  console.log(profile);
  if (!profile) {
    notFound();
  }

  return (
    <div className="px-12">
      <h1 className="text-2xl font-medium">Edit profile</h1>

      <ProfileForm profile={profile} />
    </div>
  );
};

export default EditProfile;
