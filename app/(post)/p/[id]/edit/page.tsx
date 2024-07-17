import { auth } from '@/lib/auth'
import { notFound } from 'next/navigation'
import { fetchPostById } from '@/app/actions/fetchPostById'
import EditPost from '../_components/edit-post'

export default async function EditPostPage({
  params: { id },
}: {
  params: {
    id: string
  }
}) {
  const session = await auth()
  const userId = session?.user?.id
  // TODO: need to redirect to the login page
  if (!userId) {
    notFound()
  }

  // TODO: we can write individual better query for this
  const post = await fetchPostById(id)
  const isPostOwner = userId === post?.userId

  if (!post || !isPostOwner) {
    notFound()
  }

  return <EditPost id={id} post={post} />
}
