import { LogIn } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import LoginModalContent from './login-modal-content'

export default function LoginModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <LogIn className="mr-2 h-5 w-5" />
          Login
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <LoginModalContent />
      </DialogContent>
    </Dialog>
  )
}
