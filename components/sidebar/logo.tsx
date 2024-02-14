import Link from "next/link";
import { SwitchCamera } from "lucide-react";
import { buttonVariants } from "../ui/button";

const Logo = () => {
  return (
    <Link
      className={buttonVariants({
        className:
          "lg:!justify-start space-x-2 !my-1.5 !px-0 w-full hover:bg-transparent",
        variant: "ghost",
        size: "lg",
      })}
      href={"/dashboard"}
    >
      <SwitchCamera className="h-6 w-6 shrink-0 lg:hidden" />
      <p className="font-semibold text-xl hidden lg:block">SnapVibe</p>
    </Link>
  );
};

export default Logo;
