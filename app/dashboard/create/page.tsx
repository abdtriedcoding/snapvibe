"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useMount from "@/hook/useMount";
import { usePathname, useRouter } from "next/navigation";

const CreatePage = () => {
  const pathname = usePathname();
  const router = useRouter();
  const mount = useMount();
  const isCreatePage = pathname === "/dashboard/create";
  if (!mount) return null;
  return (
    <Dialog open={isCreatePage} onOpenChange={(open) => !open && router.back()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePage;
