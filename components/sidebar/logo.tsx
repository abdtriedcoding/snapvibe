import Link from "next/link";
import { SwitchCamera } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

const Logo = () => {
  return (
    <Link
      href={"/dashboard"}
      className={buttonVariants({
        className:
          "hidden md:flex md:!justify-start space-x-2 md:!my-1.5 !px-3 w-full !mb-10 lg:hover:bg-transparent lg:!p-0",
        variant: "ghost",
        size: "lg",
      })}
    >
      <SwitchCamera className="h-6 w-6 shrink-0 lg:hidden" />
      <p className="font-semibold text-xl hidden lg:block">Pixelgram</p>
    </Link>
  );
};

export default Logo;
