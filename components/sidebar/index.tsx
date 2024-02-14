import { auth } from "@/lib/auth";
import Logo from "@/components/sidebar/logo";
import NavLinks from "@/components/sidebar/navlinks";
import ProfileLink from "@/components/sidebar/profile-link";

const Sidebar = async () => {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="flex h-full flex-col px-2">
      <Logo />
      <NavLinks />
      {user && <ProfileLink user={user} />}
    </div>
  );
};

export default Sidebar;
