import { auth } from '@/lib/auth'
import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import ProfileForm from './_components/profile-form'
import { fetchProfile } from '@/app/actions/fetchUserProfile'

export const metadata: Metadata = {
  title: 'Edit profile',
  description: 'Edit profile',
}

export default async function EditProfile() {
  const session = await auth()
  // TODO: need to redirect to login page
  if (!session) {
    notFound()
  }
  const userId = session?.user.id

  // TODO: we can do better by makign a separate query here
  const profile = await fetchProfile(session?.user?.username)
  if (!profile || session.user.id !== profile.id) {
    notFound()
  }

  return (
    <div className="px-12">
      <h1 className="text-2xl font-medium">Edit profile</h1>
      <ProfileForm profile={profile} userId={userId} />
    </div>
  )
}
