"use client";

import { z } from "zod";
import Image from "next/image";
import useMount from "@/hook/useMount";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { usePathname, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreatePost } from "@/lib/schema";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { UploadDropzone } from "@/lib/utils";
import { X } from "lucide-react";
import { toast } from "sonner";

const CreatePage = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof CreatePost>>({
    resolver: zodResolver(CreatePost),
    defaultValues: {
      caption: "",
      fileUrl: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof CreatePost>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const pathname = usePathname();
  const router = useRouter();
  const mount = useMount();
  const isCreatePage = pathname === "/dashboard/create";
  if (!mount) return null;

  const fileUrl = form.watch("fileUrl");

  return (
    <Dialog open={isCreatePage} onOpenChange={(open) => !open && router.back()}>
      <DialogContent className="pt-10">
        <DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {!!fileUrl ? (
                <div className="h-96 md:h-[450px] overflow-hidden rounded-md">
                  <AspectRatio ratio={1 / 1} className="relative h-full">
                    <Image
                      src={fileUrl}
                      alt="Post preview"
                      fill
                      className="rounded-md object-cover"
                    />
                    <X
                      onClick={() => form.setValue("fileUrl", "")}
                      className="absolute top-0 right-0 m-2 cursor-pointer"
                    />
                  </AspectRatio>
                </div>
              ) : (
                <FormField
                  control={form.control}
                  name="fileUrl"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel htmlFor="picture">Picture</FormLabel>
                      <FormControl>
                        <UploadDropzone
                          endpoint="imageUploader"
                          onClientUploadComplete={(res) => {
                            form.setValue("fileUrl", res[0].url);
                            toast.success("Upload complete");
                          }}
                          onUploadError={(error: Error) => {
                            toast.error("Upload failed");
                          }}
                        />
                      </FormControl>
                      <FormDescription>
                        Upload a picture to post.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="caption"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="caption">Caption</FormLabel>
                    <FormControl>
                      <Input
                        type="caption"
                        id="caption"
                        placeholder="Write a caption..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={form.formState.isSubmitting}>
                Create Post
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePage;
