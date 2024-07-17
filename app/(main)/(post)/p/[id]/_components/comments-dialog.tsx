import useMount from '@/hook/useMount'
import { type User } from 'next-auth'
import { type CommentWithUser } from '@/lib/definitions'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import Comment from './comment'

interface ModalProps {
  children: React.ReactNode
  comments: CommentWithUser[]
  user: User | undefined
}

export default function CommentsDialog({
  children,
  comments,
  user,
}: ModalProps) {
  const mount = useMount()
  if (!mount) return null

  return (
    <Dialog>
      <DialogTrigger asChild>
        <DialogTitle>{children}</DialogTitle>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>View All Comments</DialogHeader>
        {comments.length > 0 && (
          <ScrollArea className="h-[450px] py-1.5">
            <div className="space-y-4">
              {comments.map((comment) => (
                <Comment key={comment.id} comment={comment} user={user} />
              ))}
            </div>
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  )
}
