import { auth } from '@/lib/auth'
import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { fetchProfile } from '@/app/actions/fetchUserProfile'
import ProfileForm from '../_components/profile-form'

export const metadata: Metadata = {
  title: 'Edit profile',
  description: 'Edit profile',
}

export default async function EditProfile() {
  const session = await auth()
  if (!session) {
    notFound()
  }
  const userId = session?.user.id

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
