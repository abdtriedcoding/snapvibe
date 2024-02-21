'use client'

import { type z } from 'zod'
import { toast } from 'sonner'
import { X } from 'lucide-react'
import Image from 'next/image'
import useMount from '@/hook/useMount'
import '@uploadthing/react/styles.css'
import { useForm } from 'react-hook-form'
import { formSchema } from '@/lib/schema'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { UploadDropzone } from '@/lib/uploadthing'
import { createPost } from '@/app/actions/createPost'
import { zodResolver } from '@hookform/resolvers/zod'
import { usePathname, useRouter } from 'next/navigation'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

export default function CreatePage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      caption: '',
      fileUrl: undefined,
    },
  })

  const { isSubmitting } = form.formState

  const pathname = usePathname()
  const router = useRouter()
  const mount = useMount()

  const isCreatePage = pathname === '/dashboard/create'
  if (!mount) return null

  const fileUrl = form.watch('fileUrl')

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast.promise(createPost(data), {
      loading: 'Creating post...',
      success: 'Post created successfully',
      error: 'Failed to create post',
    })
  }

  return (
    <Dialog open={isCreatePage} onOpenChange={(open) => !open && router.back()}>
      <DialogContent className="pt-12">
        <DialogHeader>
          <DialogTitle>Create new post</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {!!fileUrl ? (
              <AspectRatio ratio={16 / 9}>
                <Image
                  src={fileUrl}
                  alt="Post preview"
                  fill
                  className="rounded-md object-cover"
                />
                <X
                  onClick={() => form.setValue('fileUrl', '')}
                  className="absolute right-0 top-0 m-2 cursor-pointer"
                />
              </AspectRatio>
            ) : (
              <FormField
                control={form.control}
                name="fileUrl"
                render={() => (
                  <FormItem>
                    <FormLabel htmlFor="picture">Picture</FormLabel>
                    <FormControl>
                      <UploadDropzone
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                          if (res?.[0]?.url) {
                            form.setValue('fileUrl', res[0].url)
                            toast.success('Picture upload complete')
                          } else {
                            toast.error('Picture upload failed')
                          }
                        }}
                        onUploadError={() => {
                          toast.error('Upload failed')
                        }}
                      />
                    </FormControl>
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

            <Button type="submit" disabled={isSubmitting}>
              Create Post
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
