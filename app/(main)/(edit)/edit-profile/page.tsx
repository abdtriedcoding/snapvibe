import { auth } from '@/lib/auth'
import { type Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import ProfileForm from './_components/profile-form'
import { fetchProfile } from '@/app/actions/fetchUserProfile'

export const metadata: Metadata = {
  title: 'Edit profile',
  description: 'Edit profile',
}

export default async function EditProfile() {
  const session = await auth()
  const user = session?.user
  const userId = user?.id
  if (!user) return

  // TODO: we can do better by makign a separate query here
  const profile = await fetchProfile(user?.username)
  if (!profile || session?.user.id !== profile.id) {
    notFound()
  }

  return <ProfileForm profile={profile} userId={userId} />
}
