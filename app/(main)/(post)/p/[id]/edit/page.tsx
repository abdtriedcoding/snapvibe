import { auth } from '@/lib/auth'
import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { fetchPostById } from '@/app/actions/fetchPostById'
import EditPost from '../_components/edit-post'

export const metadata: Metadata = {
  title: 'Edit Post',
}

export default async function EditPostPage({
  params: { id },
}: {
  params: {
    id: string
  }
}) {
  const session = await auth()
  const userId = session?.user?.id
  if (!userId) {
    redirect('/login')
  }

  // TODO: we can write individual better query for this
  const post = await fetchPostById(id)
  const isPostOwner = userId === post?.userId

  if (!post || !isPostOwner) {
    notFound()
  }

  return <EditPost id={id} post={post} />
}
