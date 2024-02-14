import { auth } from "@/lib/auth";
import Logo from "@/components/sidebar/logo";
import NavLinks from "@/components/sidebar/navlinks";
import ProfileLink from "@/components/sidebar/profile-link";
import DropdownMenuSection from "@/components/sidebar/dropdown-menu";

const Sidebar = async () => {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="h-full flex flex-col px-4">
      <div className="border-t -ml-3 md:ml-0 bg-white justify-evenly fixed z-50 flex-1 w-full md:relative md:h-full bottom-0 md:border-none flex flex-row md:justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <Logo />
        <NavLinks />
        {user && <ProfileLink user={user} />}
      </div>
      <div className="hidden md:flex relative md:mt-auto flex-1 items-end w-full">
          <DropdownMenuSection />
        </div>
    </div>
  );
};

export default Sidebar;
