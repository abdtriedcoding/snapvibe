"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeftCircle } from "lucide-react";

const GoBackButton = () => {
  const router = useRouter();
  return (
    <Button variant={"secondary"} onClick={router.back} size={"icon"}>
      <ChevronLeftCircle className="w-7 h-7" />
    </Button>
  );
};

export default GoBackButton;
