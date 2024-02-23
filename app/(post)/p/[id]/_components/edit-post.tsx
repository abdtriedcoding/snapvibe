'use client'

import { type z } from 'zod'
import { toast } from 'sonner'
import Image from 'next/image'
import useMount from '@/hook/useMount'
import { type Post } from '@prisma/client'
import { formSchema } from '@/lib/schema'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { updatePost } from '@/app/actions/updatePost'
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

export default function EditPost({ id, post }: { id: string; post: Post }) {
  const mount = useMount()
  const router = useRouter()
  const pathname = usePathname()
  const isEditPage = pathname === `/p/${id}/edit`

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      caption: post.caption ?? '',
      fileUrl: post.fileUrl,
    },
  })

  if (!mount) return null
  const fileUrl = form.watch('fileUrl')
  const { isSubmitting, isValid } = form.formState

  // TODO: need to add loading state
  async function onSubmit(data: z.infer<typeof formSchema>) {
    toast.promise(updatePost(id, data), {
      loading: 'Updating post...',
      success: 'Post updated successfully',
      error: 'Failed to update post',
    })
  }

  return (
    <Dialog open={isEditPage} onOpenChange={(open) => !open && router.back()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit info</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="h-96 overflow-hidden rounded-md md:h-[250px]">
              <AspectRatio ratio={1 / 1} className="relative h-full">
                <Image
                  src={fileUrl}
                  alt="Post preview"
                  fill
                  className="rounded-md object-cover"
                />
              </AspectRatio>
            </div>

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

            <Button disabled={!isValid || isSubmitting} type="submit">
              Save
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
