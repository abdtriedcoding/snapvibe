"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import useMount from "@/hook/useMount";
import { UserProfile } from "@/lib/definitions";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UploadButton } from "@/lib/utils";
import SubmitButton from "../../(home)/_components/submit-button";
import { UpdateUser } from "@/lib/schema";

const ProfileAvatarDialog = ({
  user,
  children,
}: {
  user: UserProfile;
  children: React.ReactNode;
}) => {
  const mount = useMount();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const isCurrentUser = session?.user.id === user.id;

  const form = useForm<z.infer<typeof UpdateUser>>({
    resolver: zodResolver(UpdateUser),
    defaultValues: {
      id: user.id,
      image: user.image || "",
      name: user.name || "",
      username: user.username || "",
    },
  });

  if (!mount || !session) return null;

  if (!isCurrentUser)
    return (
      <Avatar className="w-20 h-20 md:w-36 md:h-36">
        <AvatarImage src={user.image ?? "https://github.com/shadcn.png"} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="bg-white dark:bg-neutral-800 !p-0 overflow-hidden !gap-0">
        <DialogHeader>
          <DialogTitle className="mx-auto font-medium text-xl py-5">
            Change Profile Photo
          </DialogTitle>
        </DialogHeader>

        {isCurrentUser && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(async (values) => {
                // const { message } = await updateProfile(values);
                // toast(message);
                console.log("Profile Updated");

                setOpen(false);
              })}
            >
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <UploadButton
                        className="text-sm h-11 ut-button:bg-transparent border-y border-zinc-300 dark:border-neutral-700 ut-button:text-blue-500 ut-button:font-bold ut-allowed-content:hidden ut-button:ring-0 ut-button:focus-visible:ring-0 ut-button:ring-offset-0 ut-button:w-full"
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                          form.setValue("image", res[0].url);

                          if (inputRef.current) {
                            inputRef.current.click();
                          }
                        }}
                        onUploadError={(error: Error) => {
                          console.error(error);
                          toast.error("Upload failed");
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {user.image && (
                <SubmitButton
                  className="text-red-500 border-b border-zinc-300 dark:border-neutral-700 font-bold disabled:cursor-not-allowed w-full text-sm p-3"
                  onClick={() => {
                    form.setValue("image", "");
                    if (inputRef.current) {
                      inputRef.current.click();
                    }
                  }}
                >
                  Remove Current Photo
                </SubmitButton>
              )}

              <input type="submit" hidden ref={inputRef} />
            </form>
          </Form>
        )}

        <DialogClose className="flex items-center justify-center border-b border-zinc-300 dark:border-neutral-700 text-sm font-medium border-0 w-full p-3">
          Cancel
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileAvatarDialog;
