import { type DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface JWT {
    id: string
    username?: string | null
  }

  interface Session {
    user: {
      username: string
    } & DefaultSession['user']
  }

  interface User {
    username?: string
  }
}
