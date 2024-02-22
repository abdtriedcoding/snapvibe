'use client'

import { type z } from 'zod'
import { toast } from 'sonner'
import useMount from '@/hook/useMount'
import '@uploadthing/react/styles.css'
import { useRef, useState } from 'react'
import { UserSchema } from '@/lib/schema'
import { useForm } from 'react-hook-form'
import { UploadButton } from '@/lib/uploadthing'
import { zodResolver } from '@hookform/resolvers/zod'
import { type UserProfile } from '@/lib/definitions'
import { updateProfile } from '@/app/actions/updateProfile'
import SubmitButton from '../../(home)/_components/submit-button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export default function ProfileAvatarDialog({
  profile,
  userId,
  children,
}: {
  profile: UserProfile
  userId: string | undefined
  children: React.ReactNode
}) {
  const mount = useMount()
  const [open, setOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const isCurrentUser = userId === profile.id

  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      image: profile.image ?? '',
      name: profile.name ?? '',
      username: profile.username ?? '',
    },
  })

  if (!mount) return null

  if (!isCurrentUser)
    return (
      <Avatar className="h-20 w-20 md:h-36 md:w-36">
        {/* TODO: update this deafult image */}
        <AvatarImage src={profile.image ?? 'https://github.com/shadcn.png'} />
        <AvatarFallback>{profile.name?.charAt(0)}</AvatarFallback>
      </Avatar>
    )

  function onSubmit(data: z.infer<typeof UserSchema>) {
    toast.promise(updateProfile(data), {
      loading: 'Updating profile...',
      success: 'Profile updated successfully',
      error: 'Failed to update profile',
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="gap-0 bg-white p-0 dark:bg-neutral-800">
        <DialogHeader>
          <DialogTitle className="mx-auto py-5 text-xl font-medium">
            Change Profile Photo
          </DialogTitle>
        </DialogHeader>

        {isCurrentUser && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="image"
                render={() => (
                  <FormItem>
                    <FormControl>
                      <UploadButton
                        className="border-b border-zinc-300 pb-1 text-sm dark:border-neutral-700"
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                          if (res?.[0]?.url) {
                            form.setValue('image', res[0].url)
                            toast.success('Picture upload complete')
                          } else {
                            toast.error('Picture upload failed')
                          }

                          if (inputRef.current) {
                            inputRef.current.click()
                          }
                        }}
                        onUploadError={() => {
                          toast.error('Upload failed')
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {profile.image && (
                <SubmitButton
                  className="w-full border-b border-zinc-300 p-3 text-sm font-bold text-red-500 disabled:cursor-not-allowed dark:border-neutral-700"
                  onClick={() => {
                    form.setValue('image', '')
                    if (inputRef.current) {
                      inputRef.current.click()
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

        <DialogClose className="flex w-full items-center justify-center border-0 border-b border-zinc-300 p-3 text-sm font-medium dark:border-neutral-700">
          Cancel
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}
