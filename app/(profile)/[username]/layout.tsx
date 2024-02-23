import Link from 'next/link'
import { auth } from '@/lib/auth'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ProfileTabs from './_components/profile-tab'
import { buttonVariants } from '@/components/ui/button'
import { fetchProfile } from '@/app/actions/fetchUserProfile'
import ProfileAvatarDialog from './_components/profile-avatar-dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

type Props = {
  params: {
    username: string
  }
  children: React.ReactNode
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const username = params.username
  const profile = await fetchProfile(username)
  return {
    title: `${profile?.name} (@${profile?.username})`,
  }
}

export default async function ProfileLayout({
  children,
  params: { username },
}: Props) {
  const session = await auth()
  const userId = session?.user?.id
  const profile = await fetchProfile(username)
  const isCurrentUser = userId === profile?.id

  if (!profile) {
    notFound()
  }

  return (
    <>
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col items-center gap-4 px-4 md:flex-row md:items-start md:gap-10">
          <ProfileAvatarDialog profile={profile} userId={userId}>
            <Avatar className="h-24 w-24 cursor-pointer md:h-32 md:w-32">
              <AvatarImage
                src={profile.image ?? '/default-userimage.jpg'}
                alt="Avatar"
              />
              <AvatarFallback>{profile.name?.charAt(0)}</AvatarFallback>
            </Avatar>
          </ProfileAvatarDialog>

          <div className="flex flex-grow flex-col">
            <div className="mb-4 flex w-full items-center justify-center space-x-3 md:justify-between">
              <h1 className="text-center text-2xl font-semibold md:text-left md:text-3xl">
                {profile.username}
              </h1>
              {isCurrentUser && (
                <Link
                  href={`/edit-profile`}
                  className={buttonVariants({
                    className: '!font-bold',
                    variant: 'secondary',
                    size: 'sm',
                  })}
                >
                  Edit Profile
                </Link>
              )}
            </div>

            <div className="mb-4 flex w-full items-center justify-center md:justify-start">
              <p className="font-medium">
                <span className="font-semibold">{profile.posts.length}</span>{' '}
                posts
              </p>
            </div>

            <div className="text-center text-sm md:text-left">
              <p className="font-semibold">{profile.name}</p>
              {profile.bio && <p className="text-gray-600">{profile.bio}</p>}
              {profile.website && (
                <Link target="_blank" href={`${profile.website}`}>
                  <p className="pt-1 text-blue-500">{profile.website}</p>
                </Link>
              )}
            </div>
          </div>
        </div>

        <ProfileTabs
          username={profile.username}
          isCurrentUser={isCurrentUser}
        />
        {children}
      </div>
    </>
  )
}
