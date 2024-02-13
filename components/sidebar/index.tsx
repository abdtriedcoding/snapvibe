import { auth } from "@/lib/auth";
import Logo from "@/components/sidebar/logo";
import NavLinks from "@/components/sidebar/navlinks";
import ProfileLink from "@/components/sidebar/profile-link";

const Sidebar = async () => {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <div className="border-t -ml-3 md:ml-0 bg-white h-16 justify-evenly fixed z-50 flex-1 w-full md:relative md:h-full bottom-0 md:border-none flex flex-row md:justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2 p-2">
        <Logo />
        <NavLinks />
        {user && <ProfileLink user={user} />}
      </div>
    </div>
  );
};

export default Sidebar;
