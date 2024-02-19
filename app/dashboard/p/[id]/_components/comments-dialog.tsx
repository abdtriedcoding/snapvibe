import useMount from "@/hook/useMount";
import { CommentWithUser } from "@/lib/definitions";
import Comment from "@/app/dashboard/_components/comment";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ModalProps {
  children: React.ReactNode;
  comments: CommentWithUser[];
}

const CommentsDialog = ({ children, comments }: ModalProps) => {
  const mount = useMount();
  if (!mount) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <DialogTitle>{children}</DialogTitle>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>View All Comments</DialogHeader>
        {comments.length > 0 && (
          <ScrollArea className="h-[450px] py-1.5">
            {comments.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CommentsDialog;
