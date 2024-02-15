import { Button } from "@/components/ui/button";

const ActionIcon = ({ children }: { children: React.ReactNode }) => {
  return (
    <Button type="submit" variant={"ghost"} size={"icon"} className="h-9 w-9">
      {children}
    </Button>
  );
};

export default ActionIcon;
