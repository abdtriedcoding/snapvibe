import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export const PostSkeleton = () => {
  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>

      <Skeleton className="h-[450px]" />
    </div>
  )
}

export const PostsSkeleton = () => {
  return (
    <>
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
    </>
  )
}

export const UserAvatarSkeleton = () => {
  return (
    <div className="flex items-center space-x-2">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}

export const SinglePostSkeleton = () => {
  return (
    <Card className="mx-auto hidden max-w-3xl md:flex lg:max-w-4xl">
      <div className="relative h-[450px] w-full max-w-sm overflow-hidden lg:max-w-lg">
        <Skeleton className="h-full w-full" />
      </div>

      <div className="flex max-w-sm flex-1 flex-col">
        <div className="flex items-center justify-between border-b px-5 py-3">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-3 px-5">
          <UserAvatarSkeleton />
          <UserAvatarSkeleton />
          <UserAvatarSkeleton />
          <UserAvatarSkeleton />
        </div>
      </div>
    </Card>
  )
}

export const MorePostsSkelton = () => {
  return (
    <div className="relative grid h-[250px] w-full grid-cols-3 gap-0.5 overflow-hidden">
      <Skeleton className="h-full w-full" />
      <Skeleton className="h-full w-full" />
      <Skeleton className="h-full w-full" />
    </div>
  )
}

export function EditPostSkeleton() {
  return (
    <Dialog open>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit info</DialogTitle>
        </DialogHeader>

        <div className="h-96 overflow-hidden rounded-md md:h-[250px]">
          <AspectRatio ratio={1 / 1} className="relative h-full">
            <Skeleton className="h-full w-full" />
          </AspectRatio>
        </div>

        <Skeleton className="h-10 w-full" />
      </DialogContent>
    </Dialog>
  )
}

export function PostGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
      <div className="group relative flex h-44 items-center justify-center md:h-64 lg:h-80">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="group relative flex h-44 items-center justify-center md:h-64 lg:h-80">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="group relative flex h-44 items-center justify-center md:h-64 lg:h-80">
        <Skeleton className="h-full w-full" />
      </div>
    </div>
  )
}
