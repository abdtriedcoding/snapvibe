import { Button } from "@/components/ui/button";

const ActionIcon = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <Button
      onClick={onClick}
      type="submit"
      variant={"ghost"}
      size={"icon"}
      className="h-9 w-9"
    >
      {children}
    </Button>
  );
};

export default ActionIcon;
