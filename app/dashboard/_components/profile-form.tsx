'use client'

import { type z } from 'zod'
import { toast } from 'sonner'
import { UserSchema } from '@/lib/schema'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { type UserProfile } from '@/lib/definitions'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateProfile } from '@/app/actions/updateProfile'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import ProfileAvatarDialog from '../[username]/_components/profile-avatar-dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function ProfileForm({
  profile,
  userId,
}: {
  profile: UserProfile
  userId: string | undefined
}) {
  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      image: profile.image ?? '',
      name: profile.name ?? '',
      username: profile.username ?? '',
      bio: profile.bio ?? '',
      gender: profile.gender ?? '',
      website: profile.website ?? '',
    },
  })

  const { isDirty, isSubmitting, isValid } = form.formState

  function onSubmit(data: z.infer<typeof UserSchema>) {
    toast.promise(updateProfile(data), {
      loading: 'Updating profile...',
      success: 'Profile updated successfully',
      error: 'Failed to update profile',
    })
  }

  return (
    <div className="max-w-xl space-y-8 py-10 lg:p-10">
      <div className="flex items-center gap-x-2 md:gap-x-5">
        <ProfileAvatarDialog profile={profile} userId={userId}>
          <div className="flex md:w-20 md:justify-end">
            <Avatar className="h-11 w-11 cursor-pointer">
              <AvatarImage
                src={profile.image ?? 'https://github.com/shadcn.png'}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </ProfileAvatarDialog>
        <div>
          <p className="font-medium">{profile.username}</p>
          <ProfileAvatarDialog profile={profile} userId={userId}>
            <p className="cursor-pointer text-sm font-bold text-blue-500 hover:text-white">
              Change profile photo
            </p>
          </ProfileAvatarDialog>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col gap-x-8 gap-y-2 md:flex-row md:items-center">
                  <FormLabel className="w-20 font-bold md:text-right">
                    Website
                  </FormLabel>
                  <FormControl aria-disabled>
                    <Input placeholder="Website" {...field} />
                  </FormControl>
                </div>
                <FormMessage className="md:ml-24" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col gap-x-8 gap-y-2 md:flex-row md:items-center">
                  <FormLabel className="w-20 font-bold md:text-right">
                    Bio
                  </FormLabel>
                  <FormControl>
                    <Textarea className="resize-none" {...field} />
                  </FormControl>
                </div>
                <FormDescription className="text-xs md:ml-24">
                  {field.value?.length} / 150
                </FormDescription>
                <FormMessage className="md:ml-24" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col gap-x-8 gap-y-2 md:flex-row md:items-center">
                  <FormLabel className="w-20 font-bold md:text-right">
                    Gender
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Prefer not to say" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="prefer-not-to-say">
                        Prefer not to say
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <FormDescription className="text-xs md:ml-24">
                  This wont be part of your public profile.
                </FormDescription>
                <FormMessage className="md:ml-24" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="md:ml-24"
            disabled={!isDirty || !isValid || isSubmitting}
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  )
}
