import { auth } from '@/lib/auth'
import { notFound } from 'next/navigation'
import { fetchPostById } from '@/app/actions/fetchPostById'
import EditPost from '../_components/edit-post'

type Props = {
  params: {
    id: string
  }
}

export default async function EditPostPage({ params: { id } }: Props) {
  const session = await auth()
  const userId = session?.user?.id
  if (!userId) {
    notFound()
  }

  const post = await fetchPostById(id)
  const isPostOwner = userId === post?.userId

  if (!post || !isPostOwner) {
    notFound()
  }

  return <EditPost id={id} post={post} />
}
