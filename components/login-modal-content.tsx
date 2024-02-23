'use client'

import { login } from '@/app/actions/auth'
import { FcGoogle } from 'react-icons/fc'
import { FaXTwitter } from 'react-icons/fa6'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function LoginModalContent() {
  return (
    <Card className="w-full border-none shadow-none">
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>to continue to platform</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex w-full flex-col space-y-2">
          <Button onClick={() => login('google')} variant="outline">
            <FcGoogle className="mr-2 h-5 w-5" />
            Continue with Google
          </Button>
          <Button onClick={() => login('twitter')} variant="outline">
            <FaXTwitter className="mr-2 h-5 w-5" />
            Continue with Twitter
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
